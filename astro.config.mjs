import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dubz.github.io',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
