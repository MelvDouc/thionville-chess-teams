import matchModel from "$lib/server/models/match.model.js";

export const load = async () => {
  const seasons = await matchModel.getSeasons();
  return { seasons };
};