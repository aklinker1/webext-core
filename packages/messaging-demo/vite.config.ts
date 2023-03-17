// vite.config.ts
import webExtension from 'vite-plugin-web-extension';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  plugins: [webExtension()],
});
