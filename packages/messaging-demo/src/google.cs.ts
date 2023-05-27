import { googleMessaging } from './utils/google-messaging';
import browser from 'webextension-polyfill';

console.log('[google.cs.ts] Content script loaded');

const script = document.createElement('script');
script.src = browser.runtime.getURL('/assets/google.injected.js');
script.onload = async () => {
  const res = await googleMessaging.sendMessage('ping', undefined);
  console.log('[google.cs.ts] Response:', res);
};
document.head.appendChild(script);
