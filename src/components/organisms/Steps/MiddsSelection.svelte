<script lang="ts">
    import ButtonChoice from '$components/atoms/ButtonChoice/ButtonChoice.svelte'
    import Tag from '$components/atoms/Tag.svelte'
    import HeadingIcon from '$components/molecules/HeadingIcon.svelte'
    import {
        DisabledMiddsEntity,
        type IMiddsEntity,
        MusicalWorkMiddsEntity, StakeholderMiddsEntity,
    } from '$lib/types/midds/entity.svelte'
    import { appState } from '$utils/states.svelte'

    // Entities
    const Artist = new DisabledMiddsEntity('Artist', 'Soon')
    const Stakeholder = new StakeholderMiddsEntity()
    const Song = new MusicalWorkMiddsEntity()
    const Entities: IMiddsEntity[] = [Stakeholder, Song, Artist]
</script>

<div class="inner">
    <HeadingIcon title="Choose a metadata entity" icon="entity"/>

    <div class="button-choices">
        {#each Entities as entity (entity.value)}
            <ButtonChoice
                    active={appState.selectedMiddsEntity?.value === entity.value}
                    disabled={entity.disabled}
                    onclick={() => appState.selectedMiddsEntity = entity}
            >
                {entity.name}
                {#if entity instanceof DisabledMiddsEntity}
                    <Tag color="red">{entity.tag}</Tag>
                {/if}
            </ButtonChoice>
        {/each}
    </div>
</div>
