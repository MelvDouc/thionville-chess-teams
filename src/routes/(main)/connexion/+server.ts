import { JWT_PRIVATE_KEY } from "$env/static/private";
import { db } from "$lib/server/database.js";
import { json } from "@sveltejs/kit";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export async function POST({ request, cookies }) {
  const { email, password } = await request.json() as {
    email: string;
    password: string;
  };
  const user = await db.players.find({ email }).tryNext();

  if (!user || !user.pwd || !(await compare(password, user.pwd)))
    return json({ error: "Identifiants invalides." }, { status: 404 });

  const userData: App.User = {
    ffeId: user.ffeId,
    role: user.role
  };
  const authToken = sign(userData, JWT_PRIVATE_KEY, {
    expiresIn: "1y"
  });
  cookies.set("auth_token", authToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 365
  });
  return json(userData, { status: 201 });
}