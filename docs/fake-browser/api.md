# API

- <code><a href="#browseroverrides">BrowserOverrides</a></code>
- <code><a href="#fakebrowser">fakeBrowser</a></code>
- <code><a href="#fakebrowser">FakeBrowser</a></code>

## <code>BrowserOverrides</code>

```ts
// Definition
interface BrowserOverrides {
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
```

| Field     | Type                         | Optional | Description |
| --------- | ---------------------------- | :------: | ----------- |
| `alarms`  | <code>object & object</code> |          |
| `runtime` | <code>object</code>          |          |
| `storage` | <code>object</code>          |          |
| `tabs`    | <code>object & object</code> |          |
| `windows` | <code>object & object</code> |          |

## <code>fakeBrowser</code>

```ts
// Definition
fakeBrowser: FakeBrowser;
```

## <code>FakeBrowser</code>

```ts
// Definition
declare type FakeBrowser = BrowserOverrides & Browser;
```
