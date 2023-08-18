import { logIn } from "$lib/auth.js";
import { db } from "$lib/server/database.js";
import { redirect } from "@sveltejs/kit";
import { compare } from "bcryptjs";

export const actions = {
  default: async ({ cookies, request }) => {
    const formData = await request.formData();
    const ffeId = String(formData.get("ffeId") || "");
    const pwd = String(formData.get("pwd") || "");
    const user = await db.players.find({ ffeId }).tryNext();

    if (!user || !user.pwd || !(await compare(pwd, user.pwd)))
      return {
        message: "Identifiants invalides."
      };

    logIn(cookies, {
      ffeId,
      role: user.role
    });
    throw redirect(302, "/");
  }
};