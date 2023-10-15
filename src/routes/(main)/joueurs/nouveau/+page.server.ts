import { redirect } from "@sveltejs/kit";

export function load({ locals: { user } }) {
  if (!user)
    throw redirect(302, "/connexion");

  return {
    userRole: user.role
  };
}