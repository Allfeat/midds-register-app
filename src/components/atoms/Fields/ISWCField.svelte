<script lang="ts">
  import type { ISWC, ISWCValue } from "@allfeat/sdk";

  // Can only receive a ISWC type as this is the ISWC input field
  let { iswcField = $bindable() }: { iswcField: ISWC } = $props();
  let value: ISWCValue = $state({
    group1: 0,
    group2: 0,
    group3: 0,
    checkDigit: 0,
  });
  let group1: number = $state(0);
  let group2: number = $state(0);
  let group3: number = $state(0);
  let checkDigit: number = $state(0);

  $effect(() => {
    value.group1 = group1;
    value.group2 = group2;
    value.group3 = group3;
    value.checkDigit = checkDigit;
    iswcField.Value = value;
  });
</script>

<div>
  T-<input
    class="iswcGroup"
    id="group1"
    type="number"
    min="0"
    max="999"
    bind:value={group1}
  />.<input
    class="iswcGroup"
    id="group2"
    type="number"
    min="0"
    max="999"
    bind:value={group2}
  />.<input
    class="iswcGroup"
    id="group3"
    type="number"
    min="0"
    max="999"
    bind:value={group3}
  />-<input
    class="iswcCheck"
    id="checkDigit"
    type="number"
    min="0"
    max="9"
    bind:value={checkDigit}
  />
</div>

<style lang="scss" src="./GenericField.scss"></style>
