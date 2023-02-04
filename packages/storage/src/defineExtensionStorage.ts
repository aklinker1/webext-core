import { AnySchema, ExtensionStorage, OnChangeCallback } from './types';
import browser, { Storage } from 'webextension-polyfill';

interface RegisteredChangeListener<TSchema extends AnySchema> {
  key: keyof TSchema;
  cb: OnChangeCallback<AnySchema, any>;
}

/**
 * Create a storage instance with an optional type schema.
 *
 * @arg storage Either `Browser.storage.local`, `Browser.storage.sync`, or
 *              `Browser.storage.managed`. This is the storage that will back the implementation.
 */
export function defineExtensionStorage<TSchema extends AnySchema = AnySchema>(
  storage: Storage.StorageArea,
): ExtensionStorage<TSchema> {
  const area = getStorageName(storage);

  /**
   * The singleton callback added and removed from the `browser.storage.onChanged` event. It calls
   * all the listeners added to this storage instance.
   */
  const onStorageChanged = async (
    changes: Record<string, Storage.StorageChange>,
    changedArea: string,
  ) => {
    if (area !== changedArea) return;

    const work = listeners.map(({ key, cb }) => {
      if (!(key in changes)) return;

      const { newValue, oldValue } = changes[key as string];
      if (newValue === oldValue) return;

      return cb(newValue, oldValue);
    });

    await Promise.all(work);
  };

  let listeners: RegisteredChangeListener<TSchema>[] = [];

  /**
   * Add the listener to the list of listeners, but also create the singleton listener if this is
   * the first listener.
   */
  function addListener(listener: RegisteredChangeListener<TSchema>) {
    if (listeners.length === 0) {
      browser.storage.onChanged.addListener(onStorageChanged);
    }

    listeners.push(listener);
  }

  /**
   * Remove the listener from the list, but also unset the singleton listener if no listeners are
   * active.
   */
  function removeListener(listener: RegisteredChangeListener<TSchema>) {
    const i = listeners.indexOf(listener);
    if (i >= 0) listeners.splice(i, 1);

    if (listeners.length === 0) {
      browser.storage.onChanged.removeListener(onStorageChanged);
    }
  }

  return {
    clear: storage.clear,
    getItem(key) {
      return storage.get(key as string).then(res => res[key as string] ?? null);
    },
    setItem(key, value) {
      return storage.set({ [key]: value ?? null });
    },
    removeItem(key) {
      return storage.remove(key as string);
    },
    onChange(key, cb) {
      const listener: RegisteredChangeListener<TSchema> = {
        key,
        // @ts-expect-error: We don't need this type to fit internally.
        cb,
      };
      addListener(listener);

      return () => removeListener(listener);
    },
  };
}

function getStorageName(storage: Storage.StorageArea): 'local' | 'sync' | 'managed' {
  switch (storage) {
    case browser.storage.local:
      return 'local';
    case browser.storage.sync:
      return 'sync';
    case browser.storage.managed:
      return 'managed';
  }
  throw Error(
    'Unsupported storage area. local, sync, and managed are the only supporte storage areas.',
  );
}
