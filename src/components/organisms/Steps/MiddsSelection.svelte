<script lang="ts">
  import ButtonChoice from "$components/atoms/ButtonChoice/ButtonChoice.svelte";
  import Tag from "$components/atoms/Tag.svelte";
  import HeadingIcon from "$components/molecules/HeadingIcon.svelte";
</script>

<div class="inner">
  <HeadingIcon title="Choose a metadata entity" icon="entity" />

  <div class="button-choices">
    {#each entities as entity (entity.value)}
      <ButtonChoice
        active={formData.value.entity?.value === entity.value}
        disabled={entity.disabled}
        onclick={() => changeEntity(entity)}
      >
        {entity.name}
        {#if entity.tag}
          <Tag color="red">{entity.tag}</Tag>
        {/if}
      </ButtonChoice>
    {/each}
  </div>
</div>
