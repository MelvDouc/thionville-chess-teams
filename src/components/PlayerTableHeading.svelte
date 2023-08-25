<script lang="ts">
  import playerTableStore from "$lib/stores/player-table.store.js";
  import sortOrderStore, { getNextSortOrder } from "$lib/stores/sort-order.store.js";
  export let sortFn: (a: App.IndexedPlayer, b: App.IndexedPlayer) => number;

  const key = Symbol();
  let sortOrder = 0;

  sortOrderStore.update(({ current, sortOrders }) => ({
    current,
    sortOrders: {
      ...sortOrders,
      [key]: sortOrder,
    },
  }));

  sortOrderStore.subscribe(({ current, sortOrders }) => {
    sortOrder = sortOrders[key];

    if (current !== key) return;

    if (sortOrder === 0) {
      playerTableStore.update((players) => players.sort((a, b) => a.index - b.index));
      return;
    }

    playerTableStore.update((players) => players.sort((a, b) => sortFn(a, b) * sortOrder));
  });

  function sort() {
    sortOrderStore.update(({ sortOrders }) => ({
      current: key,
      sortOrders: Object.getOwnPropertySymbols(sortOrders).reduce((acc, k) => {
        acc[k] = k === key ? getNextSortOrder(sortOrders[k]) : 0;
        return acc;
      }, {} as typeof sortOrders),
    }));
  }
</script>

<th on:click={sort}>
  <span data-sort-order={sortOrder}>
    <slot />
  </span>
</th>

<style lang="scss" scoped>
  span {
    user-select: none;
    position: relative;

    &::after {
      $distToMiddle: 8.5%;
      $y1: 50% - $distToMiddle;
      $y2: 50% + $distToMiddle;
      content: "";
      display: inline-block;
      position: absolute;
      right: -1em;
      top: 50%;
      transform: translateY(-50%);
      width: 13px;
      height: 11px;
      transition: 0.2s;
      clip-path: polygon(0 $y1, 100% $y1, 100% $y2, 0 $y2);
      background-color: black;
    }

    &[data-sort-order="-1"]::after,
    &[data-sort-order="1"]::after {
      width: 10px;
    }

    &[data-sort-order="-1"]::after {
      clip-path: polygon(0 0, 100% 0, 50% 100%, 0 0);
    }

    &[data-sort-order="1"]::after {
      clip-path: polygon(50% 0, 100% 100%, 0 100%, 50% 0);
    }
  }
</style>
