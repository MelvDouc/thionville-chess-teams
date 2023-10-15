import type { Match, WithIdMatch } from "$lib/types";
import { writable } from "svelte/store";

const { set, update, subscribe } = writable<WithIdMatch>();

function getEmptyLineup() {
  const emptyLineup = {} as Match["lineup"];

  for (let i = 1; i <= 8; i++)
    emptyLineup[i] = null;

  return emptyLineup;
};

export default {
  set,
  update,
  subscribe,
  getEmptyLineup
};