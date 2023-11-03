import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fakeBrowser } from '..';

describe('Fake Storage API', () => {
  beforeEach(fakeBrowser.reset);

  it.each(['local', 'session', 'sync'] as const)(
    'should allow getting and setting %s storage',
    async area => {
      const key1 = '1';
      const value1 = '1';
      const key2 = '2';
      const value2 = 2;

      await fakeBrowser.storage[area].set({ [key1]: value1 });
      await fakeBrowser.storage[area].set({ [key2]: value2 });

      expect(await fakeBrowser.storage[area].get()).toEqual({
        [key1]: value1,
        [key2]: value2,
      });
      expect(await fakeBrowser.storage[area].get(key1)).toEqual({
        [key1]: value1,
      });

      await fakeBrowser.storage[area].remove(key1);
      expect(await fakeBrowser.storage[area].get(key1)).toEqual({
        [key1]: null,
      });
      expect(await fakeBrowser.storage[area].get({ [key1]: 'fallback' })).toEqual({
        [key1]: 'fallback',
      });
      expect(await fakeBrowser.storage[area].get([key1, key2])).toEqual({
        [key1]: null,
        [key2]: value2,
      });

      await fakeBrowser.storage[area].clear();
      expect(await fakeBrowser.storage[area].get()).toEqual({});
    },
  );

  it.each(['local', 'session', 'sync'] as const)(
    'setting a value to undefined should do nothing',
    async area => {
      const key = 'key';
      const value = 'test';

      await fakeBrowser.storage[area].set({ [key]: value });
      await fakeBrowser.storage[area].set({ [key]: undefined });
      expect(await fakeBrowser.storage[area].get(key)).toEqual({
        [key]: value,
      });
    },
  );

  it('sync.getBytesInUse should throw an error', () => {
    expect(fakeBrowser.storage.sync.getBytesInUse).toThrowError();
  });

  describe('setting a value should trigger change listeners', () => {
    const localListener = vi.fn();
    const syncListener = vi.fn();
    const sessionListener = vi.fn();
    const globalListener = vi.fn();

    beforeEach(() => {
      fakeBrowser.storage.local.onChanged.addListener(localListener);
      fakeBrowser.storage.sync.onChanged.addListener(syncListener);
      fakeBrowser.storage.session.onChanged.addListener(sessionListener);
      fakeBrowser.storage.onChanged.addListener(globalListener);
    });
    afterEach(() => {
      localListener.mockClear();
      syncListener.mockClear();
      sessionListener.mockClear();
      globalListener.mockClear();
    });

    it('setting a value to local storage should trigger change listeners', async () => {
      await fakeBrowser.storage.local.set({ key: 'value' });
      expect(localListener).toBeCalledTimes(1);
      expect(syncListener).not.toBeCalled();
      expect(sessionListener).not.toBeCalled();
      expect(globalListener).toBeCalledTimes(1);

      const changes = { key: { oldValue: null, newValue: 'value' } };
      expect(localListener).toBeCalledWith(changes);
      expect(globalListener).toBeCalledWith(changes, 'local');
    });

    it('setting a value to session storage should trigger change listeners', async () => {
      await fakeBrowser.storage.session.set({ key: 'value' });
      expect(localListener).not.toBeCalled();
      expect(syncListener).not.toBeCalled();
      expect(sessionListener).toBeCalledTimes(1);
      expect(globalListener).toBeCalledTimes(1);

      const changes = { key: { oldValue: null, newValue: 'value' } };
      expect(sessionListener).toBeCalledWith(changes);
      expect(globalListener).toBeCalledWith(changes, 'session');
    });

    it('setting a value to sync storage should trigger change listeners', async () => {
      await fakeBrowser.storage.sync.set({ key: 'value' });
      expect(localListener).not.toBeCalled();
      expect(syncListener).toBeCalledTimes(1);
      expect(sessionListener).not.toBeCalled();
      expect(globalListener).toBeCalledTimes(1);

      const changes = { key: { oldValue: null, newValue: 'value' } };
      expect(syncListener).toBeCalledWith(changes);
      expect(globalListener).toBeCalledWith(changes, 'sync');
    });
  });
});
