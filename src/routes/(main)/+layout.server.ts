import { redirect } from "@sveltejs/kit";

export function load({ locals: { user }, url }) {
  if (!user && url.pathname !== "/connexion")
    throw redirect(302, "/connexion");

  return { user };
}