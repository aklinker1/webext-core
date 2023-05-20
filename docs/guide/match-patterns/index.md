---
titleTemplate: '@webext-core/match-patterns'
next:
  text: API Reference
  link: /api/match-patterns
---

# Isolated Element

<ChipGroup>
  <Chip text="MV2" type="manifest" />
  <Chip text="MV3" type="manifest" />
  <Chip text="Chrome" type="browser" />
  <Chip text="Firefox" type="browser" />
  <Chip text="Safari" type="browser" />
</ChipGroup>

## Overview

`@webext-core/match-patterns` provides utilities for working with match patterns.

## Installation

###### NPM

```sh
pnpm i @webext-core/match-patterns
```

```ts
import { MatchPattern } from '@webext-core/match-patterns';
```

###### CDN

```sh
curl -o match-patterns.js https://cdn.jsdelivr.net/npm/@webext-core/match-patterns/lib/index.global.js
```

```html
<script src="/match-patterns.js"></script>
<script>
  const { MatchPattern } = webExtCoreMatchPatterns;
</script>
```

## Usage

`MatchPattern` includes one function: `includes`. It can be used to check if a URL is included (or matches) the match pattern.

```ts
const google = new MatchPattern('*://*.google.com');
google.includes('https://acounts.google.com'); // true
google.includes('https://google.com/search?q=test'); // true

const youtube = new MatchPattern('*://youtube.com/watch');
youtube.includes('https://youtube.com/watch'); // true
youtube.includes('https://youtube.com/mrbeast'); // false
youtube.includes('https://acounts.google.com'); // false
```
