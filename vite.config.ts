import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { globalStyles } from './svelte.config.js'

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const file = fileURLToPath(new URL("package.json", import.meta.url));
const json = readFileSync(file, "utf8");
const pkg = JSON.parse(json);

export default defineConfig({
  plugins: [
    sveltekit(),
  ],
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: globalStyles,
        api: 'modern',
      }
    }
  },
  server: {
    fs: {
      allow: ['../..'],
    }
  },
})
