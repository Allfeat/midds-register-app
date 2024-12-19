<style lang="scss" src="./Steps.scss"></style>

<script lang="ts">
    import cx from 'classix'
    import { currentStep, steps } from '$utils/stores.svelte'
    // Components
    import Button from '$components/atoms/Button/Button.svelte'

    const actualSteps = steps.filter(step => !['intro', 'result'].includes(step))
    const canGoBack = $derived(currentStep.value > 0)
</script>

<div class="steps">
    <span>Step</span>
    <ul>
        {#each actualSteps, index}
            {@const isActive = index + 1 === currentStep.value}
            {@const isPast = index + 1 < currentStep.value}
            {@const classes = cx('step', isActive && 'is-active', isPast && 'is-past')}
            <li>
                {#if isPast}
                    <button class={classes} onclick={() => currentStep.value = index + 1}>{index + 1}</button>
                {:else}
                    <span class={classes}>{index + 1}</span>
                {/if}
            </li>
        {/each}
    </ul>

    {#if canGoBack}
        <div class="back">
            <Button size="small" type="border" onclick={() => currentStep.value--}>Back</Button>
        </div>
    {/if}
</div>
