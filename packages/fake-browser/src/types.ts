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

export interface BrowserOverrides {
  /**
   * Reset the fake browser. Remove all listeners and clear all in-memort state, like storage,
   * windows, and tabs.
   *
   * This is often called before each test.
   */
  reset(): void;

  alarms: Alarms.Static & {
    resetState(): void;
    onAlarm: EventForTesting<[name: Alarms.Alarm]>;
  };
  runtime: {
    resetState(): void;
    id: string;
    onSuspend: EventForTesting<[]>;
    onSuspendCanceled: EventForTesting<[]>;
    onStartup: EventForTesting<[]>;
    onInstalled: EventForTesting<[details: Runtime.OnInstalledDetailsType]>;
    onUpdateAvailable: EventForTesting<[details: Runtime.OnUpdateAvailableDetailsType]>;
    onMessage: EventForTesting<[message: any, sender: Runtime.MessageSender], void | Promise<any>>;
  };
  storage: {
    /**
     * Remove all listeners and clear in-memory storages.
     */
    resetState(): void;
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
  tabs: Pick<
    Tabs.Static,
    'get' | 'getCurrent' | 'create' | 'duplicate' | 'query' | 'highlight' | 'remove'
  > & {
    resetState(): void;
    onCreated: EventForTesting<[tab: Tabs.Tab]>;
    onUpdated: EventForTesting<
      [tabId: number, changeInfo: Tabs.OnUpdatedChangeInfoType, tab: Tabs.Tab]
    >;
    onHighlighted: EventForTesting<[highlightInfo: Tabs.OnHighlightedHighlightInfoType]>;
    onActivated: EventForTesting<[activeInfo: Tabs.OnActivatedActiveInfoType]>;
    onRemoved: EventForTesting<[tabId: number, removeInfo: Tabs.OnRemovedRemoveInfoType]>;
  };
  windows: Pick<
    Windows.Static,
    'get' | 'getAll' | 'create' | 'getCurrent' | 'getLastFocused' | 'remove' | 'update'
  > & {
    resetState(): void;
    onCreated: EventForTesting<[window: Windows.Window]>;
    onRemoved: EventForTesting<[windowId: number]>;
    onFocusChanged: EventForTesting<[windowId: number]>;
  };
}

export type FakeBrowser = BrowserOverrides & Browser;
