<script lang="ts">
  import MatchForm from "$components/forms/MatchForm.svelte";
  import apiService from "$lib/services/api.service";
  import type { ApiResponse, Match, PublicPlayer } from "$lib/types";

  export let data: { match: Match; _id: string; players: PublicPlayer[] };
  let errors: string[] | null = null;

  async function handleSubmit(match: Match) {
    const updateResult = await apiService.put<ApiResponse>({
      url: `/matchs/modifier?_id=${data._id}`,
      data: match,
    });

    if (!updateResult?.success) {
      if (updateResult?.errors) errors = updateResult.errors;
      return;
    }

    location.assign(`/matchs/${match.season}`);
  }
</script>

<svelte:head>
  <title>Modifier un match</title>
</svelte:head>

<MatchForm players={data.players} match={data.match} {errors} {handleSubmit} />
