import { Notifications } from 'webextension-polyfill';
import { BrowserOverrides } from '../types';
import { defineEventWithTrigger } from '../utils/defineEventWithTrigger';

let notificationMap: { [id: string]: Notifications.CreateNotificationOptions } = {};
const onClosed = defineEventWithTrigger<(notificationId: string, byUser: boolean) => void>();
const onClicked = defineEventWithTrigger<(notificationId: string) => void>();
const onButtonClicked =
  defineEventWithTrigger<(notificationId: string, buttonIndex: number) => void>();
const onShown = defineEventWithTrigger<(notificationId: string) => void>();

function create(options: Notifications.CreateNotificationOptions): Promise<string>;
function create(
  notificationId: string | undefined,
  options: Notifications.CreateNotificationOptions,
): Promise<string>;
async function create(arg1: any, arg2?: any): Promise<string> {
  let id: string;
  let options: Notifications.CreateNotificationOptions;
  if (arg2 == null) {
    id = String(Math.random());
    options = arg1;
  } else {
    id = arg1;
    options = arg2;
  }

  if (notificationExists(id)) await notifications.clear(id);

  notificationMap[id] = options;

  return id;
}

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
  create,
  async clear(notificationId) {
    const wasCleared = notificationExists(notificationId);
    delete notificationMap[notificationId];
    return wasCleared;
  },
  async getAll() {
    return notificationMap;
  },
  onClosed,
  onClicked,
  onButtonClicked,
  onShown,
};
