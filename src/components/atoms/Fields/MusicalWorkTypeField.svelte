<script lang="ts">
  import {
    MusicalWorkType,
    type AllfeatSupportMusicalWorkType,
  } from "@allfeat/sdk";

  let {
    musicalWorkTypeInput = $bindable(),
  }: { musicalWorkTypeInput: MusicalWorkType } = $props();
  let selectedValue: AllfeatSupportMusicalWorkType | null = $state(
    musicalWorkTypeInput.Value ? musicalWorkTypeInput.Value : null,
  );

  let options: AllfeatSupportMusicalWorkType[] = ["Song", "Instrumental"];

  $effect(() => {
    musicalWorkTypeInput.Value = selectedValue;
  });
</script>

<div class="select-wrapper">
  <select bind:value={selectedValue}>
    <option value={null} disabled hidden>Select a type</option>

    {#each options as opt}
      <option value={opt}>{opt}</option>
    {/each}
  </select>
</div>

<style lang="scss">
  .select-wrapper {
    position: relative;
    width: 100%;

    select {
      width: 50%;
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
      cursor: pointer;

      &:hover,
      &:focus,
      &:active {
        border-color: var(--color-light-50);
        outline: none;
      }

      &:not([value=""]) {
        border-color: var(--color-light-75);
      }

      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      &::-ms-expand {
        display: none;
      }

      background: url('data:image/svg+xml;utf8,<svg fill="%23cccccc" height="12" viewBox="0 0 24 24" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>')
        no-repeat right 16px center;
      background-size: 12px 12px;
    }
  }
</style>
