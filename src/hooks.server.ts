import { getUser } from "./lib/auth.js";

export async function handle({ event, resolve }) {
  const user = getUser(event.cookies);
  event.locals.user = user;
  return await resolve(event);
}