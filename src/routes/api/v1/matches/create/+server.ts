import { db } from "$lib/server/database.js";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
  const data = await request.json();
  const insertResult = await db.matches.insertOne(data);
  return json({
    acknowledged: insertResult.acknowledged,
    insertedId: insertResult.insertedId.toHexString()
  });
}