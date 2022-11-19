# `@webext-core/proxy-service`

Defer service execution to the background service worker (or page).

```ts
// todos-repo.ts
import idb from 'idb';

interface TodosRepo {
  getOne: (id: string) => Promise<Todo>;
  getAll: () => Promise<Todo[]>;
  create: (todo: Todo) => Promise<void>;
  update: (todo: Todo) => Promise<void>;
  delete: (todo: Todo) => Promise<void>;
}

export const [registerTodosRepo, getTodosRepo] = defineProxyService<TodosRepo>(
  "TodosRepo",
  (idb: Promise<IDBDatabase>) => ({
    // Implement the `TodosRepo`
    getOne: (id) => ...,
    getAll: () => ...,
    create: (todo) => ...,
    update: (todo) => ...,
    delete: (todo) => ...,
  })
);
```

```ts
// background.ts
import {} from 'idb';
import { registerTodosRepo, getTodosRepo } from './todos-repo';

const idb = IndexedDB.open(...);
registerTodosRepo(idb);

// getTodosRepo will return the "real" service when in the background
const todosRepo = getTodosRepo();
```

```ts
// popup.ts
import { getTodosRepo } from 'todos-repo';

// getTodosRepo will return a "proxy" service when NOT in the background
const todosRepo = getTodosRepo();
```

Behind the scenes, the "proxy" service will message the background asking the registered service to perform all the real logic to execute a function.

Here, we're using `IndexedDB` to store Todos. Because standard web storage APIs aren't shared accross all JS contexts of your extension (popup `IndexedDB` does not contain any documents the background's `IndexedDB` contains), we need to always access the database from the background.

`@webext-core/proxy-service` is perfect for this!
