import { writable } from 'svelte/store'

// Animations
export const pageLoading = writable(false)
export const previousPage = writable('')

// Global
export const shopVisible = writable(false)
