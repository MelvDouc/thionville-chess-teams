<script lang="ts">
  import PlayerForm from "$components/PlayerForm.svelte";

  export let data: { player: App.Player };
</script>

<PlayerForm player={data.player} handleSubmit={() => {}} />
