import { db } from "$lib/server/database.js";

export const load = async () => {
  const seasons = await db.matches.distinct("season");
  return { seasons: seasons.sort((a, b) => a - b) };
};