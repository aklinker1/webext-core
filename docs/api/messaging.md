<!-- GENERATED FILE, DO NOT EDIT -->

# API

API reference for [`@webext-core/messaging`](/guide/messaging/).

:::info
The entire API reference is also available in your editor via [JSDocs](https://jsdoc.app/).
:::

## `BaseMessagingConfig`

```ts
interface BaseMessagingConfig {
  logger?: Logger;
}
```

Shared configuration between all the different messengers.

### Properties 

- ***`logger?: Logger`*** (default: `console`)<br/>The logger to use when logging messages. Set to `null` to disable logging.

## `CustomEventMessage`

```ts
interface CustomEventMessage {
  event: CustomEvent;
}
```

Additional fields available on the `Message` from a `CustomEventMessenger`.

### Properties 

- ***`event: CustomEvent`***<br/>The event that was fired, resulting in the message being passed.

## `CustomEventMessagingConfig`

```ts
interface CustomEventMessagingConfig extends BaseMessagingConfig {
  namespace?: string;
}
```

Configuration passed into `defineCustomEventMessaging`.

### Properties 

- ***`namespace?: string`*** (default: `browser.runtime.id`)<br/>A string used to ensure the messenger only sends messages to and listens for messages from
other custom event messengers with the same namespace. Defaults to the extension's ID, which is
unique. This prevents `onMessage` from being fired from other extensions or the webpage a
content script is ran on.

## `CustomEventMessenger`

```ts
type CustomEventMessenger<TProtocolMap extends Record<string, any>> =
  GenericMessenger<TProtocolMap, CustomEventMessage, []>;
```

Messenger returned by `defineCustomEventMessenger`.

## `defineCustomEventMessaging`

```ts
function defineCustomEventMessaging<
  TProtocolMap extends Record<string, any> = Record<string, any>
>(config?: CustomEventMessagingConfig): CustomEventMessenger<TProtocolMap> {
  // ...
}
```

Creates a `CustomEventMessenger`. This messenger is backed by the `CustomEvent` APIs. It can be
used to communicate between:

- Content script and website
- Content script and injected script

`sendMessage` does not accept any additional arguments..

### Examples

```ts
interface WebsiteMessengerSchema {
  initInjectedScript(data: ...): void;
}

export const websiteMessenger = defineCustomEventMessenger<initInjectedScript>();

// Content script
websiteMessenger.sendMessage("initInjectedScript", ...);

// Injected script
websiteMessenger.onMessage("initInjectedScript", (...) => {
  // ...
})
```

## `defineExtensionMessaging`

```ts
function defineExtensionMessaging<
  TProtocolMap extends Record<string, any> = Record<string, any>
>(config?: ExtensionMessagingConfig): ExtensionMessenger<TProtocolMap> {
  // ...
}
```

Returns an `ExtensionMessenger` that is backed by the `browser.runtime.sendMessage` and
`browser.tabs.sendMessage` APIs.

It can be used to send messages to and from the background page/service worker.

## `defineWindowMessaging`

```ts
function defineWindowMessaging<
  TProtocolMap extends Record<string, any> = Record<string, any>
>(config?: WindowMessagingConfig): WindowMessenger<TProtocolMap> {
  // ...
}
```

Returns a `WindowMessenger`. It is backed by the `window.postMessage` API.  It can be used to
communicate between:

- Content script and website
- Content script and injected script

### Examples

```ts
interface WebsiteMessengerSchema {
  initInjectedScript(data: ...): void;
}

export const websiteMessenger = defineWindowMessaging<initInjectedScript>();

// Content script
websiteMessenger.sendMessage("initInjectedScript", ...);

// Injected script
websiteMessenger.onMessage("initInjectedScript", (...) => {
  // ...
})
```

## `ExtensionMessage`

```ts
interface ExtensionMessage {
  sender: Runtime.MessageSender;
}
```

Additional fields available on the `Message` from an `ExtensionMessenger`.

### Properties 

- ***`sender: Runtime.MessageSender`***<br/>Information about where the message came from. See
[`Runtime.MessageSender`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/MessageSender).

## `ExtensionMessagingConfig`

```ts
interface ExtensionMessagingConfig extends BaseMessagingConfig {}
```

Configuration passed into `defineExtensionMessaging`.

## `ExtensionMessenger`

```ts
type ExtensionMessenger<TProtocolMap extends Record<string, any>> =
  GenericMessenger<TProtocolMap, ExtensionMessage, ExtensionSendMessageArgs>;
```

Messenger returned by `defineExtensionMessaging`.

## `ExtensionSendMessageArgs`

```ts
type ExtensionSendMessageArgs = [tabId?: number];
```

Send messsage accepts an additional, optional argument `tabId`. Pass it to send a message to a
specific tab from the background script.

You cannot message between tabs directly. It must go through the background script.

## `GenericMessenger`

```ts
interface GenericMessenger<
  TProtocolMap extends Record<string, any>,
  TMessageExtension,
  TSendMessageArgs extends any[]
> {
  sendMessage<TType extends keyof TProtocolMap>(
    type: TType,
    data: GetDataType<TProtocolMap[TType]>,
    ...args: TSendMessageArgs
  ): Promise<GetReturnType<TProtocolMap[TType]>>;
  onMessage<TType extends keyof TProtocolMap>(
    type: TType,
    onReceived: (
      message: Message<TProtocolMap, TType> & TMessageExtension
    ) => void | MaybePromise<GetReturnType<TProtocolMap[TType]>>
  ): RemoveListenerCallback;
  removeAllListeners(): void;
}
```

Messaging interface shared by all messengers.

Type parameters accept:
- `TProtocolMap` to define the data and return types of messages.
- `TMessageExtension` to define additional fields that are available on a message inside
   `onMessage`'s callback
- `TSendMessageArgs` to define a list of additional arguments for `sendMessage`

## `GetDataType`

```ts
type GetDataType<T> = T extends (...args: infer Args) => any
  ? Args["length"] extends 0 | 1
    ? Args[0]
    : never
  : T extends ProtocolWithReturn<any, any>
  ? T["BtVgCTPYZu"]
  : T;
```

Given a function declaration, `ProtocolWithReturn`, or a value, return the message's data type.

## `GetReturnType`

```ts
type GetReturnType<T> = T extends (...args: any[]) => infer R
  ? R
  : T extends ProtocolWithReturn<any, any>
  ? T["RrhVseLgZW"]
  : void;
```

Given a function declaration, `ProtocolWithReturn`, or a value, return the message's return type.

## `Logger`

```ts
interface Logger {
  debug(...args: any[]): void;
  log(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
}
```

Interface used to log text to the console when sending and recieving messages.

## `MaybePromise`

```ts
type MaybePromise<T> = Promise<T> | T;
```

Either a Promise of a type, or that type directly. Used to indicate that a method can by sync or
async.

## `Message`

```ts
interface Message<TProtocolMap extends Record<string, any>> {
  id: number;
  data: TProtocolMap[TType];
  type: TType;
  timestamp: number;
}
```

Contains information about the message recieved.

### Properties 

- ***`id: number`***<br/>A semi-unique, auto-incrementing number used to trace messages being sent.

- ***`data: TProtocolMap[TType]`***<br/>The data that was passed into `sendMessage`

- ***`type: TType`***

- ***`timestamp: number`***<br/>The timestamp the message was sent in MS since epoch.

## `MessageSender`

```ts
interface MessageSender {
  tab?: Tabs.Tab;
  frameId?: number;
  id?: string;
  url?: string;
}
```

An object containing information about the script context that sent a message or request.

### Properties 

- ***`tab?: Tabs.Tab`***<br/>The $(ref:tabs.Tab) which opened the connection, if any. This property will <strong>only</strong>
be present when the connection was opened from a tab (including content scripts), and <strong>only</strong>
if the receiver is an extension, not an app.
Optional.

- ***`frameId?: number`***<br/>The $(topic:frame_ids)[frame] that opened the connection. 0 for top-level frames, positive for child frames.
This will only be set when <code>tab</code> is set.
Optional.

- ***`id?: string`***<br/>The ID of the extension or app that opened the connection, if any.
Optional.

- ***`url?: string`***<br/>The URL of the page or frame that opened the connection. If the sender is in an iframe,
it will be iframe's URL not the URL of the page which hosts it.
Optional.

## `ProtocolWithReturn`

:::danger Deprecated
Use the function syntax instead: <https://webext-core.aklinker1.io/guide/messaging/protocol-maps.html#syntax>
:::

```ts
interface ProtocolWithReturn<TData, TReturn> {
  BtVgCTPYZu: TData;
  RrhVseLgZW: TReturn;
}
```

Used to add a return type to a message in the protocol map.

> Internally, this is just an object with random keys for the data and return types.

### Properties 

- ***`BtVgCTPYZu: TData`***<br/>Stores the data type. Randomly named so that it isn't accidentally implemented.

- ***`RrhVseLgZW: TReturn`***<br/>Stores the return type. Randomly named so that it isn't accidentally implemented.

### Examples

```ts
interface ProtocolMap {
  // data is a string, returns undefined
  type1: string;
  // data is a string, returns a number
  type2: ProtocolWithReturn<string, number>;
}
```

## `RemoveListenerCallback`

```ts
type RemoveListenerCallback = () => void;
```

Call to ensure an active listener has been removed.

If the listener has already been removed with `Messenger.removeAllListeners`, this is a noop.

## `WindowMessagingConfig`

```ts
interface WindowMessagingConfig extends BaseMessagingConfig {}
```

Configuration passed into `defineWindowMessaging`.

## `WindowMessenger`

```ts
type WindowMessenger<TProtocolMap extends Record<string, any>> =
  GenericMessenger<TProtocolMap, {}, WindowSendMessageArgs>;
```

## `WindowSendMessageArgs`

```ts
type WindowSendMessageArgs = [targetOrigin: string];
```

For a `WindowMessenger`, `sendMessage` requires an additional argument, the `targetOrigin`. It
defines which frames inside the page should receive the message.

> See <https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#targetorigin> for more
details.

<br/><br/>

---

_API reference generated by [`plugins/typescript-docs.ts`](https://github.com/aklinker1/webext-core/blob/main/docs/.vitepress/plugins/typescript-docs.ts)_