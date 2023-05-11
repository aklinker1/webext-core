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

> Don't like lower-level messaging APIs? Try out [`@webext-core/proxy-service`](/guide/proxy-service/) for a more DX-friendly approach to executing code in the background script.

## Installation

###### NPM

```ts
pnpm i @webext-core/messaging
```

```ts
import { defineExtensionMessaging } from '@webext-core/messaging';
```

###### CDN

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

First, define a protocol map:

:::code-group

```ts [messaging.ts]
interface ProtocolMap {
  getStringLength(data: string): number;
}
```

:::

Then call `defineExtensionMessaging`, passing your `ProtocolMap` as the first type parameter.

Export the `sendMessage` and `onMessage` methods. These are what the rest of your extension will use to pass messages around.

:::code-group

```ts [messaging.ts]
import { defineExtensionMessaging } from '@webext-core/messaging';

interface ProtocolMap {
  getStringLength(data: string): number;
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();
```

:::

Usually the `onMessage` function will be used in the background and messages will be sent from other parts of the extension.

:::code-group

```ts [background.ts]
import { onMessage } from './messaging';

onMessage('getStringLength', message => {
  return message.data.length;
});
```

```ts [content-script.ts]
import { sendMessage } from './messaging';

const length = await sendMessage('getStringLength', 'hello world');

console.log(length); // 11
```

:::

### Sending Messages to Tabs

You can also send messages from your background script to a tab, but you need to know the `tabId`.

:::code-group

```ts [content-script.ts]
import { onMessage } from './messaging';

onMessage('getStringLength', message => {
  return message.data.length;
});
```

```ts [background.ts]
import { sendMessage } from './messaging';

const length = await sendMessage('getStringLength', 'hello world', tabId);
```

:::
