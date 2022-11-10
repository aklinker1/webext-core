import type { Alarms, Browser, Runtime, Storage, Windows, Tabs } from 'webextension-polyfill';

interface EventForTesting<TParams extends any[], TReturn = void> {
  /**
   * Trigger all listeners for an event and return all their responses.
   */
  trigger(...args: TParams): Promise<TReturn[]>;
  /**
   * Remove all listeners for the event.
   */
  removeAllListeners(): void;
}

interface BrowserOverrides {
  /**
   * Reset the fake browser. Remove all listeners and clear all in-memort state, like storage,
   * windows, and tabs.
   *
   * This is often called before each test.
   */
  reset(): void;
  alarms: {
    reset(): void;
    onAlarm: EventForTesting<[name: Alarms.Alarm]>;
  };
  runtime: {
    reset(): void;
    onSuspend: EventForTesting<[]>;
    onSuspendCanceled: EventForTesting<[]>;
    onStartup: EventForTesting<[]>;
    onInstalled: EventForTesting<[details: Runtime.OnInstalledDetailsType]>;
    onUpdateAvailable: EventForTesting<[details: Runtime.OnUpdateAvailableDetailsType]>;
  };
  storage: {
    /**
     * Remove all listeners and clear in-memory storages.
     */
    reset(): void;
    local: {
      onChanged: EventForTesting<[changes: Storage.StorageAreaOnChangedChangesType]>;
    };
    sync: {
      onChanged: EventForTesting<[changes: Storage.StorageAreaOnChangedChangesType]>;
    };
    managed: {
      onChanged: EventForTesting<[changes: Storage.StorageAreaOnChangedChangesType]>;
    };
    onChanged: EventForTesting<[changes: Record<string, Storage.StorageChange>, areaName: string]>;
  };
  tabs: {
    reset(): void;
    onActivated: EventForTesting<[activeInfo: Tabs.OnActivatedActiveInfoType]>;
  };
  windows: {
    reset(): void;
    onCreated: EventForTesting<[window: Windows.Window]>;
    onRemoved: EventForTesting<[windowId: number]>;
    onFocusChanged: EventForTesting<[windowId: number]>;
  };
}

export type FakeBrowser = BrowserOverrides & Browser;
