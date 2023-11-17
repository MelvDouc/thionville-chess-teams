import { getUser } from "$lib/services/auth.service";
import { redirect } from "@sveltejs/kit";

export async function handle({ event, resolve }) {
  event.locals.user = getUser(event.cookies);
  const isAuthRoute = event.route.id?.includes("/@/");

  if (event.locals.user && isAuthRoute)
    throw redirect(302, "/");

  if (!event.locals.user && !isAuthRoute)
    throw redirect(302, "/@/connexion");

  return await resolve(event);
}