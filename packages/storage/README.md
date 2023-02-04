# `@webext-core/storage`

A type-safe wrapper around the `Browser.storage` APIs, based off local storage.

```bash
pnpm i @webext-core/storage
```

```ts
import { localExtStorage } from '@webext-core/storage';

const value = await localExtStorage.getItem('some-key');
```

## Get Started

See [documentation](https://webext-core.aklinker1.io/storage) to get started!
