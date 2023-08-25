<script lang="ts">
  import PlayersTable from "$components/PlayersTable.svelte";

  export let data: { players: App.PublicPlayer[]; user: App.User };
</script>

<svelte:head>
  <title>Joueurs</title>
</svelte:head>

<PlayersTable players={data.players} user={data.user} />
