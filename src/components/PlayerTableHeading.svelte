<script lang="ts">
  import playerTableStore from "$lib/stores/player-table.store.js";
  export let sortFn: (a: App.IndexedPlayer, b: App.IndexedPlayer) => number;

  let sortOrder = 0;

  function sort() {
    sortOrder = ((sortOrder + 2) % 3) - 1;

    if (sortOrder === 0) {
      playerTableStore.update((players) => players.sort((a, b) => a.index - b.index));

      return;
    }

    playerTableStore.update((players) => players.sort((a, b) => sortFn(a, b) * sortOrder));
  }
</script>

<th on:click={sort} data-sort-order={sortOrder}>
  <slot />
</th>

<style lang="scss" scoped>
  th {
    user-select: none;

    &::after {
      margin-inline-start: 0.5em;
    }

    &[data-sort-order="0"]:after {
      content: "–";
    }

    &[data-sort-order="-1"]:after {
      content: "▼";
    }

    &[data-sort-order="1"]:after {
      content: "▲";
    }
  }
</style>
