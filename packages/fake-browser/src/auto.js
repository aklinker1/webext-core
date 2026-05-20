import { fakeBrowser } from '.';

globalThis.chrome = fakeBrowser;
globalThis.browser = fakeBrowser;
