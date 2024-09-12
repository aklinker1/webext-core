export default defineContentScript({
  matches: ['*://*.google.com/*'],

  main(ctx) {
    console.log('[google.content.ts] Content script loaded');

    const script = document.createElement('script');
    script.src = browser.runtime.getURL('/google-injected.js');
    script.onload = async () => {
      googleMessaging.onMessage('fromInjected', event => {
        console.log('[google.content.ts] Received:', event);
        return 'hello injected';
      });

      googleMessaging.onMessage('fromInjected2', event => {
        console.log('[google.content.ts] Received:', event);
        return 'hello injected2';
      });

      const res = await googleMessaging.sendMessage('ping', undefined);
      console.log('[google.content.ts] Response:', res);

      const res2 = await googleMessaging.sendMessage('ping2', undefined);
      console.log('[google.content.ts] Response2:', res2);
    };
    document.head.appendChild(script);
  },
});
