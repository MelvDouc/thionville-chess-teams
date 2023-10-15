import { getPlayers } from "$lib/server/models/player.model";

export async function load({ locals: { user } }) {
  const players = await getPlayers();

  return {
    players,
    user,
  };
}