import PlayerRole from "$lib/PlayerRole.js";
import { getMatch } from "$lib/server/models/match.model.js";
import { getPlayers } from "$lib/server/models/player.model.js";
import { error } from "@sveltejs/kit";

export async function load({ params: { season, round, teamName }, locals: { user } }) {
  const match = await getMatch({
    season: +season,
    round: +round,
    teamName
  });

  if (!match || !user || user.role > PlayerRole.CAPTAIN)
    throw error(404);

  const players = await getPlayers();
  return {
    match,
    players
  };
}