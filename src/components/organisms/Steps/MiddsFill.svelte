<script lang="ts">
  import Tag from "$components/atoms/Tag.svelte";
  import HeadingIcon from "$components/molecules/HeadingIcon.svelte";
  import { appState } from "$utils/states.svelte";
  import Field from "$components/atoms/Field/Field.svelte";
  import type { IMidds, MiddsInputs } from "@allfeat/sdk";

  const currentEntity: IMidds<MiddsInputs> | null = $derived(
    appState.selectedMiddsEntity,
  );
</script>

<div class="inner">
  <HeadingIcon title="Fill your metadata informations" icon="info" />

  <div>
    <p class="current-entity text-normal">
      Your entity:
      <Tag color="light">{currentEntity?.constructor.name}</Tag>
    </p>
    <p class="remark">
      (All fields are optionnals but AT LEAST ONE should be filled to submit a
      new MIDDS.)
    </p>
  </div>

  {#if currentEntity && Object.values(currentEntity.inputs).length}
    <form class="form">
      {#each Object.values(currentEntity.inputs) as field}
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

<style lang="scss">
  p.remark {
    font-size: 14px;
    font-style: italic;
    color: gray;
  }
</style>
