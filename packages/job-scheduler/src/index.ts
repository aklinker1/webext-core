import browser, { Alarms } from 'webextension-polyfill';
import formatDuration from 'format-duration';
import cron from 'cron-parser';

/**
 * Interface used to log text to the console when creating and executing jobs.
 */
export interface Logger {
  debug(...args: any[]): void;
  log(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
}

/**
 * Configures how the job scheduler behaves.
 */
export interface JobSchedulerConfig {
  /**
   * The logger to use when logging messages. Set to `null` to disable logging.
   *
   * @default console
   */
  logger?: Logger | null;
}

/**
 * Function ran when executing the job. Errors are automatically caught and will trigger the
 * `"error"` event. If a value is returned, the result will be available in the `"success"` event.
 */
export type ExecuteFn = () => Promise<any> | any;

/**
 * A job that executes on a set interval, starting when the job is scheduled for the first time.
 */
export interface IntervalJob {
  id: string;
  type: 'interval';
  /**
   * Interval in milliseconds. Due to limitations of the alarms API, it must be greater than 1
   * minute.
   */
  duration: number;
  /**
   * Execute the job immediately when it is scheduled for the first time. If `false`, it will
   * execute for the first time after `duration`. This has no effect when updating an existing job.
   *
   * @default false
   */
  immediate?: boolean;
  execute: ExecuteFn;
}

/**
 * A job that is executed based on a CRON expression. Backed by `cron-parser`.
 *
 * [`cron.ParserOptions`](https://github.com/harrisiirak/cron-parser#options) includes options like timezone.
 */
export interface CronJob extends cron.ParserOptions<false> {
  id: string;
  type: 'cron';
  /**
   * See `cron-parser`'s [supported expressions](https://github.com/harrisiirak/cron-parser#supported-format)
   */
  expression: string;
  execute: ExecuteFn;
}

/**
 * Runs a job once, at a specific date/time.
 */
export interface OnceJob {
  id: string;
  type: 'once';
  /**
   * The date to run the job on.
   */
  date: Date | string | number;
  execute: ExecuteFn;
}

export type Job = IntervalJob | CronJob | OnceJob;

export interface JobScheduler {
  /**
   * Schedule a job. If a job with the same `id` has already been scheduled, it will update the job if it is different.
   */
  scheduleJob(job: Job): Promise<void>;

  /**
   * Un-schedules a job by it's ID.
   */
  removeJob(jobId: string): Promise<void>;

  /**
   * Un-schedules all jobs
   */
  removeAllJobs(): Promise<void>;

  /**
   * Listen for a job to finish successfully.
   */
  on(event: 'success', callback: (job: Job, result: any) => void): RemoveListenerFn;

  /**
   * Listen for when a job fails.
   */
  on(event: 'error', callback: (job: Job, error: unknown) => void): RemoveListenerFn;

  /**
   * List all the scheduled jobs.
   */
  listJobs(): Promise<Alarms.Alarm>;
}

/**
 * Call to remove the listener that was added.
 */
type RemoveListenerFn = () => void;

/**
 * > Requires the `alarms` permission.
 *
 * Creates a `JobScheduler` backed by the
 * [alarms API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms).
 *
 * @param options
 * @returns A `JobScheduler` that can be used to schedule and manage jobs.
 */
export function defineJobScheduler(options?: JobSchedulerConfig): JobScheduler {
  const logger = options?.logger === undefined ? console : options.logger;
  if (browser.alarms == null) {
    options;
  }

  const successListeners: Array<(job: Job, result: any) => void> = [];
  function triggerSuccessListeners(job: Job, result: any) {
    successListeners.forEach(l => l(job, result));
  }

  const errorListeners: Array<(job: Job, result: any) => void> = [];
  function triggerErrorListeners(job: Job, error: unknown) {
    errorListeners.forEach(l => l(job, error));
  }

  /**
   * Stores the job callbacks for `onAlarm`
   */
  const jobs: Record<Job['id'], Job> = {};

  async function executeJob(job: Job) {
    const executionId = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
    logger?.log(`[${executionId}] Executing job:`, job);

    const startTime = Date.now();
    let status = 'success';
    try {
      // Schedule next alarm ASAP so that it happens even if the job is killed by non-persistent
      // background scripts.
      await scheduleNextAlarm(job);

      const result = await job.execute();

      triggerSuccessListeners(job, result);
    } catch (err) {
      status = 'failure';
      triggerErrorListeners(job, err);
    }

    const endTime = Date.now();
    const durationInMs = endTime - startTime;
    logger?.log(`[${executionId}] Job ran in ${formatDuration(durationInMs)}`, {
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      durationInMs,
      status,
      job,
    });
  }

  function jobToAlarm(job: Job): Alarms.Alarm | undefined {
    let scheduledTime: number;
    let periodInMinutes: number | undefined;
    switch (job.type) {
      case 'once':
        scheduledTime = new Date(job.date).getTime();
        if (scheduledTime < Date.now()) return;
        break;
      case 'interval':
        scheduledTime = Date.now();
        if (!job.immediate) scheduledTime += job.duration;
        periodInMinutes = job.duration / 60e3;
        break;
      case 'cron':
        const expression = cron.parseExpression(job.expression, {
          ...job,
          currentDate: Date.now(),
          startDate: Date.now(),
        });
        if (!expression.hasNext()) return;
        scheduledTime = expression.next().getTime();
        break;
    }
    return {
      name: job.id,
      scheduledTime,
      periodInMinutes,
    };
  }

  async function scheduleJob(job: Job) {
    logger?.debug('Scheduling job: ', job);

    // If there's not a future alarm, don't schedule a job.
    const alarm = jobToAlarm(job);
    if (alarm == null) {
      delete jobs[job.id];
      return;
    }

    // Create the job if it's different
    jobs[job.id] = job;
    const existing = (await browser.alarms.get(job.id)) as Alarms.Alarm | undefined;
    switch (job.type) {
      case 'cron':
      case 'once':
        if (alarm.scheduledTime !== existing?.scheduledTime) {
          browser.alarms.create(alarm.name, { when: alarm.scheduledTime });
        }
        break;
      case 'interval':
        if (!existing || alarm.periodInMinutes !== existing.periodInMinutes) {
          browser.alarms.create(alarm.name, {
            delayInMinutes: job.immediate && !existing ? 0 : alarm.periodInMinutes,
            periodInMinutes: alarm.periodInMinutes,
          });
        }
        break;
    }
  }

  async function listJobs() {
    logger?.debug('Listing jobs');
    const alarms = await browser.alarms.getAll();

    return alarms.map(alarm => jobs[alarm.name]);
  }

  /**
   * Some jobs need to immediately schedule the next alarm, some don't. This function handles each
   * type and calls `scheduleJob` if needed.
   */
  async function scheduleNextAlarm(job: Job) {
    switch (job.type) {
      // A one-time alarm doesn't need a next alarm
      case 'once':
      // Handled by alarms API
      case 'interval':
        break;
      case 'cron':
        await scheduleJob(job);
        break;
    }
  }

  // Listen for alarms and execute jobs
  browser.alarms.onAlarm.addListener(async alarm => {
    const job = jobs[alarm.name];
    if (job) await executeJob(job);
  });

  return {
    scheduleJob,

    async removeJob(jobId) {
      delete jobs[jobId];
      await browser.alarms.clear(jobId);
    },

    async removeAllJobs() {
      await browser.alarms.clearAll();
    },

    on(event, callback) {
      const listeners = event === 'success' ? successListeners : errorListeners;
      listeners.push(callback);
      return () => {
        const i = listeners.indexOf(callback);
        listeners.splice(i, 1);
      };
    },
  };
}
