import { db, ObjectId, type Filter } from "$lib/server/database.js";

const pipeLine = [
  {
    $sort: {
      date: 1,
    }
  },
  {
    $group: {
      _id: "$teamName",
      matches: {
        $push: {
          season: "$season",
          round: "$round",
          teamName: "$teamName",
          whiteOnOdds: "$whiteOnOdds",
          opponent: "$opponent",
          address: "$address",
          city: "$city",
          zipCode: "$zipCode",
          date: "$date",
          lineUp: "$lineUp",
          captainFfeId: "$captainFfeId"
        }
      }
    }
  },
  {
    $project: {
      teamName: "$_id",
      matches: 1,
      _id: 0,
    }
  },
  {
    $sort: {
      teamName: 1,
    }
  }
];

const getMatch = async (filter: Filter<App.Match>) => {
  const match = await db.matches.findOne(filter);

  if (match) {
    const { _id, ...others } = match;
    return {
      _id: _id.toHexString(),
      ...others
    };
  }

  return null;
};

const getMatches = (filter: Pick<App.Match, "season" | "round" | "teamName">) => {
  return db.matches
    .find(filter)
    .map(({ _id, ...others }) => ({ _id: _id.toHexString(), ...others }))
    .toArray();
};

const getMatchesBySeasonGroupedByTeamName = (season: number) => {
  return db.matches
    .aggregate([
      {
        $match: { season }
      },
      ...pipeLine
    ])
    .toArray();
};

const getSeasons = async () => {
  return (await db.matches.distinct("season")).sort((a, b) => a - b);
};

const createMatch = (data: App.Match) => {
  return db.matches.insertOne(data);
};

const updateMatch = (id: string, data: App.Match) => {
  return db.matches.replaceOne({ _id: new ObjectId(id) }, data);
};

export default {
  getMatch,
  getMatches,
  getMatchesBySeasonGroupedByTeamName,
  getSeasons,
  createMatch,
  updateMatch
};