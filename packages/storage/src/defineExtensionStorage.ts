import { AnySchema, ExtensionStorage } from './types';
import { Storage } from 'webextension-polyfill';

/**
 * Create a storage instance with an optional type schema.
 *
 * @arg storage Either `Browser.storage.local`, `Browser.storage.sync`, or
 *              `Browser.storage.managed`. This is the storage that will back the implementation.
 */
export function defineExtensionStorage<TSchema extends AnySchema = AnySchema>(
  storage: Storage.StorageArea,
): ExtensionStorage<TSchema> {
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
  };
}
