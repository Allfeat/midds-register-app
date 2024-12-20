import { writable } from 'svelte/store'
import { persistedState } from 'svelte-persisted-state'

// Animations
export const pageLoading = writable(false)

// Form data
export const formData = persistedState('form-data', {
    step: 0,
    entity: null as Entity,
    metadatas: [] as Metadata[],
}, { storage: 'local' })

// Connected
export let connected = persistedState('connected', false, { storage: 'local' })

// Current wallet
export let currentWallet = persistedState('currentWallet', null, { storage: 'local' })

// Steps
export const steps = ['intro', 'entity', 'information', 'confirmation', 'sending', 'result'] as const
