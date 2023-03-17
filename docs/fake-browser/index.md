---
titleTemplate: '@webext-core/fake-browser'
---

# Fake Browser

<ChipGroup>
  <Chip text="MV2" type="manifest" />
  <Chip text="MV3" type="manifest" />
  <Chip text="Vitest" type="testing-framework" />
  <Chip text="Jest" type="testing-framework" />
</ChipGroup>

## Overview

An in-memory implementation of webextension-polyfill for testing. Supports all test frameworks (Vitest, Jest, etc).

```ts
pnpm i -D @webext-core/fake-browser
```

> This package only really works with projects using node, so only the NPM install steps are shown.

See [Testing Frameworks](/fake-browser/testing-frameworks) to setup mocks for your testing framework of choice.

## Examples

See [Implemented APIs](/fake-browser/implemented-apis) for example tests and details on how to use each API.
