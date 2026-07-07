"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabase, gerarSlug, type Pedido } from "@/lib/supabase";

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

// Confere se quem chamou a action está mesmo logado no painel,
// antes de deixar publicar ou apagar qualquer coisa.
async function exigirLogin() {
  const cookieStore = await cookies();
  const senha = cookieStore.get("painel_senha")?.value;
  if (!senha || senha !== process.env.ADMIN_PASSWORD) {
    throw new Error("Não autorizado.");
  }
}

// Pega um pedido (rascunho) e publica ele como página final,
// sem marca d'água, com um link/slug próprio.
export async function publicarPedido(formData: FormData) {
  await exigirLogin();

  const pedidoId = String(formData.get("pedido_id") ?? "");
  if (!pedidoId) throw new Error("Pedido inválido.");

  const { data: pedido, error: erroBusca } = await supabase
    .from("pedidos")
    .select("*")
    .eq("id", pedidoId)
    .single();

  if (erroBusca || !pedido) {
    throw new Error("Pedido não encontrado.");
  }

  const p = pedido as Pedido;
  const slug = gerarSlug(p.nome_casal);

  const { error: erroInsert } = await supabase.from("paginas").insert({
    slug,
    nome_casal: p.nome_casal,
    data_especial: p.data_especial,
    cidade: p.cidade,
    tema: p.tema,
    mensagem: p.mensagem,
    carta: p.carta,
    linha_do_tempo: p.linha_do_tempo,
    promessas: p.promessas,
    musica_url: p.musica_url,
    fotos: p.fotos,
    ativa: true,
  });

  if (erroInsert) {
    console.error("Erro ao publicar página:", erroInsert);
    throw new Error("Não deu pra publicar. Tenta de novo.");
  }

  // Marca o pedido como já usado, pra não publicar duas vezes por engano,
  // e guarda o slug pra mostrar o link final direto no painel.
  await supabase
    .from("pedidos")
    .update({ status: "publicado", slug_publicado: slug })
    .eq("id", pedidoId);

  revalidatePath("/painel");
}

// Remove um pedido antigo do painel (depois de já ter sido publicado,
// por exemplo), sem afetar a página final que já está no ar.
export async function apagarPedido(formData: FormData) {
  await exigirLogin();

  const pedidoId = String(formData.get("pedido_id") ?? "");
  if (!pedidoId) throw new Error("Pedido inválido.");

  await supabase.from("pedidos").delete().eq("id", pedidoId);
  revalidatePath("/painel");
}
