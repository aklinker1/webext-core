---
titleTemplate: '@webext-core/messaging'
---

# Messaging

<ChipGroup>
  <Chip text="MV2" type="manifest" />
  <Chip text="MV3" type="manifest" />
  <Chip text="Chrome" type="browser" />
  <Chip text="Firefox" type="browser" />
  <Chip text="Safari" type="browser" />
</ChipGroup>

## Overview

`@webext-core/messaging` a simplified, type-safe wrapper around the web extension messaging APIs.

> Don't like lower-level messaging APIs? Try out [`@webext-core/proxy-service`](/proxy-service/) for a more DX-friendly approach to messaging.

## Installation

###### Bundler

```ts
pnpm i @webext-core/messaging
```

```ts
import { defineExtensionMessaging } from '@webext-core/messaging';
```

###### Vanilla

```sh
curl -o messaging.js https://cdn.jsdelivr.net/npm/@webext-core/messaging/lib/index.global.js
```

```html
<script src="/messaging.js"></script>
<script>
  const { defineExtensionMessaging } = webExtCoreMessaging;
</script>
```

## Basic Usage

1. If you're using TypeScript, you'll need to define a protocol map.

   ```ts
   // ./messaging.ts
   interface ProtocolMap {
     getTextLength(data: string): number;
   }
   ```

   Here, we've defined a single message named `getTextLength`, which takes a `string` as data and expects a `number` to be returned.

2. Call `defineExtensionMessaging`, passing your `ProtocolMap` as the first type parameter.

   ```ts
   // ./messaging
   import { defineExtensionMessaging } from '@webext-core/messaging';

   interface ProtocolMap {
     getTextLength(data: string): number;
   }

   export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();
   ```

   Export the `sendMessage` and `onMessage` methods. These are what the rest of your extension will use to pass messages around.

   ```ts
   // ./background.ts
   import { onMessage } from './messaging';

   onMessage('getStringLength', message => {
     const text = message.data;
     return text.length;
   });
   ```

   ```ts
   // ./content-script.js
   import { sendMessage } from './messaging';

   const length = await sendMessage('getStringLength', 'hello world');

   console.log(length); // 11
   ```

## Defining a `ProtocolMap`

<!-- prettier-ignore -->
```ts
interface ProtocolMap {
  message1(): void;                // No data and no return type
  message2(data: string): void;    // Only data
  message3(): boolean;             // Only a return type
  message4(data: string): boolean; // Data and a return type
}
```

### Multiple Arguments

The `ProtocolMap` functions only support a single argument. To pass multiple values, you should pass an object like so:

<<< @/snippets/messaging/multipleArgs.ts#definition

To send the message, pass an object as defined by your types:

<<< @/snippets/messaging/multipleArgs.ts#sendMessage

Then in your message handler, you can destructure the values:

<<< @/snippets/messaging/multipleArgs.ts#onMessage
