import { compare, hash } from "bcryptjs";

export function isCorrectPassword(password: string, hash: string) {
  return compare(password, hash);
}

export function hashPassword(password: string) {
  return hash(password, 10);
}