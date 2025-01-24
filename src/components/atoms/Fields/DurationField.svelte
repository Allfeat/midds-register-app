<script lang="ts">
  import { MusicalWorkDuration } from "@allfeat/sdk";

  let { durationInput = $bindable() }: { durationInput: MusicalWorkDuration } =
    $props();

  let minutes: number = $state(0);
  let seconds: number = $state(0);

  function totalSeconds(): number {
    return minutes * 60 + seconds;
  }

  $effect(() => {
    durationInput.Value = totalSeconds();
  });
</script>

<input type="number" min="0" bind:value={minutes} /> minutes
<input type="number" min="0" max="60" bind:value={seconds} /> seconds

<style lang="scss">
  input {
    width: 14%;
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
