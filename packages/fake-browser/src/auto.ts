import { fakeBrowser } from './index';

// @ts-expect-error: chrome not typed in node environment
globalThis.chrome = fakeBrowser;
// @ts-expect-error: browser not typed in node environment
globalThis.browser = fakeBrowser;
