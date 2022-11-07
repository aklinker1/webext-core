import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Alarms } from 'webextension-polyfill';
import { fakeBrowser } from '..';

const now = Date.now();
vi.setSystemTime(now);

describe('Fake Alarms API', () => {
  beforeEach(fakeBrowser.reset);

  it('should allow creating an unnamed alarm', async () => {
    fakeBrowser.alarms.create(undefined, {
      delayInMinutes: 1,
      periodInMinutes: 5,
    });
    const alarm = await fakeBrowser.alarms.get();

    expect(alarm).toEqual({
      name: '',
      periodInMinutes: 5,
      scheduledTime: now + 1000,
    });
  });

  it('should allow creating an unnamed alarm using a single parameter', async () => {
    fakeBrowser.alarms.create({});
    const alarm = await fakeBrowser.alarms.get();

    expect(alarm).toEqual({
      name: '',
      scheduledTime: now,
    });
  });

  it('should not allow creating an alarm with the same name', async () => {
    const name = '1';
    fakeBrowser.alarms.create(name, {});

    expect(() => fakeBrowser.alarms.create(name, {})).toThrow(
      `Alarm named "${name}" already exists`,
    );
  });

  it('should allow creating a named alarm', async () => {
    const name = 'test';
    fakeBrowser.alarms.create(name, {
      delayInMinutes: 2,
      periodInMinutes: 10,
    });
    const alarm = await fakeBrowser.alarms.get(name);

    expect(alarm).toEqual({
      name,
      periodInMinutes: 10,
      scheduledTime: now + 2000,
    });
  });

  it('should return all created alarms', async () => {
    fakeBrowser.alarms.create('1', {});
    fakeBrowser.alarms.create('2', {});

    const actual = await fakeBrowser.alarms.getAll();

    expect(actual).toHaveLength(2);
  });

  it('should remove the specified alarm', async () => {
    fakeBrowser.alarms.create(undefined, {});
    fakeBrowser.alarms.create('1', {});
    fakeBrowser.alarms.create('2', {});
    const expected = [{ name: '2', scheduledTime: now }];

    await fakeBrowser.alarms.clear();
    await fakeBrowser.alarms.clear('1');
    await fakeBrowser.alarms.clear('1');

    const actual = await fakeBrowser.alarms.getAll();

    expect(actual).toEqual(expected);
  });

  it('should remove all alarms', async () => {
    fakeBrowser.alarms.create(undefined, {});
    fakeBrowser.alarms.create('1', {});
    fakeBrowser.alarms.create('2', {});

    await fakeBrowser.alarms.clearAll();

    const actual = await fakeBrowser.alarms.getAll();

    expect(actual).toHaveLength(0);
  });

  it('should call active onAlarm listeners when the event is triggered', async () => {
    const listener1 = vi.fn();
    const listener2 = vi.fn();
    const listener3 = vi.fn();
    const alarm: Alarms.Alarm = {
      name: 'test',
      scheduledTime: now + 1000,
    };

    fakeBrowser.alarms.onAlarm.addListener(listener1);
    fakeBrowser.alarms.onAlarm.addListener(listener2);
    fakeBrowser.alarms.onAlarm.addListener(listener3);

    fakeBrowser.alarms.onAlarm.removeListener(listener2);
    await fakeBrowser.alarms.onAlarm.trigger(alarm);

    expect(listener1).toBeCalledTimes(1);
    expect(listener2).not.toBeCalled();
    expect(listener3).toBeCalledTimes(1);

    expect(listener1).toBeCalledWith(alarm);
    expect(listener3).toBeCalledWith(alarm);
  });
});
