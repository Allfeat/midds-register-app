<script lang="ts">
    import type { IMiddsInput } from '@allfeat/sdk'

    let { entityField = $bindable() }: { entityField: IMiddsInput<string | number, any> } = $props()
    let value: string | number | null = $state(null)
    let isValid: boolean = $state(true)

    value = entityField.Value
    isValid = entityField.isValid

    $effect(() => {
        entityField.Value = value
        isValid = entityField.isValid
    })
</script>

<div class="field">
    <p class="text-normal"><label for={entityField.Name}>{entityField.Name}</label></p>
    <input class={isValid ? '' : 'invalid-value'} type={typeof entityField.Value} id={entityField.Name} name={entityField.Name}
           bind:value >
    {#if !isValid}
        <p class="invalid">Invalid value</p>
    {/if}
</div>

<style lang="scss">
  .field {
    margin-bottom: 1.25em;
  }

  p {
    margin-bottom: 0.75em;

    &.invalid {
      font-size: small;
      color: var(--color-secondary)
    }
  }

  .invalid-value {
    border-color: var(--color-secondary) !important;
  }

  input {
    width: 100%;
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

    &:hover, &:focus, &:active {
      border-color: var(--color-light-50);
    }

    &:not(:placeholder-shown) {
      border-color: var(--color-light-75);
    }
  }
</style>
