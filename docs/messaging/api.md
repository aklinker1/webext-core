# API

## `defineExtensionMessaging`

```ts
// Type
<TProtocolMap>(options: ExtensionMessagingConfig) => {
  sendMessage: SendMessage<TProtocolMap>;
  onMessage: OnMessage<TProtocolMap>;
};
```

Returns [`sendMessage`](#sendmessage) and [`onMessage`](#onmessage) with types based on your [`TProtocolMap`](#protocolmap).

- `options` `[ExtensionMessagingConfig](#extensionmessagingconfig)`: Configures the behavior of `sendMessage` and `onMessage`.

## `sendMessage`

```ts
// Type
<TType>(type: TType, data: GetData<TProtocolMap[TType]>, tabId?: number) =>
  Promise<GetResponse<TProtocolMap[TType]>>;
```

Send a message to the background script, or if a `tabId` is passed, to the requested tab.

Wherever you're sending the message to, it must have called `onMessage` with the same message type to recieve it, or you'll get an error.

## `onMessage`

```ts
// Type
<TType>(
  type: TType,
  onRecieved: (
    message: Message<TProtocol<TType>>,
  ) => MaybePromise<GetResponse<TProtocolMap[TType]>>,
) => RemoveOnMessage;
```

Add a listener that calls the `onRecieved` callback function when a message of the same `type` is recieved.

Returns a function that when called, removes the listener.

The [`Message`](#message) object contains details about the message that was sent.

If the message type requires a response, you can return a value syncronously or return a Promise of the return type.

## `Message`

```ts
// Type
interface Message<TProtocolMap, TKey> {
  id: number;
  data: GetData<TProtocolMap[TKey]>;
  sender: browser.Runtime.MessageSender;
  timestamp: number;
}
```

Contains details about the message recieved by the listener.

- `id`: A auto-incrementing semi-unique identifier for the message. Useful for tracing message chains in debug mode.
- `data`: The data sent with the message, or `undefined` if there is no data.
- `sender`: Details about where the message was sent from. See [`Runtime.MessageSender`](https://developer.chrome.com/docs/extensions/reference/runtime/#type-MessageSender) for more details.
- `timestamp`: The MS since epoch when the message was sent.

## `ProtocolWithReturn`

A utility type for defining a message with a response.

See [Defining a `ProtocolMap`](/messaging/#defining-a-protocolmap) example usages.

## `ExtensionMessagingConfig`

```ts
// Type
interface ExtensionMessagingConfig {
  logger?: object | null;
}
```

- `logger` (_default: `console`_): custom logger for printing sent and recieved messages to the console. Pass `null` to disable logging.
