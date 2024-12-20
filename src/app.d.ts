// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	namespace App {
        // interface Locals {}
        // interface PageData {}
        // interface Error {}
        // interface Platform {}
    }


    /**
     * Interfaces & types
     */
    interface Entity {
        name: string
        value: string
        disabled?: boolean
        tag?: string
        fields?: {
            name: string
            id: string
            label: string
            placeholder: string
            type: 'text' | 'email' | 'number',
            required?: boolean
        }[]
    }
    interface Metadata {
        key: string
        name: string
        value: string
    }
}

export {}
