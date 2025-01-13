<script lang="ts">
    import ButtonChoice from '$components/atoms/ButtonChoice/ButtonChoice.svelte'
    import Tag from '$components/atoms/Tag.svelte'
    import HeadingIcon from '$components/molecules/HeadingIcon.svelte'
    import { appState } from '$utils/states.svelte'
    import { Stakeholder, type StakeholderInputs } from '@allfeat/sdk'
    import type { IMidds } from '@allfeat/sdk'

    type DisabledEntity = {
        name: string,
        tag: string
    }

    const Entities: IMidds<StakeholderInputs>[] = [
        new Stakeholder()
    ]
    const DisabledEntities: DisabledEntity[] = [
        { name: 'Artist', tag:'soon' }
    ]

    $effect(() => {
        console.log(appState.selectedMiddsEntity)
        console.log(Entities)
    })
</script>

<div class="inner">
    <HeadingIcon title="Choose a metadata entity" icon="entity"/>

    <div class="button-choices">
        {#each Entities as entity}
            <ButtonChoice
                    active={appState.selectedMiddsEntity?.constructor.name === entity.constructor.name }
                    onclick={() => appState.selectedMiddsEntity = entity }
            >
                {entity.constructor.name}
            </ButtonChoice>
        {/each}
        {#each DisabledEntities as entity}
            <ButtonChoice disabled >
                {entity.name}
                {#if entity.tag}
                    <Tag color="red">{entity.tag}</Tag>
                {/if}
            </ButtonChoice>
        {/each}
    </div>
</div>
