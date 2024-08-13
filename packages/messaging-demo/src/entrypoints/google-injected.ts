export default defineUnlistedScript(() => {
  console.log('[google-injected.ts] Injected script loaded');

  googleMessaging.onMessage('ping', event => {
    console.log('[google-injected.ts] revieved', event);
    return 'pong';
  });
});
