import { toObject } from "$lib/form-data.js";
import { getPlayer, updatePlayer } from "$lib/server/models/player.model.js";
import { error, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, params: { ffeId }, locals: { user } }) => {
    if (!user)
      throw redirect(302, "/");

    const formData = toObject<{ [K in keyof App.PublicPlayer]: string }>(await request.formData());

    if (+formData.role < user.role)
      return {
        errors: ["Rôle non autorisé."]
      };

    const updateResult = await updatePlayer(ffeId, formData);

    if (updateResult.success)
      throw redirect(302, `/joueurs#${ffeId}`);

    return updateResult;
  }
};

export async function load({ params: { ffeId }, locals: { user } }) {
  const player = await getPlayer({ ffeId });

  if (!player || !user || user.role > player.role)
    throw error(404);

  return {
    player,
    userRole: user.role
  };
}