<style lang="scss">
    .heading-icon {
        display: flex;
        align-items: center;
        gap: 16px;
    }
    .icon {
        display: grid;
        place-items: center;
        width: 56px;
        aspect-ratio: 1;
        border: 1px solid var(--color-light-10);
        border-radius: 100%;

        img {
            display: block;
            width: 50%;
            min-width: 20px;
            height: auto;
        }
    }
</style>

<script lang="ts">
    let { title, icon }: { title: string, icon: string } = $props()
</script>

<h2 class="heading-icon title-medium">
    <span class="icon">
        <img src="/images/icon-{icon}.svg" alt="{icon} icon" width={28} height={28}>
    </span>
    <strong>{title}</strong>
</h2>
