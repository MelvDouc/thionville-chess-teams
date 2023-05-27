import { MONGODB_URI } from "$env/static/private";
import { MongoClient, ObjectId, type Filter } from "mongodb";

const client = await new MongoClient(MONGODB_URI).connect();
console.log("\n\x1b[33mConnected to database.\x1b[0m");

const mainDb = client.db("main");
const db = {
  players: mainDb.collection<App.Player>("players"),
  matches: mainDb.collection<App.Match>("matches")
} as const;

export {
  db, ObjectId, type Filter
};