import type { Browser } from '@wxt-dev/browser';

import { BrowserOverrides } from '../types';
import { callbackOrUndefined, promiseOrCallback } from '../utils/callback-utils';
import { defineEventWithTrigger } from '../utils/defineEventWithTrigger';

const alarmList: Browser.alarms.Alarm[] = [];
const onAlarm = defineEventWithTrigger<(alarm: Browser.alarms.Alarm) => void>();

type AlarmCallback = (alarm: Browser.alarms.Alarm) => void;
type BooleanCallback = (b: boolean) => void;
type EmptyCallback = () => void;

export const alarms: BrowserOverrides['alarms'] = {
  resetState() {
    alarmList.length = 0;
    onAlarm.removeAllListeners();
  },
  async clear(arg1?, arg2?) {
    let name = '';
    let callback: BooleanCallback | undefined;
    if (arg2 != null) {
      name = arg1 as string;
      callback = arg2 as BooleanCallback;
    } else if (typeof arg1 === 'string') {
      name = arg1 as string;
    } else if (arg1 != null) {
      callback = arg1 as BooleanCallback;
    }

    const index = alarmList.findIndex((alarm) => alarm.name === name);
    if (index >= 0) {
      alarmList.splice(index, 1);
      return promiseOrCallback(true, callback);
    }
    return promiseOrCallback(false, callback);
  },
  async clearAll(arg1?) {
    const callback = callbackOrUndefined(arg1);

    const hasAlarms = alarmList.length > 0;
    alarmList.length = 0;
    return promiseOrCallback(hasAlarms, callback);
  },
  create(arg1, arg2?, arg3?) {
    let name = '';
    let alarmInfo: Browser.alarms.AlarmCreateInfo;
    let callback: EmptyCallback | undefined;

    if (arg3 != null) {
      name = arg1 as string;
      alarmInfo = arg2 as Browser.alarms.AlarmCreateInfo;
      callback = arg3 as EmptyCallback;
    } else if (arg2 != null) {
      if (arg1 == null || typeof arg1 === 'string') {
        name = (arg1 ?? '') as string;
        alarmInfo = arg2 as Browser.alarms.AlarmCreateInfo;
      } else {
        alarmInfo = arg1 as Browser.alarms.AlarmCreateInfo;
        callback = arg2 as EmptyCallback;
      }
    } else {
      alarmInfo = arg1 as Browser.alarms.AlarmCreateInfo;
    }

    const i = alarmList.findIndex((alarm) => alarm.name === name);
    if (i >= 0) alarmList.splice(i, 1);

    alarmList.push({
      name,
      scheduledTime: alarmInfo.when ?? Date.now() + (alarmInfo.delayInMinutes ?? 0) * 60e3,
      periodInMinutes: alarmInfo.periodInMinutes,
      persistAcrossSessions: alarmInfo.persistAcrossSessions!,
    });

    return promiseOrCallback(undefined, callback);
  },
  async get(arg1?, arg2?) {
    let name = '';
    let callback: AlarmCallback | undefined;
    if (arg2 != null) {
      name = arg1 as string;
      callback = arg2 as AlarmCallback;
    } else if (typeof arg1 === 'string') {
      name = arg1 as string;
    } else if (arg1 != null) {
      callback = arg1 as AlarmCallback;
    }

    const alarm = alarmList.find((alarm) => alarm.name === name)!;

    return promiseOrCallback(alarm, callback);
  },
  async getAll(arg1?) {
    const callback = callbackOrUndefined(arg1);
    return promiseOrCallback([...alarmList], callback);
  },
  // @ts-expect-error: Does not implement "rule" functions
  onAlarm,
};
