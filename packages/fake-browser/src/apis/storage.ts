import { Storage } from 'webextension-polyfill';
import { BrowserOverrides, FakeBrowser } from '../types';
import { defineEventWithTrigger } from '../utils/defineEventWithTrigger';

const globalOnChanged =
  defineEventWithTrigger<
    (changes: Record<string, Storage.StorageChange>, areaName: string) => void
  >();

type StorageAreaWithTrigger = Storage.StorageArea & {
  resetState(): void;
  onChanged: {
    trigger(changes: Storage.StorageAreaOnChangedChangesType): Promise<void[]>;
    removeAllListeners(): void;
  };
};

type StorageArea = 'local' | 'managed' | 'session' | 'sync';
function defineStorageArea(area: StorageArea): StorageAreaWithTrigger {
  const data: Record<string, any> = {};
  const onChanged =
    defineEventWithTrigger<(changes: Storage.StorageAreaOnChangedChangesType) => void>();

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
    async clear() {
      const changes: Record<string, Storage.StorageChange> = {};
      for (const key of Object.keys(data)) {
        const oldValue = data[key] ?? null;
        const newValue = null;
        changes[key] = { oldValue, newValue };
        delete data[key];
      }
      await onChanged.trigger(changes);
      await globalOnChanged.trigger(changes, area);
    },
    async get(keys?) {
      if (keys == null) return { ...data };
      const res: Record<string, any> = {};
      if (typeof keys === 'object' && !Array.isArray(keys)) {
        // Return all the keys + the values as the defaults
        Object.keys(keys).forEach(key => (res[key] = data[key] ?? keys[key]));
      } else {
        // return just the keys or null
        getKeyList(keys).forEach(key => (res[key] = data[key] ?? null));
      }
      return res;
    },
    async remove(keys) {
      const changes: Record<string, Storage.StorageChange> = {};
      for (const key of getKeyList(keys)) {
        const oldValue = data[key] ?? null;
        const newValue = null;
        changes[key] = { oldValue, newValue };
        delete data[key];
      }
      await onChanged.trigger(changes);
      await globalOnChanged.trigger(changes, area);
    },
    async set(items) {
      const changes: Record<string, Storage.StorageChange> = {};
      for (const [key, newValue] of Object.entries(items)) {
        // ignore undefined values
        if (newValue === undefined) continue;

        const oldValue = data[key] ?? null;
        changes[key] = { oldValue, newValue };
        data[key] = newValue;
      }
      await onChanged.trigger(changes);
      await globalOnChanged.trigger(changes, area);
    },
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
