import { getSeasons } from "$lib/server/models/match.model";

export async function load() {
  const seasons = await getSeasons();
  return { seasons };
}