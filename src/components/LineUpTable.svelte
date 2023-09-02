<script lang="ts">
  import matchStore from "$lib/stores/match.store.js";

  export let players: App.PublicPlayer[];

  let whiteOnOdds: boolean;
  let captainFfeId: string | null;
  let lineup: App.Match["lineup"];

  matchStore.subscribe((value) => {
    whiteOnOdds = value.whiteOnOdds;
    captainFfeId = value.captainFfeId;
    lineup = value.lineup;
  });

  players.sort(
    (a, b) => a.firstName.localeCompare(b.firstName) || a.lastName.localeCompare(b.lastName)
  );

  const playersByFfeIdMap = players.reduce((acc, player) => {
    return acc.set(player.ffeId, player);
  }, new Map<string, App.PublicPlayer>());

  function updateCaptainFfeId(board: number) {
    return ({ target }: Event) => {
      if (!(target as HTMLInputElement).checked) return;
      const ffeId = lineup[board]?.ffeId;
      if (ffeId)
        matchStore.update((value) => ({
          ...value,
          captainFfeId: ffeId,
        }));
    };
  }

  function updateRating(board: number) {
    return ({ target }: Event) => {
      const item = lineup[board];
      if (!item) return;

      const rating = (target as HTMLInputElement).valueAsNumber;

      if (!rating) {
        const { rating: _r, ...others } = item;
        matchStore.update((value) => ({
          ...value,
          lineup: {
            ...value.lineup,
            [board]: others,
          },
        }));
        return;
      }

      matchStore.update((value) => ({
        ...value,
        lineup: {
          ...value.lineup,
          [board]: {
            ...item,
            rating,
          },
        },
      }));
    };
  }

  function updateLineup(board: number) {
    return ({ target }: Event) => {
      const player = playersByFfeIdMap.get((target as HTMLInputElement).value);
      const item = player
        ? {
            name: `${player.firstName} ${player.lastName}`,
            ffeId: player.ffeId,
            rating: player.rating,
          }
        : null;

      matchStore.update((prev) => ({
        ...prev,
        lineup: {
          ...prev.lineup,
          [board]: item,
        },
      }));
    };
  }
</script>

<div class="tableWrapper">
  <table class="table table-dark table-bordered table-striped">
    <thead>
      <tr>
        <th style="width: 7.5%;">Éch.</th>
        <th style="width: 47.5%;">Prénom NOM</th>
        <th style="width: 17.5%;">Code FFE</th>
        <th style="width: 17.5%;">Elo</th>
        <th style="width: 10%;">Capitaine</th>
      </tr>
    </thead>
    <tbody>
      {#each Object.entries(lineup) as [board, item]}
        <tr>
          <td>{board}{whiteOnOdds === (+board % 2 === 1) ? "B" : "N"}</td>
          <td>
            <input
              type="text"
              list="players-dl"
              value={item?.name ?? ""}
              on:input={updateLineup(+board)}
            />
          </td>
          <td>{item?.ffeId ?? ""}</td>
          <td>
            <input
              type="number"
              class="ratingInput"
              min={0}
              max={9999}
              value={item?.rating}
              on:input={updateRating(+board)}
            />
          </td>
          <td class="align-middle">
            <div class="text-center">
              <input
                type="radio"
                name="captainFfeId"
                value={item?.ffeId}
                checked={!!captainFfeId && item?.ffeId === captainFfeId}
                on:change={updateCaptainFfeId(+board)}
              />
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <datalist id="players-dl">
    {#each players as { firstName, lastName, ffeId }}
      <option value={ffeId}>{firstName} {lastName}</option>
    {/each}
  </datalist>
</div>

<style scoped>
  .ratingInput {
    min-width: 2rem;
    max-width: 5rem;
  }
</style>
