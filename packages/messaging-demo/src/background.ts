import { onMessage } from './utils/messaging';

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

onMessage('sleep', async ({ data }) => new Promise(res => setTimeout(res, data)));
onMessage('ping', async () => {
  await sleep(1000);
  return 'pong' as const;
});
onMessage('ping2', async ({ data }) => {
  await sleep(1000);
  return data;
});
onMessage('throw', () => {
  throw Error('Example error');
});
