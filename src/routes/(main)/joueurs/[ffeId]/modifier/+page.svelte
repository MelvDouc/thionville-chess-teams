<script lang="ts">
  import PlayerForm from "$components/forms/PlayerForm.svelte";
  import apiService from "$lib/services/api.service";
  import type { ApiResponse, PublicPlayer } from "$lib/types";

  export let data: { player: PublicPlayer; userRole: number };
  let errors: string[] | null = null;

  async function handleSubmit(player: PublicPlayer) {
    const response = await apiService.put<ApiResponse>({
      url: `/joueurs/${player.ffeId}/modifier`,
      data: player,
    });

    if (!response?.success) {
      if (response?.errors) errors = response.errors;
      return;
    }

    location.assign(`/joueurs/${player.ffeId}`);
  }
</script>

<svelte:head>
  <title>Modifier un joueur</title>
</svelte:head>

<PlayerForm {handleSubmit} player={data.player} {errors} userRole={data.userRole} isUpdate />
