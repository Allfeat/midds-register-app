<script lang="ts">
    import IconHeading from '$components/atoms/IconHeading.svelte'
    import InfoBox from '$components/molecules/InfoBox.svelte'
    import type { ResultState } from '$utils/states.svelte'

    const { result }: { result: ResultState } = $props()

    function shortenHash(hash: string): string {
        return (
            hash.substring(0, 7) +
            '...' +
            hash.substring(hash.length - 5)
        )
    }
</script>

<div class="result grid">
    <div class="heading">
        <IconHeading size="big" icon="shield"/>
        <h2 class="title title-medium is-bold">
            <strong>Success!</strong><br/>
            Your MIDDS has been registered.
        </h2>
    </div>
    <div class="infos">
        <InfoBox
                icon="hash"
                label="MIDDS Hash"
                value={shortenHash(result.middsHash)}
                link="https://etherscan.io"
        />
        <InfoBox
                icon="hash"
                label="Tx Hash"
                value={shortenHash(result.txHash)}
                link="https://etherscan.io"
        />
        <InfoBox
                icon="hash"
                label="Block Number"
                value={shortenHash(result.blockNumber)}
                link="https://etherscan.io"
        />
    </div>
    <div class="pattern">
        <img
                src="/images/pattern-logo.svg"
                alt="Allfeat logo pattern"
                width={2550}
                height={2320}
        />
    </div>
</div>
