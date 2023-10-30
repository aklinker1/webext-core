# Testing Frameworks

`@webext-core/fake-browser` works with all frameworks. Setup for only a few of the major testing frameworks is listed below.

[[toc]]

> Open a PR to add an example for your framework of choice!

## Vitest

To tell Vitest to use `@webext-core/fake-browser` instead of `webextension-polyfill`, you need to setup a global mock:

```ts
// <root>/__mocks__/webextension-polyfill.ts
export { fakeBrowser as default } from '@webext-core/fake-browser';
```

Next, create a global setup file, `vitest.setup.ts`, where we actually test vitest to use our mock:

```ts
import { vi } from 'vitest';

vi.mock('webextension-polyfill');
```

Finally, update your `vitest.config.ts` file:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // List setup file
    setupFiles: ['vitest.setup.ts'],

    // List ALL dependencies that use `webextension-polyfill` under `server.deps.include`.
    // Without this, Vitest can't mock `webextension-polyfill` inside the dependencies, and the
    // actual polyfill will be loaded in tests
    //
    // You can get a list of dependencies using your package manager:
    //   - npm list webextension-polyfill
    //   - yarn list webextension-polyfill
    //   - pnpm why webextension-polyfill
    server: {
      deps: {
        include: ['@webext-core/storage', ...],
      },
    },
  },
});
```

Then write your tests!

```ts
import browser from 'webextension-polyfill';
import { fakeBrowser } from '@webext-core/fake-browser';
import { localExtStorage } from '@webext-core/storage';
import { test, vi } from 'vitest';

// Normally, the function being tested would be in a different file
function isXyzEnabled(): Promise<boolean> {
  return localExtStorage.getItem('xyz');
}

describe('isXyzEnabled', () => {
  beforeEach(() => {
    // Reset the in-memory state before every test
    fakeBrowser.reset();
  });

  it('should return true when enabled', async () => {
    const expected = true;
    // Use either browser or fakeBrowser to setup your test case
    await browser.storage.local.set({ xyz: expected });

    const actual = await isXyzEnabled();

    expect(actual).toBe(expected);
  });
});
```

## Jest

To tell Jest to use `@webext-core/fake-browser` instead of `webextension-polyfill`, you need to setup a global mock:

```ts
// ./__mocks__/webextension-polyfill.js
module.exports = require('@webext-core/fake-browser').default;
```

Next, we'll use the `moduleNameMapper` option to point all imports of `webextension-polyfill` to `./__mocks__/webextension-polyfill.js` instead.

```js
// ./jest.config.js
module.exports = {
  moduleNameMapper: {
    '^webextension-polyfill$': '<rootDir>/__mocks__/webextension-polyfill.js',
  },
};
```

Then write your tests!

```ts
import browser from 'webextension-polyfill';
import { fakeBrowser } from '@webext-core/fake-browser';
import { localExtStorage } from '@webext-core/storage';

// Normally, the function being tested would be in a different file
function isXyzEnabled(): Promise<boolean> {
  return localExtStorage.getItem('xyz');
}

describe('isXyzEnabled', () => {
  beforeEach(() => {
    // Reset the in-memory state before every test
    fakeBrowser.reset();
  });

  it('should return true when enabled', async () => {
    const expected = true;
    // Use either browser or fakeBrowser to setup your test case
    await browser.storage.local.set({ xyz: expected });

    const actual = await isXyzEnabled();

    expect(actual).toBe(expected);
  });
});
```
