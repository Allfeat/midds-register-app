<style lang="scss" src="./ContentLayout.scss"></style>

<script lang="ts">
    import type { Snippet } from 'svelte'
    import { currentStep, steps } from '$utils/stores.svelte'
    // Components
    import Steps from '$components/molecules/Steps/Steps.svelte'

    let {
        title,
        children,
    }: {
        title: string
        children: Snippet
    } = $props()
</script>

<section class="content-grid">
    <div class="container">
        <div class="top grid">
            <h1 class="title-medium color-green">{title}</h1>

            {#if currentStep.value > 0 && currentStep.value < steps.length - 1}
                <Steps />
            {/if}
        </div>

        <div class="layout grid">
            {@render children()}
        </div>
    </div>
</section>
