# Analytics

<ChipGroup>
  <Chip text="MV2" type="manifest" />
  <Chip text="MV3" type="manifest" />
  <Chip text="Chrome" type="browser" />
  <Chip text="Firefox" type="browser" />
  <Chip text="Safari" type="browser" />
</ChipGroup>

## Overview

`@webext-core/analytics` provides basic analytics (event reporting and page views) for web extensions! Report events from anywhere: your background script/service worker, content scripts, or HTML pages.

Comes with built-in support for [Umami](/guide/analytics/umami) and [Google Analytics 4](/guide/analytics/google-analytics-4).

## Installation

###### NPM

```sh
pnpm i @webext-core/analytics
```

```ts
import { ... } from '@webext-core/analytics';
```

###### CDN

```sh
curl -o analytics.js https://cdn.jsdelivr.net/npm/@webext-core/analytics/lib/index.global.js
```

```html
<script src="/analytics.js"></script>
<script>
  const { ... } = webExtCoreAnalytics;
</script>
```

## Usage
