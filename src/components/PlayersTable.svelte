<script lang="ts">
  import PlayerButtons from "$components/PlayerButtons.svelte";
  import PlayerTableHeading from "$components/PlayerTableHeading.svelte";
  import PlayersTableSearch from "$components/PlayersTableSearch.svelte";
  import playerTableStore from "$lib/stores/player-table.store.js";

  export let players: App.PublicPlayer[];
  export let user: App.User;
  let search = "";

  const searchableValues = players.reduce((acc, { ffeId, firstName, lastName, email }) => {
    acc[ffeId] =
      ffeId.toLowerCase() +
      firstName.toLocaleLowerCase() +
      lastName.toLocaleLowerCase() +
      email.toLowerCase();
    return acc;
  }, {} as Record<string, string>);

  playerTableStore.set(
    players.map((p, index) => ({
      ...p,
      index,
      visible: true,
    }))
  );

  $: search,
    (() => {
      playerTableStore.update((prev) =>
        prev.map(({ ...p }) => ({
          ...p,
          visible: !search || searchableValues[p.ffeId].includes(search),
        }))
      );
    })();
</script>

<PlayersTableSearch bind:value={search} />

<div class="tableWrapper">
  <table class="table table-light table-striped">
    <thead>
      <tr>
        <PlayerTableHeading
          sortFn={(a, b) =>
            a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName)}
          >NOM Prénom</PlayerTableHeading
        >
        <PlayerTableHeading sortFn={(a, b) => a.ffeId.localeCompare(b.ffeId)}
          >Code FFE</PlayerTableHeading
        >
        <PlayerTableHeading
          sortFn={(a, b) => String(b.fideId ?? "").localeCompare(String(a.fideId ?? ""))}
          >N° FIDE</PlayerTableHeading
        >
        <PlayerTableHeading sortFn={(a, b) => a.email.localeCompare(b.email)}
          >Email</PlayerTableHeading
        >
        <th>Tél.</th>
        <PlayerTableHeading sortFn={(a, b) => (a.rating ?? Infinity) - (b.rating ?? Infinity)}
          >Elo</PlayerTableHeading
        >
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each $playerTableStore as { firstName, lastName, fideId, ffeId, email, phone1, rating, role, visible }}
        <tr class:d-none={!visible} id={ffeId}>
          <td>{lastName} {firstName}</td>
          <td>
            <a href="/joueurs/{ffeId}" title="Fiche joueur">{ffeId}</a>
          </td>
          <td>{fideId || ""}</td>
          <td>{email}</td>
          <td>{phone1 ?? ""}</td>
          <td>{rating || ""}</td>
          <td class="align-middle">
            <div class="d-flex justify-content-center align-items-center gap-2">
              <PlayerButtons playerFfeId={ffeId} playerRole={role} {user} />
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
