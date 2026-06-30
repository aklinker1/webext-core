# Changelog

## v1.1.0

[compare changes](https://github.com/aklinker1/webext-core/compare/match-patterns-v1.0.3...match-patterns-v1.1.0)

### 🚀 Features

- File protocol implemented in match patterns package. ([#155](https://github.com/aklinker1/webext-core/pull/155))

### 🩹 Fixes

- Add prepack script to fix new publish workflow ([`536c73e`](https://github.com/aklinker1/webext-core/commit/536c73e710cbebf41d0afeeca7a2100d904401ac))
- `<all_urls>` match pattern should not support unknown protocols. ([#156](https://github.com/aklinker1/webext-core/pull/156))

### 📖 Documentation

- Fix redirects ([#127](https://github.com/aklinker1/webext-core/pull/127))
- Add historical release notes to CHANGELOG.md files ([`e9762ad`](https://github.com/aklinker1/webext-core/commit/e9762adc1dad49f44812759a4fade8e326fe78fa))
- Update MatchPattern instantiation in README ([#157](https://github.com/aklinker1/webext-core/pull/157))

### 🏡 Chore

- Refactor to bun workspaces ([#66](https://github.com/aklinker1/webext-core/pull/66))
- **match-patterns**: Add tests from official Chrome/Mozilla docs ([#134](https://github.com/aklinker1/webext-core/pull/134))
- Cleanup dependencies ([#147](https://github.com/aklinker1/webext-core/pull/147))
- Move to `bun test` ([#148](https://github.com/aklinker1/webext-core/pull/148))
- Move to `tsdown`, add `publint`, cleanup `package.json`s ([#149](https://github.com/aklinker1/webext-core/pull/149))
- Use `oxlint` and `oxfmt` ([#152](https://github.com/aklinker1/webext-core/pull/152))

### ❤️ Contributors

- spookyuser <spookyuser@users.noreply.github.com>
- Gliches <nishumurmu017@gmail.com>
- Aaron <aaronklinker1@gmail.com>
- Artem Prokop <44642024+ExposedCat@users.noreply.github.com>

## v1.0.3

### Bug Fixes

- Remove unnecessary dependencies (#51) (9797804deaa956a017f4957cdb7465b184f56f38)

## v1.0.2

### Bug Fixes

- Ignore unimplemented protocols and return true when checking `<all_urls>` patterns (7bac5ca07764fb84f55e5c795578aa32e2209636)

## v1.0.1

### Bug Fixes

- Fix bad NPM readme (63a05eead5c59ff11e41a9f92a208c3c6a97304a)

## v1.0.0

Initial release of `@webext-core/match-patterns`. Supports `<all_urls>`, `*` protocol, and the `http`/`https` protocols.
