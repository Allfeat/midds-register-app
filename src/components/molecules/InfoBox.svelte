<script lang="ts">
    let {
        label,
        value,
	rawValue,
        icon,
        link,
    }: {
        label: string
        value: string
        icon: string
        link?: string
	rawValue?: string
    } = $props()

	function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!"); // Vous pouvez remplacer cela par une notification plus discrète
    }).catch(err => {
      console.error("Failed to copy text: ", err);
    });
  }
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
	<i class="clipboard-icon" onclick={() => copyToClipboard(rawValue)}>
      <img class="clipboard-img" src="/images/icon-clipboard.svg" alt="Copy to clipboard" width={12} height={12} />
    </i>
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
    .clipboard-icon {
    cursor: pointer;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    width: 20px;
    aspect-ratio: 1;
    opacity: 0.7;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }

    img {
      display: block;
      width: 100%;
      height: auto;
    }
    .clipboard-img {
    	filter: brightness(0) invert(1);
  }
  }
</style>
