<style lang="scss">
    // Split text elements
    :global(.char), :global(.word) {
        display: inline-block;
        will-change: transform, opacity;
    }

    .text-split {
        position: relative;

        :global(span) {
            display: inline-block;
            transition: opacity 0.7s var(--ease-quart), transform 0.7s var(--ease-quart);
        }
        :global(.clone:last-of-type) {
            position: absolute !important;
            top: 0;
            left: 0;
        }
    }
</style>

<script lang="ts">
    import { type Snippet } from 'svelte'
    import SplitType, { type TypesListString } from 'split-type'
    import { debounce } from 'utils/actions'
    import cx from 'classix'

    let {
        as = 'span',
        tag = 'span',
        split,
        absolute = false,
        clone = false,
        children,
        class: className,
    }: {
        as?: string
        tag?: string
        split: TypesListString
        absolute?: boolean
        clone?: boolean
        children: Snippet
        class?: string
    } = $props()

    let textEl: HTMLElement = undefined
    let instance = undefined

    // Resize
    let resizeObserver: ResizeObserver = undefined
    let previousWidth = $state<number>(undefined)

    // TODO: Add props.class which bugs with next.208


    $effect(() => {
        // Split the target element(s) using the provided options
        instance = new SplitType(textEl, {
            types: split,
            tagName: tag,
            absolute,
        })

        // Setup resize observer
        resizeObserver = new ResizeObserver(debounce((entry) => {
            let width: number

            // Only proceed if we are splitting text into lines or using absolute position
            if (absolute || /lines/.test(split)) {
                const [{ contentRect }] = entry as ResizeObserverEntry[]
                width = Math.floor(contentRect.width)
                // Only proceed if:
                // 1) `previousWidth` has been set (this avoids calling the split method when the resize observer is triggered on the initial render)
                // 2) if the width of the container element has changed
                if (previousWidth && previousWidth !== width) {
                    instance.split()
                }
            }

            // Store the width of the `contentRect`
            previousWidth = width
        }, 100))

        resizeObserver.observe(textEl)

        // Destroy
        return () => {
            instance.revert()
            resizeObserver.disconnect()
        }
    })
</script>

<svelte:element
    this={as}
    bind:this={textEl}
    class={cx('text-split', className)}
>
    {#if clone}
        {#each Array(2) as _}
            <span class="clone">
                {@render children()}
            </span>
        {/each}
    {:else}
        {@render children()}
    {/if}
</svelte:element>
