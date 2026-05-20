# Changelog

## v3.0.1

[compare changes](https://github.com/aklinker1/webext-core/compare/messaging-v3.0.0...messaging-v3.0.1)

### 🩹 Fixes

- Add prepack script to fix new publish workflow ([`536c73e`](https://github.com/aklinker1/webext-core/commit/536c73e710cbebf41d0afeeca7a2100d904401ac))

### ❤️ Contributors

- Aaron <aaronklinker1@gmail.com>

## v3.0.0

[compare changes](https://github.com/aklinker1/webext-core/compare/messaging-v2.3.0...messaging-v3.0.0)

### 🚀 Features

- **messaging**: Add `targetWindow` to the window messenger (#114)

### 🩹 Fixes

- Drop `uid` for simple random ID (#141)
- ⚠️ Ignore unknown messages instead of throwing an error by default (#140)
- **messaging**: Matching response event by message id (#125)
- **types**: Avoid unbound-method lint errors by adding `this: void` (#130)

### 📖 Documentation

- Fix redirects (#127)

### 🏡 Chore

- **deps**: Replace `serialize-error` with `@aklinker1/zero-serialize-error` for a smaller footprint

### ✅ Tests

- **messaging**: Validate response ordering (#132)

### ❤️ Contributors

- tim <tim@foxwallet.com>
- spookyuser <spookyuser@users.noreply.github.com>
- Takahito Nakano <kano@ponko2.jp>
- gracenoah <gracenoahgh@gmail.com>
- Himanshu Patil <dev@himanshupatil.dev>
- Aaron <aaronklinker1@gmail.com>
- Artem Prokop <44642024+ExposedCat@users.noreply.github.com>

## v2.3.0

### Features

- Make `sendMessage` data parameter optional when possible (#98) (e67e2b54ec01bf7eec383679cbafb4140f679389)

## v2.2.0

### Features

- Add support for `frameId` (#88) (63f961c89a30ae0b53cab773978901f0cb7dbf12)

## v2.1.0

### Features

- add breakError to the config (#77) (#81) (ea87d133427b9b2d257d8afafffc6bb95cbaa1fa)

## v2.0.3

### Bug Fixes

- Add verification process for the window messaging (#79) (175212498ab0035ca0d473442bc69704bee51c25)

## v2.0.2

### Bug Fixes

- Install publint and fix package.json issues (9edf844c7a9d609ed4c6ceca38dcffb62ce3da25)

## v2.0.1

### Bug Fixes

- Upgrade buildc to fix out-of-date build (9311e2c8a0a959bd84f0dad8ad80441d114de66a)

## v2.0.0

### Bug Fixes

- ⚠️ Fix mix up messaging in window and custom event messengers ([#70](https://github.com/aklinker1/webext-core/pull/70)) (3b4e0ad42409800b742e0d4387ded4615f5e1883)

### ⚠️ Breaking Changes

Potentially breaking change around window and custom event messaging. Each now has better scoping to prevent receiving messages in the same context they were sent from. If you rely on `defineWindowMessaging` or `defineCustomEventMessaging`, double check they everything is working the same way as before.

## v1.4.0

### Features

- Serialize/deserialize errors (#37) (348285b2d611ec1eaa872bbbf0458a0e050b4407)
- Window and Custom Event messaging (#33) (e8cdd831f59ac2254ad01795bf578dce4930932d)

## v1.3.1

### Bug Fixes

- Fix regression around supporting multiple messengers (71c654da9a0fde64f9ce7eb59bea650632a1fa0d)

## v1.3.0

### Features

- Simplify protocol map definitions with function types (#21) (a91196d1bee92c5b87eec224802eb83cfa0559ce)

## v1.2.0

### Features

- Add `removeAllMessageListeners` (467c8e98d4f845c385c8965d232a12f03a52d526)

## v1.1.1

### Bug Fixes

- Output iife format (043563c3a8795f26fc754f6148f4c8830fa33840)

## v1.1.0

### Features

- **messaging:** Add support for removing listeners (8c536db4f5dbb8232b92516d5065855639eb9bf6)

## v1.0.3

### Bug Fixes

- **messaging:** export messaging config type (f54f266b7224150b0ffd27b93972b79dda708706)

## v1.0.2

### Bug Fixes

- **messaging:** increment message ID correctly (1148987e5de2038d81adb61675a2534c62bf97fb)
- **messaging:** allow defining multiple messengers without creating a permanent, unresolved promise (2823abe62e2073b1246960d3fbb9d6a447b8a54e)

## v1.0.1

### Bug Fixes

- **messaging:** add missing metadata to package.json (d923d3a3394e9b98378d18826a4dd8d09ec0742c)

## v1.0.0

### Features

- `defineExtensionMessaging` to declare type-safe messaging functions
