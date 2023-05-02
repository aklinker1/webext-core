---
titleTemplate: '@webext-core/proxy-service'
---

# Proxy Service

<ChipGroup>
  <Chip text="MV2" type="manifest" />
  <Chip text="MV3" type="manifest" />
  <Chip text="Chrome" type="browser" />
  <Chip text="Firefox" type="browser" />
  <Chip text="Safari" type="browser" />
</ChipGroup>

## Overview

`@webext-core/proxy-service` provides a simple, type-safe way to execute code in the extension's background.

:::code-group

```ts [MathService.ts]
import { defineProxyService } from '@webext-core/proxy-service';

// 1. Define your service
class MathService {
  async fibonacci(number: number): Promise<number> {
    ...
  }
}
export const [registerMathService, getMathService] = defineProxyService(
  'MathService',
  () => new MathService(),
);
```

```ts [background.ts]
import { registerMathService } from './MathService';

// 2. As soon as possible in your background, register it
registerMathService();
```

```ts [anywhere-else.ts]
import { getMathService } from './MathService';

// 3. Get an instance of your service anywhere in your extension
const mathService = getMathService();

// 4. Call methods like normal, but they will execute in the background
await mathService.fibonacci(100);
```

:::

## Installation

###### Bundler

```ts
pnpm i @webext-core/proxy-service
```

```ts
import { defineProxyService } from '@webext-core/proxy-service';
```

###### Vanilla

```sh
curl -o proxy-service.js https://cdn.jsdelivr.net/npm/@webext-core/proxy-service/lib/index.global.js
```

```html
<script src="/proxy-service.js"></script>
<script>
  const { defineProxyService } = webExtCoreProxyService;
</script>
```

## Usage

Lets look at a more realistic example, IndexedDB! Since the same IndexedDB database is not available in every JS context of an extension, it's common to use the IndexedDB instance in the background script as a database for web extensions.

First, we need to implementat of our service. In this case, the service will contain CRUD operations for todos in the database:

:::code-group

```ts [TodosRepo.ts]
import { defineProxyService, flattenPromise } from '@webext-core/proxy-service';
import { IDBPDatabase } from 'idb';

function createTodosRepo(idbPromise: Promise<IDBPDatabase>) {
  const idb = flattenPromise(idbPromise);

  return {
    async create(todo: Todo): Promise<void> {
      await idb.add('todos', todo);
    },
    getOne(id: Pick<Todo, 'id'>): Promise<Todo> {
      return idb.get('todos', id);
    },
    getAll(): Promise<Todo[]> {
      return idb.getAll('todos');
    },
    async update(todo: Todo): Promise<void> {
      await idb.put('todos', todo);
    },
    async delete(todo: Todo): Promise<void> {
      await idb.delete('todos', todo.id);
    },
  };
}
```

:::

> In this example, we're using a plain object instead of a class as the service. See the [Variants](./variants) docs for more variations in creating proxy services.

In the same file, define a proxy service for our `TodosRepo`:

:::code-group

```ts [TodosRepo.ts]
// ...

export const [registerTodosRepo, getTodosRepo] = defineProxyService('TodosRepo', createTodosRepo);
```

:::

Now that you have a service implemented, we need to tell the extension to use it! This needs to happen syncronously when your background script is loaded, so put it as high up as possible.

:::code-group

```ts [background.ts]
import { openDB } from 'idb';
import { registerTodosRepo, getTodosRepo } from './TodosRepo';

// Open the database and register your service
const db = openDB("todos", ...);
registerTodosRepo(db);
```

:::

You need to call `register` synchronously at the top level of the background script to avoid race conditions between registering and accessing the service for the first time.

:::info
Here, even though `openDB` returns a promise, we're not awaiting the promise until executing the functions inside the service.

You can follow the pattern of passing `Promise<Dependency>` into your services and awaiting them internally to stay synchronous.

[`flattenPromise`](./api#flattenpromise) is used to make consuming this promise easier.
:::

And that's it. You can now access your IndexedDB database from any JS context inside your extension:

:::code-group

```html [extension-page.html]
<script type="module">
  import { getTodosRepo } from './TodosRepo';

  // On your UIs
  const todosRepo = getTodosRepo();
  todosRepo.getAll().then(console.log);
</script>
```

```ts [content-script.ts]
import { getTodosRepo } from './TodosRepo';

// Inside content scripts
const todosRepo = getTodosRepo();
todosRepo.getAll().then(console.log);
```

```ts [background/some-helper.ts]
import { getTodosRepo } from './TodosRepo';

// Anywhere else in your background
const todosRepo = getTodosRepo();
todosRepo.getAll().then(console.log);
```

:::
