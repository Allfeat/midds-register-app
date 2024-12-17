<script lang="ts">
    let {
        title,
        description,
        image,
        url,
        type = 'website',
        card = 'summary_large_image',
        creator,
    }: {
        title: string
        description?: string
        image?: string
        url?: string
        type?: string
        card?: string
        creator?: string
    } = $props()
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description}>

    <meta property="og:title" content={title} />
    {#if description}
        <meta property="og:description" content={description} />
    {/if}
    <meta property="og:type" content={type} />
    {#if image}
        <meta property="og:image" content={image} />
    {/if}
    {#if url}
        <meta property="og:url" content={url} />
    {/if}

    <meta property="twitter:card" content={card} />
    {#if creator}
        <meta property="twitter:creator" content={creator} />
    {/if}
</svelte:head>
