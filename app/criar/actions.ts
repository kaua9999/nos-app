"use server";

import { redirect } from "next/navigation";
import { supabase, gerarCodigoPedido } from "@/lib/supabase";

const MAX_FOTOS = 12;
const MAX_MENSAGEM = 600;

export async function criarPedido(formData: FormData) {
  // 1. Ler e validar os campos que vieram do formulário.
  // Nunca confie em dados do cliente -- tratamos tudo aqui.
  const nomeCasal = String(formData.get("nome_casal") ?? "").trim();
  const dataEspecial = String(formData.get("data_especial") ?? "").trim();
  const cidade = String(formData.get("cidade") ?? "").trim();
  const tema = String(formData.get("tema") ?? "ceu-estrelado").trim();
  const musicaUrl = String(formData.get("musica_url") ?? "").trim();
  const mensagem = String(formData.get("mensagem") ?? "")
    .trim()
    .slice(0, MAX_MENSAGEM);

  const fotosTexto = String(formData.get("fotos") ?? "");
  const fotos = fotosTexto
    .split("\n")
    .map((linha) => linha.trim())
    .filter((linha) => linha.length > 0)
    .slice(0, MAX_FOTOS);

  if (!nomeCasal) {
    throw new Error("O nome do casal é obrigatório.");
  }

  // 2. Gerar um código curto único (tenta algumas vezes até não colidir).
  let codigo = gerarCodigoPedido();
  for (let tentativa = 0; tentativa < 5; tentativa++) {
    const { data: existente } = await supabase
      .from("pedidos")
      .select("id")
      .eq("codigo", codigo)
      .maybeSingle();
    if (!existente) break;
    codigo = gerarCodigoPedido();
  }

  // 3. Gravar o pedido no Supabase.
  const { data, error } = await supabase
    .from("pedidos")
    .insert({
      codigo,
      nome_casal: nomeCasal,
      data_especial: dataEspecial || null,
      cidade: cidade || null,
      tema,
      mensagem: mensagem || null,
      musica_url: musicaUrl || null,
      fotos,
      status: "rascunho",
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("Erro ao criar pedido:", error);
    throw new Error("Não deu pra salvar o pedido. Tenta de novo.");
  }

  // 4. Levar a pessoa direto pra prévia do que ela acabou de montar.
  redirect(`/preview/${data.id}`);
}
