<script lang="ts">
    import Tag from '$components/atoms/Tag.svelte'
    import HeadingIcon from '$components/molecules/HeadingIcon.svelte'
    import type { IMiddsEntity } from '$lib/types/midds/entity.svelte'
    import { appState } from '$utils/states.svelte'
    import Field from '$components/atoms/Field/Field.svelte'

    const currentEntity: IMiddsEntity | null = $derived(appState.selectedMiddsEntity)
</script>

<div class="inner">
    <HeadingIcon title="Fill your metadata informations" icon="info"/>

    <p class="current-entity text-normal">
        Your entity:
        <Tag color="light">{currentEntity?.name}</Tag>
    </p>

    {#if currentEntity?.fields.length}
        <form class="form">
            {#each currentEntity.fields as field}
                <Field entityField={field} />
                <!-- <Field -->
                <!--   {...field} -->
                <!--   type={field.type as any} -->
                <!--   bind:value={metadata.value} -->
                <!-- /> -->
            {/each}
        </form>
    {/if}
</div>
