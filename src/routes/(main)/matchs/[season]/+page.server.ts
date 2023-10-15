import { getMatchesBySeasonGroupedByTeamName } from "$lib/server/models/match.model";

export const load = async ({ params: { season } }) => {
  const matches = await getMatchesBySeasonGroupedByTeamName(+season);
  return {
    season: +season,
    matches
  };
};