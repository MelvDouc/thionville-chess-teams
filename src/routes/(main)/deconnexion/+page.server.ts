import { logOut } from "$lib/auth.js";
import { redirect } from "@sveltejs/kit";

export const actions = {
  default: ({ cookies }) => {
    logOut(cookies);
    throw redirect(302, "/connexion");
  }
};