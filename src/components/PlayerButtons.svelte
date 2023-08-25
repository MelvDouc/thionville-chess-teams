<script lang="ts">
  import playerTableStore from "$lib/stores/player-table.store.js";

  export let playerRole: App.PlayerRole;
  export let playerFfeId: string;
  export let user: App.User;

  async function deletePlayer() {
    if (!confirm("Êtes-vous sûr(e) de vouloir supprimer ce joueur ?")) return;
    const response = await fetch(`/joueurs/${playerFfeId}/supprimer`, {
      method: "DELETE",
    });
    const data = await response.json();

    if (data?.success)
      playerTableStore.update((players) => players.filter(({ ffeId }) => ffeId !== playerFfeId));
  }
</script>

{#if user.role < playerRole || user.ffeId === playerFfeId}
  <a href="/joueurs/{playerFfeId}/modifier" class="btn btn-primary">
    <i class="bi bi-pen-fill" />
  </a>
  {#if user.role < playerRole}
    <a
      href="/joueurs/{playerFfeId}/supprimer"
      class="btn btn-danger"
      on:click|preventDefault={deletePlayer}
    >
      <i class="bi bi-trash-fill" />
    </a>
  {/if}
{/if}
