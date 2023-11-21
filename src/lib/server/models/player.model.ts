import PlayerRole from "$lib/PlayerRole";
import { db } from "$lib/server/database";
import { hashPassword } from "$lib/services/password.service";
import { fetchRating } from "$lib/services/rating-scraper.service";
import type { ApiResponse, Match, MatchWithPlayerDetails, Player, PublicPlayer, User } from "$lib/types";
import type { Filter, UpdateResult } from "mongodb";
import { Cast as C, Validation as V } from "shape-and-form";

const defaultError = "Une erreur s'est produite.";

const CreateSchema = C.object({
  ffeId: C.string(),
  fideId: C.number().round("trunc").optional(),
  firstName: C.string(),
  lastName: C.string(),
  email: C.string(),
  role: C.number(PlayerRole.USER),
  phone1: C.string().optional(),
  phone2: C.string().optional(),
  team1: C.string().optional(),
  team2: C.string().optional(),
  birthDate: C.date().optional(),
  membership: C.string().optional(),
  isMale: C.boolean(true),
  rating: C.number(1199).round("trunc").optional(),
  pwd: C.string().optional(),
  pwdResetId: C.string().optional(),
});

function CreateValidationSchema(minRole: PlayerRole) {
  return V.object({
    ffeId: V.string().regex(/^[A-Z]\d+$/, "Code FFE invalide."),
    firstName: V.string().minLength(1, "Prénom requis."),
    lastName: V.string().minLength(1, "Nom de famille requis."),
    email: V.string().email("Email invalide."),
    role: V.number().min(minRole, "Rôle non autorisé.").max(PlayerRole.USER, "Rôle non autorisé."),
    rating: V.number().integer().min(0, "Elo invalide.").max(9999, "Elo invalide.").optional()
  });
}

function UpdateValidationSchema(minRole: PlayerRole) {
  return CreateValidationSchema(minRole).partial();
}

export async function getPlayer(filter: Filter<Player>): Promise<Player | null> {
  const player = await db.players.findOne(filter);
  if (!player) return null;
  const { _id, ...others } = player;
  return others;
}

export function getPlayers(): Promise<PublicPlayer[]> {
  return db.players
    .find()
    .map(({ _id, pwd, pwdResetId, ...others }) => others)
    .toArray();
}

export async function getPlayerMatches(ffeId: string) {
  const matches: Record<number, MatchWithPlayerDetails[]> = {};

  for await (const { _id, ...match } of db.matches.find()) {
    for (let i = 0; i < match.lineup.length; i++) {
      const item = match.lineup[i];
      if (item?.ffeId === ffeId) {
        const board = i + 1;
        matches[match.season] ??= [];
        matches[match.season].push({
          ...match,
          board,
          hasWhite: (board % 2 === 1) === match.whiteOnOdds,
        });
        break;
      }
    }
  }

  return Object.entries(matches).reduce((acc, [season, matches]) => {
    acc.push({ season: +season, matches });
    return acc;
  }, [] as { season: number; matches: MatchWithPlayerDetails[]; }[]);
}

export async function createPlayer(data: object, userRole: PlayerRole): Promise<ApiResponse & { insertedId?: string; }> {
  try {
    const player = CreateSchema.partial().cast(data);
    const errors = CreateValidationSchema(userRole).getErrors(player);

    if (errors.length)
      return { success: false, errors };

    const insertResult = await db.players.insertOne(player);
    if (!insertResult.acknowledged || !insertResult.insertedId)
      return { success: false, errors: [defaultError] };

    return {
      success: true,
      insertedId: insertResult.insertedId.toHexString()
    };
  } catch {
    return { success: false, errors: [defaultError] };
  }
}

export async function updatePlayer(ffeId: string, data: object): Promise<ApiResponse> {
  try {
    const update = CreateSchema.partial().cast(data);
    const errors = UpdateValidationSchema(PlayerRole.WEBMASTER).getErrors(update);

    if (errors.length)
      return { success: false, errors };

    const { ffeId: _, ...updateWithoutFfeId } = update;
    const { acknowledged } = await db.players.updateOne({ ffeId }, {
      $set: updateWithoutFfeId
    });

    if (!acknowledged)
      return { success: false, errors: [defaultError] };

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, errors: [defaultError] };
  }
}

export async function updatePlayerPassword(ffeId: string, plainPassword: string) {
  const hash = await hashPassword(plainPassword);
  await db.players.updateOne({ ffeId }, {
    $set: { pwd: hash },
    $unset: { pwdResetId: "" }
  });
}

export async function deletePlayer(ffeId: Player["ffeId"], user: User): Promise<ApiResponse> {
  const player = await getPlayer({ ffeId });

  if (!player || user.role >= player.role || user.role > PlayerRole.ADMIN)
    return {
      success: false,
      errors: ["Action non autorisée."]
    };

  const { acknowledged } = await db.players.deleteOne({ ffeId });

  if (!acknowledged)
    return {
      success: false,
      errors: [defaultError]
    };

  return { success: true };
}

export async function updateRatings() {
  const updates: Promise<UpdateResult<Player>>[] = [];

  for await (const { _id, fideId } of db.players.find()) {
    if (!fideId) continue;
    const rating = await fetchRating(fideId);
    if (rating === null) continue;
    const update = db.players.updateOne({ _id }, {
      $set: { rating }
    });
    updates.push(update);
  }

  await Promise.all(updates);
}