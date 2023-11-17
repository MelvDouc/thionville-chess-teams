import { toObject } from "$lib/form-data";
import { getPlayer, updatePlayer } from "$lib/server/models/player.model";
import { PasswordResetTemplate, sendEmail } from "$lib/services/email.service";
import type { Player } from "$lib/types";
import { error } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, url, locals }) => {
    if (locals.user)
      throw error(404);

    const { ffeId } = toObject<Pick<Player, "ffeId">>(await request.formData());
    const player = await getPlayer({ ffeId });

    if (!player)
      return {
        success: false,
        errors: ["Joueur non trouvé."]
      };

    const pwdResetId = crypto.randomUUID();
    const updateResult = await updatePlayer(ffeId, { pwdResetId });

    if (!updateResult.success)
      return {
        success: false,
        errors: updateResult.errors
      };

    await sendEmail({
      to: player.email,
      subject: "Réinitialisation du mot de passe",
      html: PasswordResetTemplate({
        firstName: player.firstName,
        urlOrigin: url.origin,
        pwdResetId
      })
    });
    return { success: true, email: player.email };
  }
};