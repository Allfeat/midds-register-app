<script lang="ts">
    import HeadingIcon from '$components/molecules/HeadingIcon.svelte'
    import { type IMiddsEntity } from '$lib/types/midds/entity.svelte'
    import { TxSender, TxSenderStatus } from '$lib/types/midds/txSender.svelte'
    import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
    import { appState } from '$utils/states.svelte'

    const { midds, account }: { midds: IMiddsEntity, account: InjectedAccountWithMeta } = $props()

    const sender = new TxSender(midds, account)
    sender.execute().then((result) => {
        appState.resultState = result
        appState.goToNextStep()
    })
</script>

<div class="inner">
    <HeadingIcon title="Registering MIDDS…" icon="loading"/>
    <p class="text-medium color-light-faded">
        {#if sender.status === TxSenderStatus.Init}
            Contacting the blockchain node provider...
            {:else if sender.status === TxSenderStatus.ApiReady}
                Waiting for the user wallet to be available...
            {:else if sender.status === TxSenderStatus.FetchedInjector}
                Creating the transaction data...
            {:else if sender.status === TxSenderStatus.TxCreated}
                Waiting for the user to sign the transaction...
            {:else if sender.status === TxSenderStatus.TxSigned}
                Sending the transaction to the chain...
            {:else if sender.status === TxSenderStatus.TxSended}
                Waiting for inclusion in the block...
            {:else}
                Unexpected Error
        {/if}
    </p>
</div>
