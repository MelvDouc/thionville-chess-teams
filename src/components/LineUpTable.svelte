<script lang="ts">
  import type { Writable } from "svelte/store";

  export let players: App.Player[];
  export let whiteOnOdds: App.Match["whiteOnOdds"];
  export let captainFfeId: App.Match["captainFfeId"];
  export let lineUpStore: Writable<App.Match["lineUp"]>;

  const map = players.reduce((acc, { firstName, lastName, ffeId, rating }) => {
    const name = `${firstName} ${lastName}`;
    return acc.set(name, { name, ffeId, rating });
  }, new Map<string, App.LineUpItem>());

  function getCheckedHandler(board: number) {
    return ({ target }: Event) => {
      if ($lineUpStore[board] && (target as HTMLInputElement).checked)
        captainFfeId = $lineUpStore[board]!.ffeId;
    };
  }

  function getUpdateByNameFn(board: number) {
    return ({ target }: Event) => {
      const name = (target as HTMLInputElement).value;
      lineUpStore.update((prev) => ({
        ...prev,
        [board]: !name
          ? null
          : map.get(name) ?? {
              name,
              ffeId: "",
              rating: 0,
            },
      }));
    };
  }

  function getUpdateFfeIdFn(board: number) {
    return ({ target }: Event) => {
      const ffeId = (target as HTMLInputElement).value;
      lineUpStore.update((prev) => ({
        ...prev,
        [board]: prev[board] ? { ...prev[board]!, ffeId } : { name: "", ffeId, rating: 0 },
      }));
    };
  }

  function getUpdateRatingFn(board: number) {
    return ({ target }: Event) => {
      const rating = (target as HTMLInputElement).valueAsNumber;
      lineUpStore.update((prev) => {
        if (!prev[board]) return prev;
        return {
          ...prev,
          [board]: { ...prev[board]!, rating },
        };
      });
    };
  }
</script>

<div class="lineup-table">
  <section class="head">
    <article class="row">
      <div>Éch.</div>
      <div>Prénom NOM</div>
      <div>Code FFE</div>
      <div>Elo</div>
      <div>Cap.</div>
    </article>
  </section>
  <section class="body">
    {#each Object.entries($lineUpStore) as [board, item]}
      <article class="row">
        <div>{+board}{(+board % 2 === 1) === whiteOnOdds ? "B" : "N"}</div>
        <div>
          <input
            type="text"
            value={item?.name ?? ""}
            on:input={getUpdateByNameFn(+board)}
            list="players-datalist"
          />
        </div>
        <div>
          <input type="text" value={item?.ffeId ?? ""} on:input={getUpdateFfeIdFn(+board)} />
        </div>
        <div>
          <input type="number" value={item?.rating || ""} on:input={getUpdateRatingFn(+board)} />
        </div>
        <div>
          <input
            type="radio"
            name="captain-ffe-id"
            checked={captainFfeId !== null && item?.ffeId === captainFfeId}
            on:change={getCheckedHandler(+board)}
          />
        </div>
      </article>
    {/each}
  </section>

  <datalist id="players-datalist">
    {#each [...map.keys()] as name}
      <option value={name}>{name}</option>
    {/each}
  </datalist>
</div>

<style lang="scss" scoped>
  .lineup-table {
    background-color: black;
    padding: 0.66em;
    gap: 0.66em;
    display: flex;
    flex-direction: column;

    section {
      display: flex;
      flex-direction: column;
      gap: 0.33em;
    }
  }

  .row {
    display: grid;
    grid-template-columns: 10% 40% 20% 20% 10%;
    gap: 0.33em;

    > div {
      input:not([type="radio"]) {
        width: 100%;
      }
    }
  }
</style>
