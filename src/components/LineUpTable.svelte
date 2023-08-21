<script lang="ts">
  import type { Writable } from "svelte/store";

  export let players: App.Player[];
  export let whiteOnOdds: App.Match["whiteOnOdds"];
  export let captainFfeId: App.Match["captainFfeId"];
  export let lineUpStore: Writable<App.Match["lineup"]>;

  const playersByName = players.reduce((acc, player) => {
    return acc.set(`${player.firstName} ${player.lastName}`, player);
  }, new Map<string, App.Player>());

  function updateLineupItem(board: number) {
    return ({ target }: Event) => {
      if (!(target instanceof HTMLInputElement)) return;

      if (!target.value) {
        lineUpStore.update((prev) => ({
          ...prev,
          [board]: null,
        }));
        return;
      }

      const player = playersByName.get(target.value);
      const item: App.LineUpItem = {
        name: target.value,
        ffeId: player?.ffeId ?? $lineUpStore[board]?.ffeId ?? "",
      };
      if (player?.rating != null) item.rating = player.rating;
      else if ($lineUpStore[board]?.rating != null) item.rating = $lineUpStore[board]!.rating;
      lineUpStore.update((prev) => ({
        ...prev,
        [board]: item,
      }));
    };
  }

  function updateCaptainFfeId(board: number) {
    return ({ target }: Event) => {
      const item = $lineUpStore[board];
      if (item && (target as HTMLInputElement).checked) captainFfeId = item.ffeId;
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
              on:input={updateLineupItem(+board)}
              list="players-datalist"
            />
          </td>
          <td>
            <input
              type="text"
              class="ffeId-input"
              value={item?.ffeId ?? ""}
              on:input={({ target }) => {
                if (item && target instanceof HTMLInputElement) item.ffeId = target.value;
              }}
            />
          </td>
          <td>
            <input
              type="number"
              class="rating-input"
              value={item?.rating || ""}
              on:input={({ target }) => {
                if (item && target instanceof HTMLInputElement && target.valueAsNumber)
                  item.rating = target.valueAsNumber;
              }}
            />
          </td>
          <td class="text-center">
            <input
              type="radio"
              name="captain-ffe-id"
              checked={captainFfeId !== null && item?.ffeId === captainFfeId}
              on:change={updateCaptainFfeId(+board)}
            />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <datalist id="players-datalist">
    {#each [...playersByName.keys()] as name}
      <option value={name}>{name}</option>
    {/each}
  </datalist>
</div>

<style scoped>
  .rating-input {
    width: 4em;
  }

  .ffeId-input {
    width: 6em;
  }
</style>
