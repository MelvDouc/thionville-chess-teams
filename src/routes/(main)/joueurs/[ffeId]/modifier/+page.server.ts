import playerModel from "$lib/server/models/player.model.js";
import { error, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, params: { ffeId }, locals: { user } }) => {
    const data = await request.formData();
    const { player, errors } = playerModel.getPlayerOrErrors(
      Object.fromEntries([...data]) as Record<keyof App.Player, FormDataEntryValue>,
      user?.role ?? NaN,
      true
    );

    console.log(errors);

    if (errors)
      return { errors };

    const { acknowledged } = await playerModel.updatePlayer(ffeId, player);

    if (acknowledged)
      throw redirect(302, `/joueurs#${player.ffeId}`);

    return {
      errors: ["Le joueur n'a pas pu être modifié."]
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