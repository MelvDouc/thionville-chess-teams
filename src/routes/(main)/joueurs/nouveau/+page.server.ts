import playerModel from "$lib/server/models/player.model.js";
import { redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, locals: { user } }) => {
    const formData = await request.formData();
    const data = Object.fromEntries([...formData]);
    const insertResult = await playerModel.createPlayer(data, user?.role ?? NaN);

    if (insertResult.acknowledged)
      throw redirect(302, `/joueurs#${data.ffeId}`);

    return {
      errors: (insertResult as { errors: string[]; }).errors
    };
  }
};

export function load({ locals: { user } }) {
  return {
    userRole: user?.role ?? NaN
  };
}