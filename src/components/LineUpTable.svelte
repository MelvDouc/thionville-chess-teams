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

<div class="tableWrapper">
  <table class="table table-warning table-striped table-hover">
    <thead>
      <tr>
        <th>Éch.</th>
        <th>Prénom NOM</th>
        <th>Code FFE</th>
        <th>Elo</th>
        <th class="text-center">Cap.</th>
      </tr>
    </thead>
    <tbody>
      {#each Object.entries($lineUpStore) as [board, item]}
        <tr>
          <td>{+board}{(+board % 2 === 1) === whiteOnOdds ? "B" : "N"}</td>
          <td>
            <input
              type="text"
              value={item?.name ?? ""}
              on:input={getUpdateByNameFn(+board)}
              list="players-datalist"
            />
          </td>
          <td>
            <input
              type="text"
              class="ffeId-input"
              value={item?.ffeId ?? ""}
              on:input={getUpdateFfeIdFn(+board)}
            />
          </td>
          <td>
            <input
              type="number"
              class="rating-input"
              value={item?.rating || ""}
              on:input={getUpdateRatingFn(+board)}
            />
          </td>
          <td class="text-center">
            <input
              type="radio"
              name="captain-ffe-id"
              checked={captainFfeId !== null && item?.ffeId === captainFfeId}
              on:change={getCheckedHandler(+board)}
            />
          </td>
        </tr>
      {/each}
    </tbody>

    <datalist id="players-datalist">
      {#each [...map.keys()] as name}
        <option value={name}>{name}</option>
      {/each}
    </datalist>
  </table>
</div>

<style scoped>
  .rating-input {
    width: 4em;
  }

  .ffeId-input {
    width: 6em;
  }
</style>
