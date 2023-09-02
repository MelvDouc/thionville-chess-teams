<script lang="ts">
  import MatchForm from "$components/forms/MatchForm.svelte";
  import { getCurrentSeason } from "$lib/date-formatter.js";
  import matchStore from "$lib/stores/match.store.js";

  export let data: { players: App.PublicPlayer[] };
  let errors: string[] | null = null;

  matchStore.set({
    _id: "",
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
    lineup: matchStore.getEmptyLineUp(),
    availableFfeIds: [],
  });
</script>

<svelte:head>
  <title>Créer un match</title>
</svelte:head>

<div class="container-center">
  <MatchForm
    players={data.players}
    {errors}
    handleSubmit={async (data) => {
      const response = await fetch("/matchs/nouveau", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const insertResult = await response.json();

      if (insertResult.errors) {
        errors = insertResult.errors;
        return;
      }

      location.assign(`/matchs/${data.season}`);
    }}
  />
</div>
