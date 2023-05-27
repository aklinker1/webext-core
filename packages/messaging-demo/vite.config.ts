// vite.config.ts
import webExtension from 'vite-plugin-web-extension';
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  plugins: [
    webExtension({
      additionalInputs: ['assets/google.injected.ts'],
    }),
  ],
});
