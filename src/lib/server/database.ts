import { MONGODB_URI } from "$env/static/private";
import type { Match, Player } from "$lib/types";
import { MongoClient } from "mongodb";

const client = await new MongoClient(MONGODB_URI).connect();
console.log("\n\x1b[33mConnected to database.\x1b[0m");


const mainDb = client.db("main");
export const db = {
  players: mainDb.collection<Player>("players"),
  matches: mainDb.collection<Match>("matches")
} as const;