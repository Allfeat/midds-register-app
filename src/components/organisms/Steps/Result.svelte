<script lang="ts">
  import IconHeading from "$components/atoms/IconHeading.svelte";
  import InfoBox from "$components/molecules/InfoBox.svelte";
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
      value="0xA3F21D…7D1B12E4B7"
      link="https://etherscan.io"
    />
    <InfoBox
      icon="hash"
      label="Tx Hash"
      value="0x4F92B9…D9C5A71BFA"
      link="https://etherscan.io"
    />
    <InfoBox
      icon="hash"
      label="Block Number"
      value="x12FA3B…F0B9C4D2E0F"
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
