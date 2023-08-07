<script lang="ts">
  import MatchForm from "$components/MatchForm.svelte";

  export let data: { players: Omit<App.Player, "pwd" | "pwdResetId">[] };
</script>

<svelte:head>
  <title>Créer un match</title>
</svelte:head>

<div class="container-center">
  <MatchForm match={null} players={data.players} handleSubmit={() => {}} />
</div>
