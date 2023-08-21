<script lang="ts">
  import PlayerTableHeading from "$components/PlayerTableHeading.svelte";
  import playerTableStore from "$lib/stores/player-table.store.js";

  export let data: { players: App.Player[]; user: App.User };
  playerTableStore.set(data.players.map((p, index) => ({ ...p, index })));

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

<svelte:head>
  <title>Joueurs</title>
</svelte:head>

<div class="tableWrapper">
  <table class="table table-light table-striped">
    <thead>
      <tr>
        <PlayerTableHeading
          sortFn={(a, b) =>
            a.firstName.localeCompare(b.firstName) || a.lastName.localeCompare(b.lastName)}
          >Prénom NOM</PlayerTableHeading
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
      {#each $playerTableStore as { firstName, lastName, fideId, ffeId, email, phone1, rating, role }}
        <tr id={ffeId}>
          <td>{firstName} {lastName}</td>
          <td>{ffeId}</td>
          <td>{fideId || ""}</td>
          <td>{email}</td>
          <td>{phone1 ?? ""}</td>
          <td>{rating || ""}</td>
          <td class="align-middle">
            <div class="d-flex justify-content-center align-items-center gap-2">
              {#if data.user.role < role || data.user.ffeId === ffeId}
                <a href="/joueurs/{ffeId}/modifier" class="btn btn-primary">
                  <i class="bi bi-pen-fill" />
                </a>
                {#if data.user.role < role}
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
