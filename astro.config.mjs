import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dubz.github.io',
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
