const { fakeBrowser } = require('.');

globalThis.chrome = fakeBrowser;
globalThis.browser = fakeBrowser;
