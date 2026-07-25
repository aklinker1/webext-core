import { defineConfig } from 'tsdown';

import pkgJson from './package.json' with { type: 'json' };

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
      alwaysBundle: Object.keys(pkgJson.dependencies),
    },
    minify: true,
  },
]);
