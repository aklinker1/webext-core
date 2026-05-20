import { defineConfig } from 'tsdown';
import pkgJson from './package.json' with { type: 'json' };

export default defineConfig([
  {
    outDir: 'lib',
    entry: ['src/index.ts', 'src/types.ts'],
    format: ['esm', 'cjs'],
  },
  {
    outDir: 'lib',
    entry: 'src/index.ts',
    format: 'iife',
    globalName: 'webExtCoreProxyService',
    deps: {
      onlyBundle: false,
      alwaysBundle: Object.keys(pkgJson.peerDependencies),
    },
    minify: true,
    outputOptions: {
      entryFileNames: () => 'index.global.js',
    },
  },
]);
