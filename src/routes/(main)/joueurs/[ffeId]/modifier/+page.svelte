<script lang="ts">
  import PlayerForm from "$components/PlayerForm.svelte";

  export let data: { player: App.Player };
  const { ffeId } = data.player;
</script>

<svelte:head>
  <title>Modifier un joueur</title>
</svelte:head>

<PlayerForm
  player={data.player}
  handleSubmit={async (data) => {
    const response = await fetch(`/api/v1/players/${ffeId}/update`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }}
/>
