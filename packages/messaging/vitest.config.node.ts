import { defineConfig, defaultInclude, defaultExclude, UserConfig } from 'vitest/config';

const config = {
  node: {
    test: {
      name: 'node',
      include: [...defaultInclude],
      exclude: [
        ...defaultExclude,
        '**/*.browser.{test,spec}.ts',
        '**/__tests__/browser/**/*.{test,spec}.ts',
      ],
    },
  } as const satisfies UserConfig,
};

export default defineConfig(config.node);
