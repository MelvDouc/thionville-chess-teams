<script lang="ts">
  import type { Match, PublicPlayer } from "$lib/types";

  export let players: PublicPlayer[];
  export let match: Match;

  const playersRecord = players.reduce((acc, player) => {
    acc[player.ffeId] = player;
    return acc;
  }, {} as Record<string, PublicPlayer>);

  $: team = match.lineup.map((item, i) => {
    const board = i + 1;
    const player = item ? playersRecord[item.ffeId] : null;

    return {
      board,
      fullName: player ? `${player.firstName} ${player.lastName}` : "",
      ffeId: player?.ffeId ?? "",
      rating: player?.rating ?? 0,
    };
  });

  function getBoardLabel(board: number) {
    const isOddBoard = board % 2 !== 0;
    const color = isOddBoard === match.whiteOnOdds ? "B" : "N";
    return board + color;
  }

  function setCaptainFfeId({ target }: Event, index: number) {
    if (!(target as HTMLInputElement).checked) return;
    const ffeId = match.lineup[index]?.ffeId;
    if (ffeId) match.captainFfeId = ffeId;
  }

  function setPlayer(e: Event, index: number) {
    const ffeId = (e.target as HTMLInputElement).value;

    if (!ffeId) {
      match.lineup[index] = null;
      return;
    }

    if (ffeId in playersRecord)
      match.lineup[index] = {
        ffeId,
        rating: playersRecord[ffeId].rating ?? 1199,
      };
  }

  function setRating({ target }: Event, index: number) {
    if (!match.lineup[index]) return;
    const rating = (target as HTMLInputElement).valueAsNumber;
    match.lineup[index]!.rating = rating;
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
      {#each team as { board, ffeId, fullName, rating }, i}
        <tr>
          <td>{getBoardLabel(board)}</td>
          <td>
            <input
              type="text"
              list="players-dl"
              value={fullName}
              on:input={(e) => setPlayer(e, i)}
            />
          </td>
          <td>{ffeId}</td>
          <td>
            <input
              type="number"
              class="ratingInput"
              value={rating}
              on:input={(e) => setRating(e, i)}
            />
          </td>
          <td>
            <input
              type="radio"
              name="captainFfeId"
              value={ffeId}
              checked={match.captainFfeId === ffeId}
              on:change={(e) => setCaptainFfeId(e, i)}
            />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<datalist id="players-dl">
  {#each players as { firstName, lastName, ffeId }}
    <option value={ffeId}>{firstName} {lastName}</option>
  {/each}
</datalist>

<style>
  .ratingInput {
    min-width: 2rem;
    max-width: 5rem;
  }
</style>
