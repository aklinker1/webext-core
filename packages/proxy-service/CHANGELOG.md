# Changelog

## v2.0.1

[compare changes](https://github.com/aklinker1/webext-core/compare/proxy-service-v2.0.0...proxy-service-v2.0.1)

### 🩹 Fixes

- Add prepack script to fix new publish workflow ([`536c73e`](https://github.com/aklinker1/webext-core/commit/536c73e710cbebf41d0afeeca7a2100d904401ac))
- Relax `webextension-polyfill` version range ([#153](https://github.com/aklinker1/webext-core/pull/153))

### 📖 Documentation

- Fix redirects ([#127](https://github.com/aklinker1/webext-core/pull/127))
- Add historical release notes to CHANGELOG.md files ([`e9762ad`](https://github.com/aklinker1/webext-core/commit/e9762adc1dad49f44812759a4fade8e326fe78fa))

### 🏡 Chore

- Cleanup dependencies ([#147](https://github.com/aklinker1/webext-core/pull/147))
- Move to `bun test` ([#148](https://github.com/aklinker1/webext-core/pull/148))
- Move to `tsdown`, add `publint`, cleanup `package.json`s ([#149](https://github.com/aklinker1/webext-core/pull/149))
- Use `oxlint` and `oxfmt` ([#152](https://github.com/aklinker1/webext-core/pull/152))

### ❤️ Contributors

- spookyuser <spookyuser@users.noreply.github.com>
- Aaron <aaronklinker1@gmail.com>
- Artem Prokop <44642024+ExposedCat@users.noreply.github.com>

## v2.0.0

### Features

- V2 refactor (#122) (ad9fcbea9f304ebf509cc5789a09956ee82c2f81)

### BREAKING CHANGES

- See migration details in PR details: https://github.com/aklinker1/webext-core/pull/122

## v1.2.2

### Bug Fixes

- No changes, force a new release (9f5606375010114c71352852bd5edc344b0cecd1)

## v1.2.1

### Bug Fixes

- Adjust peerDependency requirements for webextension-polyfill (68c9616a3b64dcbb952c5d8ff623758e32d77452)

## v1.2.0

### Features

- Export `flattenPromise` helper function (#26) (bbb1bc2f31c66681441102c3e160122585b0a39a)

### Bug Fixes

- Tweak `getService` return type and export new types (4aa0cf124e0054cdba6fe29d1285ea4618dfe41b)

## v1.1.1

### Bug Fixes

- Make messaging package a peer dependency to decouple versioning (5ca8302abcb0c7743cf5c97ce0d809255a54a89e)

## v1.1.0

### Features

- Support raw functions and nested objects (#16) (ade768187966a7aaf6eaf9adb7942bc2274006e6)

## v1.0.3

### Bug Fixes

- Output iife format (65dd9d6686bfbb8fb240dbfa544a11c15cd26c59)

## v1.0.2

### Bug Fixes

- **proxy-service:** remove log (2ca430233f8e89eb707b2e6138b363f2b41ca7eb)

## v1.0.1

### Bug Fixes

- **proxy-service:** pass config into messenger (a23f16c1e8c1295ee96c197bd6ad5c7f533632ea)
- **proxy-service:** name returned tuple indexes (8a18a82465a9fe63c2f2ef61b5cea0dc4551d45f)

## v1.0.0

Initial release of [`@webext-core/proxy-service`](https://github.com/aklinker1/webext-core/tree/main/packages/proxy-service) 🎉
