import userStore from "$lib/stores/user.store.js";

export async function load({ locals: { user } }) {
  userStore.set(user ?? null);
  return { user };
}