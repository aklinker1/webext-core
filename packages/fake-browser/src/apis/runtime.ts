import { BrowserOverrides } from '../types';
import { defineEventWithTrigger } from '../utils/defineEventWithTrigger';
import { Runtime } from 'webextension-polyfill';

const onMessage =
  defineEventWithTrigger<(message: any, sender: Runtime.MessageSender) => void | Promise<any>>();
const onInstalled = defineEventWithTrigger<(details: Runtime.OnInstalledDetailsType) => void>();
const onStartup = defineEventWithTrigger<() => void>();
const onSuspend = defineEventWithTrigger<() => void>();
const onSuspendCanceled = defineEventWithTrigger<() => void>();
const onUpdateAvailable =
  defineEventWithTrigger<(details: Runtime.OnUpdateAvailableDetailsType) => void>();

const TEST_ID = 'test-extension-id';

export const runtime: BrowserOverrides['runtime'] = {
  resetState() {
    onMessage.removeAllListeners();
    onInstalled.removeAllListeners();
    onStartup.removeAllListeners();
    onSuspend.removeAllListeners();
    onSuspendCanceled.removeAllListeners();
    onUpdateAvailable.removeAllListeners();
    runtime.id = TEST_ID;
  },
  id: TEST_ID,
  getURL(path: string) {
    return `chrome-extension://${runtime.id}/${path.replace(/^\//, '')}`;
  },
  onInstalled,
  onMessage,
  onStartup,
  onSuspend,
  onSuspendCanceled,
  onUpdateAvailable,
  // @ts-expect-error: Method has overrides :/
  async sendMessage(arg0, arg1, arg2) {
    let extensionId: string | undefined;
    let message: any;
    let options: Runtime.SendMessageOptionsType | undefined;

    if (arguments.length === 1 || (arguments.length === 2 && typeof arg1 === 'object')) {
      extensionId = undefined;
      message = arg0;
      options = arg2;
    } else {
      extensionId = arg0;
      message = arg1;
      options = arg2;
    }

    if (!onMessage.hasListeners()) throw Error('No listeners available');
    const sender: Runtime.MessageSender = {};

    // Support the sendResponse callback pattern (used by Chrome 144+)
    let sendResponse!: (response: any) => void;
    const responsePromise = new Promise<any>(resolve => {
      sendResponse = resolve;
    });

    const results = await onMessage.trigger(message, sender, sendResponse as any);

    // If no listener signaled an async response (return true), use the first truthy return value
    if (!results.some(r => r === true)) {
      return results.find(r => !!r);
    }

    // Otherwise wait for sendResponse to be called by the listener
    return responsePromise;
  },
};
