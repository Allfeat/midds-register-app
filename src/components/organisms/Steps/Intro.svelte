<script lang="ts">
    import IconHeading from '$components/atoms/IconHeading.svelte'
    import Button from '$components/atoms/Button/Button.svelte'
    import { AppSteps } from '$lib/types/steps'
    import '../../../styles/app.scss'
    import { appState } from '$utils/states.svelte'

</script>

<div class="inner">
    <div class="heading">
        <div class="icons">
            {#each ['shield', 'folder', 'medal', 'cog'] as icon}
                <IconHeading size="small" {icon}/>
            {/each}
        </div>
        <h2 class="title-medium">Music Industry Decentralized Data Structures</h2>
    </div>
    <div class="text text-medium color-light-faded">
        <p>
            MIDDS offer a revolutionary way to store music data on a decentralized network.
            These data structures are tailored to meet the music industry's needs while remaining lightweight for a decentralized environment.
            This application is your gateway to Allfeat and MIDDS, enabling you to register your first metadata on the network.
            Click the button below and follow the guided steps to successfully register your MIDDS on the network.
        </p>
    </div>
    <Button size="big" color="gradient" onclick={() => appState.currentStep = AppSteps.Entity}>
        Get Started
    </Button>
</div>
