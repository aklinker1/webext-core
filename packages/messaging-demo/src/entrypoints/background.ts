export default defineBackground(() => {
  const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

  onMessage1('sleep', async ({ data }) => new Promise(res => setTimeout(res, data)));
  onMessage1('ping', async () => {
    await sleep(1000);
    return 'pong' as const;
  });
  onMessage2('ping2', async ({ data }) => {
    await sleep(1000);
    return data;
  });
  onMessage2('throw', () => {
    throw Error('Example error');
  });
});
