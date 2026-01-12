# webext-core

[![Validate](https://github.com/aklinker1/webext-core/actions/workflows/validate.yml/badge.svg)](https://github.com/aklinker1/webext-core/actions/workflows/validate.yml)

A set of core libraries and tools for building web extensions. These libraries are built on top of [`webextension-polyfill`](https://www.npmjs.com/package/webextension-polyfill) and support all browsers.

- [`@webext-core/messaging`](https://webext-core.aklinker1.io/messaging/installation): Light weight, type-safe wrapper around the web extension messaging APIs
- [`@webext-core/storage`](https://webext-core.aklinker1.io/storage/installation): Local storage based, **type-safe** wrappers around the storage API
- [`@webext-core/job-scheduler`](https://webext-core.aklinker1.io/job-scheduler/installation): Schedule reoccuring jobs using the Alarms API
- [`@webext-core/fake-browser`](https://webext-core.aklinker1.io/fake-browser/installation): An in-memory implementation of `webextension-polyfill` for testing
- [`@webext-core/proxy-service`](https://webext-core.aklinker1.io/proxy-service/installation): Write services that can be called from any JS context, but run in the background service worker
- [`@webext-core/isolated-element`](https://webext-core.aklinker1.io/isolated-element/installation): Isolate content script UIs from the page's styles

## Documentation

To get started, checkout the [documentation website](https://webext-core.aklinker1.io).

## Contributors

Published under the [MIT](https://github.com/aklinker1/webext-core/blob/main/LICENSE) license.
Made by [@aklinker1](https://github.com/aklinker1) and [community](https://github.com/aklinker1/webext-core/graphs/contributors) 💛

[![webext-core contributors](https://contrib.rocks/image?repo=aklinker1/webext-core)](https://github.com/wxt-dev/wxt/graphs/contributors)
