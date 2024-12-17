<style lang="scss" src="./Tag.scss"></style>

<script lang="ts">
    import type { Snippet } from 'svelte'

    let {
        color,
        children,
    }: {
        color: 'red' | 'green'
        children: Snippet
    } = $props()
</script>

<span class="tag is-{color}">
    {@render children()}
</span>
