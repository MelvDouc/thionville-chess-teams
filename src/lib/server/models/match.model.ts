import { ObjectId, db, type Filter } from "$lib/server/database.js";

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

export function getMatchesBySeasonGroupedByTeamName(season: number) {
  return db.matches
    .aggregate([
      {
        $match: { season }
      },
      ...pipeLine
    ])
    .toArray();
}

export async function getSeasons() {
  return (await db.matches.distinct("season")).sort((a, b) => a - b);
}

export function createMatch(data: App.Match) {
  return db.matches.insertOne(data);
}

export function updateMatch(id: string, data: App.Match) {
  return db.matches.replaceOne({ _id: new ObjectId(id) }, data);
}