# Changelog

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
