import { defineConfig } from 'tsup';
import { rm } from 'node:fs/promises';

export default defineConfig({
  entry: ['src/index.ts', 'src/types.ts'],
  outDir: 'lib',
  clean: true,
  dts: true,
  format: ['esm', 'iife'],
  globalName: 'webExtCoreProxyService',
  onSuccess: async () => {
    await rm('lib/types.js');
    await rm('lib/types.global.js');
  },
});
