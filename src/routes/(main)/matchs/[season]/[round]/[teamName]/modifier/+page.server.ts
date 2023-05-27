import { db } from "$lib/server/database.js";
import { error } from "@sveltejs/kit";

export const load = async ({ params: { season, round, teamName } }) => {
  const match = await db.matches.findOne({
    season: +season,
    round: +round,
    teamName: decodeURI(teamName)
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const players = await db.players.find().map(({ _id, ...others }) => others).toArray();

  if (!match)
    throw error(404);

  const { _id, ...others } = match;
  return {
    match: {
      _id: _id.toHexString(),
      ...others
    },
    players
  };
};