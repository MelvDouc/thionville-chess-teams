<script lang="ts">
  import MatchForm from "$components/forms/MatchForm.svelte";

  export let data: { players: App.PublicPlayer[] };
  let errors: string[] | null = null;
</script>

<svelte:head>
  <title>Créer un match</title>
</svelte:head>

<div class="container-center">
  <MatchForm
    match={null}
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
