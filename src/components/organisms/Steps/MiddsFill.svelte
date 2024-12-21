<script lang="ts">
  import Tag from "$components/atoms/Tag.svelte";
  import HeadingIcon from "$components/molecules/HeadingIcon.svelte";
</script>

<div class="inner">
  <HeadingIcon title="Fill your metadata informations" icon="info" />

  <p class="current-entity text-normal">
    Your entity: <Tag color="light">{formData.value.entity?.name}</Tag>
  </p>

  {#if formData.value.entity.fields?.length}
    <form class="form">
      {#each formData.value.entity.fields as field (field.name)}
        {@const metadata = formData.value.metadatas.find(
          (meta) => meta.key === field.name,
        )}
        <!-- <Field -->
        <!--   {...field} -->
        <!--   type={field.type as any} -->
        <!--   bind:value={metadata.value} -->
        <!-- /> -->
      {/each}
    </form>
  {/if}
</div>
