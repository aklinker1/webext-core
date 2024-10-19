export default defineContentScript({
  matches: ['*://*.duckduckgo.com/*'],

  main(ctx) {
    console.log('[duckduckgo.content.ts] Content script loaded');

    duckduckgoMessaging.onMessage('fromInjected', event => {
      console.log('[duckduckgo.content.ts] Received:', event);
      return 'hello injected';
    });

    duckduckgoMessaging.onMessage('fromInjected2', event => {
      console.log('[duckduckgo.content.ts] Received:', event);
      return 'hello injected2';
    });

    const script = document.createElement('script');
    script.src = browser.runtime.getURL('/duckduckgo-injected.js');
    script.onload = async () => {
      const res = await duckduckgoMessaging.sendMessage('ping', undefined);
      console.log('[duckduckgo.content.ts] Response:', res);

      const res2 = await duckduckgoMessaging.sendMessage('ping2', undefined);
      console.log('[duckduckgo.content.ts] Response2:', res2);
    };
    document.head.appendChild(script);
  },
});
