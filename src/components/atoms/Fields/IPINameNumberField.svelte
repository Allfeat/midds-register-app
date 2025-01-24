<script lang="ts">
  import type { IPINameNumber } from "@allfeat/sdk";

  let { ipiInput = $bindable() }: { ipiInput: IPINameNumber } = $props();
</script>

<input type="number" min="0" max="99999999999" bind:value={ipiInput.Value} />

<style lang="scss">
  input {
    width: 30%;
    height: 48px;
    padding: 18px 16px;
    background: none;
    border: 1px solid var(--color-light-20);
    border-radius: 6px;
    font-family: inherit;
    font-weight: 400;
    font-size: pxrem(16px);
    line-height: 1;
    color: var(--color-light);
    transition: border-color 0.3s;

    &::placeholder {
      opacity: 1;
      color: var(--color-light-50);
    }

    &:hover,
    &:focus,
    &:active {
      border-color: var(--color-light-50);
    }

    &:not(:placeholder-shown) {
      border-color: var(--color-light-75);
    }
  }
</style>
