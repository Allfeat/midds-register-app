<script lang="ts">
  import { BalanceFetcher } from "$utils/balanceFetcher.svelte";
  import { onMount } from "svelte";

  const { account }: { account: string } = $props();
  let balance: bigint | null = $state(null);

  onMount(async () => {
    const fetcher = new BalanceFetcher(account);
    balance = await fetcher.fetch();
  });

  function convertToBalanceRounded(
    value: bigint,
    decimals: number,
    precision: number,
  ): string {
    if (value === BigInt(0)) {
      return "0";
    }

    const divisor = BigInt(10 ** decimals);
    const wholePart = value / divisor;
    const remainder = value % divisor;

    const decimalValue = Number(remainder) / Number(divisor);
    const roundedDecimal = decimalValue.toFixed(precision);

    return `${wholePart}.${roundedDecimal.split(".")[1]}`;
  }
</script>

<div class="container">
  {#if balance}
    {convertToBalanceRounded(balance, 12, 2)} MEL
  {:else}
    <span class="loader"></span>
  {/if}
</div>

<style lang="scss">
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    font-weight: 700;
    padding: 0;
    border-radius: 100vh;
    transition-property: opacity;
    transition-duration: 0.3s;
    transition-timing-function: var(--ease-quart);
  }

  .loader {
    width: 18px;
    height: 18px;
    border: 3px solid #fff;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
