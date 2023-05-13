# `@webext-core/storage`

A type-safe, localStorage-esk wrapper around the web extension storage APIs. Supports all browsers (Chrome, Firefox, Safari, etc).

```bash
pnpm i @webext-core/storage
```

```ts
import { localExtStorage } from '@webext-core/storage';

const value = await localExtStorage.getItem('some-key');
```

## Get Started

See [documentation](https://webext-core.aklinker1.io/guide/storage/) to get started!
