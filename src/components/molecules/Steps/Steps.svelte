<style lang="scss" src="./Steps.scss"></style>

<script lang="ts">
    import cx from 'classix'
    // Components
    import Button from '$components/atoms/Button/Button.svelte'
    import { AppSteps } from '$lib/types/steps'
    import { appState } from '$utils/states.svelte'

    const availableSteps: number[] = Object.keys(AppSteps).filter((v) => !isNaN(Number(v))).map(step => +step)
    const canGoBack = $derived(appState.currentStep > AppSteps.Intro && appState.currentStep < AppSteps.Sending)
    const currentStep: AppSteps = $derived(appState.currentStep)
</script>

<div class="steps">
    <span>Step</span>
    <ul>
        {#each availableSteps as index}
            {@const isActive = index === currentStep}
            {@const isPast = index < currentStep}
            {@const classes = cx('step', isActive && 'is-active', isPast && 'is-past')}
            <li>
                    <span class={classes}>{index}</span>
            </li>
        {/each}
    </ul>

    {#if canGoBack}
        <div class="back">
            <Button size="small" type="border" onclick={() => appState.goToPreviousStep()}>Back</Button>
        </div>
    {/if}
</div>
