import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { sveltePreprocess } from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-cloudflare';

export const globalStyles = `@use "${dirname(fileURLToPath(import.meta.url))}/src/styles/imports" as *;`

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sveltePreprocess({
    scss: {
      prependData: globalStyles,
    }
  }),

  kit: {
    adapter: adapter({
      // See below for an explanation of these options
      routes: {
        include: ['/*'],
        exclude: ['<all>']
      },
    }),
    alias: {
      $components: 'src/components',
      $layouts: 'src/layouts',
      $sections: 'src/sections',
      $animations: 'src/animations',
      $utils: 'src/utils',
      $style: 'src/style',
      '@polkadot/api/augment': 'src/interfaces/augment-api.ts',
      '@polkadot/types/augment': 'src/interfaces/augment-types.ts'
    },
  }
}

export default config
