<style lang="scss" src="./ButtonWallet.scss"></style>

<script lang="ts">
    import { appState } from '$utils/states.svelte'

    let {
        size = appState.walletState.connected ? 'big' : 'small',
        color = 'plain',
        wallets = appState.walletState.accounts,
    }: {
        size?: 'small' | 'big'
        color?: 'plain' | 'transparent'
        wallets?: any[]
    } = $props()
</script>

<button
    type="button"
    class="button-wallet is-{size} is-{color}"
    class:is-connected={appState.walletState.connected}
    onclick={appState.walletState.connected ? null : async () => {await appState.walletState.init()} }
>
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path fill="currentColor" d="M0 3.6c0-.99.81-1.8 1.8-1.8h13.5a.9.9 0 0 1 .9.9v.9H1.8v.9h15.3a.9.9 0 0 1 .9.9v9a1.8 1.8 0 0 1-1.8 1.8H1.8A1.8 1.8 0 0 1 0 14.4V3.6Zm14.85 8.1a1.35 1.35 0 1 0 0-2.7 1.35 1.35 0 0 0 0 2.7Z"/>
    </svg>
    {#if appState.walletState.connected}
        <span>{appState.walletState.shortenAddress(appState.walletState.accounts?.[0])}</span>
<!-- Disabled, waiting dropdown implementation
        <i>
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="6" viewBox="0 0 8 6" fill="none">
                <path stroke="#FFFBEB" stroke-linecap="round" stroke-linejoin="round" d="M7.5 2 4.35 5.15a.5.5 0 0 1-.7 0L.5 2"/>
            </svg>
        </i>
-->
    {:else}
        <span>Connect wallet</span>
    {/if}
</button>
