<script lang="ts">
    let {
        fields,
    }: {
        fields: {
            label: string
            value: string
        }[]
    } = $props()
</script>

<div class="table">
    {#each fields as field}
        <div class="row">
            <div class="label">{field.label}</div>
            <div class="value">{field.value}</div>
        </div>
    {/each}
</div>

<style lang="scss">
    .table {
        width: 100%;
        border: 1px solid var(--color-light-20);
        border-radius: 6px;
    }

    .row {
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        &:not(:last-child) {
            border-bottom: 1px solid var(--color-light-20);
        }

        div {
            padding: 12px 16px;
        }
    }
    .label {
        color: var(--color-light-50);
        border-right: 1px solid var(--color-light-20);
    }
    .value {
        color: var(--color-light);
    }
</style>