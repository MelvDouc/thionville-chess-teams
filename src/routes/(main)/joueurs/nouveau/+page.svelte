<script lang="ts">
  import PlayerForm from "$components/forms/PlayerForm.svelte";
  import PlayerRole from "$lib/PlayerRole";
  import apiService from "$lib/services/api.service";
  import type { ApiResponse, PublicPlayer } from "$lib/types";

  export let data: { userRole: number };
  let errors: string[] | null = null;

  async function handleSubmit(player: PublicPlayer) {
    const response = await apiService.post<ApiResponse>({
      url: "/joueurs/nouveau",
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
  <title>Ajouter un joueur</title>
</svelte:head>

<PlayerForm
  {handleSubmit}
  player={{
    email: "",
    ffeId: "",
    firstName: "",
    lastName: "",
    rating: 1199,
    role: PlayerRole.USER,
    isMale: true,
    membership: "",
    phone1: "",
    phone2: "",
    team1: "",
    team2: "",
  }}
  {errors}
  userRole={data.userRole}
/>
