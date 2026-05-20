import { defineConfig } from 'wxt';

export default defineConfig({
  srcDir: 'src',
  manifest: {
    web_accessible_resources: [
      {
        resources: ['google-injected.js'],
        matches: ['*://*.google.com/*'],
      },
      {
        resources: ['duckduckgo-injected.js'],
        matches: ['*://*.duckduckgo.com/*'],
      },
    ],
  },
  runner: { startUrls: ['https://google.com/', 'https://duckduckgo.com/'] },
});
