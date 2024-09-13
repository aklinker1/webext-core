import { defineConfig, defaultExclude, UserConfig } from 'vitest/config';

const config = {
  browser: {
    test: {
      name: 'browser mode',
      include: [
        '**/*.browser.{test,spec}.ts',
        '**/__tests__/browser/**/*.{test,spec}.ts',
      ],
      exclude: [...defaultExclude],
      browser: {
        provider: 'playwright',
        enabled: true,
        name: 'chromium',
        headless: true,
        isolate: true,
        screenshotFailures: false,
      },
    },
  } as const satisfies UserConfig,
};

export default defineConfig(config.browser);
