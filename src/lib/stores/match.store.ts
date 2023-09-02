import { writable } from "svelte/store";

const { set, update, subscribe } = writable<WithId<App.Match>>();

function getEmptyLineUp() {
  const emptyLineUp = {} as App.Match["lineup"];

  for (let i = 1; i <= 8; i++)
    emptyLineUp[i] = null;

  return emptyLineUp;
};

export default {
  set,
  update,
  subscribe,
  getEmptyLineUp
};