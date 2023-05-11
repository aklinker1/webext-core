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

`@webext-core/storage` provides a type-safe, `localStorage`-like API for interacting with extension storage.

```ts
const { key: value } = await browser.storage.local.get('key');
// VS
const value = await localExtStorage.getItem('key');
```

:::warning
Requires the `storage` permission.
:::

## Installation

###### NPM

```ts
pnpm i @webext-core/storage
```

```ts
import { localExtStorage } from '@webext-core/storage';

const value = await localExtStorage.getItem('key');
await localExtStorage.setItem('key', 123);
```

###### CDN

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

|                                          | <code style="white-space: nowrap">@webext-core/storage</code> | `localStorage` | `browser.storage` |
| ---------------------------------------- | :-----------------------------------------------------------: | :------------: | :---------------: |
| **Set value to `undefined` removes it?** |                              ✅                               |       ✅       |        ❌         |
| **Returns `null` for missing values?**   |                              ✅                               |       ✅       |        ❌         |
| **Can store values of any type?**        |                              ✅                               |       ❌       |        ✅         |
| **Async?**                               |                              ✅                               |       ❌       |        ✅         |

Otherwise, the storage behaves the same as `localStorage` / `sessionStorage`.
