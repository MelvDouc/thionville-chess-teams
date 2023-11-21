import type PlayerRole from "$lib/PlayerRole";
import type { InsertOneResult, ObjectId } from "mongodb";

// ===== ===== ===== ===== =====
// DATABASE
// ===== ===== ===== ===== =====

type WithId<T> = T & { _id: string; };

export {
  InsertOneResult,
  ObjectId
};

// ===== ===== ===== ===== =====
// PLAYER
// ===== ===== ===== ===== =====

export interface Player {
  ffeId: string;
  fideId?: number;
  firstName: string;
  lastName: string;
  email: string;
  role: PlayerRole;
  phone1?: string;
  phone2?: string;
  birthDate?: Date;
  rating?: number;
  team1?: string;
  team2?: string;
  membership?: string;
  isMale: boolean;
  pwd?: string;
  pwdResetId?: string;
}

export type PublicPlayer = Omit<Player, "pwd" | "pwdResetId">;
export type IndexedPlayer = Player & { index: number; };

// ===== ===== ===== ===== =====
// USER
// ===== ===== ===== ===== =====

export type User = Pick<Player, "ffeId" | "role">;

// ===== ===== ===== ===== =====
// MATCH
// ===== ===== ===== ===== =====

export interface MatchLineupItem {
  ffeId: Player["ffeId"];
  rating: number;
}

export interface Match {
  season: number;
  round: number;
  teamName: string;
  whiteOnOdds: boolean;
  opponent: string;
  address: string;
  city: string;
  zipCode: string;
  date: Date;
  /**
   * @default - Array<null * 8>
   */
  lineup: (MatchLineupItem | null)[];
  captainFfeId: Player["ffeId"] | null;
  refereeFfeId: Player["ffeId"] | null;
}

export type WithIdMatch = WithId<Match>;

export interface MatchWithPlayerDetails extends Match {
  board: number;
  hasWhite: boolean;
}

// ===== ===== ===== ===== =====
// RESPONSE
// ===== ===== ===== ===== =====

export type ApiResponse =
  | {
    success: true;
  }
  | {
    success: false;
    errors: string[];
  };

// ===== ===== ===== ===== =====
// SCORE SHEET
// ===== ===== ===== ===== =====

type Parity = "odd" | "even";

export interface ScoreSheetTeam {
  lineup: {
    board: string;
    name: string;
    ffeId: string;
    rating: number | string;
  }[];
  cap: string;
  club: string;
};

export type ScoreSheetData = {
  date: string;
  city: string;
  round: number;
  season: string;
  teamName: string;
  referee: string;
} & { [K in Parity]: ScoreSheetTeam };