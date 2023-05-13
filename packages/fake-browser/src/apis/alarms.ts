import { Alarms } from 'webextension-polyfill';
import { BrowserOverrides } from '../types';
import { defineEventWithTrigger } from '../utils/defineEventWithTrigger';

const alarmList: Alarms.Alarm[] = [];
const onAlarm = defineEventWithTrigger<(name: Alarms.Alarm) => void>();

export const alarms: BrowserOverrides['alarms'] = {
  resetState() {
    alarmList.length = 0;
    onAlarm.removeAllListeners();
  },
  async clear(name) {
    name ??= '';
    const index = alarmList.findIndex(alarm => alarm.name === name);
    if (index >= 0) {
      alarmList.splice(index, 1);
      return true;
    }
    return false;
  },
  async clearAll() {
    const hasAlarms = alarmList.length > 0;
    alarmList.length = 0;
    return hasAlarms;
  },
  // @ts-expect-error: multiple implementations
  create(
    arg0: string | undefined | Alarms.CreateAlarmInfoType,
    arg1: Alarms.CreateAlarmInfoType | undefined,
  ) {
    let name: string;
    let alarmInfo: Alarms.CreateAlarmInfoType;
    if (typeof arg0 === 'object') {
      name = '';
      alarmInfo = arg0;
    } else {
      name = arg0 ?? '';
      alarmInfo = arg1 as Alarms.CreateAlarmInfoType;
    }
    const i = alarmList.findIndex(alarm => alarm.name === name);
    if (i >= 0) alarmList.splice(i, 1);

    alarmList.push({
      name,
      scheduledTime: alarmInfo.when ?? Date.now() + (alarmInfo.delayInMinutes ?? 0) * 60e3,
      periodInMinutes: alarmInfo.periodInMinutes,
    });
  },
  async get(name) {
    name ??= '';
    return alarmList.find(alarm => alarm.name === name)!;
  },
  async getAll() {
    return alarmList;
  },
  onAlarm,
};
