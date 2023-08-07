import { JWT_PRIVATE_KEY } from "$env/static/private";
import { decode, verify } from "jsonwebtoken";

export async function handle({ event, resolve }) {
  if (event.url.pathname !== "/connexion") {
    const authToken = event.cookies.get("auth_token");

    if (authToken && verify(authToken, JWT_PRIVATE_KEY)) {
      const user = decode(authToken);

      if (isUser(user))
        event.locals.user = user;
    }
  }

  return await resolve(event);
}

function isUser(arg: unknown): arg is App.User {
  return typeof arg === "object"
    && arg !== null
    && "ffeId" in arg
    && typeof arg.ffeId === "string"
    && "role" in arg
    && typeof arg.role === "string";
}