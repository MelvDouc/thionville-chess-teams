import PlayerRole from "$lib/PlayerRole";
import { updateRatings } from "$lib/server/models/player.model";
import { error, json } from "@sveltejs/kit";

export async function POST({ locals: { user } }) {
  if (!user || user.role > PlayerRole.ADMIN)
    throw error(403);

  await updateRatings();
  return json({ success: true });
}