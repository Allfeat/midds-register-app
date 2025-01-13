<script lang="ts">
    // Components
    import Metas from '$components/Metas.svelte'
    import ContentLayout from '$layouts/ContentLayout/ContentLayout.svelte'
    import Intro from '$components/organisms/Steps/Intro.svelte'
    import MiddsSelection from '$components/organisms/Steps/MiddsSelection.svelte'
    import MiddsFill from '$components/organisms/Steps/MiddsFill.svelte'
    import Confirmation from '$components/organisms/Steps/Confirmation.svelte'
    import Sending from '$components/organisms/Steps/Sending.svelte'
    import Result from '$components/organisms/Steps/Result.svelte'
    import { AppSteps } from '$lib/types/steps'
    import { appState } from '$utils/states.svelte'
    import ButtonNext from '$components/atoms/ButtonNext/ButtonNext.svelte'

    // Steps
    const step: AppSteps = $derived(appState.currentStep)
    let isEnded: boolean = $derived(appState.currentStep === AppSteps.Result && appState.resultState !== null)
</script>

<Metas title="MIDDS" description="" image=""/>

<main class="app">
    <ContentLayout title="MIDDS Registration">
        <div
                class="content block grid"
                class:is-full={step === AppSteps.Sending || isEnded}
        >
            {#if !isEnded}
                {#if step === AppSteps.Intro}
                    <Intro/>
                {:else if step === AppSteps.Entity}
                    <MiddsSelection/>
                {:else if step === AppSteps.Information}
                    <MiddsFill/>
                {:else if step === AppSteps.Confirmation}
                    <Confirmation/>
                {:else if step === AppSteps.Sending}
                    {#if appState.selectedMiddsEntity !== null && appState.walletState.accounts?.[0] !== undefined}
                        <Sending midds={appState.selectedMiddsEntity} account={appState.walletState.accounts[0]}/>
                    {/if}
                {/if}
            {:else}
                {#if appState.resultState !== null}
                    <Result result={appState.resultState}/>
                {/if}
            {/if}
        </div>

        {#if !(step === AppSteps.Result) && !isEnded}
            <div class="pattern block" class:is-full={step === AppSteps.Sending}>
                <img
                        src="/images/pattern-logo.svg"
                        alt="Allfeat logo pattern"
                        width={2550}
                        height={2320}
                />
            </div>
        {/if}

        <ButtonNext />
    </ContentLayout>
</main>

<style lang="scss" src="../styles/app.scss"></style>
