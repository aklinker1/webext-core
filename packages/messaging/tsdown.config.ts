import { defineConfig } from 'tsdown';

import pkgJson from './package.json' with { type: 'json' };

export default defineConfig([
  {
    outDir: 'lib',
    entry: ['src/index.ts', 'src/page.ts'],
    format: ['esm', 'cjs'],
  },
  {
    outDir: 'lib',
    entry: 'src/index.ts',
    format: 'iife',
    globalName: 'webExtCoreMessaging',
    deps: {
      onlyBundle: false,
      alwaysBundle: Object.keys(pkgJson.dependencies),
    },
    minify: true,
    outputOptions: {
      entryFileNames: () => 'index.global.js',
    },
  },
  {
    outDir: 'lib',
    entry: 'src/page.ts',
    format: 'iife',
    globalName: 'webExtCorePageMessaging',
    deps: {
      onlyBundle: false,
      alwaysBundle: Object.keys(pkgJson.dependencies),
    },
    minify: true,
    outputOptions: {
      entryFileNames: () => 'page.global.js',
    },
  },
]);
