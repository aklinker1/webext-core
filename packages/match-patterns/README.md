# `@webext-core/match-patterns`

Utilities for working with [match patterns](https://developer.chrome.com/docs/extensions/mv3/match_patterns/).

```bash
pnpm i @webext-core/match-patterns
```

```ts
import { MatchPattern } from '@webext-core/match-patterns';

const pattern = MatchPattern('*://*.google.com/*');

pattern.includes('http://google.com/search?q=test'); // true
pattern.includes('https://accounts.google.com'); // true
pattern.includes('https://youtube.com/watch'); // false
```

## Get Started

See [documentation](https://webext-core.aklinker1.io/guide/match-patterns/) to get started!

### Supported Protocols

Not all protocols are supported. Open a PR to add support.

- [x] `<all_urls>`
- [x] `https` protocol
- [x] `http` protocol
- [ ] `file` protocol
- [ ] `ftp` protocol
- [ ] `urn` protocol
