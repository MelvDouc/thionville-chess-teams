<script lang="ts">
  import PlayerForm from "$components/forms/PlayerForm.svelte";

  export let data: { player: App.Player; userRole: number };
  export let form: { errors?: string[] } | null;

  const { ffeId } = data.player;
</script>

<svelte:head>
  <title>Modifier un joueur</title>
</svelte:head>

<PlayerForm
  player={data.player}
  action="/joueurs/{ffeId}/modifier"
  errors={form?.errors ?? null}
  userRole={data.userRole}
/>
