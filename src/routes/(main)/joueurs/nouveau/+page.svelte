<script lang="ts">
  import PlayerForm from "$components/PlayerForm.svelte";

  export let form: { errors?: string[] } | null;
</script>

<svelte:head>
  <title>Créer un joueur</title>
</svelte:head>

<div class="container-center">
  <PlayerForm player={null} action="/joueurs/nouveau" errors={form?.errors ?? null} />
</div>
