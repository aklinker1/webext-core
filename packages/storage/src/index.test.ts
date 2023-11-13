import { fakeBrowser } from '@webext-core/fake-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Browser from 'webextension-polyfill';
import { defineExtensionStorage } from './defineExtensionStorage';
import { AnySchema, ExtensionStorage } from './types';

vi.mock('webextension-polyfill');

interface TestStorageSchema {
  key1: string;
  key2: boolean;
}

let storage: ExtensionStorage<AnySchema>;
let typedStorage: ExtensionStorage<TestStorageSchema>;

describe('Storage Wrappers', () => {
  beforeEach(() => {
    fakeBrowser.reset();
    storage = defineExtensionStorage(Browser.storage.local);
    typedStorage = defineExtensionStorage<TestStorageSchema>(Browser.storage.local);
  });

  describe('getItem', () => {
    it('should return the value if present', async () => {
      const key = 'test';
      const expected = 'value';
      await Browser.storage.local.set({ [key]: expected });

      expect(await storage.getItem(key)).toBe(expected);
    });

    it('should return null when not present', async () => {
      expect(await storage.getItem('test')).toBeNull();
    });

    it('should type the key correctly', async () => {
      typedStorage.getItem('key1');
      typedStorage.getItem('key2');

      // @ts-expect-error
      typedStorage.getItem('not-key1');
      // @ts-expect-error
      typedStorage.getItem('not-key2');
    });

    it('should type the return correctly', async () => {
      const _1: string | null = await typedStorage.getItem('key1');
      const _2: boolean | null = await typedStorage.getItem('key2');

      // @ts-expect-error
      const _3: string = await typedStorage.getItem('key1');
      // @ts-expect-error
      const _4: number | null = await typedStorage.getItem('key2');
    });
  });

  describe('setItem', () => {
    it('should set the item to the correct value', async () => {
      const oldValue = '1';
      const newValue = '2';
      const key = 'key';
      await fakeBrowser.storage.local.set({ [key]: oldValue });

      await storage.setItem(key, newValue);

      const actual = await fakeBrowser.storage.local.get();
      expect(actual).toEqual({ [key]: newValue });
    });

    it('should remove the value from storage when setting the value to undefined', async () => {
      const key = 'key';
      await fakeBrowser.storage.local.set({ [key]: '1' });

      await storage.setItem(key, undefined);

      const actual = await fakeBrowser.storage.local.get();
      expect(actual).toEqual({});
    });

    it('should type the key correctly', async () => {
      typedStorage.setItem('key1', 'value');
      typedStorage.setItem('key2', true);

      // @ts-expect-error
      typedStorage.setItem('not-key1', 'value');
      // @ts-expect-error
      typedStorage.setItem('not-key2', true);
    });

    it('should type the value correctly', async () => {
      typedStorage.setItem('key1', 'value');
      typedStorage.setItem('key2', true);

      // @ts-expect-error
      typedStorage.setItem('key1', true);
      // @ts-expect-error
      typedStorage.setItem('key2', 'true');
    });
  });

  describe('removeItem', () => {
    it('should remove the requested value from storage', async () => {
      const key = 'key';
      await fakeBrowser.storage.local.set({ [key]: 'some-value' });

      await storage.removeItem(key);

      expect(await fakeBrowser.storage.local.get()).toEqual({});
    });

    it('should do nothing if the key is not in storage', async () => {
      await fakeBrowser.storage.local.set({ 'another-key': 'some-value' });

      await storage.removeItem('key');

      expect(await fakeBrowser.storage.local.get()).toEqual({ 'another-key': 'some-value' });
    });

    it('should type the key correctly', async () => {
      typedStorage.removeItem('key1');
      typedStorage.removeItem('key2');

      // @ts-expect-error
      typedStorage.removeItem('not-key1');
      // @ts-expect-error
      typedStorage.removeItem('not-key1');
    });
  });

  describe('clear', () => {
    it('should remove all stored values from storage', async () => {
      await fakeBrowser.storage.local.set({ 'another-key': 'some-value' });

      await storage.clear();

      expect(await fakeBrowser.storage.local.get()).toEqual({});
    });
  });

  describe('onChange', () => {
    it('should only add a single onChange listener using the browser.storage.onChanged API', async () => {
      const fn = vi.fn();
      const addListenerSpy = vi.spyOn(fakeBrowser.storage.local.onChanged, 'addListener');

      storage.onChange('key1', fn);
      expect(addListenerSpy).toBeCalledTimes(1);

      storage.onChange('key2', fn);
      expect(addListenerSpy).toBeCalledTimes(1);
    });

    it('should remove the browser.storage.onChanged listener when all listeners are removed', async () => {
      const fn = vi.fn();
      const removeListenerSpy = vi.spyOn(fakeBrowser.storage.onChanged, 'removeListener');

      const rm1 = storage.onChange('key1', fn);
      const rm2 = storage.onChange('key2', fn);

      rm2();
      expect(removeListenerSpy).toBeCalledTimes(0);

      rm1();
      expect(removeListenerSpy).toBeCalledTimes(1);
    });

    it('should execute the added listener with the correct values', async () => {
      const oldValue = 'oldValue';
      const newValue = 'newValue';
      const key = 'key';

      const listener = vi.fn();
      await fakeBrowser.storage.local.set({ [key]: oldValue });

      storage.onChange(key, listener);
      await fakeBrowser.storage.local.set({ [key]: newValue });

      expect(listener).toBeCalledTimes(1);
      expect(listener).toBeCalledWith(newValue, oldValue);
    });

    it('should allow adding multiple listeners for the same key', async () => {
      const oldValue = 'oldValue2';
      const newValue = 'newValue2';
      const key = 'key2';

      const listener1 = vi.fn();
      const listener2 = vi.fn();
      await fakeBrowser.storage.local.set({ [key]: oldValue });

      storage.onChange(key, listener1);
      storage.onChange(key, listener2);
      await fakeBrowser.storage.local.set({ [key]: newValue });

      expect(listener1).toBeCalledTimes(1);
      expect(listener1).toBeCalledWith(newValue, oldValue);
      expect(listener2).toBeCalledTimes(1);
      expect(listener2).toBeCalledWith(newValue, oldValue);
    });

    it('should not trigger the listener when the value is the same', async () => {
      const value = 'value3';
      const key = 'key3';

      const listener = vi.fn();
      await fakeBrowser.storage.local.set({ [key]: value });

      storage.onChange(key, listener);
      await fakeBrowser.storage.local.set({ [key]: value });

      expect(listener).not.toBeCalled();
    });
  });
});
