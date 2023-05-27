import { db } from "$lib/server/database.js";

export const load = async ({ params: { season } }) => {
  const matches = db.matches
    .aggregate(
      [
        {
          $match: {
            season: +season
          }
        },
        ...pipeLine
      ]
    ).toArray() as Promise<{ teamName: string; matches: App.Match[]; }[]>;
  return {
    season: +season,
    matches
  };
};

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