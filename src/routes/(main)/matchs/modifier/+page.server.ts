import PlayerRole from "$lib/PlayerRole.js";
import { getMatch } from "$lib/server/models/match.model.js";
import { getPlayers } from "$lib/server/models/player.model.js";
import { error } from "@sveltejs/kit";
import { ObjectId } from "mongodb";

export async function load({ url, locals: { user } }) {
  const _id = url.searchParams.get("_id");

  if (!_id)
    throw error(404);

  const match = await getMatch({ _id: new ObjectId(_id) });

  if (!match || !user || user.role > PlayerRole.CAPTAIN)
    throw error(404);

  const players = await getPlayers();
  return {
    match,
    players
  };
}