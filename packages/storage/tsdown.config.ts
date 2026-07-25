import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    outDir: 'lib',
    entry: 'src/index.ts',
    format: 'esm',
  },
  {
    outDir: 'lib',
    entry: 'src/index.ts',
    format: 'iife',
    globalName: 'webExtCoreStorage',
    deps: {
      onlyBundle: false,
    },
    minify: true,
  },
]);
