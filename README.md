# webext-core

[![Validate](https://github.com/aklinker1/webext-core/actions/workflows/validate.yml/badge.svg)](https://github.com/aklinker1/webext-core/actions/workflows/validate.yml)

A set of core libraries and tools for building web extensions. These libraries are built on top of [`webextension-polyfill`](https://www.npmjs.com/package/webextension-polyfill) and support all major browsers.

- [![Messaging NPM](https://img.shields.io/npm/v/@webext-core/messaging?color=%23C12127&label=%40webext-core%2Fmessaging&logo=npm)](https://www.npmjs.com/package/@webext-core/messaging) A lightweight, **type-safe** wrapper around the messaging API
- [![Storage NPM](https://img.shields.io/npm/v/@webext-core/storage?color=%23C12127&label=%40webext-core%2Fstorage&logo=npm)](https://www.npmjs.com/package/@webext-core/storage) Local storage based, **type-safe** wrappers around the storage API
- [![Fake Browser NPM](https://img.shields.io/npm/v/@webext-core/fake-browser?color=%23C12127&label=%40webext-core%2Ffake-browser&logo=npm)](https://www.npmjs.com/package/@webext-core/fake-browser) An in-memory implementation of `webextension-polyfill` for testing
- [![Proxy Service NPM](https://img.shields.io/npm/v/@webext-core/proxy-service?color=%23C12127&label=%40webext-core%2Fproxy-service&logo=npm)](https://www.npmjs.com/package/@webext-core/proxy-service) Write services that can be called from any JS context, but run in the background service worker
- [![Isolated Element NPM](https://img.shields.io/npm/v/@webext-core/isolated-element?color=%23C12127&label=%40webext-core%2Fisolated-element&logo=npm)](https://www.npmjs.com/package/@webext-core/isolated-element) Isolate content script UIs from the page's styles

> See `packages/<package-name>/README.md` for more details about the individual packages.

###### Future Libraries

- [ ] `@webext-core/content-script-ctx`: Stop content scripts when their context is invalidated
- [ ] `@webext-core/publish`: A tool for publishing an extension to the various stores

## Get Started

To use an NPM module in a web extension, you'll need to install a bundler and configure it for web extensions. Then install any of the packages from the `@webext-core` scope:

```bash
# Install a bundler and plugin for building extensions
npm i -D vite vite-plugin-web-extension

# Install a @webext-core package
npm i @webext-core/messaging
npm i @webext-core/storage
npm i -D @webext-core/publish
```
