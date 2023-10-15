import { deletePlayer } from "$lib/server/models/player.model";
import { error, json } from "@sveltejs/kit";

export async function DELETE({ locals: { user }, params: { ffeId } }) {
  if (!user)
    throw error(401);

  const response = await deletePlayer(ffeId, user);
  return json(response);
}