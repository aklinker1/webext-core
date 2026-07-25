import { Browser } from '@wxt-dev/browser';

import { BrowserOverrides } from '../types';
import { AnyCallback, promiseOrCallback } from '../utils/callback-utils';
import { defineEventWithTrigger } from '../utils/defineEventWithTrigger';

const onMessage =
  defineEventWithTrigger<
    (
      message: any,
      sender: Browser.runtime.MessageSender,
      sendResponse: (value: any) => void,
    ) => void | true
  >();
const onInstalled = defineEventWithTrigger<(details: Browser.runtime.InstalledDetails) => void>();
const onStartup = defineEventWithTrigger<() => void>();
const onSuspend = defineEventWithTrigger<() => void>();
const onSuspendCanceled = defineEventWithTrigger<() => void>();
const onUpdateAvailable =
  defineEventWithTrigger<(details: Browser.runtime.UpdateAvailableDetails) => void>();

const TEST_ID = 'test-extension-id';

export const runtime: BrowserOverrides['runtime'] = {
  resetState() {
    onMessage.removeAllListeners();
    onInstalled.removeAllListeners();
    onStartup.removeAllListeners();
    onSuspend.removeAllListeners();
    onSuspendCanceled.removeAllListeners();
    onUpdateAvailable.removeAllListeners();
    // @ts-expect-error: Typed as readonly - but not readonly in the fake browser.
    runtime.id = TEST_ID;
  },
  id: TEST_ID,
  getURL(path: string) {
    return `chrome-extension://${runtime.id}/${path.replace(/^\//, '')}`;
  },
  sendMessage(arg1, arg2?, arg3?, arg4?) {
    // oxlint-disable-next-line no-unused-vars - TODO: We should be using this somewhere...
    let extensionId: string | null | undefined;
    let message: any;
    // oxlint-disable-next-line no-unused-vars - TODO: We should be using this somewhere...
    let options: Browser.runtime.MessageOptions | undefined;
    let callback: AnyCallback | undefined;

    if (arg4 != null) {
      extensionId = arg1 as string | null;
      message = arg2;
      options = arg3 as Browser.runtime.MessageOptions;
      callback = arg4 as AnyCallback;
    } else if (arg3 != null) {
      if ((typeof arg1 === 'string' || arg1 == null) && typeof arg3 === 'function') {
        extensionId = arg1 as string | null;
        message = arg2;
        callback = arg3 as AnyCallback;
      } else if (typeof arg1 === 'string') {
        extensionId = arg1;
        message = arg2;
        options = arg3 as Browser.runtime.MessageOptions;
      } else {
        message = arg1;
        options = arg2 as Browser.runtime.MessageOptions;
        callback = arg3 as AnyCallback;
      }
    } else if (arg2 != null) {
      if (typeof arg2 === 'function') {
        message = arg1;
        callback = arg2 as AnyCallback;
      } else if (typeof arg2 === 'object' && 'includeTlsChannelId' in (arg2 as any)) {
        message = arg1;
        options = arg2 as Browser.runtime.MessageOptions;
      } else {
        extensionId = arg1 as string | null;
        message = arg2;
      }
    } else {
      message = arg1;
    }

    return promiseOrCallback(callback, async () => {
      if (!onMessage.hasListeners()) throw Error('No listeners available');
      const sender: Browser.runtime.MessageSender = {};
      let sendResponse: (value: any) => void;
      const responsePromise = new Promise<any>((resolve) => {
        sendResponse = resolve;
      });

      const willRespond = await onMessage.trigger(message, sender, sendResponse!);
      if (willRespond.some((res) => res === true)) {
        // Return the value of the first callback to call `sendResponse`
        return await responsePromise;
      }
    });
  },
  // @ts-expect-error: Does not implement "rule" functions
  onInstalled,
  // @ts-expect-error: Does not implement "rule" functions
  onMessage,
  // @ts-expect-error: Does not implement "rule" functions
  onStartup,
  // @ts-expect-error: Does not implement "rule" functions
  onSuspend,
  // @ts-expect-error: Does not implement "rule" functions
  onSuspendCanceled,
  // @ts-expect-error: Does not implement "rule" functions
  onUpdateAvailable,
};
