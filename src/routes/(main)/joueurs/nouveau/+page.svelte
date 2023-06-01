<script lang="ts">
  import PlayerForm from "$components/PlayerForm.svelte";
  import { create } from "$lib/api.js";
</script>

<svelte:head>
  <title>Créer un joueur</title>
</svelte:head>

<div class="container-center">
  <PlayerForm
    player={null}
    handleSubmit={async (data) => {
      const createResult = await create("players", data);
      console.log(createResult);
    }}
  />
</div>
