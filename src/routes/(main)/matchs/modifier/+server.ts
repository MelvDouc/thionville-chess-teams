import { updateMatch } from "$lib/server/models/match.model.js";
import { error } from "@sveltejs/kit";

export async function PUT({ request, url }) {
  const data = await request.json();
  const _id = url.searchParams.get("_id");

  if (!_id)
    throw error(404);

  const updateResult = await updateMatch(_id, data);
  return new Response(
    JSON.stringify(updateResult)
  );
}