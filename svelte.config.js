import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { sveltePreprocess } from 'svelte-preprocess'

export const globalStyles = `@use "${resolve(fileURLToPath(import.meta.url), '../src/styles/imports.scss')}" as *;`

// Define adapter from script and use default otherwise
let svelteAdapter
if (process.env.VITE_ADAPTER) {
    const adapter = await import(`@sveltejs/${process.env.VITE_ADAPTER}`)
    svelteAdapter = adapter.default
} else {
    const adapter = await import('@sveltejs/adapter-cloudflare')
    svelteAdapter = adapter.default
}


/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Preprocessors docs: https://github.com/sveltejs/svelte-preprocess
    preprocess: sveltePreprocess({
        scss: {
            prependData: globalStyles,
        }
    }),

    kit: {
        adapter: svelteAdapter({
            routes: {
                include: ['/*'],
                exclude: ['<all>']
            }
        }),
        alias: {
            $components: 'src/components',
            $layouts: 'src/layouts',
            $sections: 'src/sections',
            $animations: 'src/animations',
            $utils: 'src/utils',
            $style: 'src/style',
        },
        prerender: {
            handleMissingId: 'ignore',
        },
        inlineStyleThreshold: 4096,
    }
}

export default config
