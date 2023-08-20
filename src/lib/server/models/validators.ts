import PlayerRole from "$lib/PlayerRole.js";

export function isString(arg: unknown): arg is string {
  return typeof arg === "string";
}

export function isNumericString(arg: unknown) {
  return isString(arg) && !isNaN(+arg);
}

export function isDateString(arg: string) {
  return !isNaN(new Date(arg).getTime());
}

export function isEmail(arg: string) {
  return /^[^@]+@[^@.]+(\.[^@.]+)+$/.test(arg);
}

export function isFfeId(arg: string) {
  return /^[A-Z]\d+$/.test(arg);
}

export function isNumber(arg: unknown): arg is number {
  return typeof arg === "number";
}

export function isRole(role: number): role is PlayerRole {
  return isString(PlayerRole[role]);
}