import { db, type Filter } from "$lib/server/database.js";
import { isDateString, isEmail, isFfeId, isNumericString, isRole, isString } from "./validators.js";

const getPlayer = async (filter: Filter<App.Player>) => {
  const player = await db.players.findOne(filter);
  if (!player)
    return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, birthDate, ...others } = player;
  return {
    ...others,
    birthDate: birthDate ? new Date(birthDate) : null
  };
};

const getPlayers = () => {
  return db.players
    .find()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ _id, birthDate, pwd, pwdResetId, ...others }) => ({
      birthDate: birthDate ? new Date(birthDate) : null,
      ...others
    }))
    .toArray();
};

const createPlayer = (data: App.Player) => {
  return db.players.insertOne(data);
};

const updatePlayer = (ffeId: string, player: App.Player) => {
  return db.players.replaceOne({ ffeId }, player);
};

function getPlayerOrErrors(
  {
    ffeId,
    fideId,
    firstName,
    lastName,
    email,
    role,
    phone1,
    phone2,
    team1,
    team2,
    birthDate,
    membership,
    rating,
    isMale
  }: Record<keyof App.Player, FormDataEntryValue>,
  minRole: App.PlayerRole,
  isUpdate: boolean
): { errors: string[]; player: null; } | { errors: null; player: App.Player; } {
  const player: Partial<App.Player> = {};
  const errors: string[] = [];

  if (!isUpdate) {
    if (isString(ffeId) && isFfeId(ffeId)) {
      player.ffeId = ffeId;
    } else {
      errors.push("Code FFE invalide.");
    }
  }

  if (fideId) {
    if (isNumericString(fideId))
      player.fideId = +fideId;
    else
      errors.push("N° FIDE invalide.");
  }

  if (firstName) {
    if (isString(firstName))
      player.firstName = firstName;
    else
      errors.push("Prénom invalide.");
  } else {
    errors.push("Prénom requis.");
  }

  if (lastName) {
    if (isString(lastName))
      player.lastName = lastName;
    else
      errors.push("Nom de famille invalide.");
  } else {
    errors.push("Nom de famille requis.");
  }

  if (email) {
    if (isString(email) && isEmail(email))
      player.email = email;
    else
      errors.push("Email invalide.");
  } else {
    errors.push("Email requis.");
  }

  if (role) {
    if (isNumericString(role) && isRole(+role) && +role <= minRole)
      player.role = +role;
    else
      errors.push("Rôle invalide.");
  } else {
    errors.push("Rôle requis.");
  }

  if (phone1) {
    if (isString(phone1))
      player.phone1 = phone1;
    else
      errors.push("Tél. 1 invalide.");
  }

  if (phone2) {
    if (isString(phone2))
      player.phone2 = phone2;
    else
      errors.push("Tél. 2 invalide.");
  }

  if (team1) {
    if (isString(team1))
      player.team1 = team1;
    else
      errors.push("Équipe 1 invalide.");
  }

  if (team2) {
    if (isString(team2))
      player.team2 = team2;
    else
      errors.push("Équipe 2 invalide.");
  }

  if (membership) {
    if (isString(membership))
      player.membership = membership;
    else
      errors.push("Type d'adhérent invalide.");
  }

  if (birthDate) {
    if (isString(birthDate) && isDateString(birthDate))
      player.birthDate = new Date(birthDate);
    else
      errors.push("Date de naissance invalide.");
  }

  if (isMale) {
    if (isString(isMale) && (isMale === "0" || isMale === "1"))
      player.isMale = Boolean(+isMale);
    else
      errors.push("Sexe invalide.");
  }

  if (rating) {
    if (isString(rating) && isNumericString(rating) && parseInt(rating) > 0)
      player.rating = parseInt(rating);
    else
      errors.push("Elo invalide.");
  }

  if (errors.length)
    return { errors, player: null };
  return { errors: null, player: player as App.Player };
}

export default {
  getPlayer,
  getPlayers,
  createPlayer,
  updatePlayer,
  getPlayerOrErrors
};