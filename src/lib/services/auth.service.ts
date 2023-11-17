import { JWT_PRIVATE_KEY } from "$env/static/private";
import type { User } from "$lib/types";
import type { Cookies } from "@sveltejs/kit";
import jwt from "jsonwebtoken";

const COOKIE_AUTH_KEY = "auth_token_bc60c07ee13e";

export function logIn(cookies: Cookies, user: User) {
  const token = jwt.sign(user, JWT_PRIVATE_KEY, {
    expiresIn: "365d"
  });
  const today = new Date();
  cookies.set(COOKIE_AUTH_KEY, token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    expires: new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
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
    const user = jwt.verify(token, JWT_PRIVATE_KEY) as jwt.JwtPayload;
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