---
titleTemplate: '@webext-core/job-scheduler'
next:
  text: API Reference
  link: /api/job-scheduler
---

# Job Scheduler

<ChipGroup>
  <Chip text="MV2" type="manifest" />
  <Chip text="MV3" type="manifest" />
  <Chip text="Chrome" type="browser" />
  <Chip text="Firefox" type="browser" />
  <Chip text="Safari" type="browser" />
</ChipGroup>

## Overview

`@webext-core/job-scheduler` uses the [alarms API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms) to manage different types of reoccuring jobs:

- One-time jobs
- Jobs that run on an interval
- Cron jobs

## Installation

###### NPM

```sh
pnpm i @webext-core/job-scheduler
```

```ts
import { defineJobScheduler } from '@webext-core/job-scheduler';
```

###### CDN

```sh
curl -o job-scheduler.js https://cdn.jsdelivr.net/npm/@webext-core/job-scheduler/lib/index.global.js
```

```html
<script src="/job-scheduler.js"></script>
<script>
  const { defineJobScheduler } = webExtCoreJobScheduler;
</script>
```

## Usage

`defineJobSchduler` should to be executed once in the background. It returns an object that can be used to schedule or remove jobs.

:::code-group

```ts [background.ts]
import { defineJobScheduler } from '@webext-core/job-scheduler';

const jobs = defineJobScheduler();
```

:::

Once the job scheduler is created, call `scheduleJob`. To see all the options for configuring jobs, see the [API reference](/api/job-scheduler).

:::code-group

```ts [One time]
jobs.scheduleJob({
  id: 'job1',
  type: 'once',
  date: Date.now() + 1.44e7, // In 4 hours
  execute: () => {
    console.log('Executed job once');
  },
});
```

```ts [On an interval]
jobs.scheduleJob({
  id: 'job2',
  type: 'interval',
  interval: DAY, // Runs every 24 hours
  execute: () => {
    console.log('Executed job on interval');
  },
});
```

```ts [CRON]
jobs.scheduleJob({
  id: 'job3',
  type: 'cron',
  expression: '0 */2 * * *', // https://crontab.guru/#0_*/2_*_*_*
  execute: () => {
    console.log('Executed CRON job');
  },
});
```

:::

If a job has been created in the past, and nothing has changed, `scheduleJob` will do nothing. If something changed, it will update the job.

To stop running a job, call `removeJob`.

```ts
job.removeJob('some-old-job');
```

:::warning
This is especially important when releasing an update after removing a job that is no longer needed - even if `scheduleJob` isn't called anymore. If you don't call `removeJob`, the alarm managed internally for that job will not be deleted.
:::

## Parameterized Jobs

You can't pass parameters into each individual job execution, but you can pass dependencies when scheduling a job by using higher-order functions:

:::code-group

```ts [background.ts]
import { someJob } from './someJob.ts';

// Create your dependency
const someDependency = new SomeDependency();

const jobs = defineJobScheduler();
jobs.scheduleJob({
  // ...
  execute: someJob(someDependency),
});
```

```ts [someJob.ts]
function someJob(someDependency: SomeDependency) {
  return async () => {
    // Use someDependency
  };
}
```

:::

## Other JS Contexts

You should only create one scheduler, and it should be created in the background page/service worker.

To schedule jobs from a UI or content script, you can use [`@webext-core/proxy-service`](/guide/proxy-service/).

:::code-group

```ts [job-scheduler.ts]
import { defineProxyService } from '@webext-core/proxy-service';

export const [registerJobScheduler, getJobScheduler] = defineProxyService('JobScheduler', () =>
  defineJobScheduler(),
);
```

```ts [background.ts]
import { registerJobScheduler } from './job-scheduler';

const jobs = registerJobScheduler();

// Schedule any jobs in the background
jobs.scheduleJob({
  // ...
});
```

```ts [content-script.ts]
import { getJobScheduler } from './job-scheduler';

// Get a proxy instance and use it to schedule more jobs
const jobs = getJobScheduler();
jobs.scheduleJob({
  // ...
});
```

:::
