<script lang="ts">
    let {
        label,
        value,
        icon,
        link,
    }: {
        label: string
        value: string
        icon: string
        link?: string
    } = $props()
</script>

<dl class="info-box text-normal">
    <dt>{label}</dt>
    <dd>
        <i class="icon">
            <img src="/images/icon-{icon}.svg" alt="{icon} icon" width={12} height={12}>
        </i>
        {#if link}
            <a href={link} target="_blank" rel="noopener noreferrer" class="value link-underline" title="See on [Etherscan]">
                {value}
            </a>
        {:else}
            <span class="value">{value}</span>
        {/if}
    </dd>
</dl>

<style lang="scss">
    dl {
        padding: 16px;
        background: var(--color-dark);
        border: 1px solid var(--color-light-20);
        border-radius: 6px;
    }
    dt {
        margin-bottom: 0.35em;
        color: var(--color-light-75)
    }
    dd {
        display: flex;
        align-items: center;
        gap: 0.5em;
        white-space: nowrap;
    }
    .icon {
        flex-shrink: 0;
        display: grid;
        place-items: center;
        width: 20px;
        aspect-ratio: 1;
        background: var(--color-tertiary-20);
        border-radius: 100%;

        img {
            display: block;
            width: 60%;
            height: auto;
        }
    }
</style>