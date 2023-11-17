import { toObject } from "$lib/form-data";
import { getPlayer, updatePlayerPassword } from "$lib/server/models/player.model";
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

    await updatePlayerPassword(player.ffeId, pwd);
    return { success: true };
  }
};