<script lang="ts">
  import type { Snippet } from "svelte";
  import { formData, steps } from "$utils/stores.svelte";
  // Components
  import Steps from "$components/molecules/Steps/Steps.svelte";

  let {
    title,
    children,
  }: {
    title: string;
    children: Snippet;
  } = $props();
</script>

<section class="content-grid">
  <div class="container">
    <div class="top grid">
      <h1 class="title-medium color-green">{title}</h1>

      {#if formData.value.step > 0 && formData.value.step < steps.length - 1}
        <Steps />
      {/if}
    </div>

    <div class="layout grid">
      {@render children()}
    </div>
  </div>
</section>

<style lang="scss" src="./ContentLayout.scss"></style>
