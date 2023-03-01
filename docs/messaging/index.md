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

`@webext-core/messaging` a simplified, type-safe wrapper around the web extension messaging APIs. It supports all browsers (Chrome, Firefox, Safari, etc).

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

First, define a protocol map.

- The keys are the types of the messages you will be sending
- The values defines the data and return types for a message

```ts
// ./messaging.ts
import { ProtocolWithReturn } from '@webext-core/messaging';

interface ProtocolMap {
  getStringLength: ProtocolWithReturn<string, number>;
}
```

Once you've defined the protocol map, call `defineExtensionMessaging`, passing your `ProtocolMap` as the first type parameter.

Export the `sendMessage` and `onMessage` methods. These are what the rest of your extension will use to pass messages around.

```ts
import { ProtocolWithReturn, defineExtensionMessaging } from '@webext-core/messaging';

interface ProtocolMap {
  getStringLength: ProtocolWithReturn<string, number>;
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();
```

Usually the `onMessage` function will be used in the background, listening for messages from a different part of the extension.

```ts
// ./background.ts
import { onMessage } from './messaging';

onMessage('getStringLength', message => {
  return message.data.length;
});
```

In this case, the message is being sent from a content script.

```ts
// ./content-script.js or anywhere else
import { sendMessage } from './messaging';

const length = await sendMessage('getStringLength', 'hello world');

console.log(length); // 11
```

## Defining a `ProtocolMap`

<!-- prettier-ignore -->
```ts
interface ProtocolMap {
  message1: undefined;                              // No data and no return type
  message2: string;                                 // Only data
  message3: ProtocolWithReturn<undefined, boolean>; // Only a return type
  message4: ProtocolWithReturn<string, boolean>;    // Data and return type
}
```

`ProtocolWithReturn` is a utility type provided by the package to make it easier to define a protocol map. However, it's only required when a message responds with a value.

If you're not returning anything from a message, you can just use set the value to the message's data type.
