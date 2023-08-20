import playerModel from "$lib/server/models/player.model.js";
import { error, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, params: { ffeId }, locals: { user } }) => {
    const formData = await request.formData();
    const data = Object.fromEntries([...formData]);
    const updateResult = await playerModel.updatePlayer(ffeId, data, user?.role ?? NaN);

    if (updateResult.acknowledged)
      throw redirect(302, `/joueurs#${ffeId}`);

    return {
      errors: (updateResult as { errors: string[]; }).errors
    };
  }
};

export async function load({ params: { ffeId }, locals: { user } }) {
  const player = await playerModel.getPlayer({ ffeId });

  if (!player)
    throw error(404);

  return {
    player,
    userRole: user?.role ?? NaN
  };
}