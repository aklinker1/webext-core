import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fakeBrowser } from '..';

describe('Fake Storage API', () => {
  beforeEach(() => {
    fakeBrowser.reset();
  });

  it('should allow getting and setting storage', async () => {
    const key1 = '1';
    const value1 = '1';
    const key2 = '2';
    const value2 = 2;

    await fakeBrowser.storage.local.set({ [key1]: value1 });
    await fakeBrowser.storage.local.set({ [key2]: value2 });

    expect(await fakeBrowser.storage.local.get()).toEqual({
      [key1]: value1,
      [key2]: value2,
    });
    expect(await fakeBrowser.storage.local.get(key1)).toEqual({
      [key1]: value1,
    });

    await fakeBrowser.storage.local.remove(key1);
    expect(await fakeBrowser.storage.local.get(key1)).toEqual({
      [key1]: null,
    });
    expect(await fakeBrowser.storage.local.get({ [key1]: 'fallback' })).toEqual({
      [key1]: 'fallback',
    });
    expect(await fakeBrowser.storage.local.get([key1, key2])).toEqual({
      [key1]: null,
      [key2]: value2,
    });

    await fakeBrowser.storage.local.clear();
    expect(await fakeBrowser.storage.local.get()).toEqual({});
  });

  it('setting a value to undefined should do nothing', async () => {
    const key = 'key';
    const value = 'test';

    await fakeBrowser.storage.local.set({ [key]: value });
    await fakeBrowser.storage.local.set({ [key]: undefined });

    expect(await fakeBrowser.storage.local.get(key)).toEqual({
      [key]: value,
    });
  });

  it('sync.getBytesInUse should throw an error', () => {
    expect(fakeBrowser.storage.sync.getBytesInUse).toThrowError();
  });

  it('setting a value should trigger change listeners', async () => {
    const localListener = vi.fn();
    const syncListener = vi.fn();
    const globalListener = vi.fn();

    fakeBrowser.storage.local.onChanged.addListener(localListener);
    fakeBrowser.storage.sync.onChanged.addListener(syncListener);
    fakeBrowser.storage.onChanged.addListener(globalListener);

    await fakeBrowser.storage.local.set({ key: 'value' });

    const changes = { key: { oldValue: null, newValue: 'value' } };
    expect(localListener).toBeCalledTimes(1);
    expect(syncListener).not.toBeCalled();
    expect(globalListener).toBeCalledTimes(1);

    expect(localListener).toBeCalledWith(changes);
    expect(globalListener).toBeCalledWith(changes, 'local');
  });
});
