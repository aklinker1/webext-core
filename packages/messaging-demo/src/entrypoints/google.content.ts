export default defineContentScript({
  matches: ['*://*.google.com/*'],

  main(ctx) {
    console.log('[google.content.ts] Content script loaded');

    const script = document.createElement('script');
    script.src = browser.runtime.getURL('/google-injected.js');
    script.onload = async () => {
      const res = await googleMessaging.sendMessage('ping', undefined);
      console.log('[google.content.ts] Response:', res);
    };
    document.head.appendChild(script);
  },
});
