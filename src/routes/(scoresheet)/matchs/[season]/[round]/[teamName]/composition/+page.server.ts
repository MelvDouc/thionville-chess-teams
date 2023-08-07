import { db } from "$lib/server/database.js";
import { error } from "@sveltejs/kit";
import { getDatePortion } from "$lib/date-formatter.js";

export const load = async ({ params: { season, round, teamName } }) => {
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
      name: match.lineUp[board]?.name ?? "",
      ffeId: match.lineUp[board]?.ffeId ?? "",
      rating: match.lineUp[board]?.rating || "",
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
    date: getDatePortion(new Date(match.date)),
    season: `${match.season - 1}-${match.season}`,
    round: match.round,
    city: match.city,
    referee: ".".repeat(20),
    [parity]: {
      lineUp: parityLineUp,
      club: match.teamName,
      cap: Object.values(match.lineUp).find((item) => item?.ffeId === match.captainFfeId)?.name
    },
    [oppositeParity]: {
      lineUp: oppositeParityLineUp,
      club: match.opponent,
      cap: ".".repeat(20)
    },
  };
};