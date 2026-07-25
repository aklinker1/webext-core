import { Browser } from '@wxt-dev/browser';

import { EventForTesting, StorageChanges } from '../types';
import { AnyCallback, callbackOrUndefined, promiseOrCallback } from '../utils/callback-utils';
import { defineEventWithTrigger } from '../utils/defineEventWithTrigger';

type StorageAreaOverrides = Pick<
  Browser.storage.StorageArea,
  'clear' | 'get' | 'remove' | 'set'
> & {
  resetState(): void;
  onChanged: EventForTesting<[changes: StorageChanges]>;
};

export type StorageOverrides = {
  /** Remove all listeners and clear in-memory storages. */
  resetState(): void;
  local: StorageAreaOverrides;
  session: StorageAreaOverrides;
  sync: StorageAreaOverrides;
  managed: StorageAreaOverrides;
  onChanged: EventForTesting<
    [changes: Record<string, Browser.storage.StorageChange>, areaName: string]
  >;
};

const globalOnChanged =
  defineEventWithTrigger<(changes: StorageChanges, areaName: string) => void>();

function keysAndCallback(
  arg1?: unknown,
  arg2?: unknown,
): { keys: string[] | undefined; callback: AnyCallback | undefined } {
  let keys: string[] | undefined;
  let callback: AnyCallback | undefined;
  if (arg2 != null) {
    keys = arg1 as string[];
    callback = arg2 as AnyCallback;
  } else if (typeof arg1 === 'function') {
    callback = arg1 as AnyCallback;
  } else if (arg1 != null) {
    keys = arg1 as string[];
  }

  return { keys, callback };
}

type StorageArea = 'local' | 'managed' | 'session' | 'sync';

function defineStorageArea(area: StorageArea): StorageAreaOverrides {
  const data: Record<string, any> = {};
  const onChanged = defineEventWithTrigger<(changes: StorageChanges) => void>();

  function getKeyList(keys: string | string[]): string[] {
    return Array.isArray(keys) ? keys : [keys];
  }

  return {
    resetState() {
      onChanged.removeAllListeners();
      for (const key of Object.keys(data)) {
        delete data[key];
      }
    },
    clear(arg1?) {
      const callback = callbackOrUndefined(arg1);

      return promiseOrCallback(callback, async () => {
        const changes: StorageChanges = {};
        for (const key of Object.keys(data)) {
          const oldValue = data[key] ?? null;
          const newValue = null;
          changes[key] = { oldValue, newValue };
          delete data[key];
        }
        await onChanged.trigger(changes);
        await globalOnChanged.trigger(changes, area);
      });
    },
    get(arg1?, arg2?) {
      const { keys, callback } = keysAndCallback(arg1, arg2);

      return promiseOrCallback(callback, () => {
        if (keys == null) return { ...data };
        const res: Record<string, any> = {};
        if (typeof keys === 'object' && !Array.isArray(keys)) {
          // Return all the keys + the values as the defaults
          Object.keys(keys).forEach((key) => (res[key] = data[key] ?? keys[key]));
        } else {
          // return just the keys or null
          getKeyList(keys).forEach((key) => (res[key] = data[key]));
        }
        return res;
      });
    },
    remove(arg1?, arg2?) {
      const { keys, callback } = keysAndCallback(arg1, arg2);

      return promiseOrCallback(callback, async () => {
        const changes: StorageChanges = {};
        for (const key of getKeyList(keys!)) {
          const oldValue = data[key] ?? null;
          const newValue = null;
          changes[key] = { oldValue, newValue };
          delete data[key];
        }
        await onChanged.trigger(changes);
        await globalOnChanged.trigger(changes, area);
      });
    },
    set(items, arg2?) {
      const callback = callbackOrUndefined(arg2);

      return promiseOrCallback(callback, async () => {
        const changes: StorageChanges = {};
        for (const [key, newValue] of Object.entries(JSON.parse(JSON.stringify(items)))) {
          // ignore undefined values
          if (newValue === undefined) continue;

          const oldValue = data[key] ?? null;
          changes[key] = { oldValue, newValue };

          if (newValue == null) delete data[key];
          else data[key] = newValue;
        }
        await onChanged.trigger(changes);
        await globalOnChanged.trigger(changes, area);
      });
    },
    onChanged,
  };
}

const localStorage = defineStorageArea('local');
const managedStorage = defineStorageArea('managed');
const sessionStorage = defineStorageArea('session');
const syncStorage = {
  ...defineStorageArea('sync'),
  getBytesInUse: () => {
    throw Error('Browser.storage.sync.getBytesInUse not implemented.');
  },
};

export const storage: StorageOverrides = {
  resetState() {
    localStorage.resetState();
    managedStorage.resetState();
    sessionStorage.resetState();
    syncStorage.resetState();
    globalOnChanged.removeAllListeners();
  },
  local: localStorage,
  managed: managedStorage,
  session: sessionStorage,
  sync: syncStorage,
  onChanged: globalOnChanged,
};
