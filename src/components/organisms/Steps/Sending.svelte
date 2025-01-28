<script lang="ts">
  import HeadingIcon from "$components/molecules/HeadingIcon.svelte";
  import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
  import { appState } from "$utils/states.svelte";
  import type { IMidds, MiddsInputs } from "@allfeat/sdk";
  import { TxSender, TxSenderStatus } from "$lib/types/midds/txSender.svelte";

  const {
    midds,
    account,
  }: { midds: IMidds<MiddsInputs>; account: InjectedAccountWithMeta } =
    $props();

  const sender = new TxSender(midds, account);
  let error: unknown;

  sender.execute().then((result) => {
    try {
      appState.resultState = result;
      appState.goToNextStep();
    } catch (e: unknown) {
      error = e;
      console.error(e);
    }
  });
</script>

<div class="inner">
  <HeadingIcon title="Registering MIDDS…" icon="loading" />
  <p class="text-medium color-light-faded">
    {#if sender.status === TxSenderStatus.Init}
      Contacting the blockchain node provider...
    {:else if sender.status === TxSenderStatus.ApiReady}
      Waiting for the user wallet to be available...
    {:else if sender.status === TxSenderStatus.FetchedInjector}
      Submitting transaction, registering your MIDDS on-chain, please wait...
    {:else}
      Unexpected Error
    {/if}
  </p>
</div>
