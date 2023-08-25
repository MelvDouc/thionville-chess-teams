import { toObject } from "$lib/form-data.js";
import { hashPassword } from "$lib/password.js";
import { getPlayer, updatePlayer } from "$lib/server/models/player.model.js";
import { error } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, locals: { user }, url }) => {
    if (user)
      throw error(404);

    const pwdResetId = url.searchParams.get("id");

    if (!pwdResetId)
      throw error(404);

    const player = await getPlayer({ pwdResetId });

    if (!player)
      throw error(404);

    const { pwd, pwd2 } = toObject<{ pwd: string; pwd2: string; }>(await request.formData());

    if (!pwd || pwd !== pwd2)
      return {
        success: false,
        errors: ["Les mots de passe ne se correspondent pas."]
      };

    await updatePlayer(player.ffeId, { pwd: await hashPassword(pwd) }, ["pwdResetId"]);
    return {
      success: true,
    };
  }
};