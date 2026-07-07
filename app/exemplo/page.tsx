import type { Metadata } from "next";
import PaginaConteudo from "../p/[slug]/PaginaConteudo";
import type { Pagina } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Exemplo — Nós",
};

// Página de exemplo, com dados fictícios, só pra mostrar como fica o
// presente final. Não existe no banco de dados.
const PAGINA_EXEMPLO: Pagina = {
  id: "exemplo",
  slug: "exemplo",
  nome_casal: "Luna & Théo",
  data_especial: "2022-09-14",
  cidade: "Florianópolis, SC",
  tema: "ceu-estrelado",
  mensagem: "eu escolho você, em todas as versões da nossa história",
  carta:
    "Luna,\n\nSe alguém me perguntasse o dia exato em que percebi que ia te amar assim, eu não saberia responder — mas sei que foi bem antes de eu ter coragem de dizer.\n\nObrigado por transformar dias comuns em favoritos. Por rir das minhas piadas ruins, por dividir o último pedaço de qualquer coisa comigo, por ser o lugar mais parecido com casa que eu já encontrei.\n\nCom você, o tempo faz sentido.\n\nPra sempre,\nThéo",
  linha_do_tempo:
    "14/09/2022 | Primeiro encontro | Um café que devia durar 1 hora e durou a tarde inteira\n02/02/2023 | Primeira viagem juntos | Fim de semana em Urubici, com direito a neblina e vinho quente\n25/12/2023 | Morar juntos | A primeira ceia de Natal na nossa própria casa",
  promessas:
    "Amor Eterno | Prometo escolher você mesmo nos dias difíceis\nRir Sempre | Prometo rir das suas piadas ruins pra sempre\nNunca Brigados | Prometo nunca dormir brigado com você",
  musica_url: "",
  fotos: [
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521543387599-4a4c1b6f9e6a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800&auto=format&fit=crop",
  ],
  ativa: true,
  publicado_em: new Date().toISOString(),
};

export default function ExemploPage() {
  return <PaginaConteudo pagina={PAGINA_EXEMPLO} />;
}
