<script lang="ts">
  import { type IShare, Shares } from "@allfeat/sdk";
  import Button from "../Button/Button.svelte";

  let { sharesInput = $bindable() }: { sharesInput: Shares } = $props();
  let sharesProxy: IShare[] = $state([]);

  function addShare() {
    const newShare: IShare = $state({
      stakeholderId: "",
      shareInfo: {
        role: "A",
        mechanicalShare: 0,
        performanceShare: 0,
      },
    });
    sharesInput.Value = [...sharesInput.Value, newShare];
    sharesProxy = sharesInput.Value;
  }
</script>

<div class="shares">
  {#each sharesProxy as share}
    <div class="share">
      <div class="shareStakeId">
        <p>Stakeholder MIDDS Identifier</p>
        <input id="stakeholderId" bind:value={share.stakeholderId} />
      </div>
      <div class="shareInfos">
        <div>
          <p>Role</p>
          <select bind:value={share.shareInfo.role}>
            <option value="A">Author, Writer, Lyricist</option>
            <option value="AD">Adaptor</option>
            <option value="AM">Administrator</option>
            <option value="AR">Arranger</option>
            <option value="AQ">Acquirer</option>
            <option value="C">Composer</option>
            <option value="CA">Composer/Author</option>
            <option value="E">Original Publisher</option>
            <option value="ES">Substitute Publisher</option>
            <option value="PA">Publisher Income Participant</option>
            <option value="PR">Associated Performer</option>
            <option value="SA">Sub-Author</option>
            <option value="SE">Sub-Publisher</option>
            <option value="SR">Sub-Arranger</option>
            <option value="TR">Translator</option>
          </select>
        </div>
        <div>
          <p>Mechanical Share</p>
          <input
            class="percentShare"
            type="number"
            bind:value={share.shareInfo.mechanicalShare}
          /> %
        </div>
        <div>
          <p>Performance Share</p>
          <input
            class="percentShare"
            type="number"
            bind:value={share.shareInfo.performanceShare}
          /> %
        </div>
      </div>
    </div>
  {/each}

  <Button onclick={addShare}>+ Add Share</Button>
</div>

<style lang="scss">
  input {
    width: 75%;
    height: 48px;
    padding: 18px 16px;
    background: none;
    border: 1px solid var(--color-light-20);
    border-radius: 6px;
    font-family: inherit;
    font-weight: 400;
    font-size: pxrem(16px);
    line-height: 1;
    color: var(--color-light);
    transition: border-color 0.3s;

    &::placeholder {
      opacity: 1;
      color: var(--color-light-50);
    }

    &:hover,
    &:focus,
    &:active {
      border-color: var(--color-light-50);
    }

    &:not(:placeholder-shown) {
      border-color: var(--color-light-75);
    }
  }

  input.percentShare {
    height: 36px;
    width: 72px;
  }

  .shareInfos {
    display: flex;
    gap: 10%;
  }

  .shares {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .share {
    display: flex;
    flex-direction: column;
    gap: 16px;
    border: 1px solid var(--color-light-20);
    border-radius: 6px;
    padding: 12px;
  }

  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: none;
    border: 1px solid var(--color-light-20);
    border-radius: 4px;
    padding: 8px 32px 8px 12px;
    font-size: 14px;
    color: var(--color-light);
    cursor: pointer;
    transition: border-color 0.3s ease;

    &:hover,
    &:focus,
    &:active {
      border-color: var(--color-light-50);
      outline: none;
    }

    background: url('data:image/svg+xml;utf8,<svg fill="%23cccccc" height="12" viewBox="0 0 24 24" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 12px;
  }
</style>
