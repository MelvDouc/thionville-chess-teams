import { getPlayer, getPlayerMatches } from "$lib/server/models/player.model";
import { error } from "@sveltejs/kit";

export async function load({ params: { ffeId }, locals: { user } }) {
  const player = await getPlayer({ ffeId });

  if (!player)
    throw error(404);

  const matches = getPlayerMatches(ffeId);
  return { player, matches, user };
}