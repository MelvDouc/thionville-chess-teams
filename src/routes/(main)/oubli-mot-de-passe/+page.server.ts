import { PasswordResetTemplate, sendEmail } from "$lib/server/email.js";
import { getPlayer, updatePlayer } from "$lib/server/models/player.model.js";
import { error } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, url, locals }) => {
    if (locals.user)
      throw error(404);

    const formData = await request.formData();
    const ffeId = String(formData.get("ffeId") || "");
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

    return {
      success: true,
    };
  }
};