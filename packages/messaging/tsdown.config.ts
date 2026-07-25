import { defineConfig } from 'tsdown';

import pkgJson from './package.json' with { type: 'json' };

export default defineConfig([
  {
    entry: ['src/index.ts', 'src/page.ts'],
    format: 'esm',
  },
  {
    entry: 'src/index.ts',
    format: 'iife',
    globalName: 'webExtCoreMessaging',
    deps: {
      onlyBundle: false,
      alwaysBundle: Object.keys(pkgJson.dependencies),
    },
    minify: true,
  },
  {
    entry: 'src/page.ts',
    format: 'iife',
    globalName: 'webExtCorePageMessaging',
    deps: {
      onlyBundle: false,
      alwaysBundle: Object.keys(pkgJson.dependencies),
    },
    minify: true,
  },
]);
