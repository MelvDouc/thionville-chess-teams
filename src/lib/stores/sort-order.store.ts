import { writable } from "svelte/store";

const sortOrders = [0, 1, -1];

const { set, update, subscribe } = writable<SortOrders>({
  current: null,
  sortOrders: {}
});

function getNextSortOrder(sortOrder: number) {
  return sortOrders[(sortOrders.indexOf(sortOrder) + 1) % 3];
}

export default {
  set,
  update,
  getNextSortOrder,
  subscribe,
};

interface SortOrders {
  current: symbol | null;
  sortOrders: Record<symbol, number>;
}