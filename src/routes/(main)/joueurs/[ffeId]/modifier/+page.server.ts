import playerModel from "$lib/server/models/player.model.js";
import { error } from "@sveltejs/kit";

export const load = async ({ params: { ffeId } }) => {
  const player = await playerModel.getPlayer({ ffeId });

  if (!player)
    throw error(404);

  return { player };
};