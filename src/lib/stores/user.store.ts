import { writable } from "svelte/store";

const userStore = writable<App.User | null>();

export default userStore;