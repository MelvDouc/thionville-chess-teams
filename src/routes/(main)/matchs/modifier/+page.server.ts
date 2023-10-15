import PlayerRole from "$lib/PlayerRole";
import { getMatch } from "$lib/server/models/match.model";
import { getPlayers } from "$lib/server/models/player.model";
import { error } from "@sveltejs/kit";
import { ObjectId } from "mongodb";

export async function load({ url, locals: { user } }) {
  const _id = url.searchParams.get("_id");

  if (!_id)
    throw error(404);

  const match = await getMatch({ _id: new ObjectId(_id) });

  if (!match || !user || user.role > PlayerRole.CAPTAIN)
    throw error(404);

  // @ts-expect-error - Ignore _id.
  delete match._id;
  const players = await getPlayers();
  return {
    match,
    _id,
    players
  };
}