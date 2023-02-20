# API

- <code><a href="#defineextensionmessaging">defineExtensionMessaging</a></code>
- <code><a href="#extensionmessagingconfig">ExtensionMessagingConfig</a></code>
- <code><a href="#protocolwithreturn">ProtocolWithReturn</a></code>

## <code>defineExtensionMessaging</code>

```ts
// Definition
declare function defineExtensionMessaging<TProtocolMap>(config?: ExtensionMessagingConfig): {
  onMessage: <TKey extends keyof TProtocolMap>(
    key: TKey,
    onReceived: OnMessageReceived<TProtocolMap, TKey>,
  ) => () => void;
  sendMessage: <TKey_1 extends keyof TProtocolMap>(
    key: TKey_1,
    data: GetData<TProtocolMap[TKey_1]>,
    tabId?: number,
  ) => Promise<GetResponse<TProtocolMap[TKey_1]>>;
};
```

Returns <code>object</code>.

| Parameter | Type                                                                          | Optional | Default | Description |
| --------- | ----------------------------------------------------------------------------- | :------: | ------- | ----------- |
| `config`  | <code><a href="#extensionmessagingconfig">ExtensionMessagingConfig</a></code> |    ✅    |         |

## <code>ExtensionMessagingConfig</code>

```ts
// Definition
interface ExtensionMessagingConfig {
  logger?: {
    debug(...args: any[]): void;
    log(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
  };
}
```

| Field    | Type                | Optional | Description |
| -------- | ------------------- | :------: | ----------- |
| `logger` | <code>object</code> |    ✅    |

## <code>ProtocolWithReturn</code>

```ts
// Definition
declare type ProtocolWithReturn<TData, TResponse> = {
  BtVgCTPYZu: TData;
  RrhVseLgZW: TResponse;
};
```
