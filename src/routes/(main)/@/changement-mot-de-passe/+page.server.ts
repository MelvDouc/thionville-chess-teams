import { toObject } from "$lib/form-data";
import { getPlayer, updatePlayerPassword } from "$lib/server/models/player.model";
import { error } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, locals: { user }, url }) => {
    if (user) throw error(404);

    const pwdResetId = url.searchParams.get("id");
    if (!pwdResetId) throw error(404);

    const player = await getPlayer({ pwdResetId });
    if (!player) throw error(404);

    const { email, pwd, pwd2 } = toObject<PasswordResetFormData>(await request.formData());

    if (email.trim() !== player.email)
      throw error(404);

    if (!pwd || pwd !== pwd2)
      return {
        success: false,
        errors: ["Les mots de passe ne se correspondent pas."]
      };

    await updatePlayerPassword(player.ffeId, pwd);
    return { success: true };
  }
};

type PasswordResetFormData = {
  email: string;
  pwd: string;
  pwd2: string;
};