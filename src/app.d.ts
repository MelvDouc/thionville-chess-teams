import PlayerRoles from "$lib/PlayerRoles.js";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
		}
		// interface PageData {}
		// interface Platform {}

		type BoardColor = "B" | "N";
		type PlayerCredentials = Pick<Player, "ffeId" | "pwd">;
		type PlayerData = Pick<Player, "ffeId" | "role">;
		type PlayerRole = typeof PlayerRoles[keyof typeof PlayerRoles];
		type LineUpItem = Pick<Player, "ffeId" | "rating"> & {
			name: string;
		};

		interface Player {
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
			isMale?: boolean;
			pwd?: string;
			pwdResetId?: string;
		}

		interface Match {
			season: number;
			round: number;
			teamName: string;
			whiteOnOdds: boolean;
			opponent: string;
			address: string;
			city: string;
			zipCode: string;
			date: Date;
			lineUp: Record<number, LineUpItem | null>;
			captainFfeId: Player["ffeId"] | null;
		}

		type User = Pick<Player, "ffeId" | "role">;
	}


	type InsertResult = {
		acknowledged: boolean;
		insertedId: string;
	};

	type UpdateResult = {
		acknowledged: boolean;
		modifiedCount: number;
	};
}

export { };
