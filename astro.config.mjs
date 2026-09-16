import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kangofthecastle.github.io',
  output: 'static',
  devToolbar: {
    enabled: false,
  },
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
