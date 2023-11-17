import { EMAIL_ADDRESS, EMAIL_PWD, EMAIL_SERVICE } from "$env/static/private";
import { createTransport, type SendMailOptions } from "nodemailer";

const transport = createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PWD
  }
});

export async function sendEmail(options: Required<Pick<SendMailOptions, "to" | "subject" | "html">>) {
  try {
    const sendInfo = await transport.sendMail({
      from: EMAIL_ADDRESS,
      ...options,
    });
    return sendInfo;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function PasswordResetTemplate({ firstName, urlOrigin, pwdResetId }: {
  firstName: string;
  urlOrigin: string;
  pwdResetId: string;
}) {
  const link = `${urlOrigin}/@/changement-mot-de-passe?id=${pwdResetId}`;

  return `
    <main style="font-family: Verdana, Helvetica, Arial, sans-serif;">
      <p>Bonjour ${firstName},</p>
      <p>
        <div>Vous avez demandé la réinitialisation de votre mot de passe. Pour ce faire, veuillez suivre le lien ci-dessous :</div>
        <div><a href="${link}">${link}</a></div>
      </p>
      <p>
        <div>À bientôt,</div>
        <div>L'admin de <strong>Thionville Échecs – Équipes</strong></div>
      </p>
    </main>
  `.trim();
}