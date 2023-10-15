import { updatePlayer } from "$lib/server/models/player.model";
import type { PublicPlayer } from "$lib/types";
import { error, json } from "@sveltejs/kit";

export async function PUT({ request, locals: { user }, params: { ffeId } }) {
  if (!user)
    throw error(401);

  const update = await request.json() as PublicPlayer;
  if (update.birthDate) update.birthDate = new Date(update.birthDate);
  const updateResult = await updatePlayer(ffeId, update);
  return json(updateResult);
}