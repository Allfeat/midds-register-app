<script lang="ts">
  import ButtonWallet from "$components/atoms/ButtonWallet/ButtonWallet.svelte";
  import HeadingIcon from "$components/molecules/HeadingIcon.svelte";
  import Table from "$components/molecules/Table.svelte";
  import { appState } from "$utils/states.svelte";
  import { ISWC, type IMiddsInput } from "@allfeat/sdk";

  function getStringValue(input: IMiddsInput<any, any>): string {
    if (input instanceof ISWC) {
      return input.toString();
    }
    return input.Value ? input.Value.toString() : "";
  }
</script>

<div class="inner">
  <HeadingIcon title="Account and confirmation" icon="user" />

  {#if !appState.walletState.connected}
    <div>
      <p class="text-normal color-light-faded">
        Please connect a wallet and select the account to use to continue:
      </p>
      <ButtonWallet size="big" />
    </div>
  {:else if appState.selectedMiddsEntity?.isValid}
    <p class="text-normal color-light-faded">
      Review your MIDDS information to confirm your registration:
    </p>

    <Table
      fields={Object.values(appState.selectedMiddsEntity.inputs).map(
        (input) => ({
          label: input.Name,
          value: getStringValue(input),
        }),
      )}
    />

    <div>
      <p class="text-normal color-light-faded">Using your account:</p>
      <ButtonWallet size="big" />
    </div>
  {/if}
</div>
