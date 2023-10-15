import { getPlayer } from "$lib/server/models/player.model";
import { error } from "@sveltejs/kit";

export async function load({ params: { ffeId }, locals: { user } }) {
  const player = await getPlayer({ ffeId });

  if (!player || !user || user.role > player.role)
    throw error(404);

  return {
    player,
    userRole: user.role
  };
}