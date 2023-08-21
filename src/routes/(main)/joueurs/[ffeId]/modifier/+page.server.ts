import { getPlayer, updatePlayer } from "$lib/server/models/player.model.js";
import { error, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, params: { ffeId }, locals: { user } }) => {
    if (!user)
      throw redirect(302, "/");

    const formData = await request.formData();
    const data = Object.fromEntries([...formData]);
    const updateResult = await updatePlayer(ffeId, data, user.role);

    if (updateResult.acknowledged)
      throw redirect(302, `/joueurs#${ffeId}`);

    return {
      errors: (updateResult as { errors: string[]; }).errors
    };
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