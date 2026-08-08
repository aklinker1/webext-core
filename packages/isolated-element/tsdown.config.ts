import { defineConfig } from 'tsdown';

const deps = {
  onlyBundle: ['is-potential-custom-element-name'],
};

export default defineConfig([
  {
    entry: 'src/index.ts',
    format: 'esm',
    deps,
  },
  {
    entry: 'src/index.ts',
    format: 'iife',
    globalName: 'webExtCoreIsolatedElement',
    deps,
    minify: true,
  },
]);
