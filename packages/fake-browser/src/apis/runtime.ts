import { FakeBrowser } from '../types';
import { notImplementedApi } from '../utils/notImplementedApi';
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

export const runtime: FakeBrowser['runtime'] = {
  reset() {
    onMessage.removeAllListeners();
    onInstalled.removeAllListeners();
    onStartup.removeAllListeners();
    onSuspend.removeAllListeners();
    onSuspendCanceled.removeAllListeners();
    onUpdateAvailable.removeAllListeners();
  },
  connect: notImplementedApi('runtime.connect'),
  connectNative: notImplementedApi('runtime.connectNative'),
  getBackgroundPage: notImplementedApi('runtime.getBackgroundPage'),
  getBrowserInfo: notImplementedApi('runtime.getBrowserInfo'),
  getFrameId: notImplementedApi('runtime.getFrameId'),
  getManifest: notImplementedApi('runtime.getManifest'),
  getPlatformInfo: notImplementedApi('runtime.getPlatformInfo'),
  getURL: notImplementedApi('runtime.getURL'),
  id: 'test-extension-id',
  onConnect: notImplementedApi('runtime.onConnect'),
  onConnectExternal: notImplementedApi('runtime.onConnectExternal'),
  onInstalled,
  onMessage,
  onStartup,
  onSuspend,
  onSuspendCanceled,
  onUpdateAvailable,
  async openOptionsPage() {
    // noop
  },
  reload() {
    // noop
  },
  requestUpdateCheck: notImplementedApi('runtime.requestUpdateCheck'),
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
    const res = await onMessage.trigger(message, sender);
    return res[0];
  },
  sendNativeMessage: notImplementedApi('runtime.sendNativeMessage'),
  async setUninstallURL() {
    // noop
  },
  lastError: notImplementedApi('runtime.lastError'),
};
