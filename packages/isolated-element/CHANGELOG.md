# Changelog

## v2.0.0

### Bug Fixes

- Use a `div` instead of `html` (#128) (40f983b5516c451c8615c2eaf87b1648cce1b681)

### BREAKING CHANGES

- See migration details in PR details: https://github.com/aklinker1/webext-core/pull/128

## v1.1.5

Re-release of [v1.1.3](https://github.com/aklinker1/webext-core/releases/tag/isolated-element-v1.1.3) after the bad [v1.1.4](https://github.com/aklinker1/webext-core/releases/tag/isolated-element-v1.1.4) release so there's a good version available that matches the `^1.0.0` semver range.

This will be the last version of this package for v1. Please upgrade to [v2.0.0](https://github.com/aklinker1/webext-core/releases/tag/isolated-element-v2.0.0).

## v1.1.4

DO NOT USE. This version includes breaking changes unintentionally, and should have been released as v2.0.0 - my auto-release workflow broke.

If you want to upgrade to [v2.0.0](https://github.com/aklinker1/webext-core/releases/tag/isolated-element-v2.0.0), please do! Not needing a full HTML doc structure is a great change, but it shouldn't have been released under v1.

However, if you're not ready to upgrade, use v1.1.5.

## v1.1.3

### Bug Fixes

- allow certain builtin elements (#116) (d00c01861f8ab52e3748edaf41eacc1fee48c091)

## v1.1.2

### Bug Fixes

- Validate custom element name (#60) (28602f4ce4fef360bf1441bb8ce37466a6a58b63)

## v1.1.1

### Bug Fixes

- Ensure proper bubbling of events from isolated elements (#54) (12820edd06e5b16427856c64136e24a8edba1aaf)

## v1.1.0

### Features

- Add event bubbling control with isolateEvents option (#53) (2fdc5647def3041fdfe8205b1837fd1d14d41f4c)

## v1.0.4

### Bug Fixes

- Remove webcomponents dependency (#40) (695a1c0c2dcbc2ea5be73c4bcdf088d057188f96)

## v1.0.3

### Bug Fixes

- Output iife format (b6b14735e299128e23a510bf702bd6c4579acef9)

## v1.0.2

### Bug Fixes

- don't redefine the underlying custom element (26434f6dbe7de4ba3af3a2df2da36f63cdf04032)

## v1.0.1

### Bug Fixes

- fix `<style>` element mounting (e22d3a59ef6ebc00d156b5d36e46bcd222c77fe3)

## v1.0.0

### Features

- **isolated-element:** isolate styles from injected UIs (#9) (0d781b46b072d75c32e638b1cc8a1cdb04ddb205)
