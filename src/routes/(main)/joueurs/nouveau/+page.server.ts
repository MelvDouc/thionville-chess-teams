import { toObject } from "$lib/form-data.js";
import { createPlayer } from "$lib/server/models/player.model.js";
import { redirect } from "@sveltejs/kit";

export const actions = {
  default: async function ({ request, locals: { user } }) {
    if (!user)
      throw redirect(302, "/");

    const formData = toObject<{ [K in keyof App.PublicPlayer]: string }>(await request.formData());
    const insertResult = await createPlayer(formData, user.role);

    if (insertResult.success)
      throw redirect(302, `/joueurs#${formData.ffeId}`);

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