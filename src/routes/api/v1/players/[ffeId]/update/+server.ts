import playerModel from "$lib/server/models/player.model.js";
import { json } from "@sveltejs/kit";

export const PUT = async ({ request, params }) => {
  const data = await request.json();
  const { acknowledged, modifiedCount } = await playerModel.updatePlayer(params.ffeId, data);
  return json({ acknowledged, modifiedCount });
};