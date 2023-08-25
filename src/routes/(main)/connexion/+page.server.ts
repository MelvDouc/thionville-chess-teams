import { logIn } from "$lib/auth.js";
import { toObject } from "$lib/form-data.js";
import { isCorrectPassword } from "$lib/password.js";
import { db } from "$lib/server/database.js";
import { error, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ cookies, request, locals }) => {
    if (locals.user)
      throw error(404);

    const { ffeId, pwd } = toObject<Required<Pick<App.Player, "ffeId" | "pwd">>>(await request.formData());
    const user = await db.players.find({ ffeId }).tryNext();

    if (!user || !user.pwd || !(await isCorrectPassword(pwd, user.pwd)))
      return {
        errors: ["Identifiants invalides."]
      };

    logIn(cookies, {
      ffeId,
      role: user.role
    });
    throw redirect(302, "/");
  }
};