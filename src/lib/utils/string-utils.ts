import type { PublicPlayer } from "$lib/types.js";

export function formatPlayerName({ firstName, lastName }: PublicPlayer) {
  return `${firstName} ${lastName}`;
}