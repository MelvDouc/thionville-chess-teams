import { COOKIE_AUTH_KEY, JWT_PRIVATE_KEY } from "$env/static/private";
import type { User } from "$lib/types";
import type { Cookies } from "@sveltejs/kit";
import { sign, verify, type JwtPayload } from "jsonwebtoken";

export function logIn(cookies: Cookies, user: User) {
  const token = sign(user, JWT_PRIVATE_KEY, {
    expiresIn: "365d"
  });
  cookies.set(COOKIE_AUTH_KEY, token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 365
  });
}

export function logOut(cookies: Cookies) {
  cookies.delete(COOKIE_AUTH_KEY);
}

export function getUser(cookies: Cookies): User | null {
  const token = cookies.get(COOKIE_AUTH_KEY);

  if (!token)
    return null;

  try {
    const user = verify(token, JWT_PRIVATE_KEY) as JwtPayload;
    return isUser(user) ? user : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function isUser(arg: unknown): arg is User {
  return typeof arg === "object"
    && arg !== null
    && "ffeId" in arg
    && typeof arg.ffeId === "string"
    && "role" in arg
    && typeof arg.role === "number";
}