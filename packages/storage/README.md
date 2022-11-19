# `@webext-core/storage`

A type-safe wrapper around the `Browser.storage` APIs, based off local storage.

```bash
pnpm i @webext-core/storage
```

## Usage

If you don't use TypeScript, or don't want to type your store, you can use any of the named exports from the package.

```ts
import { localExtStorage, syncExtStorage, managedExtStorage } from '@webext-core/storage';

const value = await localExtStorage.getItem('some-key');
```

If you want to define types for your storage, you can use the `defineExtensionStorage` method:

###### storage.ts

```ts
import Browser from 'webextension-polyfill';
import { defineExtensionStorage } from '@webext-core/storage';

export interface LocalExtStorageSchema {
  someKey: boolean;
  someOtherKey?: string;
}

export const localExtStorage = defineExtensionStorage<LocalExtStorageSchema>(Browser.storage.local);
```

Then use `localExtStorage` from your own module:

```ts
import { localExtStorage } from './storage';

// This works
const value: boolean | null = await localExtStorage.getItem('someKey');

// This results in a type error
localExtStorage.getItem('xyz');
```
