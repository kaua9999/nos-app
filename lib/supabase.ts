import { createClient } from "@supabase/supabase-js";

// Esse client usa a chave "anon/publishable" -- ela é pública de propósito,
// as regras de segurança de verdade ficam nas policies do arquivo
// supabase/schema.sql (RLS). Pode aparecer no navegador sem problema.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Pedido = {
  id: string;
  codigo: string;
  nome_casal: string;
  data_especial: string | null;
  cidade: string | null;
  tema: string;
  mensagem: string | null;
  musica_url: string | null;
  fotos: string[];
  status: string;
  slug_publicado: string | null;
  criado_em: string;
};

export type Pagina = {
  id: string;
  slug: string;
  nome_casal: string;
  data_especial: string | null;
  cidade: string | null;
  tema: string;
  mensagem: string | null;
  musica_url: string | null;
  fotos: string[];
  ativa: boolean;
  publicado_em: string;
};

export const TEMAS = [
  { id: "ceu-estrelado", nome: "Céu Estrelado" },
  { id: "polaroid", nome: "Polaroid Retrô" },
  { id: "carta-antiga", nome: "Carta Antiga" },
  { id: "neon", nome: "Neon Noturno" },
] as const;

// Gera um código curto tipo "A312" pra pessoa mandar no Direct
export function gerarCodigoPedido(): string {
  const letras = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // sem letras confusas (I, O)
  const letra = letras[Math.floor(Math.random() * letras.length)];
  const numero = Math.floor(100 + Math.random() * 900); // 100-999
  return `${letra}${numero}`;
}

// Gera um slug tipo "ana-e-pedro-x7k2" a partir do nome do casal
export function gerarSlug(nomeCasal: string): string {
  const base = nomeCasal
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const sufixo = Math.random().toString(36).slice(2, 6);
  return `${base}-${sufixo}`;
}
