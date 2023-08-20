import playerModel from "$lib/server/models/player.model.js";
import { redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, locals: { user } }) => {
    const formData = await request.formData();
    const { player, errors } = playerModel.getPlayerOrErrors(
      Object.fromEntries([...formData]) as Record<keyof App.Player, FormDataEntryValue>,
      user?.role ?? NaN,
      false
    );

    if (errors)
      return { errors };

    const { acknowledged } = await playerModel.createPlayer(player);

    if (acknowledged)
      throw redirect(302, `/joueurs#${player.ffeId}`);

    return {
      errors: ["Le joueur n'a pas pu être ajouté."]
    };
  }
};

export function load({ locals: { user } }) {
  return {
    userRole: user?.role ?? NaN
  };
}