<style lang="scss" src="./Button.scss"></style>

<script lang="ts">
    import type { Snippet } from 'svelte'

    let {
        size = 'medium',
        type = 'plain',
        color = 'light',
        children,
        disabled = false,
        onclick,
    }: {
        size?: 'small' | 'medium' | 'big'
        type?: 'plain' | 'border'
        color?: 'light' | 'red' | 'green' | 'gradient'
        children: Snippet
        disabled?: boolean
        onclick?: () => any
    } = $props()
</script>

<button
    type="button"
    class="button is-{type} is-{size} is-{color} is-{size}"
    {onclick}
    {disabled}
>
    <span>{@render children()}</span>
</button>
