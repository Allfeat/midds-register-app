<style lang="scss" src="./Button.scss"></style>

<script lang="ts">
    import type { Snippet } from 'svelte'

    let {
        size = 'medium',
        type = 'plain',
        color = 'light',
        icon,
        children,
    }: {
        size?: 'small' | 'medium' | 'big'
        type?: 'plain' | 'border'
        color?: 'light' | 'red' | 'green'
        icon?: string
        children: Snippet
    } = $props()
</script>

<button class="button is-{type} is-{size} is-{color} is-{size}">
    {#if icon}
        <svg></svg>
    {/if}
    <span>{@render children()}</span>
</button>
