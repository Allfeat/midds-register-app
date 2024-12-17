<script lang="ts">
    import 'sanitize.css'
    import '../styles/global.scss'

    import { page } from '$app/stores'
    import { afterNavigate, beforeNavigate } from '$app/navigation'
    import { fly, fade } from 'svelte/transition'
    import { quartOut } from 'svelte/easing'
    import { pageLoading } from '$utils/stores'
    import { DELAY, DURATION } from 'utils/constants'
    import { scrollToTop } from 'utils/scroll'
    // Components
    import Header from '$components/organisms/Header/Header.svelte'
    import Footer from '$components/organisms/Footer/Footer.svelte'

    let { data, children } = $props()
    let innerHeight = $state<number>(0)

    // Fonts to preload
    const fonts = [
        'tasaOrbiter',
    ]


    /**
     * On page change
     */
    beforeNavigate(({ from, to }) => {
        // Enable page loading state if URL changed
        if (from.route.id !== to.route.id) {
            $pageLoading = true
        }
    })

    afterNavigate(({ from }) => {
        // Remove page loading state
        setTimeout(() => $pageLoading = false, DELAY.PAGE_LOADING)

        // Scroll back to top when new page is ready
        if (from?.url?.pathname) {
            setTimeout(scrollToTop, DELAY.PAGE_IN)
        }
    })

    $effect(() => {
        // Set viewport height
        innerHeight && document.body.style.setProperty('--vh', `${innerHeight}px`)

        // Define page loading
        document.body.classList.toggle('is-loading', $pageLoading)
        // Block scroll on certain conditions
        // document.body.classList.toggle('block-scroll', condition)

        // Avoid FOUC
        document.body.style.opacity = '1'
    })
</script>

<svelte:window bind:innerHeight />

<svelte:head>
    <link rel="canonical" href={$page.url.href.split('#')[0]} />

    {#each fonts as font}
        <link rel="preload" href="/fonts/{font}.woff2" as="font" type="font/woff2" crossorigin="anonymous">
    {/each}
</svelte:head>


<Header />

{#key data.currentPath}
    <div
        in:fly={{ y: innerHeight / 10, duration: DURATION.PAGE_IN, delay: DELAY.PAGE_LOADING, easing: quartOut }}
        out:fade={{ duration: DURATION.PAGE_OUT, easing: quartOut }}
    >
        {@render children()}
    </div>
{/key}

<Footer />

<div class="background"></div>
