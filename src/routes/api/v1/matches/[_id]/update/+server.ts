import { db, ObjectId } from "$lib/server/database.js";
import { json } from "@sveltejs/kit";

export async function PUT({ request }) {
  const { _id, ...data } = await request.json();
  const { acknowledged, modifiedCount } = await db.matches.updateOne(
    { _id: new ObjectId(_id) },
    { $set: data }
  );
  return json({ acknowledged, modifiedCount });
}