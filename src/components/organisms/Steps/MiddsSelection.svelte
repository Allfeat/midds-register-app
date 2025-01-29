<script lang="ts">
  import ButtonChoice from "$components/atoms/ButtonChoice/ButtonChoice.svelte";
  import Tag from "$components/atoms/Tag.svelte";
  import HeadingIcon from "$components/molecules/HeadingIcon.svelte";
  import { appState } from "$utils/states.svelte";
  import { type MiddsInputs, MusicalWork, Stakeholder } from "@allfeat/sdk";
  import type { IMidds } from "@allfeat/sdk";

  enum Category {
    MusicalWork,
    Track,
  }

  class Entity {
    readonly name: string;
    readonly category: Category;

    constructor(name: string, category: Category) {
      this.name = name;
      this.category = category;
    }
  }

  class ActiveEntity extends Entity {
    readonly instance: IMidds<MiddsInputs>;

    constructor(
      name: string,
      category: Category,
      instance: IMidds<MiddsInputs>,
    ) {
      super(name, category);
      this.instance = instance;
    }
  }

  class DisabledEntity extends Entity {
    readonly tag: string;

    constructor(name: string, category: Category, tag: string) {
      super(name, category);
      this.tag = tag;
    }
  }

  const Entities: Entity[] = [
    new ActiveEntity("Stakeholder", Category.MusicalWork, new Stakeholder()),
    new ActiveEntity("Musical Work", Category.MusicalWork, new MusicalWork()),
    new DisabledEntity("Artist", Category.Track, "soon"),
    new DisabledEntity("Release", Category.Track, "soon"),
    new DisabledEntity("Track", Category.Track, "soon"),
  ];

  $effect(() => {
    console.log(appState.selectedMiddsEntity);
    console.log(Entities);
  });
</script>

<div class="inner">
  <HeadingIcon title="Choose a metadata entity" icon="entity" />

  <div class="category musicalWork">
    <p class="title">Musical Work related</p>
    <div class="choices">
      {#each Entities.filter((e) => e.category === Category.MusicalWork) as entity}
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

  <div class="category track">
    <p class="title">Track related</p>
    <div class="choices">
      {#each Entities.filter((e) => e.category === Category.Track) as entity}
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

  <div class="button-choices"></div>
</div>

<style lang="scss">
  .category {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 16px;
    width: 100%;
    border: 1px solid var(--color-light-20);
    border-radius: 4px;
  }

  .choices {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 16px;
  }

  .title {
    color: var(--color-light-50);
  }
</style>
