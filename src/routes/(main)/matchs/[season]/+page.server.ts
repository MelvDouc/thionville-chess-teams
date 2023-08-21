import { getMatchesBySeasonGroupedByTeamName } from "$lib/server/models/match.model.js";

export const load = async ({ params: { season } }) => {
  const matches = await getMatchesBySeasonGroupedByTeamName(+season);
  return {
    season: +season,
    matches
  };
};