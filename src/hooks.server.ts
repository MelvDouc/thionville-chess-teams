import { getUser } from "$lib/services/auth.service";
import { redirect } from "@sveltejs/kit";

export async function handle({ event, resolve }) {
  event.locals.user = getUser(event.cookies);

  if (event.locals.user && event.route.id?.startsWith("/(public)"))
    throw redirect(302, "/");

  if (!event.locals.user && event.route.id?.startsWith("/(main)"))
    throw redirect(302, "/connexion");

  return await resolve(event);
}