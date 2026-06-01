# Changelog

## v1.2.1

[compare changes](https://github.com/aklinker1/webext-core/compare/storage-v1.2.0...storage-v1.2.1)

### 🩹 Fixes

- **fake-browser**: Correctly handle when a key is set to `null` in storage ([`,cb5dec`](https://github.com/aklinker1/webext-core/commit/,cb5dec730a7bee96394610a210083447de1e22d7))
- Add prepack script to fix new publish workflow ([`536c73e`](https://github.com/aklinker1/webext-core/commit/536c73e710cbebf41d0afeeca7a2100d904401ac))
- Relax `webextension-polyfill` version range ([#153](https://github.com/aklinker1/webext-core/pull/153))

### 📖 Documentation

- Fix redirects ([#127](https://github.com/aklinker1/webext-core/pull/127))
- Add historical release notes to CHANGELOG.md files ([`e9762ad`](https://github.com/aklinker1/webext-core/commit/e9762adc1dad49f44812759a4fade8e326fe78fa))

### 🏡 Chore

- Refactor to bun workspaces ([#66](https://github.com/aklinker1/webext-core/pull/66))
- Cleanup dependencies ([#147](https://github.com/aklinker1/webext-core/pull/147))
- Move to `bun test` ([#148](https://github.com/aklinker1/webext-core/pull/148))
- Move to `tsdown`, add `publint`, cleanup `package.json`s ([#149](https://github.com/aklinker1/webext-core/pull/149))
- Use `oxlint` and `oxfmt` ([#152](https://github.com/aklinker1/webext-core/pull/152))

### ❤️ Contributors

- spookyuser <spookyuser@users.noreply.github.com>
- Aaron Klinker <aaronklinker1@gmail.com>
- Artem Prokop <44642024+ExposedCat@users.noreply.github.com>

## v1.2.0

### Features

- Add `sessionExtStorage` (#47) (49ebe5a432971daaa99b671c47ef5ce14c9ddbc6)

## v1.1.3

### Bug Fixes

- Add wrapper function for storage clear (#42) (73e4727f17b161821c7cf634a60b2dcbb0b37e7c)

## v1.1.2

### Bug Fixes

- Error comparing storage instances for change listener (aa0edd04b804858d4f5ed063e870f1b9ac8b758a)

## v1.1.1

### Bug Fixes

- Output iife format (72205d6cfcaa99e50acf7ff5b09ad0c02bd746b7)

## v1.1.0

### Features

- Add `onChange` listeners (#10) (a2057243d20798fcbacdfe7c9424ee5ebe9df097)

## v1.0.1

### Bug Fixes

- **storage:** add missing metadata to package.json (e5348a356ff7091f536fc56ef735eba2682ecb7e)

## v1.0.0

### Features

- `defineExtensionStorage` to create typed storage implmenetations
- `localExtStorage`, `syncExtStorage`, and `managedExtStorage` for generic use
