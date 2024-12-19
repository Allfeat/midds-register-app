import { writable } from 'svelte/store'
import { persistedState } from 'svelte-persisted-state'

// Animations
export const pageLoading = writable(false)
export const previousPage = writable('')

// Global
export const shopVisible = writable(false)

// Connected
export let connected = persistedState('connected', false, { storage: 'local' })

// Current wallet
export let currentWallet = persistedState('currentWallet', null, { storage: 'local' })

// Steps
export const steps = ['intro', 'entity', 'information', 'confirmation', 'sending', 'result'] as const
export let currentStep = persistedState('step', 0, { storage: 'local' })
