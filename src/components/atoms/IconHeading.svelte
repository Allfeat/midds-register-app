<script lang="ts">
    let {
        size = 'small',
        icon,
    }: {
        size?: 'small' | 'big'
        icon: string
    } = $props()
</script>

<span class="icon-heading is-{size}">
    <img src="/images/midds-{icon}.png" alt="{icon} icon" width={40} height={40}>
</span>

<style lang="scss">
    .icon-heading {
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1;
        border-radius: 100%;
        background: var(--color-light-10);
        backdrop-filter: blur(32px);

        img {
            display: block;
            width: 45%;
            min-width: 24px;
            height: auto;
        }

        // Variant: Small size
        &.is-small {
            width: clamp(56px, 20vw, 88px);
        }

        // Variant: Big size
        &.is-big {
            width: clamp(80px, 8vw, 120px);
        }
    }
</style>