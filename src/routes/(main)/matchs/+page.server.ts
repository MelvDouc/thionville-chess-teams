import { getSeasons } from "$lib/server/models/match.model.js";

export async function load() {
  const seasons = await getSeasons();
  return { seasons };
}