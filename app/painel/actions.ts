"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function entrarNoPainel(formData: FormData) {
  const senha = String(formData.get("senha") ?? "");
  const senhaCorreta = process.env.ADMIN_PASSWORD;

  if (!senhaCorreta || senha !== senhaCorreta) {
    redirect("/painel?erro=1");
  }

  const cookieStore = await cookies();
  cookieStore.set("painel_senha", senha, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12 horas
  });

  redirect("/painel");
}

export async function sairDoPainel() {
  const cookieStore = await cookies();
  cookieStore.delete("painel_senha");
  redirect("/painel");
}
