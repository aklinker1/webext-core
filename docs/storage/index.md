---
titleTemplate: '@webext-core/storage'
---

# Get Started

## Overview

`@webext-core/storage` provides a localStorage-like API for interacting with extension storage. It supports all browsers (Chrome, Firefox, Safari, etc).

::: warn
Requires the `storage` permission.
:::

```ts
const { key: value } = await browser.storage.local.get('key');
// VS
const value = await localExtStorage.getItem('key');
```

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
