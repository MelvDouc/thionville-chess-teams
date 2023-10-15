import { createPlayer } from "$lib/server/models/player.model";
import type { PublicPlayer } from "$lib/types";
import { error, json } from "@sveltejs/kit";

export async function POST({ request, locals: { user } }) {
  if (!user)
    throw error(401);

  const data = await request.json() as PublicPlayer;
  if (data.birthDate) data.birthDate = new Date(data.birthDate);
  const createResult = await createPlayer(data, user.role);
  return json(createResult);
}