import { writable } from "svelte/store";

const sortOrders = [0, 1, -1];
const sortOrderStore = writable<{
  current: symbol | null;
  sortOrders: Record<symbol, number>;
}>({
  current: null,
  sortOrders: {}
});

export function getNextSortOrder(sortOrder: number) {
  return sortOrders[(sortOrders.indexOf(sortOrder) + 1) % 3];
}

export default sortOrderStore;