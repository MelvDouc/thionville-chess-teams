<script lang="ts">
  import PlayerTableHeading from "$components/PlayerTableHeading.svelte";
  import playerTableStore from "$lib/stores/player-table.store.js";

  export let players: App.PublicPlayer[];
  export let user: App.User;

  const indexedPlayers = players.map((p, index) => ({ ...p, index, visible: true }));
  const searchableValues = players.reduce((acc, { ffeId, firstName, lastName, email }) => {
    acc[ffeId] = ffeId + firstName + lastName + email;
    return acc;
  }, {} as Record<string, string>);

  playerTableStore.set(indexedPlayers);

  function lookUpPlayer({ target }: Event) {
    const search = (target as HTMLInputElement).value.trim().toLocaleLowerCase();

    playerTableStore.update((players) => {
      return players.map((player) => {
        return {
          ...player,
          visible: !search || searchableValues[player.ffeId].includes(search),
        };
      });
    });
  }

  async function deletePlayer(ffeId: string) {
    if (!confirm("Êtes-vous sûr(e) de vouloir supprimer ce joueur ?")) return;
    const response = await fetch(`/joueurs/${ffeId}/supprimer`, {
      method: "DELETE",
    });
    const data = await response.json();

    if (data?.success)
      playerTableStore.update((players) => players.filter((p) => p.ffeId !== ffeId));
  }
</script>

<div class="mb-3">
  <input type="search" placeholder="Chercher un joueur..." on:input={lookUpPlayer} />
</div>

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
          <td>{ffeId}</td>
          <td>{fideId || ""}</td>
          <td>{email}</td>
          <td>{phone1 ?? ""}</td>
          <td>{rating || ""}</td>
          <td class="align-middle">
            <div class="d-flex justify-content-center align-items-center gap-2">
              {#if user.role < role || user.ffeId === ffeId}
                <a href="/joueurs/{ffeId}/modifier" class="btn btn-primary">
                  <i class="bi bi-pen-fill" />
                </a>
                {#if user.role < role}
                  <a
                    href="/joueurs/{ffeId}/supprimer"
                    class="btn btn-danger"
                    on:click|preventDefault={() => deletePlayer(ffeId)}
                  >
                    <i class="bi bi-trash-fill" />
                  </a>
                {/if}
              {/if}
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
