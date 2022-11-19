# `@webext-core/fake-browser`

Fake implementation of the `webextension-polyfill` Browser API for testing.

```bash
pnpm i -D @webext-core/fake-browser
```

## Usage

To use the fake object in tests, configure your testing framework to use `fakeBrowser` as the mock for `webextension-polyfill`. Then use `Browser` in production code and `fakeBrowser` to setup tests.

### Vite

1. Define a global mock for the `webextension-polyfill` package:

   ###### \<rootDir\>/\_\_mocks\_\_/webextension-polyfill.ts

   ```ts
   export { fakeBrowser as default } from '@webext-core/fake-browser';
   ```

2. In your test file, actually use the mock:

   ###### some.test.ts

   ```ts
   import { fakeBrowser } from '@webext-core/fake-browser';
   import { localExtStorage } from '@webext-core/storage';
   import { test, vi } from 'vitest';

   // Use webextension-polyfill in production code
   function isXyzEnabled(): Promise<boolean> {
     return localExtStorage.getItem('xyz');
   }

   // Enable the global mock
   vi.mock('webextension-polyfill');

   // use fakeBrowser in your tests for setup/validation
   describe('isXyzEnabled', () => {
     it('should return true when enabled', async () => {
       const expected = true;
       await fakeBrowser.storage.local.set({ xyz: expected });

       const actual = await isXyzEnabled();

       expect(actual).toBe(expected);
     });

     ...
   });
   ```

## Implemented APIs

Unimplemented APIs will throw an error when accessed. Open a PR to add an fake implementation!

- [x] alarms
- [x] runtime (partial)
- [x] storage

---

- [ ] activityLog
- [ ] bookmarks
- [ ] action
- [ ] browserAction
- [ ] browserSettings
- [ ] browsingData
- [ ] captivePortal
- [ ] clipboard
- [ ] commands
- [ ] contentScripts
- [ ] contextualIdentities
- [ ] cookies
- [ ] declarativeContent
- [ ] devtools
- [ ] dns
- [ ] downloads
- [ ] events
- [ ] experiments
- [ ] extension
- [ ] extensionTypes
- [ ] find
- [ ] geckoProfiler
- [ ] history
- [ ] i18n
- [ ] identity
- [ ] idle
- [ ] management
- [ ] manifest
- [ ] contextMenus
- [ ] menus
- [ ] networkStatus
- [ ] normandyAddonStudy
- [ ] notifications
- [ ] omnibox
- [ ] pageAction
- [ ] permissions
- [ ] pkcs11
- [ ] privacy
- [ ] proxy
- [ ] runtime (parital)
- [ ] scripting
- [ ] search
- [ ] sessions
- [ ] sidebarAction
- [ ] tabs
- [ ] theme
- [ ] topSites
- [ ] types
- [ ] urlbar
- [ ] userScripts
- [ ] webNavigation
- [ ] webRequest
- [ ] windows
