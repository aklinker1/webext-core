import { describe, it, expect, vi, beforeEach } from 'vitest';
import { defineJobScheduler } from './index';
import { fakeBrowser } from '@webext-core/fake-browser';
import { Alarms } from 'webextension-polyfill';

vi.mock('webextension-polyfill');

describe('defineJobScheduler', () => {
  beforeEach(() => {
    fakeBrowser.reset();
    vi.setSystemTime('2023-01-30T11:30:49.000Z');
  });

  describe('scheduleJob', () => {
    describe('OnceJob', () => {
      it('should schedule the job correctly', async () => {
        const job = {
          id: 'once',
          type: 'once' as const,
          date: Date.now() + 60e3,
          execute: vi.fn(),
        };
        const expected: Alarms.Alarm = {
          name: job.id,
          scheduledTime: job.date,
        };
        const jobs = defineJobScheduler({ logger: null });
        await jobs.scheduleJob(job);

        const alarm = await fakeBrowser.alarms.get(job.id);
        await fakeBrowser.alarms.onAlarm.trigger(alarm!);

        expect(job.execute).toBeCalledTimes(1);
        expect(alarm).toEqual(expected);
      });

      it('should not schedule a job in the past', async () => {
        const job = {
          id: 'once',
          type: 'once' as const,
          date: Date.now() - 1,
          execute: vi.fn(),
        };
        const jobs = defineJobScheduler({ logger: null });
        await jobs.scheduleJob(job);

        const alarm = await fakeBrowser.alarms.get(job.id);
        await fakeBrowser.alarms.onAlarm.trigger({ name: job.id, scheduledTime: Math.random() });

        expect(job.execute).not.toBeCalled();
        expect(alarm).toBeUndefined();
      });
    });

    describe('IntervalJob', () => {
      it('should schedule the job immediately', async () => {
        const minutes = 2;
        const job = {
          id: 'interval',
          type: 'interval' as const,
          duration: minutes * 60e3,
          immediate: true,
          execute: vi.fn(),
        };
        const expected: Alarms.Alarm = {
          name: job.id,
          scheduledTime: Date.now(),
          periodInMinutes: minutes,
        };
        const jobs = defineJobScheduler({ logger: null });
        await jobs.scheduleJob(job);

        const alarm = await fakeBrowser.alarms.get(job.id);
        await fakeBrowser.alarms.onAlarm.trigger(alarm!);

        expect(job.execute).toBeCalledTimes(1);
        expect(alarm).toEqual(expected);
      });

      it('should not schedule the job immediately if the alarm already exists', async () => {
        const minutes = 2;
        const job = {
          id: 'interval',
          type: 'interval' as const,
          duration: minutes * 60e3,
          immediate: true,
          execute: vi.fn(),
        };
        const jobs = defineJobScheduler({ logger: null });
        fakeBrowser.alarms.create(job.id, {
          periodInMinutes: minutes,
          delayInMinutes: minutes,
        });
        const expected = await fakeBrowser.alarms.get(job.id);

        await jobs.scheduleJob(job);

        const alarm = await fakeBrowser.alarms.get(job.id);
        await fakeBrowser.alarms.onAlarm.trigger(alarm!);

        expect(job.execute).toBeCalledTimes(1);
        expect(alarm).toEqual(expected);
      });

      it.each([undefined, false])(
        'should schedule the job after the interval when immediate=%s',
        async immediate => {
          const minutes = 2;
          const job = {
            id: 'interval',
            type: 'interval' as const,
            duration: minutes * 60e3,
            immediate,
            execute: vi.fn(),
          };
          const expected: Alarms.Alarm = {
            name: job.id,
            scheduledTime: Date.now() + job.duration,
            periodInMinutes: minutes,
          };
          const jobs = defineJobScheduler({ logger: null });
          await jobs.scheduleJob(job);

          const alarm = await fakeBrowser.alarms.get(job.id);
          await fakeBrowser.alarms.onAlarm.trigger(alarm!);

          expect(job.execute).toBeCalledTimes(1);
          expect(alarm).toEqual(expected);
        },
      );
    });

    describe('CronJob', () => {
      it('should schedule a CronJob', async () => {
        const job = {
          id: 'cron',
          type: 'cron' as const,
          expression: '0 0/2 * * *', // every 2 hours on the 0th minute of the hour
          execute: vi.fn(),
        };
        const expected: Alarms.Alarm = {
          name: job.id,
          scheduledTime: new Date('2023-01-30T12:00:00.000Z').getTime(),
        };

        const jobs = defineJobScheduler({ logger: null });
        await jobs.scheduleJob(job);

        const alarm = await fakeBrowser.alarms.get(job.id);
        await fakeBrowser.alarms.onAlarm.trigger(alarm!);

        expect(alarm).toEqual(expected);
        expect(job.execute).toBeCalledTimes(1);
      });

      it('should not schedule a CronJob with no next interval', async () => {
        const job = {
          id: 'cron',
          type: 'cron' as const,
          expression: '0 */2 * * *',
          endDate: Date.now() - 1,
          execute: vi.fn(),
        };
        const jobs = defineJobScheduler({ logger: null });
        await jobs.scheduleJob(job);

        const alarm = await fakeBrowser.alarms.get(job.id);
        await fakeBrowser.alarms.onAlarm.trigger({ name: job.id, scheduledTime: Math.random() });

        expect(job.execute).not.toBeCalled();
        expect(alarm).toBeUndefined();
      });

      it.each([
        ['even if it fails', vi.fn().mockRejectedValue('Some error')],
        ['if it finishes without an error', vi.fn().mockResolvedValue(undefined)],
      ])('should schedule the next CronJob alarm %s', async (_, execute) => {
        const job = {
          id: 'cron',
          type: 'cron' as const,
          expression: '0 0/2 * * *', // every 2 hours on the 0th minute of the hour
          execute,
        };
        const expected1: Alarms.Alarm = {
          name: job.id,
          scheduledTime: new Date('2023-01-30T12:00:00.000Z').getTime(),
        };
        const expected2: Alarms.Alarm = {
          name: job.id,
          scheduledTime: new Date('2023-01-30T14:00:00.000Z').getTime(),
        };

        const jobs = defineJobScheduler({ logger: null });
        await jobs.scheduleJob(job);

        const alarm1 = await fakeBrowser.alarms.get(job.id);
        vi.setSystemTime(alarm1!.scheduledTime + 1);
        await fakeBrowser.alarms.onAlarm.trigger(alarm1!);
        const alarm2 = await fakeBrowser.alarms.get(job.id);

        expect(alarm1).toEqual(expected1);
        expect(alarm2).toEqual(expected2);
      });

      it('should fail to schedule alarm with an invalid expression', async () => {
        const job = {
          id: 'cron',
          type: 'cron' as const,
          expression: '60 */2 * * *',
          endDate: Date.now() - 1,
          execute: vi.fn(),
        };
        const jobs = defineJobScheduler({ logger: null });

        const actual = jobs.scheduleJob(job);

        await expect(actual).rejects.toThrowError();
      });
    });
  });

  describe('removeJob', () => {
    it('should not execute a job once removed', async () => {
      const job = {
        id: 'once',
        type: 'once' as const,
        date: Date.now() + 60e3,
        execute: vi.fn(),
      };
      const jobs = defineJobScheduler({ logger: null });
      await jobs.scheduleJob(job);
      await fakeBrowser.alarms.onAlarm.trigger({ name: job.id, scheduledTime: job.date });
      await jobs.removeJob(job.id);
      await fakeBrowser.alarms.onAlarm.trigger({ name: job.id, scheduledTime: job.date });
      const alarm = await fakeBrowser.alarms.get(job.id);

      expect(job.execute).toBeCalledTimes(1);
      expect(alarm).toBeUndefined();
    });
  });

  describe('on', () => {
    it('should call success listeners when a job finishes', async () => {
      const result = Math.random();
      const job = {
        id: 'success',
        type: 'once' as const,
        date: Date.now() + 1,
        execute: vi.fn().mockResolvedValue(result),
      };
      const onSuccess = vi.fn();

      const jobs = defineJobScheduler({ logger: null });
      await jobs.scheduleJob(job);
      jobs.on('success', onSuccess);

      await fakeBrowser.alarms.onAlarm.trigger({ name: job.id, scheduledTime: job.date });

      expect(onSuccess).toBeCalledTimes(1);
      expect(onSuccess).toBeCalledWith(job, result);
    });

    it.each([
      // prettier-ignore
      ['sync job', vi.fn(() => { throw Error('error'); }), ],
      ['async job', vi.fn().mockRejectedValue(Error('error'))],
    ])('should call error listeners when the %s fails', async (_, execute) => {
      const job = {
        id: 'success',
        type: 'once' as const,
        date: Date.now() + 1,
        execute,
      };
      const onError = vi.fn();

      const jobs = defineJobScheduler({ logger: null });
      await jobs.scheduleJob(job);
      jobs.on('error', onError);

      await fakeBrowser.alarms.onAlarm.trigger({ name: job.id, scheduledTime: job.date });

      expect(onError).toBeCalledTimes(1);
      expect(onError).toBeCalledWith(job, expect.any(Error));
    });
  });
});
