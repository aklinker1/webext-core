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

Then write your tests. Make sure to call `vi.mock("webextension-polyfill")` to tell vitest to use the mock we just setup.

```ts
import browser from 'webextension-polyfill';
import { fakeBrowser } from '@webext-core/fake-browser';
import { localExtStorage } from '@webext-core/storage';
import { test, vi } from 'vitest';

// Normally, the function being tested would be in a different file
function isXyzEnabled(): Promise<boolean> {
  return localExtStorage.getItem('xyz');
}

// Enable the global mock
vi.mock('webextension-polyfill');

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

Calling `vi.mock` in every file is a pain. Instead, you can add a setup file that calls it before all your tests:

```ts
// vitest.setup.ts
vi.mock('webextension-polyfill');
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  testing: {
    setupFiles: ['vitest.setup.ts'],
  },
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
