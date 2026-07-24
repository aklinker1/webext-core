import { Browser } from '@wxt-dev/browser';

import { BrowserOverrides } from '../types';
import { AnyCallback, callbackOrUndefined, promiseOrCallback } from '../utils/callback-utils';
import { defineEventWithTrigger } from '../utils/defineEventWithTrigger';

type StorageChanges = Record<string, Browser.storage.StorageChange>;

const globalOnChanged =
  defineEventWithTrigger<(changes: StorageChanges, areaName: string) => void>();

type StorageAreaWithTrigger = Browser.storage.StorageArea & {
  resetState(): void;
  onChanged: {
    trigger(changes: StorageChanges): Promise<void[]>;
    removeAllListeners(): void;
  };
};

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
function defineStorageArea(area: StorageArea): StorageAreaWithTrigger {
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
    // @ts-expect-error: Does not implement "rule" functions
    onChanged,
  };
}

const localStorage = {
  ...defineStorageArea('local'),
  QUOTA_BYTES: 5242880 as const,
};
const managedStorage = {
  ...defineStorageArea('managed'),
  QUOTA_BYTES: 5242880 as const,
};
const sessionStorage = {
  ...defineStorageArea('session'),
  QUOTA_BYTES: 10485760 as const,
};
const syncStorage = {
  ...defineStorageArea('sync'),
  MAX_ITEMS: 512 as const,
  MAX_WRITE_OPERATIONS_PER_HOUR: 1800 as const,
  MAX_WRITE_OPERATIONS_PER_MINUTE: 120 as const,
  QUOTA_BYTES: 102400 as const,
  QUOTA_BYTES_PER_ITEM: 8192 as const,
  getBytesInUse: () => {
    throw Error('Browser.storage.sync.getBytesInUse not implemented.');
  },
};

export const storage: BrowserOverrides['storage'] = {
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
