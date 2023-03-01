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
