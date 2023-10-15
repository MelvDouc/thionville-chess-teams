import { createMatch } from "$lib/server/models/match.model";

export async function POST({ request }) {
  const data = await request.json();
  const insertResult = await createMatch({
    ...data,
    date: new Date(data.date)
  });
  return new Response(
    JSON.stringify(insertResult)
  );
}