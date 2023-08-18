import matchModel from "$lib/server/models/match.model.js";

export const load = async (loadEvent) => {
  const season = +loadEvent.params.season;
  const matches = await matchModel.getMatchesBySeasonGroupedByTeamName(season);
  return {
    season,
    matches
  };
};