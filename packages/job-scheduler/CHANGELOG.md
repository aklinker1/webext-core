# Changelog

## v2.0.0

[compare changes](https://github.com/aklinker1/webext-core/compare/job-scheduler-v1.1.0...job-scheduler-v2.0.0)

### 🩹 Fixes

- Drop `webextension-polyfill`, use `chrome` global instead ([#160](https://github.com/aklinker1/webext-core/pull/160))

### 🏡 Chore

- Cleanup tests ([`782646d`](https://github.com/aklinker1/webext-core/commit/782646d7e54365c60dbe661d7541ac64222538d2))
- Cleanup types, update docs ([`0ed8fa2`](https://github.com/aklinker1/webext-core/commit/0ed8fa25c60145fc2e8cd32093897b0caee70514))
- Drop CJS support ([#164](https://github.com/aklinker1/webext-core/pull/164))
- Standardize `IIFE` filenames `lib/index.global.js` -> `dist/index.iife.js` ([#165](https://github.com/aklinker1/webext-core/pull/165))

### ⚠️ Breaking Changes

- Drop `webextension-polyfill`, use `chrome` global instead
- Drop CJS support
- Standardize `IIFE` filenames `lib/index.global.js` -> `dist/index.iife.js`

### ❤️ Contributors

- [@aklinker1](https://github.com/aklinker1)

## v1.1.0

[compare changes](https://github.com/aklinker1/webext-core/compare/job-scheduler-v1.0.0...job-scheduler-v1.1.0)

### 🚀 Features

- **fake-browser**: Upgrade `webextension-polyfill` types to 0.10.5 (#46)

### 🩹 Fixes

- Relax `webextension-polyfill` version range (#153)
- Add prepack script to fix new publish workflow ([`536c73e`](https://github.com/aklinker1/webext-core/commit/536c73e710cbebf41d0afeeca7a2100d904401ac))

### 📖 Documentation

- Add historical release notes to CHANGELOG.md files ([`e9762ad`](https://github.com/aklinker1/webext-core/commit/e9762adc1dad49f44812759a4fade8e326fe78fa))
- Fix redirects (#127)

### 🏡 Chore

- Use `oxlint` and `oxfmt` (#152)
- Move to `tsdown`, add `publint`, cleanup `package.json`s (#149)
- Move to `bun test` (#148)
- Cleanup dependencies (#147)
- Refactor to bun workspaces (#66)

### ❤️ Contributors

- spookyuser <spookyuser@users.noreply.github.com>
- Hello <egg734631@gmail.com>
- Aaron <aaronklinker1@gmail.com>
- Artem Prokop <44642024+ExposedCat@users.noreply.github.com>

## v1.0.0

Initial release of the new [`@webext-core/job-scheduler`](https://webext-core.aklinker1.io/guide/job-scheduler/) package. It can be used to schedule:

- CRON jobs
- One-time jobs
- Jobs that run on a simple interval
