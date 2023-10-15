<script lang="ts">
  import PlayerRole from "$lib/PlayerRole";
  import apiService from "$lib/services/api.service";
  import playersStore from "$lib/stores/players.store";
  import type { ApiResponse, User } from "$lib/types";

  export let playerRole: PlayerRole;
  export let playerFfeId: string;
  export let user: User;

  async function deletePlayer() {
    if (!confirm("Êtes-vous sûr(e) de vouloir supprimer ce joueur ?")) return;

    const response = await apiService.delete<ApiResponse>({
      url: `/joueurs/${playerFfeId}/supprimer`,
    });

    if (!response?.success) {
      alert("Action non autorisée.");
      return;
    }

    playersStore.update((players) => {
      return players.filter(({ ffeId }) => ffeId !== playerFfeId);
    });
  }
</script>

<div class="d-flex justify-content-center align-items-center gap-2">
  {#if user.role < playerRole || user.ffeId === playerFfeId}
    <a href="/joueurs/{playerFfeId}/modifier" class="btn btn-primary">
      <i class="bi bi-pen-fill" />
    </a>
  {/if}
  {#if user.role < playerRole && user.role <= PlayerRole.ADMIN}
    <button class="btn btn-danger" on:click={deletePlayer}>
      <i class="bi bi-trash-fill" />
    </button>
  {/if}
</div>
