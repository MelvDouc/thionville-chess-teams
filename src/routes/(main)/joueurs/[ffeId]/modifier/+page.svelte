<script lang="ts">
  import PlayerForm from "$components/PlayerForm.svelte";
  import { update } from "$lib/api.js";

  export let data: { player: App.Player };
  const { ffeId } = data.player;
</script>

<svelte:head>
  <title>Modifier un joueur</title>
</svelte:head>

<PlayerForm
  player={data.player}
  handleSubmit={async (data) => {
    const updateResult = await update("players", ffeId, data);
    console.log(updateResult);
  }}
  isUpdate
/>
