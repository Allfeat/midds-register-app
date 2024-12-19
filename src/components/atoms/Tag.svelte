<script lang="ts">
    import type { Snippet } from 'svelte'

    let {
        color = 'light',
        children,
    }: {
        color?: 'red' | 'green' | 'light'
        children: Snippet
    } = $props()
</script>

<span class="tag is-{color}">
    {@render children()}
</span>

<style lang="scss">
    .tag {
        display: inline-flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 8px;
        height: 20px;
        padding: 0 8px;
        font-size: pxrem(11px);
        font-weight: 500;
        color: var(--color-light);
        letter-spacing: 0.03em;
        text-transform: uppercase;
        border: 1px solid;
        border-radius: 100vh;

        // Variant: Red color
        &.is-red {
            border-color: rgba($color-red, 0.5);
        }

        // Variant: Green color
        &.is-green {
            border-color: rgba($color-green, 0.5);
        }

        // Variant: Light color
        &.is-light {
            border-color: var(--color-light);
        }
    }
</style>
