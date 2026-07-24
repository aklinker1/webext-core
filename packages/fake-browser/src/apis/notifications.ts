import type { Browser } from '@wxt-dev/browser';

import { BrowserOverrides } from '../types';
import { Callback, callbackOrUndefined, promiseOrCallback } from '../utils/callback-utils';
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
    let callback: Callback<string> | undefined;
    if (arg3 != null) {
      id = arg1 as string;
      options = arg2 as Browser.notifications.NotificationCreateOptions;
      callback = arg3 as Callback<string>;
    } else if (arg2 != null) {
      if (typeof arg1 === 'string') {
        id = arg1 as string;
        options = arg2 as Browser.notifications.NotificationCreateOptions;
      } else {
        options = arg1 as Browser.notifications.NotificationCreateOptions;
        callback = arg2 as Callback<string>;
      }
    } else {
      options = arg1 as Browser.notifications.NotificationCreateOptions;
    }

    return promiseOrCallback(callback, async () => {
      id ??= String(Math.random());

      if (notificationExists(id)) await notifications.clear(id);

      notificationMap[id] = options;
      return id;
    });
  },
  clear(notificationId, arg2?) {
    const callback = callbackOrUndefined(arg2);

    return promiseOrCallback(callback, () => {
      const wasCleared = notificationExists(notificationId);
      delete notificationMap[notificationId];
      return wasCleared;
    });
  },
  getAllCreateOptions() {
    return { ...notificationMap };
  },
  getAll(arg1?) {
    const callback = callbackOrUndefined(arg1);

    return promiseOrCallback(callback, () =>
      Object.fromEntries<true>(Object.keys(notificationMap).map((k) => [k, true])),
    );
  },
  // @ts-expect-error: Does not implement "rule" functions
  onClosed,
  // @ts-expect-error: Does not implement "rule" functions
  onClicked,
  // @ts-expect-error: Does not implement "rule" functions
  onButtonClicked,
  onShown,
};
