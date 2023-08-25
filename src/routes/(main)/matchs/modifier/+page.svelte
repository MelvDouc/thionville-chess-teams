<script lang="ts">
  import MatchForm from "$components/MatchForm.svelte";

  export let data: { match: WithId<App.Match>; players: App.Player[] };
  let errors: string[] | null = null;
</script>

<svelte:head>
  <title>Modifier un match</title>
</svelte:head>

<MatchForm
  match={data.match}
  players={data.players}
  {errors}
  handleSubmit={async (match) => {
    const response = await fetch(`/matchs/modifier?_id=${match._id}`, {
      method: "PUT",
      body: JSON.stringify(match),
      headers: {
        "content-type": "application/json",
      },
    });
    const updateResult = await response.json();

    if (!updateResult.success) {
      console.log({ errors });
      errors = updateResult.errors;
      return;
    }

    location.assign(`/matchs/${match.season}`);
  }}
/>
