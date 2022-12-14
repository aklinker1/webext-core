# `@webext-core/messaging`

A light weight, type-safe wrapper around the `Browser.runtime.sendMessage` APIs.

In addition to adding types, it also includes error handling. Any errors will be returned to where `sendMessage` was called.

## Usage

In your project, create a file that calls `defineExtensionMessaging`, and exports the two functions it returns.

###### messaging.ts

<!-- prettier-ignore -->
```ts
import { defineExtensionMessaging, ProtocolWithReturn } from '@webext-core/messaging';

// This defines the data and return types used for each message
interface ProtocolMap {
  message1: undefined;                              // No data and no return type
  message2: string;                                 // Only data
  message3: ProtocolWithReturn<undefined, boolean>; // Only a return type
  message4: ProtocolWithReturn<string, boolean>;    // Data and return type
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();
```

Then import those functions throughout the rest of the extension.

###### src/background.ts

```ts
import { onMessage } from './messaging';

onMessage('message4', message => {
  console.log(message);
  return !!message.data;
});
```

###### src/popup.ts

```ts
import { sendMessage } from './messaging';

sendMessage('message4', 'data').then(console.log);
```

## API

### `defineExtensionMessaging`

Returns [`sendMessage`](#sendmessage) and [`onMessage`](#onmessage) with types based on your [`TProtocolMap`](#protocolmap).

```ts
function defineExtensionMessaging<TProtocolMap>(options: ExtensionMessagingConfig): {
  sendMessage: Function;
  onMessage: Function;
};
```

#### `ExtensionMessagingConfig`

Configuration for the [`defineExtensionMessaging`](#defineextensionmessaging).

- `logger` (_default: `console`_): custom logger for printing sent and recieved messages to the console. Pass `null` to disable logging.

### `sendMessage`

Send a message to the background, or include a `tabId` to send a message from the background to a specific tab.

```ts
function sendMessage(
  type: keyof TProtocolMap,
  payload: TPayload,
  tabId?: number,
): Promise<TReturnType>;
```

### `onMessage`

Add a `runtime.onMessage` listener for a specific message type:

```ts
function onMessage(
  type: keyof TProtocolMap,
  onRecieved: (message: Message<TPayload>) => TReturnType,
);
```

The `onRecieved` callback's `message` includes:

- `id: number`: a unique ID for the message that was sent. Useful for debugging.
- `data: TPayload`: The payload sent when calling `sendMessage`, or `undefined` if no payload was sent.
- `sender: MessageSender`: The details about who sent the message. See [Chrome's docs on `MessageSender`](https://developer.chrome.com/docs/extensions/reference/runtime/#type-MessageSender) for more details.
- `timestamp: number`: MS since epoch that the message was sent at.

### `ProtocolMap`

To implement custom types, you need to include a `ProtocolMap` when calling [`defineExtensionMessaging`](#defineextensionmessaging).

A protocol map is a record of message types to the payload and/or return type of the message.

If I wanted a message called `toRgb` to take in a hex color, and returns the R, G, and B values, it would look like this:

```ts
import { ProtocolWithReturn, defineExtensionMessaging } from '@webext-core/messaging';

interface ProtocolMap {
  toRgb: ProtocolWithReturn<string, { r: number; g: number; b: number }>;
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();
```

Here's a cheatsheet for defining a protocol map:

```ts
interface ProtocolMap {
  'no-payload-no-return-type': undefined;
  'with-payload-no-return-type': YourPayloadType;
  'no-payload-with-return-type': ProtocolWithReturn<undefined, YourReturnType>;
  'with-payload-with-return-type': ProtocolWithReturn<YourPayloadType, YourReturnType>;
}
```

> If you don't have a return type, you can just set the value to the payload type.

> Use `undefined` when excluding a payload or return type
