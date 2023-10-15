<script lang="ts">
  import MatchForm from "$components/forms/MatchForm.svelte";
  import apiService from "$lib/services/api.service";
  import { getCurrentSeason } from "$lib/services/date.service";
  import type { ApiResponse, Match, PublicPlayer } from "$lib/types";

  export let data: { players: PublicPlayer[] };
  let errors: string[] | null = null;

  async function handleSubmit(match: Match) {
    const insertResult = await apiService.post<ApiResponse>({
      url: "/matchs/nouveau",
      data: match,
    });

    if (!insertResult?.success) {
      if (insertResult?.errors) errors = insertResult.errors;
      return;
    }

    location.assign(`/matchs/${match.season}`);
  }
</script>

<svelte:head>
  <title>Créer un match</title>
</svelte:head>

<div class="container-center">
  <MatchForm
    match={{
      season: getCurrentSeason(),
      round: 1,
      teamName: "",
      opponent: "",
      address: "3 rue du cygne",
      city: "Thionville",
      zipCode: "57100",
      date: new Date(),
      whiteOnOdds: true,
      captainFfeId: "",
      lineup: Array(8).fill(null),
    }}
    players={data.players}
    {errors}
    {handleSubmit}
  />
</div>
