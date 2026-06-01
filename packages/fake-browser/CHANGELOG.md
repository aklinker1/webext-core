# Changelog

## v1.5.2

[compare changes](https://github.com/aklinker1/webext-core/compare/fake-browser-v1.5.1...fake-browser-v1.5.2)

### 🩹 Fixes

- Relax `webextension-polyfill` version range (#153)

### ❤️ Contributors

- Aaron <aaronklinker1@gmail.com>

## v1.5.1

[compare changes](https://github.com/aklinker1/webext-core/compare/fake-browser-v1.5.0...fake-browser-v1.5.1)

### 🩹 Fixes

- Don't use directory import for auto-setup module ([`8168516`](https://github.com/aklinker1/webext-core/commit/816851683f3bf7fd5d79e938ec213a5eabb5140d))

### 📖 Documentation

- Add historical release notes to CHANGELOG.md files ([`e9762ad`](https://github.com/aklinker1/webext-core/commit/e9762adc1dad49f44812759a4fade8e326fe78fa))

### 🏡 Chore

- Use `oxlint` and `oxfmt` (#152)
- Move to `tsdown`, add `publint`, cleanup `package.json`s (#149)
- Move to `bun test` (#148)
- Cleanup dependencies (#147)

### ❤️ Contributors

- Aaron <aaronklinker1@gmail.com>

## v1.5.0

[compare changes](https://github.com/aklinker1/webext-core/compare/fake-browser-v1.4.1...fake-browser-v1.5.0)

### 🚀 Features

- Add `/auto` submodule for auto-stubbing (#146)

### ❤️ Contributors

- Aaron <aaronklinker1@gmail.com>

## v1.4.1

[compare changes](https://github.com/aklinker1/webext-core/compare/fake-browser-v1.4.0...fake-browser-v1.4.1)

### 🩹 Fixes

- Add prepack script to fix new publish workflow ([`536c73e`](https://github.com/aklinker1/webext-core/commit/536c73e710cbebf41d0afeeca7a2100d904401ac))

### ❤️ Contributors

- Aaron <aaronklinker1@gmail.com>

## v1.4.0

[compare changes](https://github.com/aklinker1/webext-core/compare/fake-browser-v1.3.4...fake-browser-v1.4.0)

### 🚀 Features

- **fake-browser**: Action API in-memory implementation. (#101)

### 🩹 Fixes

- Make `@types/webextension-polyfill` a production dependency

### 📖 Documentation

- Fix redirects (#127)

### ❤️ Contributors

- spookyuser <spookyuser@users.noreply.github.com>
- Gliches <nishumurmu017@gmail.com>
- Aaron <aaronklinker1@gmail.com>
- Artem Prokop <44642024+ExposedCat@users.noreply.github.com>

## v1.3.4

### Bug Fixes

- No changes, force a new release (35eadb09ccdd599df01aea886ce7d63c3237d42a)

## v1.3.3

### Bug Fixes

- Push new tabs to tabList on creation (#106) (ec71c77f2f4daa696c3a6c1247a58cfe91acbb46)
- Removing window fires event handler (#107) (5e411c322561be3561222ca248e8226972d526e1)

## v1.3.2

### Bug Fixes

- ensure nested objects are not mutated on set operation (#84) (b93210fd80fe4126ae6ea7d9dba89f97e51a630e)

## v1.3.1

### Bug Fixes

- Correctly handle when a key is set to `null` in storage (cb5dec730a7bee96394610a210083447de1e22d7)

## v1.3.0

### Features

- Upgrade `webextension-polyfill` types to 0.10.5 (#46) (cbfc4e515909087e9129ae90061457fb8ad5923e)

## v1.2.2

### Bug Fixes

- Return first response from multiple message listeners (bbce903530310f94a230d59a8c6addff693dd792)

## v1.2.1

### Bug Fixes

- Implement `runtime.getURL` (270bd8f99de4884c6149cfe6caf402f7fc2e5aef)

## v1.2.0

### Features

- Implement notifications API (#17) (735fe02875521284e0c60df160982d542155cd3e)

## v1.1.0

### Features

- Add `webNavigation` implementation (35255acc3afdcee9c86f3cb5eef3a3f3d5c5cdad)

## v1.0.4

### Bug Fixes

- reset the `runtime.id` (aeedf4edee5289d7338831c026c37cec9857c2aa)

## v1.0.3

### Bug Fixes

- Output iife format (209433fed82378dff8d33eb23118ee4f2bbc6e03)

## v1.0.2

### Bug Fixes

- **fake-browser:** Fix typos in README (249627b1ce912a201057ac783fbaef3c47b9a0d1)

## v1.0.1

### Bug Fixes

- **fake-browser:** add missing metadata to package.json (af7e6471f8bed397bfe061d8ec326d990b848cd1)
- **fake-browser:** Generate base implementation (#3) (6c7e3dfac7fc426406514bbb415a6deaf4de4cb4)

## v1.0.0

### Features

- Implement `alarms` API
- Implement `storage` API
- Implement `runtime` messaging
- Implement some `runtime` events (`onStartup`, `onSuspend`, `onSuspendCanceled`, `onInstalled`, `onUpdateAvailable`)
