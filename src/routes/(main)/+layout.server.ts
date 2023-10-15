import { redirect } from "@sveltejs/kit";

const publicUrls = [
  "/connexion",
  "/oubli-mot-de-passe",
  "/changement-mot-de-passe"
];

export function load({ locals: { user }, url }) {
  if (!user && !publicUrls.includes(url.pathname))
    throw redirect(302, "/connexion");

  return { user };
}