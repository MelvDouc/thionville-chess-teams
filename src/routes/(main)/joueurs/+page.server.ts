import { db } from "$lib/server/database.js";

export const load = async () => {
  const players = await db.players
    .find()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ _id, ...others }) => others)
    .toArray();
  return { players };
};