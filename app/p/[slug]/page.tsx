import { notFound } from "next/navigation";
import { supabase, type Pagina } from "@/lib/supabase";
import PaginaConteudo from "./PaginaConteudo";

async function buscarPagina(slug: string): Promise<Pagina | null> {
  const { data, error } = await supabase
    .from("paginas")
    .select("*")
    .eq("slug", slug)
    .eq("ativa", true)
    .maybeSingle();
  if (error || !data) return null;
  return data as Pagina;
}

export default async function PaginaPublicada({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pagina = await buscarPagina(slug);
  if (!pagina) notFound();

  return <PaginaConteudo pagina={pagina} />;
}
