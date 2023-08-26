import { HOST } from "$env/static/private";
import { PasswordResetTemplate, sendEmail } from "$lib/server/email.js";
import { getPlayer, updatePlayer } from "$lib/server/models/player.model.js";

export const actions = {
  default: async ({ request, locals: { user } }) => {
    const formData = await request.formData();
    const ffeId = String(formData.get("ffeId") || "");
    const player = await getPlayer({ ffeId });

    if (!player)
      return {
        success: false,
        errors: ["Joueur non trouvé."]
      };

    const pwdResetId = crypto.randomUUID();
    await updatePlayer(ffeId, { pwdResetId }, user?.role ?? NaN);
    const html = PasswordResetTemplate({ firstName: player.firstName, link: `${HOST}/changement-mot-de-passe/${pwdResetId}` });
    await sendEmail({
      to: player.email,
      subject: "Réinitialisation du mot de passe",
      html
    });

    return {
      success: true,
    };
  }
};