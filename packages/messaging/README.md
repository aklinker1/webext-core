# `@webext-core/messaging`

A light weight, type-safe wrapper around the `Browser.runtime.sendMessage` APIs.

Based loosely off [`webext-bridge`](https://github.com/zikaari/webext-bridge). This does nothing other than provide types to the messaging APIs. `webext-bridge` provides things like queuing and caching, **this does not**.

## Usage

In your project, create a file that calls `defineExtensionMessaging`, and exports the two functions it returns.

<!-- prettier-ignore -->
```ts
// messaging.ts
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

```ts
// src/background.ts
import { onMessage } from './messaging';

onMessage('message4', message => {
  console.log(message);
  return !!message.data;
});
```

```ts
// src/popup.ts
import { sendMessage } from './messaging';

sendMessage('message4', 'data').then(console.log);
```
