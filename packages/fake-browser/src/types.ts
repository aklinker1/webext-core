import { Browser } from '@wxt-dev/browser';

interface EventForTesting<TParams extends any[], TReturn = void> {
  /** Trigger all listeners for an event and return all their responses. */
  trigger(...args: TParams): Promise<TReturn[]>;
  /** Remove all listeners for the event. */
  removeAllListeners(): void;
}

export type StorageChanges = {
  [key: string]: Browser.storage.StorageChange;
};

export interface BrowserOverrides {
  /**
   * Reset the fake browser. Remove all listeners and clear all in-memory state, like storage,
   * windows, and tabs.
   *
   * This is often called before each test.
   */
  reset(): void;

  alarms: typeof Browser.alarms & {
    resetState(): void;
    onAlarm: EventForTesting<[alarm: Browser.alarms.Alarm]>;
  };
  notifications: typeof Browser.notifications & {
    resetState(): void;
    /**
     * Alternative to `getAll` that returns the objects used to create the notifications, not just
     * true.
     */
    getAllCreateOptions(): { [id: string]: Browser.notifications.NotificationCreateOptions };
    onClosed: EventForTesting<[notificationId: string, byUser: boolean]>;
    onClicked: EventForTesting<[notificationId: string]>;
    onButtonClicked: EventForTesting<[notificationId: string, buttonIndex: number]>;
    onShown: EventForTesting<[notificationId: string]>;
  };
  runtime: Pick<typeof Browser.runtime, 'id' | 'getURL'> & {
    resetState(): void;
    onSuspend: EventForTesting<[]>;
    onSuspendCanceled: EventForTesting<[]>;
    onStartup: EventForTesting<[]>;
    onInstalled: EventForTesting<[details: Browser.runtime.InstalledDetails]>;
    onUpdateAvailable: EventForTesting<[details: Browser.runtime.UpdateAvailableDetails]>;
    onMessage: EventForTesting<
      [message: any, sender: Browser.runtime.MessageSender],
      void | Promise<any>
    >;
  };
  storage: {
    /** Remove all listeners and clear in-memory storages. */
    resetState(): void;
    local: {
      onChanged: EventForTesting<[changes: StorageChanges]>;
    };
    session: {
      onChanged: EventForTesting<[changes: StorageChanges]>;
    };
    sync: {
      onChanged: EventForTesting<[changes: StorageChanges]>;
    };
    managed: {
      onChanged: EventForTesting<[changes: StorageChanges]>;
    };
    onChanged: EventForTesting<
      [changes: Record<string, Browser.storage.StorageChange>, areaName: string]
    >;
  };
  tabs: Pick<
    typeof Browser.tabs,
    'get' | 'getCurrent' | 'create' | 'duplicate' | 'query' | 'highlight' | 'remove' | 'update'
  > & {
    resetState(): void;
    onCreated: EventForTesting<[tab: Browser.tabs.Tab]>;
    onUpdated: EventForTesting<
      [tabId: number, changeInfo: Browser.tabs.OnUpdatedInfo, tab: Browser.tabs.Tab]
    >;
    onHighlighted: EventForTesting<[highlightInfo: Browser.tabs.OnHighlightedInfo]>;
    onActivated: EventForTesting<[activeInfo: Browser.tabs.OnActivatedInfo]>;
    onRemoved: EventForTesting<[tabId: number, removeInfo: Browser.tabs.OnRemovedInfo]>;
  };
  webNavigation: {
    onBeforeNavigate: EventForTesting<
      [details: Browser.webNavigation.WebNavigationBaseCallbackDetails]
    >;
    onCommitted: EventForTesting<
      [details: Browser.webNavigation.WebNavigationTransitionCallbackDetails]
    >;
    onDOMContentLoaded: EventForTesting<
      [details: Browser.webNavigation.WebNavigationFramedCallbackDetails]
    >;
    onCompleted: EventForTesting<
      [details: Browser.webNavigation.WebNavigationFramedCallbackDetails]
    >;
    onErrorOccurred: EventForTesting<
      [details: Browser.webNavigation.WebNavigationFramedErrorCallbackDetails]
    >;
    onCreatedNavigationTarget: EventForTesting<
      [details: Browser.webNavigation.WebNavigationSourceCallbackDetails]
    >;
    onReferenceFragmentUpdated: EventForTesting<
      [details: Browser.webNavigation.WebNavigationTransitionCallbackDetails]
    >;
    onTabReplaced: EventForTesting<
      [details: Browser.webNavigation.WebNavigationReplacementCallbackDetails]
    >;
    onHistoryStateUpdated: EventForTesting<
      [details: Browser.webNavigation.WebNavigationTransitionCallbackDetails]
    >;
  };
  windows: Pick<
    typeof Browser.windows,
    'get' | 'getAll' | 'create' | 'getCurrent' | 'getLastFocused' | 'remove' | 'update'
  > & {
    resetState(): void;
    onCreated: EventForTesting<[window: Browser.windows.Window]>;
    onRemoved: EventForTesting<[windowId: number]>;
    onFocusChanged: EventForTesting<[windowId: number]>;
  };
  action: Pick<
    typeof Browser.action,
    | 'setTitle'
    | 'getTitle'
    | 'getBadgeText'
    | 'setBadgeText'
    | 'setBadgeTextColor'
    | 'getBadgeTextColor'
    | 'getBadgeBackgroundColor'
    | 'setBadgeBackgroundColor'
  > & {
    resetState(): void;
    onClicked: EventForTesting<[tab: Browser.tabs.Tab]>;
  };
}

/**
 * The standard `Browser` interface from `webextension-polyfill`, but with additional functions for
 * triggering events and resetting state.
 */
export type FakeBrowser = BrowserOverrides & typeof Browser;
