<script lang="ts">
  import IconHeading from "$components/atoms/IconHeading.svelte";
  import InfoBox from "$components/molecules/InfoBox.svelte";
  import type { IRegisterResult } from "@allfeat/sdk";

  const { result }: { result: IRegisterResult } = $props();

  function shortenHash(hash: string): string {
    return hash.substring(0, 12) + "..." + hash.substring(hash.length - 6);
  }
</script>

<div class="result grid">
  <div class="heading">
    <IconHeading size="big" icon="shield" />
    <h2 class="title title-medium is-bold">
      <strong>Success!</strong><br />
      Your MIDDS has been registered.
    </h2>
  </div>
  <div class="infos">
    <InfoBox
      icon="hash"
      label="MIDDS Hash"
      value={shortenHash(result.middsHash)}
    />
    <InfoBox icon="hash" label="Tx Hash" value={shortenHash(result.txHash)} />
    <InfoBox
      icon="hash"
      label="Block Number"
      value={result.blockNumber.toString()}
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
