import playerModel from "$lib/server/models/player.model.js";

export const load = async () => {
  const players = await playerModel.getPlayers();
  return { players };
};