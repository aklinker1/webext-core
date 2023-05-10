---
titleTemplate: '@webext-core/storage'
---

# Storage

<ChipGroup>
  <Chip text="MV2" type="manifest" />
  <Chip text="MV3" type="manifest" />
  <Chip text="Chrome" type="browser" />
  <Chip text="Firefox" type="browser" />
  <Chip text="Safari" type="browser" />
</ChipGroup>

## Overview

`@webext-core/storage` provides a localStorage-like API for interacting with extension storage.

```ts
const { key: value } = await browser.storage.local.get('key');
// VS
const value = await localExtStorage.getItem('key');
```

:::warning
Requires the `storage` permission.
:::

## Installation

###### Bundler

```ts
pnpm i @webext-core/storage
```

```ts
import { localExtStorage } from '@webext-core/storage';

const value = await localExtStorage.getItem('key');
await localExtStorage.setItem('key', 123);
```

###### Vanilla

```sh
curl -o storage.js https://cdn.jsdelivr.net/npm/@webext-core/storage/lib/index.global.js
```

```html
<script src="/storage.js"></script>
<script>
  const { localExtStorage } = webExtCoreStorage;

  const value = await localExtStorage.getItem('key');
  await localExtStorage.setItem('key', 123);
</script>
```

## Differences with `localStorage` and `browser.storage`

### It's async

- `localStorage` uses _synchronous_ APIs
- `browser.storage` uses _asynchronous_ APIs
- `@webext-core/storage` uses _asynchronous_ APIs, **same as `browser.storage`**

:::code-group

```ts [localStorage]
localStorage.getItem('key');
```

```ts [browser.storage]
await browser.storage.local.get('key');
```

```ts [@webext-core/storage]
await localExtStorage.getItem('key');
```

:::

### Values are stored as-is

- `localStorage` can only save strings. You have to manually convert values to and from strings.
- `browser.storage` stores values without having to convert to and from a string.
- `@webext-core/storage` stores values without having to convert to and from a string, **same as `browser.storage`**

:::code-group

```ts [localStorage]
localStorage.setItem('key', JSON.stringify({ property1: false, property2: 1 }));
const itemStr = localStorage.getItem('key');
const item = itemStr == null ? null : JSON.parse(itemStr);
```

```ts [browser.storage]
await browser.storage.local.set({
  key: { property1: false, property2: 1 },
}));
const { key: item } = await browser.storage.local.get('key');
```

```ts [@webext-core/storage]
await localExtStorage.setItem('key', { property1: false, property2: 1 });
const item = await localExtStorage.getItem('key');
```

:::

### Setting key to `undefined`

- `localStorage` will return `null` after setting a key to `undefined`
- `browser.storage` will return the previous value after setting a key to `undefined`, `undefined` values are ignored.
- `@webext-core/storage` will return `null` after setting a key to `undefined`, **same as `localStorage`**.

:::code-group

```ts [Web Extension Storage]
await browser.storage.local.set({ key: 'some-value' });
await browser.storage.local.set({ key: undefined });
const { key: value } = await browser.storage.local.get('key');

console.log(value); // "some-value"
```

```ts [localStorage]
localStorage.setItem('key', 'some-value');
localStorage.setItem('key', undefined);
const value = localStorage.getItem('key');

console.log(value); // null
```

```ts [@webext-core/storage]
await localExtStorage.setItem('key', 'some-value');
await localExtStorage.setItem('key', undefined);
const value = await localExtStorage.getItem('key');

console.log(value); // null
```

:::
