import { error } from '@sveltejs/kit'

// export const prerender = true

export const load = async ({ url }) => {
    return {
        currentPath: url.pathname,
    }
}
