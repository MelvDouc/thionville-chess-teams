import { logOut } from "$lib/services/auth.service";
import { redirect } from "@sveltejs/kit";

export const actions = {
  default: ({ cookies }) => {
    logOut(cookies);
    throw redirect(302, "/connexion");
  }
};