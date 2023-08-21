import { createMatch } from "$lib/server/models/match.model.js";

export async function POST({ request }) {
  const data = await request.json();
  const insertResult = await createMatch(data);
  return new Response(
    JSON.stringify(insertResult)
  );
}