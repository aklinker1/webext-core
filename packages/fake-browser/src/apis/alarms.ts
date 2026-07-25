import type { Browser } from '@wxt-dev/browser';

import { EventForTesting } from '../types';
import {
  Callback,
  callbackOrUndefined,
  EmptyCallback,
  promiseOrCallback,
} from '../utils/callback-utils';
import { defineEventWithTrigger } from '../utils/defineEventWithTrigger';

export type AlarmsOverrides = typeof Browser.alarms & {
  resetState(): void;
  onAlarm: EventForTesting<[alarm: Browser.alarms.Alarm]>;
};

const alarmList: Browser.alarms.Alarm[] = [];
const onAlarm = defineEventWithTrigger<(alarm: Browser.alarms.Alarm) => void>();

export const alarms: AlarmsOverrides = {
  resetState() {
    alarmList.length = 0;
    onAlarm.removeAllListeners();
  },
  clear(arg1?, arg2?) {
    let name = '';
    let callback: Callback<boolean> | undefined;
    if (arg2 != null) {
      name = arg1 as string;
      callback = arg2 as Callback<boolean>;
    } else if (typeof arg1 === 'string') {
      name = arg1 as string;
    } else if (arg1 != null) {
      callback = arg1 as Callback<boolean>;
    }

    return promiseOrCallback(callback, () => {
      const index = alarmList.findIndex((alarm) => alarm.name === name);
      if (index >= 0) {
        alarmList.splice(index, 1);
        return true;
      }
      return false;
    });
  },
  clearAll(arg1?) {
    const callback = callbackOrUndefined(arg1);

    return promiseOrCallback(callback, () => {
      const hasAlarms = alarmList.length > 0;
      alarmList.length = 0;
      return hasAlarms;
    });
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

    return promiseOrCallback(callback, () => {
      const i = alarmList.findIndex((alarm) => alarm.name === name);
      if (i >= 0) alarmList.splice(i, 1);

      alarmList.push({
        name,
        scheduledTime: alarmInfo.when ?? Date.now() + (alarmInfo.delayInMinutes ?? 0) * 60e3,
        periodInMinutes: alarmInfo.periodInMinutes,
        persistAcrossSessions: alarmInfo.persistAcrossSessions!,
      });
    });
  },
  get(arg1?, arg2?) {
    let name = '';
    let callback: Callback<Browser.alarms.Alarm> | undefined;
    if (arg2 != null) {
      name = arg1 as string;
      callback = arg2 as Callback<Browser.alarms.Alarm>;
    } else if (typeof arg1 === 'string') {
      name = arg1 as string;
    } else if (arg1 != null) {
      callback = arg1 as Callback<Browser.alarms.Alarm>;
    }

    return promiseOrCallback(callback, () => alarmList.find((alarm) => alarm.name === name)!);
  },
  getAll(arg1?) {
    const callback = callbackOrUndefined(arg1);
    return promiseOrCallback(callback, () => [...alarmList]);
  },
  onAlarm,
};
