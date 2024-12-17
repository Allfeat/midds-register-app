<script lang="ts">
    import { page } from '$app/stores'
    // Components
    import Metas from '$components/Metas.svelte'

    const errors = {
        404: {
            title: 'Page not found',
        },
        500: {
            title: 'Error',
        },
    }
</script>

<Metas
    title={errors[$page.status].title}
/>

<main class="page-error">
    <h1>{errors[$page.status].title}</h1>
</main>
