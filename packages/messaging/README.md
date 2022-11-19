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
