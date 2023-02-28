# webext-core

[![Validate](https://github.com/aklinker1/webext-core/actions/workflows/validate.yml/badge.svg)](https://github.com/aklinker1/webext-core/actions/workflows/validate.yml)

A set of core libraries and tools for building web extensions. These libraries are built on top of [`webextension-polyfill`](https://www.npmjs.com/package/webextension-polyfill) and support all browsers.

- [`@webext-core/messaging`](https://webext-core.aklinker1.io/messaging): Light weight, type-safe wrapper around the web extension messaging APIs
- [`@webext-core/storage`](https://webext-core.aklinker1.io/storage): Local storage based, **type-safe** wrappers around the storage API
- [`@webext-core/fake-browser`](https://webext-core.aklinker1.io/fake-browser): An in-memory implementation of `webextension-polyfill` for testing
- [`@webext-core/proxy-service`](https://webext-core.aklinker1.io/proxy-service): Write services that can be called from any JS context, but run in the background service worker
- [`@webext-core/isolated-element`](https://webext-core.aklinker1.io/isolated-element): Isolate content script UIs from the page's styles

## Documentation

To get started with any of these libraries, head over to the [documentation website](https://webext-core.aklinker1.io)!
