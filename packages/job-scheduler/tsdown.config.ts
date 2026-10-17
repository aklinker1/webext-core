import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: 'src/index.ts',
    format: 'esm',
  },
  {
    entry: 'src/index.ts',
    format: 'iife',
    globalName: 'webExtCoreJobScheduler',
    deps: {
      onlyBundle: false,
      alwaysBundle: ['croner', 'format-duration'],
    },
    minify: true,
  },
]);
