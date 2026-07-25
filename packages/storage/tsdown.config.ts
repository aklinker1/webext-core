import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: 'src/index.ts',
    format: 'esm',
  },
  {
    entry: 'src/index.ts',
    format: 'iife',
    globalName: 'webExtCoreStorage',
    deps: {
      onlyBundle: false,
    },
    minify: true,
  },
]);
