import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { globalStyles } from './svelte.config.js'

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
