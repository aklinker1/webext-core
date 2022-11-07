import type { Alarms, Browser, Runtime, Storage } from 'webextension-polyfill';

interface BrowserOverrides {
  /**
   * Reset the fake browser. Remove all listeners and clear all state, like storage.
   */
  reset(): void;
  alarms: {
    /**
     * Remove all listeners and clear all alarms.
     */
    reset(): void;
    onAlarm: {
      /**
       * Trigger an alarm.
       */
      trigger(name: Alarms.Alarm): Promise<void[]>;
      removeAllListeners(): void;
    };
  };
  runtime: {
    reset(): void;
    onSuspend: {
      /**
       * Trigger the browser suspend event.
       */
      trigger(): Promise<void[]>;
      removeAllListeners(): void;
    };
    onSuspendCanceled: {
      /**
       * Trigger the browser suspend canceled event.
       */
      trigger(): Promise<void[]>;
      removeAllListeners(): void;
    };
    onStartup: {
      /**
       * Trigger the browser startup event.
       */
      trigger(): Promise<void[]>;
      removeAllListeners(): void;
    };
    onInstalled: {
      /**
       * Trigger the browser installed event.
       */
      trigger(details: Runtime.OnInstalledDetailsType): Promise<void[]>;
      removeAllListeners(): void;
    };
    onUpdateAvailable: {
      /**
       * Trigger the browser update available event.
       */
      trigger(details: Runtime.OnUpdateAvailableDetailsType): Promise<void[]>;
      removeAllListeners(): void;
    };
  };
  storage: {
    /**
     * Remove all listeners and clear in-memory storages.
     */
    reset(): void;
    local: {
      onChanged: {
        /**
         * Trigger a storage change event for the `Browser.storage.local`.
         */
        trigger(changes: Storage.StorageAreaOnChangedChangesType): Promise<void[]>;
        removeAllListeners(): void;
      };
    };
    sync: {
      onChanged: {
        /**
         * Trigger a storage change event for the `Browser.storage.sync`.
         */
        trigger(changes: Storage.StorageAreaOnChangedChangesType): Promise<void[]>;
        removeAllListeners(): void;
      };
    };
    managed: {
      onChanged: {
        /**
         * Trigger a storage change event for the `Browser.storage.managed`.
         */
        trigger(changes: Storage.StorageAreaOnChangedChangesType): Promise<void[]>;
        removeAllListeners(): void;
      };
    };
    onChanged: {
      /**
       * Trigger a storage change event for a specific storage area.
       */
      trigger(changes: Record<string, Storage.StorageChange>, areaName: string): Promise<void[]>;
      removeAllListeners(): void;
    };
  };
}

export type FakeBrowser = BrowserOverrides & Browser;
