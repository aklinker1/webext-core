import type { Browser } from '@wxt-dev/browser';

import { BrowserOverrides } from '../types';
import { callbackOrUndefined, promiseOrCallback } from '../utils/callback-utils';
import { defineEventWithTrigger } from '../utils/defineEventWithTrigger';

let notificationMap: { [id: string]: Browser.notifications.NotificationCreateOptions } = {};
const onClosed = defineEventWithTrigger<(notificationId: string, byUser: boolean) => void>();
const onClicked = defineEventWithTrigger<(notificationId: string) => void>();
const onButtonClicked =
  defineEventWithTrigger<(notificationId: string, buttonIndex: number) => void>();
const onShown = defineEventWithTrigger<(notificationId: string) => void>();

function notificationExists(id: string): boolean {
  return !!notificationMap[id];
}

type StringCallback = (s: string) => void;

export const notifications: BrowserOverrides['notifications'] = {
  resetState() {
    notificationMap = {};
    onClosed.removeAllListeners();
    onClicked.removeAllListeners();
    onButtonClicked.removeAllListeners();
    onShown.removeAllListeners();
  },
  create(arg1, arg2?, arg3?) {
    let id: string;
    let options: Browser.notifications.NotificationCreateOptions | undefined;
    let callback: StringCallback | undefined;
    if (arg3 != null) {
      id = arg1 as string;
      options = arg2 as Browser.notifications.NotificationCreateOptions;
      callback = arg3 as StringCallback;
    } else if (arg2 != null) {
      if (typeof arg1 === 'string') {
        id = arg1 as string;
        options = arg2 as Browser.notifications.NotificationCreateOptions;
      } else {
        options = arg1 as Browser.notifications.NotificationCreateOptions;
        callback = arg2 as StringCallback;
      }
    } else {
      options = arg1 as Browser.notifications.NotificationCreateOptions;
    }
    id ??= String(Math.random());

    const run = async (): Promise<string> => {
      if (notificationExists(id)) await notifications.clear(id);
      notificationMap[id] = options;
      return id;
    };

    return promiseOrCallback(run(), callback);
  },
  async clear(notificationId, arg2?) {
    const callback = callbackOrUndefined(arg2);

    const wasCleared = notificationExists(notificationId);
    delete notificationMap[notificationId];

    return promiseOrCallback(wasCleared, callback);
  },
  getAllCreateOptions() {
    return { ...notificationMap };
  },
  getAll(arg1?) {
    const callback = callbackOrUndefined(arg1);
    const values = Object.fromEntries<true>(Object.keys(notificationMap).map((k) => [k, true]));
    return promiseOrCallback(values, callback);
  },
  // @ts-expect-error: Does not implement "rule" functions
  onClosed,
  // @ts-expect-error: Does not implement "rule" functions
  onClicked,
  // @ts-expect-error: Does not implement "rule" functions
  onButtonClicked,
  onShown,
};
