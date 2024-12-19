<style lang="scss" src="../styles/app.scss"></style>

<script lang="ts">
    import { connected, currentStep, currentWallet, steps } from '$utils/stores.svelte'
    // Components
    import Metas from '$components/Metas.svelte'
    import ContentLayout from '$layouts/ContentLayout/ContentLayout.svelte'
    import Button from '$components/atoms/Button/Button.svelte'
    import ButtonChoice from '$components/atoms/ButtonChoice/ButtonChoice.svelte'
    import ButtonWallet from '$components/atoms/ButtonWallet/ButtonWallet.svelte'
    import IconHeading from '$components/atoms/IconHeading.svelte'
    import Tag from '$components/atoms/Tag.svelte'
    import Field from '$components/atoms/Field/Field.svelte'
    import HeadingIcon from '$components/molecules/HeadingIcon.svelte'
    import Table from '$components/molecules/Table.svelte'
    import InfoBox from '$components/molecules/InfoBox.svelte'

    // let { data } = $props()

    // Steps
    const step = $derived(steps[currentStep.value])
    const isStep = (steps: string[]) => steps.includes(step)
    let isEnded = $state(false)

    /** Go to next step until end */
    const nextStep = () => {
        if (currentStep.value >= steps.length - 1) return
        currentStep.value++

        // If last step, set isEnded to true
        if (step === 'result') {
            isEnded = true
            currentStep.value = 0
        }
    }

    // Entities
    const entities = [
        { name: 'Stakeholder', value: 'stakeholder' },
        { name: 'Musical Work', value: 'musical-work' },
        { name: 'Artist', value: 'artist', disabled: true, tag: 'Soon' },
    ]
    let currentEntity = $state<typeof entities[number] | null>()

    /** Change current entity */
    const changeEntity = (entity: typeof entities[number]) => {
        currentEntity = entity
    }

    // Fields and Metadatas
    const formFields = [
        { label: 'Field 1', placeholder: 'Enter your metadata value', type: 'text', required: true, name: 'field1', id: 'field1' },
        { label: 'Field 2', placeholder: 'Enter your metadata value', type: 'text', required: true, name: 'field2', id: 'field2' },
        { label: 'Field 3', placeholder: 'Enter your metadata value', type: 'text', required: true, name: 'field3', id: 'field3' },
    ]
    let metadatas = $state({
        field1: '',
        field2: '',
        field3: '',
    })

    // Wallet
    /** Connect wallet */
    const handleWalletConnect = () => {
        connected.value = true
        currentWallet.value = '5Gjsizk..2jz90'
    }

    // Sending step with loading
    $effect(() => {
        // Temp: wait 3sc for going to result
        if (step === 'sending') {
            setTimeout(nextStep, 3000)
        }
    })
</script>

<Metas
    title="MIDDS"
    description=""
    image=""
/>


<main class="app">
    <ContentLayout title="MIDDS Registration">
        <div class="content block grid" class:is-full={step === 'result' || isEnded}>
            {#if !isEnded}
                {#if step === 'intro'}
                    <div class="inner">
                        <div class="heading">
                            <div class="icons">
                                {#each ['shield', 'folder', 'medal', 'cog'] as icon}
                                    <IconHeading size="small" {icon} />
                                {/each}
                            </div>
                            <h2 class="title-medium">Music Industry Decentralized Data Structures</h2>
                        </div>
                        <div class="text text-medium color-light-faded">
                            <p>Vestibulum quis sem vehicula metus pellentesque fermentum. Aenean consequat libero pellentesque sollicitudin convallis. Proin fringilla hendrerit massa a ullamcorper. Nulla commodo malesuada ligula ac malesuada. In suscipit ullamcorper dui ac lobortis. Aliquam semper viverra sapien, sit amet suscipit tellus ultricies id. Vivamus lacinia tortor augue, sit amet vehicula risus viverra sed.</p>
                        </div>
                    </div>

                {:else if step === 'entity'}
                    <div class="inner">
                        <HeadingIcon title="Choose a metadata entity" icon="entity" />

                        <div class="button-choices">
                            {#each entities as entity (entity.value)}
                                <ButtonChoice
                                    active={currentEntity?.value === entity.value}
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

                {:else if step === 'information'}
                    <div class="inner">
                        <HeadingIcon title="Fill your metadata informations" icon="info" />

                        <p class="current-entity text-normal">
                            Your entity: <Tag color="light">{currentEntity?.name}</Tag>
                        </p>

                        <form class="form">
                            {#each formFields as field (field.name)}
                                <Field
                                    {...field}
                                    type={field.type as any}
                                    bind:value={metadatas[field.name]}
                                />
                            {/each}
                        </form>
                    </div>

                {:else if step === 'confirmation'}
                    <div class="inner">
                        <HeadingIcon title="Account and confirmation" icon="user" />

                        {#if !connected.value}
                            <div>
                                <p class="text-normal color-light-faded">Please connect a wallet and select the account to use to continue:</p>
                                <ButtonWallet size="big" onclick={handleWalletConnect} />
                            </div>
                        {:else if metadatas?.field1}
                            <p class="text-normal color-light-faded">Review your MIDDS information to confirm your registration:</p>

                            <Table
                                fields={[
                                    { label: 'Field 1', value: metadatas.field1 },
                                    { label: 'Field 2', value: metadatas.field2 },
                                    { label: 'Field 3', value: metadatas.field3 },
                                ]}
                            />

                            <div>
                                <p class="text-normal color-light-faded">Using your account:</p>
                                <ButtonWallet size="big" />
                            </div>
                        {/if}
                    </div>

                {:else if step === 'sending'}
                    <div class="inner">
                        <HeadingIcon title="Sending MIDDS…" icon="loading" />
                        <p class="text-normal color-light-faded">Please wait while your MIDDS is being registered on the chain....</p>
                    </div>
                {/if}
            {:else}
                <div class="result grid">
                    <div class="heading">
                        <IconHeading size="big" icon="shield" />
                        <h2 class="title title-medium is-bold">
                            <strong>Success!</strong><br>
                            Your MIDDS has been registered.
                        </h2>
                    </div>
                    <div class="infos">
                        <InfoBox icon="hash" label="MIDDS Hash" value="0xA3F21D…7D1B12E4B7" link="https://etherscan.io" />
                        <InfoBox icon="hash" label="Tx Hash" value="0x4F92B9…D9C5A71BFA" link="https://etherscan.io" />
                        <InfoBox icon="hash" label="Block Number" value="x12FA3B…F0B9C4D2E0F" link="https://etherscan.io" />
                    </div>
                    <div class="pattern">
                        <img src="/images/pattern-logo.svg" alt="Allfeat logo pattern" width={2550} height={2320}>
                    </div>
                </div>
            {/if}
        </div>

        {#if !isStep(['result']) && !isEnded}
            <div class="pattern block" class:is-full={isStep(['sending'])}>
                <img src="/images/pattern-logo.svg" alt="Allfeat logo pattern" width={2550} height={2320}>
            </div>
        {/if}

        {#if !isStep(['sending', 'result']) && !isEnded}
            <div class="next block">
                {#if step === 'intro'}
                    <Button size="big" color="gradient" onclick={nextStep}>
                        Get Started
                    </Button>
                {:else}
                    <Button size="big" color="green" onclick={nextStep} disabled={!currentEntity || currentStep.value > 2 && !connected.value}>
                        Continue
                    </Button>
                {/if}
            </div>
        {/if}
    </ContentLayout>
</main>
