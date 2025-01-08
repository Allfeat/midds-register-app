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
            Vestibulum quis sem vehicula metus pellentesque fermentum. Aenean
            consequat libero pellentesque sollicitudin convallis. Proin fringilla
            hendrerit massa a ullamcorper. Nulla commodo malesuada ligula ac
            malesuada. In suscipit ullamcorper dui ac lobortis. Aliquam semper viverra
            sapien, sit amet suscipit tellus ultricies id. Vivamus lacinia tortor
            augue, sit amet vehicula risus viverra sed.
        </p>
    </div>
    <Button size="big" color="gradient" onclick={() => appState.currentStep = AppSteps.Entity}>
        Get Started
    </Button>
</div>
