import { defineConfig } from 'tsdown';
import pkgJson from './package.json' with { type: 'json' };

export default defineConfig([
  {
    outDir: 'lib',
    entry: ['src/index.ts', 'src/auto.ts'],
    format: ['esm', 'cjs'],
  },
  {
    outDir: 'lib',
    entry: 'src/index.ts',
    format: 'iife',
    globalName: 'webExtCoreFakeBrowser',
    deps: {
      onlyBundle: false,
      alwaysBundle: Object.keys(pkgJson.dependencies),
    },
    minify: true,
    outputOptions: {
      entryFileNames: () => 'index.global.js',
    },
  },
]);
