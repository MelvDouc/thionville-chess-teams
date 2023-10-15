enum PlayerRole {
  WEBMASTER,
  ADMIN,
  CAPTAIN,
  USER
}

export const roleTranslations = {
  [PlayerRole.WEBMASTER]: "Webmaster",
  [PlayerRole.ADMIN]: "Admin",
  [PlayerRole.CAPTAIN]: "Capitaine",
  [PlayerRole.USER]: "Utilisateur"
} as const;

export default PlayerRole;