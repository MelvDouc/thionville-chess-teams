import { db, type Filter } from "$lib/server/database.js";

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

const updatePlayer = (ffeId: string, data: App.Player) => {
  return db.players.replaceOne({ ffeId }, data);
};

export default {
  getPlayer,
  getPlayers,
  createPlayer,
  updatePlayer,
};