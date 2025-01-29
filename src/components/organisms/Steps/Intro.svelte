<script lang="ts">
  import IconHeading from "$components/atoms/IconHeading.svelte";
  import Button from "$components/atoms/Button/Button.svelte";
  import { AppSteps } from "$lib/types/steps";
  import "../../../styles/app.scss";
  import { appState } from "$utils/states.svelte";
</script>

<div class="inner">
  <div class="heading">
    <div class="icons">
      {#each ["shield", "folder", "medal", "cog"] as icon}
        <IconHeading size="small" {icon} />
      {/each}
    </div>
    <h2 class="title-medium">Music Industry Decentralized Data Structures</h2>
  </div>
  <div class="text text-medium color-light-faded">
    <p>
      MIDDS is Allfeat’s decentralized storage solution for music metadata,
      specifically designed for the music industry. Through a user-friendly
      interface, this application empowers artists to securely store and manage
      their data on the Allfeat network. (Only usable with Substrate compatible
      wallets like Subwallet or Talisman.)
    </p>
  </div>
  <Button
    size="big"
    color="gradient"
    onclick={() => (appState.currentStep = AppSteps.Entity)}
  >
    Get Started
  </Button>
</div>
