# webext-core

[![Validate](https://github.com/aklinker1/webext-core/actions/workflows/validate.yml/badge.svg)](https://github.com/aklinker1/webext-core/actions/workflows/validate.yml)

A set of core libraries and tools for building web extensions.

- [x] `@webext-core/messaging`: A lightweight, **type-safe** wrapper around the messaging API
- [x] `@webext-core/storage`: Local storage based, **type-safe** wrappers around the storage API
- [x] `@webext-core/fake-browser`: An in-memory implementation of the `Browser` APIs for testing
- [x] `@webext-core/proxy-service`: Write services that can be called from any JS context, but run in the background service worker
- [x] `@webext-core/isolated-element`: Isolate content script UIs from the page's styles
- [ ] `@webext-core/publish`: A tool for publishing an extension to the various stores
- [ ] `@webext-core/content-script-ctx`: Stop content scripts when their context is invalidated

> See `packages/*/README.md` for more details about the individual packages

## Get Started

Install any of the packages from the `@webext-core` scope:

```bash
pnpm i @webext-core/messaging
pnpm i @webext-core/storage
pnpm i -D @webext-core/publish
```
