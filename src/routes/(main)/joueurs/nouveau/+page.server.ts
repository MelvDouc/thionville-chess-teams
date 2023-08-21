import { createPlayer } from "$lib/server/models/player.model.js";
import { redirect } from "@sveltejs/kit";

export const actions = {
  default: async function ({ request, locals: { user } }) {
    if (!user)
      throw redirect(302, "/");

    const formData = await request.formData();
    const data = Object.fromEntries([...formData]);
    const insertResult = await createPlayer(data, user.role);

    if (insertResult.acknowledged)
      throw redirect(302, `/joueurs#${data.ffeId}`);

    return {
      errors: (insertResult as { errors: string[]; }).errors
    };
  }
};

export function load({ locals: { user } }) {
  if (!user)
    throw redirect(302, "/connexion");

  return {
    userRole: user.role
  };
}