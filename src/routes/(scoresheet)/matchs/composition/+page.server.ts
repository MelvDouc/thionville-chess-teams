import { getLineup, getMatch } from "$lib/server/models/match.model";
import { getDatePortion } from "$lib/services/date.service";
import type { ScoreSheetData } from "$lib/types";
import { error } from "@sveltejs/kit";

export async function load({ url: { searchParams } }) {
  const match = await getMatch({
    season: Number(searchParams.get("saison")),
    round: Number(searchParams.get("ronde")),
    teamName: searchParams.get("equipe") ?? ""
  });

  if (!match)
    throw error(404);

  const parity = match.whiteOnOdds ? "odd" : "even";
  const oppositeParity = (parity === "odd") ? "even" : "odd";

  const parityLineup = (await getLineup(match)).map((p, i) => {
    const board = i + 1;
    const isOddBoard = board % 2 === 1;
    return {
      board: board + (isOddBoard === match.whiteOnOdds ? "B" : "N"),
      name: p ? `${p.firstName} ${p.lastName}` : "",
      ffeId: p?.ffeId ?? "",
      rating: String(p?.rating ?? "")
    };
  });
  const oppositeParityLineup = Array.from({ length: parityLineup.length }, (_, i) => {
    const board = i + 1;
    const isOddBoard = board % 2 === 1;
    return {
      board: board + (isOddBoard !== match.whiteOnOdds ? "B" : "N"),
      name: "",
      ffeId: "",
      rating: "",
    };
  });

  const data: ScoreSheetData = {
    date: getDatePortion(match.date),
    season: `${match.season - 1}-${match.season}`,
    round: match.round,
    city: match.city,
    referee: ".".repeat(20),
    [parity as "odd"]: {
      lineup: parityLineup,
      club: match.teamName,
      cap: parityLineup.find((item) => item?.ffeId === match.captainFfeId)?.name ?? ""
    },
    [oppositeParity as "even"]: {
      lineup: oppositeParityLineup,
      club: match.opponent,
      cap: ".".repeat(20)
    },
  };
  return data;
}