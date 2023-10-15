import type { IndexedPlayer } from "$lib/types";
import { writable } from "svelte/store";

const { set, update, subscribe } = writable<SortablePlayer[]>();

function sort(sortFn: (a: SortablePlayer, b: SortablePlayer) => number) {
  update((value) => value.sort(sortFn));
}

export function sortByFullName(a: IndexedPlayer, b: IndexedPlayer) {
  return a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName);
}

export function sortByFfeId(a: IndexedPlayer, b: IndexedPlayer) {
  return a.ffeId.localeCompare(b.ffeId);
}

export function sortByFideId(a: IndexedPlayer, b: IndexedPlayer) {
  return String(a.fideId ?? "").localeCompare(String(b.fideId ?? ""));
}

export function sortByEmail(a: IndexedPlayer, b: IndexedPlayer) {
  return a.email.localeCompare(b.email);
}

export function sortByRating(a: IndexedPlayer, b: IndexedPlayer) {
  return (a.rating ?? Infinity) - (b.rating ?? Infinity);
}

export default {
  set,
  update,
  sort,
  subscribe
};

type SortablePlayer = IndexedPlayer & {
  visible: boolean;
};