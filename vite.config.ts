import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { globalStyles } from './svelte.config'

export default defineConfig({
    plugins: [
        sveltekit(),
    ],
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
    }
})
