import { writable } from "svelte/store";

const store = writable<App.IndexedPlayer[]>();

export default store;