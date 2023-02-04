# `@webext-core/messaging`

A light-weight, type-safe wrapper around the `browser.runtime` messaging APIs.

```ts
// ./messaging.ts
import { ProtocolWithReturn, defineExtensionMessaging } from '@webext-core/messaging';

interface ProtocolMap {
  getStringLength: ProtocolWithReturn<string, number>;
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();
```

```ts
// ./background.ts
import { onMessage } from './messaging';

onMessage('getStringLength', message => {
  return message.data.length;
});
```

```ts
// ./content-script.js or anywhere else
import { sendMessage } from './messaging';

const length = await sendMessage('getStringLength', 'hello world');

console.log(length); // 11
```

## Get Started

See [documentation](https://webext-core.aklinker1.io/messaging) to get started!
