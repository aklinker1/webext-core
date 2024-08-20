import type {
  Alarms,
  Browser,
  Notifications,
  Runtime,
  Storage,
  Tabs,
  WebNavigation,
  Windows,
} from 'webextension-polyfill';

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
  notifications: Notifications.Static & {
    resetState(): void;
    onClosed: EventForTesting<[notificationId: string, byUser: boolean]>;
    onClicked: EventForTesting<[notificationId: string]>;
    onButtonClicked: EventForTesting<[notificationId: string, buttonIndex: number]>;
    onShown: EventForTesting<[notificationId: string]>;
  };
  runtime: Pick<Runtime.Static, 'id' | 'getURL'> & {
    resetState(): void;
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
    session: {
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
    'get' | 'getCurrent' | 'create' | 'duplicate' | 'query' | 'highlight' | 'remove' | 'update'
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
  webNavigation: {
    onBeforeNavigate: EventForTesting<[details: WebNavigation.OnBeforeNavigateDetailsType]>;
    onCommitted: EventForTesting<[details: WebNavigation.OnCommittedDetailsType]>;
    onDOMContentLoaded: EventForTesting<[details: WebNavigation.OnDOMContentLoadedDetailsType]>;
    onCompleted: EventForTesting<[details: WebNavigation.OnCompletedDetailsType]>;
    onErrorOccurred: EventForTesting<[details: WebNavigation.OnErrorOccurredDetailsType]>;
    onCreatedNavigationTarget: EventForTesting<
      [details: WebNavigation.OnCreatedNavigationTargetDetailsType]
    >;
    onReferenceFragmentUpdated: EventForTesting<
      [details: WebNavigation.OnReferenceFragmentUpdatedDetailsType]
    >;
    onTabReplaced: EventForTesting<[details: WebNavigation.OnTabReplacedDetailsType]>;
    onHistoryStateUpdated: EventForTesting<
      [details: WebNavigation.OnHistoryStateUpdatedDetailsType]
    >;
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

/**
 * The standard `Browser` interface from `webextension-polyfill`, but with additional functions for triggering events and reseting state.
 */
export type FakeBrowser = BrowserOverrides & Browser;
