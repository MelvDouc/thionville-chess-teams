import { getDatePortion } from "$lib/date-formatter.js";
import { db } from "$lib/server/database.js";
import { error } from "@sveltejs/kit";

export async function load({ params: { season, round, teamName } }) {
  const match = await db.matches.findOne({
    season: +season,
    round: +round,
    teamName
  });

  if (!match)
    throw error(404);

  const parity = match.whiteOnOdds ? "odd" : "even";
  const oppositeParity = (parity === "odd") ? "even" : "odd";

  const parityLineUp = Array.from({ length: 8 }, (_, i) => {
    const board = i + 1;
    return {
      board: board + ((board % 2 === 1 === match.whiteOnOdds) ? "B" : "N"),
      name: match.lineup[board]?.name ?? "",
      ffeId: match.lineup[board]?.ffeId ?? "",
      rating: match.lineup[board]?.rating || "",
    };
  });
  const oppositeParityLineUp = Array.from({ length: 8 }, (_, i) => {
    const board = i + 1;
    return {
      board: board + ((board % 2 === 0 === match.whiteOnOdds) ? "B" : "N"),
      name: "",
      ffeId: "",
      rating: "",
    };
  });

  return {
    date: getDatePortion(match.date),
    season: `${match.season - 1}-${match.season}`,
    round: match.round,
    city: match.city,
    referee: ".".repeat(20),
    [parity]: {
      lineup: parityLineUp,
      club: match.teamName,
      cap: Object.values(match.lineup).find((item) => item?.ffeId === match.captainFfeId)?.name ?? ""
    },
    [oppositeParity]: {
      lineup: oppositeParityLineUp,
      club: match.opponent,
      cap: ".".repeat(20)
    },
  };
}