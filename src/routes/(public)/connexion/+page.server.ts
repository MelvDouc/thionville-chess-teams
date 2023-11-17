import { toObject } from "$lib/form-data";
import { getPlayer } from "$lib/server/models/player.model";
import { logIn } from "$lib/services/auth.service";
import { isCorrectPassword } from "$lib/services/password.service";
import type { Player } from "$lib/types";
import { error, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ cookies, request, locals }) => {
    if (locals.user)
      throw error(404);

    const { ffeId, pwd } = toObject<Required<Pick<Player, "ffeId" | "pwd">>>(await request.formData());
    const user = await getPlayer({ ffeId });

    if (!user || !user.pwd || !(await isCorrectPassword(pwd, user.pwd)))
      return {
        success: false,
        errors: ["Identifiants invalides."]
      };

    logIn(cookies, {
      ffeId,
      role: user.role
    });
    throw redirect(302, "/");
  }
};