import { updateMatch } from "$lib/server/models/match.model";
import { error } from "@sveltejs/kit";

export async function PUT({ request, url }) {
  const update = await request.json();
  const _id = url.searchParams.get("_id");

  if (!_id)
    throw error(404);

  if ("date" in update)
    update.date = new Date(update.date);
  const updateResult = await updateMatch(_id, update);

  return new Response(
    JSON.stringify(updateResult)
  );
}