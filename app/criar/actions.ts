"use server";

import { redirect } from "next/navigation";
import { supabase, gerarCodigoPedido } from "@/lib/supabase";

const MAX_FOTOS = 12;
const MAX_MENSAGEM = 200;
const MAX_CARTA = 3000;

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
  const carta = String(formData.get("carta") ?? "")
    .trim()
    .slice(0, MAX_CARTA);
  const linhaDoTempo = String(formData.get("linha_do_tempo") ?? "").trim();
  const promessas = String(formData.get("promessas") ?? "").trim();

  if (!nomeCasal) {
    throw new Error("O nome do casal é obrigatório.");
  }

  // 1.1 Pegar os arquivos de foto enviados e subir pro Storage do Supabase.
  const MAX_TAMANHO_MB = 5;
  const arquivos = formData
    .getAll("fotos")
    .filter((item): item is File => item instanceof File && item.size > 0)
    .slice(0, MAX_FOTOS);

  const fotos: string[] = [];
  for (const arquivo of arquivos) {
    if (arquivo.size > MAX_TAMANHO_MB * 1024 * 1024) {
      throw new Error(
        `A foto "${arquivo.name}" passa de ${MAX_TAMANHO_MB}MB. Escolha uma menor.`
      );
    }

    const extensao = arquivo.name.split(".").pop() || "jpg";
    const nomeArquivo = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${extensao}`;

    const { error: erroUpload } = await supabase.storage
      .from("fotos")
      .upload(nomeArquivo, arquivo, {
        contentType: arquivo.type || "image/jpeg",
        upsert: false,
      });

    if (erroUpload) {
      console.error("Erro ao subir foto:", erroUpload);
      throw new Error("Não deu pra enviar uma das fotos. Tenta de novo.");
    }

    const { data: publicUrlData } = supabase.storage
      .from("fotos")
      .getPublicUrl(nomeArquivo);

    fotos.push(publicUrlData.publicUrl);
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
      carta: carta || null,
      linha_do_tempo: linhaDoTempo || null,
      promessas: promessas || null,
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
