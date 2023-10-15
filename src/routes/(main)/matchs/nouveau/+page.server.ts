import { getPlayers } from "$lib/server/models/player.model";

export async function load() {
  const players = await getPlayers();
  return { players };
}