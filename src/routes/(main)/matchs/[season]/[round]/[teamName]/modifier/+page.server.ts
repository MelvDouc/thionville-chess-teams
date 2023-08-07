import matchModel from "$lib/server/models/match.model.js";
import playerModel from "$lib/server/models/player.model.js";
import { error } from "@sveltejs/kit";

export const load = async ({ params: { season, round, teamName } }) => {
  const match = await matchModel.getMatch({
    season: +season,
    round: +round,
    teamName
  });

  if (!match)
    throw error(404);

  const players = await playerModel.getPlayers();
  return {
    match,
    players
  };
};