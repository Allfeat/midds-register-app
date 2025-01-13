<script lang="ts">
    import { AppSteps } from '$lib/types/steps'
    import { appState } from '$utils/states.svelte'
    import Button from '$components/atoms/Button/Button.svelte'

    const hideNextButton = $derived(appState.currentStep === AppSteps.Intro || appState.currentStep === AppSteps.Sending || appState.currentStep === AppSteps.Result)
    let disableButton: boolean = $state(false)

    $effect(() => {
        if (appState.currentStep === AppSteps.Entity) {
            disableButton = !appState.selectedMiddsEntity
        } else if (appState.currentStep === AppSteps.Information) {
            disableButton = false
        } else if (appState.currentStep === AppSteps.Confirmation) {
            disableButton =  !appState.walletState.connected
        }
    })
</script>

{#if !hideNextButton}
    <div class="next block">
        <Button
                size="big"
                color="green"
                onclick={() => appState.goToNextStep()}
                disabled={disableButton}
        >
            Continue
        </Button>
    </div>
{/if}

<style lang="scss" src="./ButtonNext.scss"></style>
