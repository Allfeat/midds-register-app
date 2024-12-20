<style lang="scss" src="./Steps.scss"></style>

<script lang="ts">
    import cx from 'classix'
    import { formData, steps } from '$utils/stores.svelte'
    // Components
    import Button from '$components/atoms/Button/Button.svelte'

    const actualSteps = steps.filter(step => !['intro', 'result'].includes(step))
    const canGoBack = $derived(formData.value.step > 0)
</script>

<div class="steps">
    <span>Step</span>
    <ul>
        {#each actualSteps, index}
            {@const isActive = index + 1 === formData.value.step}
            {@const isPast = index + 1 < formData.value.step}
            {@const classes = cx('step', isActive && 'is-active', isPast && 'is-past')}
            <li>
                {#if isPast}
                    <button class={classes} onclick={() => formData.value.step = index + 1}>{index + 1}</button>
                {:else}
                    <span class={classes}>{index + 1}</span>
                {/if}
            </li>
        {/each}
    </ul>

    {#if canGoBack}
        <div class="back">
            <Button size="small" type="border" onclick={() => formData.value.step--}>Back</Button>
        </div>
    {/if}
</div>
