<script lang="ts">
  import ButtonChoice from "$components/atoms/ButtonChoice/ButtonChoice.svelte";
  import Tag from "$components/atoms/Tag.svelte";
  import HeadingIcon from "$components/molecules/HeadingIcon.svelte";
  import { appState } from "$utils/states.svelte";
  import { type MiddsInputs, MusicalWork, Stakeholder } from "@allfeat/sdk";
  import type { IMidds } from "@allfeat/sdk";

  enum Category {}

  class Entity {
    readonly name: string;

    constructor(name: string) {
      this.name = name;
    }
  }

  class ActiveEntity extends Entity {
    readonly instance: IMidds<MiddsInputs>;

    constructor(name: string, instance: IMidds<MiddsInputs>) {
      super(name);
      this.instance = instance;
    }
  }

  class DisabledEntity extends Entity {
    readonly tag: string;

    constructor(name: string, tag: string) {
      super(name);
      this.tag = tag;
    }
  }

  const Entities: Entity[] = [
    new ActiveEntity("Stakeholder", new Stakeholder()),
    new ActiveEntity("Musical Work", new MusicalWork()),
    new DisabledEntity("Artist", "soon"),
  ];

  $effect(() => {
    console.log(appState.selectedMiddsEntity);
    console.log(Entities);
  });
</script>

<div class="inner">
  <HeadingIcon title="Choose a metadata entity" icon="entity" />

  <div class="button-choices">
    {#each Entities as entity}
      {#if entity instanceof ActiveEntity}
        <ButtonChoice
          active={appState.selectedMiddsEntityName === entity.name}
          onclick={() => (
            (appState.selectedMiddsEntity = entity.instance),
            (appState.selectedMiddsEntityName = entity.name)
          )}
        >
          {entity.name}
        </ButtonChoice>
      {:else if entity instanceof DisabledEntity}
        <ButtonChoice disabled>
          {entity.name}
          {#if entity.tag}
            <Tag color="red">{entity.tag}</Tag>
          {/if}
        </ButtonChoice>
      {/if}
    {/each}
  </div>
</div>
