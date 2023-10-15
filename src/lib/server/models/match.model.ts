import { db } from "$lib/server/database";
import { getPlayers } from "$lib/server/models/player.model";
import type { ApiResponse, Match, PublicPlayer, WithIdMatch } from "$lib/types";
import { ObjectId, type Filter } from "mongodb";

export async function getMatch(filter: Filter<Match>): Promise<WithIdMatch | null> {
  const match = await db.matches.findOne(filter);

  if (!match)
    return null;

  return {
    ...match,
    _id: match._id.toHexString()
  };
}

export async function getLineup({ lineup }: Match): Promise<(PublicPlayer | null)[]> {
  const players = await getPlayers();
  return lineup.map((item) => {
    if (!item) return null;
    const player = players.find((p) => p.ffeId === item.ffeId);
    if (!player) return null;
    return { ...player, rating: item.rating };
  });
}

export async function getMatchesBySeasonGroupedByTeamName(season: number): Promise<Record<string, WithIdMatch[]>> {
  const matches = await db.matches.find({ season }).sort({ round: 1 }).toArray();
  return matches.reduce((acc, { _id, teamName, ...others }) => {
    acc[teamName] ??= [];
    acc[teamName].push({
      _id: _id.toHexString(),
      teamName,
      ...others
    });
    return acc;
  }, {} as Record<string, WithIdMatch[]>);
}

export async function getSeasons(): Promise<number[]> {
  return (await db.matches.distinct("season")).sort((a, b) => a - b);
}

export async function createMatch(match: Match): Promise<ApiResponse & { insertedId?: ObjectId; }> {
  const { acknowledged, insertedId } = await db.matches.insertOne(match);

  if (!acknowledged)
    return { success: false, errors: ["Une erreur s'est produite."] };

  return { success: true, insertedId };
}

export async function updateMatch(_id: string, update: Match): Promise<ApiResponse> {
  const { acknowledged } = await db.matches.updateOne({ _id: new ObjectId(_id) }, {
    $set: update
  });

  if (!acknowledged)
    return { success: false, errors: ["Une erreur s'est produite."] };

  return { success: true };
}