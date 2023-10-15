<script lang="ts">
  import PlayerButtons from "$components/PlayerButtons.svelte";
  import PlayerRatingUpdateButton from "$components/PlayerRatingUpdateButton.svelte";
  import PlayerTableHeading from "$components/PlayerTableHeading.svelte";
  import PlayersTableSearch from "$components/PlayersTableSearch.svelte";
  import playersStore, {
    sortByEmail,
    sortByFfeId,
    sortByFideId,
    sortByFullName,
    sortByRating,
  } from "$lib/stores/players.store";
  import type { User } from "$lib/types";

  export let user: User;
  let search = "";

  const searchableValues = $playersStore.reduce((acc, { ffeId, firstName, lastName, email }) => {
    acc[ffeId] =
      ffeId.toLowerCase() + firstName.toLowerCase() + lastName.toLowerCase() + email.toLowerCase();
    return acc;
  }, {} as Record<string, string>);

  $: search,
    (() => {
      playersStore.update((prev) =>
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
        <PlayerTableHeading sortFn={sortByFullName} defaultOrder={1}>NOM Prénom</PlayerTableHeading>
        <PlayerTableHeading sortFn={sortByFfeId}>Code FFE</PlayerTableHeading>
        <PlayerTableHeading sortFn={sortByFideId}>N° FIDE</PlayerTableHeading>
        <PlayerTableHeading sortFn={sortByEmail}>Email</PlayerTableHeading>
        <th>Tél.</th>
        <PlayerTableHeading sortFn={sortByRating}>Elo</PlayerTableHeading>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each $playersStore as { firstName, lastName, fideId, ffeId, email, phone1, rating, role, visible }}
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
            <PlayerButtons playerFfeId={ffeId} playerRole={role} {user} />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<PlayerRatingUpdateButton />
