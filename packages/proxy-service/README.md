# `@webext-core/proxy-service`

Defer function execution to the background service worker (or page).

```bash
pnpm i @webext-core/proxy-service
```

## Usage

1. Define the service that will be executed in the background:

   ###### MathService.ts

   ```ts
   class MathService {
     factorial(x) {
       return x === 1 ? x : this.factorial(x - 1);
     }
   }

   export const [registerMathService, getMathService] = defineProxyService(
     'MathService',
     () => new MathService(),
   );
   ```

2. Register your new service at the beginning of your background script:

   ###### background.ts

   ```ts
   import { registerMathService } from './MathService';

   registerMathService();
   ```

3. Use `getService` to get a proxied instance of your service, and call methods on it like you would with the real service.

   ###### popup.ts

   ```ts
   import { getMathService } from './MathService';

   // getMathService will return a "proxy" service when NOT in the background
   const mathService = getMathService();

   // Use the proxy just like you would the real service!
   await mathService.factorial(100);
   ```

### Another Example: IndexedDB

Since the same IndexedDB database is not available in every JS context of an extension, it's common to use the IndexedDB instance in the background script as a database for browser extensions.

`@webext-core/proxy-service` is perfect for this! Here we're using [`idb`](https://www.npmjs.com/package/idb) to simplify it's usage.

###### TodoRepo.ts

```ts
import { IDBPDatabase } from 'idb';

interface ITodoRepo {
  getOne: (id: string) => Promise<Todo>;
  getAll: () => Promise<Todo[]>;
  create: (todo: Todo) => Promise<void>;
  update: (todo: Todo) => Promise<void>;
  delete: (todo: Todo) => Promise<void>;
}

function createIdbTodoRepo(idb: Promise<IDBPDatabase>): ITodoRepo {
  return {
    getOne: async id => (await idb).get('todos', id),
    getAll: async () => (await idb).getAll('todos'),
    create: async todo => (await idb).add('todos', todo),
    update: async todo => (await idb).put('todos', todo),
    delete: async todo => (await idb).delete('todos', todo.id),
  };
}

const [registerTodoRepo, getTodoRepo] = defineProxyService('TodoRepo', createIdbTodoRepo);
```

When registering a service with a dependency, you need to pass that dependency into the `registerService` method:

###### background.ts

```ts
import { registerTodoRepo } from './TodoRepo';
import { openDB } from 'idb';

const idb = openDB(...);

registerTodoRepo(idb);
```

Then you can use `getService` to get a instance of the service anywhere thoughout your extension!

###### popup.ts

```ts
import { getTodoRepo } from './TodoRepo';

const todoRepo = getTodoRepo();

const todos = await todoRepo.getAll();
```
