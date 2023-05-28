import matchModel from "$lib/server/models/match.model.js";

export const load = async ({ params: { season } }) => {
  const matches = await matchModel.getMatchesBySeasonGroupedByTeamName(+season);
  return {
    season: +season,
    matches
  };
};