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

::: code-group

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

// 4. Get an instance of your service anywhere in your extension
const mathService = getMathService();

// 5. Call methods like normal, but they will execute in the background
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

First, we need to create the a real implementation of our service. In this case, the service will contain CRUD operations for todos in the database:

::: code-group

```ts [TodosRepo.ts]
import { defineProxyService } from '@webext-core/proxy-service';
import { IDBPDatabase } from 'idb';

// You can also use functions to create your services
function createTodosRepo(idb: Promise<IDBPDatabase>) {
  return {
    async create(todo: Todo): Promise<void> {
      (await idb).add('todos', todo);
    },
    async getOne(id: Pick<Todo, 'id'>): Promise<Todo> {
      return (await idb).get('todos', id);
    },
    async getAll(): Promise<Todo[]> {
      return (await idb).getAll('todos');
    },
    async update(todo: Todo): Promise<void> {
      (await idb).put('todos', todo);
    },
    async delete(todo: Todo): Promise<void> {
      (await idb).delete('todos', todo.id);
    },
  };
}

export const [registerTodosRepo, getTodosRepo] = defineProxyService('TodosRepo', createTodosRepo);
```

:::

::: info
In this example, we're using [`idb`](https://www.npmjs.com/package/idb) to simplify the IndexedDB code.
:::

Now that you have a service implemented, we need to tell the extension to use it! This needs to happen syncronously when your background script is loaded, so put it as high up as possible.

::: code-group

```ts [background.ts]
import { openDB } from 'idb';
import { registerTodosRepo, getTodosRepo } from './TodosRepo';

// Open the database and register your service
const db = openDB("todos", ...);
registerTodosRepo(db);
```

:::

::: info
This works for both MV2 background pages, and MV3 service works.
:::

You'll notice that we're not `await`ing the database until we call a fucntion inside the service. This helps keep the service registration synchronous, avoiding race conditions between calling the first method on your service and the registration completing.

:::warning
While registering your service synchronously is not technically required for persistent MV2 background pages, it is necessary for non-persistent MV2 background pages and MV3 service workers.

You can follow the pattern of passing `Promise<Dependency>` into your services and awaiting them internally to stay synchronous.
:::

And you're done! You can now access your IndexedDB database from any JS context inside your extension:

::: code-group

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

// Even somewhere else in your background
const todosRepo = getTodosRepo();
todosRepo.getAll().then(console.log);
```

:::
