<script lang="ts">
    import type { Snippet } from 'svelte'

    let {
        active = false,
        disabled = false,
        children,
        onclick,
    }: {
        active?: boolean
        disabled?: boolean
        children: Snippet
        onclick?: () => any
    } = $props()
</script>

<button
    class="button-choice"
    class:is-active={active}
    {onclick}
    {disabled}
>
    {@render children()}
</button>

<style lang="scss">
    button {
        display: flex;
        align-items: center;
        gap: 12px;
        height: 88px;
        padding: 0 40px;
        background: var(--color-light-10);
        font-family: inherit;
        font-weight: 700;
        font-size: pxrem(32px);
        line-height: 1;
        color: var(--color-light);
        border: none;
        border-radius: 100vh;
        cursor: pointer;
        transition-property: color, background-color;
        transition-duration: 0.5s;
        transition-timing-function: var(--ease-quart);

        // State: Hover
        &:hover {
            background-color: var(--color-light-20);
        }

        // State: Active
        &.is-active {
            background-color: var(--color-light);
            color: var(--color-dark);
        }

        // State: Disabled
        &:disabled {
            background: none;
            border: 1px solid var(--color-light-20);
            cursor: not-allowed;
        }
    }
</style>
