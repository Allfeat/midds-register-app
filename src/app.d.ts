// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	namespace App {
    }

    interface IMetadata {
        key: string
        name: string
        value: string
    }
}

export {}
