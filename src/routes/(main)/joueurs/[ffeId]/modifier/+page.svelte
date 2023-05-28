<script lang="ts">
  import PlayerForm from "$components/PlayerForm.svelte";

  export let data: { player: App.Player };
</script>

<svelte:head>
  <title>Modifier un joueur</title>
</svelte:head>

<PlayerForm player={data.player} handleSubmit={() => {}} />
