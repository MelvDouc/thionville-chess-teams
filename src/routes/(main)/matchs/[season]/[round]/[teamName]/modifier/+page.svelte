<script lang="ts">
  import MatchForm from "$components/MatchForm.svelte";

  export let data: { match: App.Match & { _id: string }; players: App.Player[] };
</script>

<svelte:head>
  <title>Modifier un match</title>
</svelte:head>

<MatchForm
  match={data.match}
  players={data.players}
  handleSubmit={async (match) => {
    const response = await fetch(`/api/v1/matches/${match._id}/update`, {
      method: "PUT",
      body: JSON.stringify(match),
      headers: {
        "content-type": "application/json",
      },
    });
    const updateResult = await response.json();
    console.log({ updateResult });
  }}
/>
