# Get Started

## Overview

An in-memory implementation of the `webextension-polyfill` package for testing.

```ts
pnpm i -D @webext-core/fake-browser
```

This package only really works with projects using a testing frame and node, so only the NPM install steps are shown.

See [Testing Frameworks](/fake-browser/testing-frameworks) to setup mocks for your testing framework of choice and see a simple example test.

See [Implemented APIs](/fake-browser/implemented-apis) for caveots and limitations.

## Examples

For a basic example of how to use `fakeBrowser` in a unit test, see the [Testing Frameworks](/fake-browser/testing-frameworks) documentation. There's a simple test for each testing framework.

For more examples of using the `fakeBrowser` in tests, lookup `.test.ts` files in the [`webext-core` repo](https://github.com/aklinker1/webext-core/find/main). This package powers the unit tests for all the `@webext-core` packages.

Specifically, here are a few good examples:

- [`packages/storage/src/index.test.ts`](https://github.com/aklinker1/webext-core/blob/main/packages/storage/src/index.test.ts)
- [`packages/messaging/src/index.test.ts`](https://github.com/aklinker1/webext-core/blob/main/packages/messaging/src/index.test.ts)
