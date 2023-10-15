<script lang="ts">
  import PlayersTable from "$components/PlayersTable.svelte";
  import playersStore, { sortByFullName } from "$lib/stores/players.store";
  import type { PublicPlayer, User } from "$lib/types";

  export let data: { players: PublicPlayer[]; user: User };

  playersStore.set(
    data.players.map((p, index) => ({ ...p, index, visible: true })).sort(sortByFullName)
  );
</script>

<svelte:head>
  <title>Joueurs</title>
</svelte:head>

<PlayersTable user={data.user} />
