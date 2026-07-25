import { defineConfig } from 'tsdown';

import pkgJson from './package.json' with { type: 'json' };

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
    globalName: 'webExtCoreJobScheduler',
    deps: {
      onlyBundle: false,
      alwaysBundle: Object.keys(pkgJson.dependencies),
    },
    minify: true,
  },
]);
