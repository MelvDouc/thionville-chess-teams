const PlayerRoles = {
  WEBMASTER: "WEBMASTER",
  ADMIN: "ADMIN",
  CAPTAIN: "CAPTAIN",
  USER: "USER"
} as const;

const roleTranslations = {
  [PlayerRoles.WEBMASTER]: "Webmaster",
  [PlayerRoles.ADMIN]: "Admin",
  [PlayerRoles.CAPTAIN]: "Capitaine",
  [PlayerRoles.USER]: "Utilisateur",
} as const;

export default PlayerRoles;
export { roleTranslations };