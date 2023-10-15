import { getPlayer } from "$lib/server/models/player.model";
import { error } from "@sveltejs/kit";

export async function load({ params: { ffeId }, locals: { user } }) {
  const player = await getPlayer({ ffeId });

  if (!player)
    throw error(404);

  return { player, user };
}