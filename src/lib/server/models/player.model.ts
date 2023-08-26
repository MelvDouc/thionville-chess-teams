import PlayerRole from "$lib/PlayerRole.js";
import { db, type Filter } from "$lib/server/database.js";
import { Cast as C, Validation as V } from "shape-and-form";

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
  rating: C.number(1199).round("trunc").optional()
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

export async function getPlayer(filter: Filter<App.Player>): Promise<App.Player | null> {
  const player = await db.players.findOne(filter);
  if (!player)
    return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...others } = player;
  return others;
}

export function getPlayers(): Promise<App.PublicPlayer[]> {
  return db.players
    .find()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ _id, pwd, pwdResetId, ...others }) => others)
    .toArray();
}

export function createPlayer(data: object, userRole: PlayerRole) {
  try {
    const player = CreateSchema.partial().cast(data);
    const errors = CreateValidationSchema(userRole).getErrors(player);

    if (errors.length)
      return { acknowledged: false, errors };

    return db.players.insertOne(player);
  } catch (error) {
    console.log(error);
    return { success: false, errors: ["Une erreur s'est produite."] };
  }
}

export function updatePlayer(ffeId: string, data: object, userRole: PlayerRole) {
  try {
    const update = CreateSchema.cast(data);
    const errors = CreateValidationSchema(userRole).getErrors(update);

    if (errors.length)
      return { acknowledged: false, errors };

    return db.players.replaceOne({ ffeId }, { ...update, ffeId });
  } catch (error) {
    console.log(error);
    return { success: false, errors: ["Une erreur s'est produite."] };
  }
}

export async function deletePlayer(ffeId: App.Player["ffeId"], user: App.User) {
  const player = await getPlayer({ ffeId });

  if (player && user.role < player.role)
    return db.players.deleteOne({ ffeId });

  return null;
}