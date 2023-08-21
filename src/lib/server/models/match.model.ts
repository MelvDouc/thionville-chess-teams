import { ObjectId, db, type Filter } from "$lib/server/database.js";
import { Cast as C, Validation as V, type CastingTypes } from "shape-and-form";

const CreateSchema = C.object({
  season: C.number().round("trunc"),
  round: C.number().round("trunc"),
  teamName: C.string(),
  whiteOnOdds: C.boolean(true),
  opponent: C.string(),
  address: C.string().trim(),
  city: C.string().trim(),
  zipCode: C.string().trim(),
  captainFfeId: C.string().optional(),
  date: C.date(),
  lineup: C.object(
    [...Array(8).keys()].reduce((acc, key) => {
      acc[+key + 1] = C
        .object({
          name: C.string(),
          ffeId: C.string(),
          rating: C.number().optional()
        })
        .optional();
      return acc;
    }, {} as Record<number, CastingTypes.Cast<App.LineUpItem>>)
  )
});

const ValidationSchema = V.object({
  season: V.number(),
  round: V.number(),
  teamName: V.string().minLength(1, "Équipe requise."),
  opponent: V.string().minLength(1, "Adversaire requis."),
  address: V.string().minLength(1, "Adresse requise."),
  city: V.string().minLength(1, "Ville requise."),
  zipCode: V.string().minLength(1, "Code postal requis."),
  captainFfeId: V.string().minLength(1, "Code FFE du capitaine requis.").optional(),
  date: V.date().valid("Date invalide.")
});

export async function getMatch(filter: Filter<App.Match>) {
  const match = await db.matches.findOne(filter);

  if (match) {
    const { _id, ...others } = match;
    return {
      _id: _id.toHexString(),
      ...others
    };
  }

  return null;
}

export async function getMatchesBySeasonGroupedByTeamName(season: number) {
  const matches = await db.matches.find({ season }).toArray();
  return matches.reduce((acc, { _id, teamName, ...others }) => {
    acc[teamName] ??= [];
    acc[teamName].push({
      _id: _id.toHexString(),
      teamName,
      ...others
    });
    return acc;
  }, {} as Record<string, WithId<App.Match>[]>);
}

export async function getSeasons() {
  return (await db.matches.distinct("season")).sort((a, b) => a - b);
}

export async function createMatch(data: App.Match) {
  const match = CreateSchema.cast(data);
  const errors = ValidationSchema.getErrors(match);

  if (errors)
    return { success: false, errors };

  const { acknowledged, insertedId } = await db.matches.insertOne(match);
  return { success: acknowledged, insertedId };
}

export async function updateMatch(_id: string, data: App.Match) {
  const update = CreateSchema.cast(data);
  const errors = ValidationSchema.getErrors(update);

  if (errors)
    return { success: false, errors };

  const { acknowledged } = await db.matches.updateOne({ _id: new ObjectId(_id) }, {
    $set: update
  });
  return { success: acknowledged };
}