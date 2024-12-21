<script lang="ts">
  import {
    connected,
    formData,
    currentWallet,
    steps,
  } from "$utils/stores.svelte";
  // Components
  import Metas from "$components/Metas.svelte";
  import ContentLayout from "$layouts/ContentLayout/ContentLayout.svelte";
  import Button from "$components/atoms/Button/Button.svelte";
  import IconHeading from "$components/atoms/IconHeading.svelte";
  import HeadingIcon from "$components/molecules/HeadingIcon.svelte";
  import InfoBox from "$components/molecules/InfoBox.svelte";
  import Intro from "$components/organisms/Steps/Intro.svelte";
  import MiddsSelection from "$components/organisms/Steps/MiddsSelection.svelte";
  import MiddsFill from "$components/organisms/Steps/MiddsFill.svelte";
  import Confirmation from "$components/organisms/Steps/Confirmation.svelte";
  import Sending from "$components/organisms/Steps/Sending.svelte";
  import Result from "$components/organisms/Steps/Result.svelte";

  // let { data } = $props()

  // Steps
  const step = $derived(steps[formData.value.step]);
  const isStep = (steps: string[]) => steps.includes(step);
  let isEnded = $state(false);

  /** Go to next step until end */
  const nextStep = () => {
    if (formData.value.step >= steps.length - 1) return;
    formData.value.step++;

    // If last step, set isEnded to true
    if (step === "result") {
      isEnded = true;
      formData.reset();
    }
  };

  // Entities
  const entities: Entity[] = [
    {
      name: "Stakeholder",
      value: "stakeholder",
      fields: [
        {
          label: "Full Name",
          placeholder: "Enter full name",
          type: "text",
          required: true,
          name: "fullName",
          id: "fullName",
        },
        {
          label: "Email",
          placeholder: "Enter email address",
          type: "email",
          required: true,
          name: "email",
          id: "email",
        },
        {
          label: "Role",
          placeholder: "Enter role",
          type: "text",
          required: true,
          name: "role",
          id: "role",
        },
      ],
    },
    {
      name: "Musical Work",
      value: "musical-work",
      fields: [
        {
          label: "Title",
          placeholder: "Enter title",
          type: "text",
          required: true,
          name: "title",
          id: "title",
        },
        {
          label: "Composer",
          placeholder: "Enter composer name",
          type: "text",
          required: true,
          name: "composer",
          id: "composer",
        },
        {
          label: "Year",
          placeholder: "Enter year",
          type: "number",
          required: true,
          name: "year",
          id: "year",
        },
      ],
    },
    {
      name: "Artist",
      value: "artist",
      disabled: true,
      tag: "Soon",
    },
  ];

  /** Change current entity */
  const changeEntity = (entity: Entity) => {
    formData.value.entity = entity;

    // Initialize metadata fields for the selected entity
    formData.value.metadatas = entity.fields?.map(({ name, label }) => ({
      key: name,
      name: label,
      value: "",
    }));
  };

  // Wallet
  /** Connect wallet */
  const handleWalletConnect = () => {
    connected.value = true;
    currentWallet.value = "5Gjsizk..2jz90";
  };

  // Sending step with loading
  $effect(() => {
    // Temp: wait 3sc for going to result
    if (step === "sending") {
      setTimeout(nextStep, 3000);
    }
  });
</script>

<Metas title="MIDDS" description="" image="" />

<main class="app">
  <ContentLayout title="MIDDS Registration">
    <div
      class="content block grid"
      class:is-full={step === "result" || isEnded}
    >
      {#if !isEnded}
        {#if step === "intro"}
          <Intro />
        {:else if step === "entity"}
          <MiddsSelection />
        {:else if step === "information"}
          <MiddsFill />
        {:else if step === "confirmation"}
          <Confirmation />
        {:else if step === "sending"}
          <Sending />
        {/if}
      {:else}
        <Result />
      {/if}
    </div>

    {#if !isStep(["result"]) && !isEnded}
      <div class="pattern block" class:is-full={isStep(["sending"])}>
        <img
          src="/images/pattern-logo.svg"
          alt="Allfeat logo pattern"
          width={2550}
          height={2320}
        />
      </div>
    {/if}

    {#if !isStep(["sending", "result"]) && !isEnded}
      <div class="next block">
        {#if step === "intro"}
          <Button size="big" color="gradient" onclick={nextStep}>
            Get Started
          </Button>
        {:else}
          <Button
            size="big"
            color="green"
            onclick={nextStep}
            disabled={!formData.value.entity ||
              (formData.value.step > 2 && !connected.value)}
          >
            Continue
          </Button>
        {/if}
      </div>
    {/if}
  </ContentLayout>
</main>

<style lang="scss" src="../styles/app.scss"></style>
