import { notFound } from "next/navigation";
import { supabase, TEMAS, type Pagina } from "@/lib/supabase";

const TEMA_LABEL: Record<string, string> = Object.fromEntries(
  TEMAS.map((t) => [t.id, t.nome])
);

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

  function diasJuntos(): number | null {
    if (!pagina!.data_especial) return null;
    const inicio = new Date(pagina!.data_especial + "T00:00:00").getTime();
    return Math.floor((Date.now() - inicio) / 86400000);
  }
  const dias = diasJuntos();

  return (
    <main className="flex-1 flex items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full text-center">
        <p className="text-xs uppercase tracking-widest text-gold-soft font-mono">
          ✦ {TEMA_LABEL[pagina.tema] ?? pagina.tema}
        </p>
        <h1 className="mt-4 text-4xl sm:text-5xl font-semibold">
          {pagina.nome_casal}
        </h1>

        {dias !== null && (
          <p className="mt-3 font-mono text-gold-soft text-sm">
            juntos há {dias.toLocaleString("pt-BR")} dias
            {pagina.cidade ? ` · ${pagina.cidade}` : ""}
          </p>
        )}

        {pagina.mensagem && (
          <p className="mt-10 text-lg leading-relaxed italic text-parchment whitespace-pre-wrap">
            &ldquo;{pagina.mensagem}&rdquo;
          </p>
        )}

        {pagina.fotos.length > 0 && (
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {pagina.fotos.map((url, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={url}
                alt={`Foto ${i + 1} de ${pagina.nome_casal}`}
                className="w-full aspect-square object-cover rounded-lg border border-[color:var(--line)]"
              />
            ))}
          </div>
        )}

        {pagina.musica_url && (
          <a
            href={pagina.musica_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-10 rounded-full border border-[color:var(--line)] px-6 py-3 text-sm hover:border-gold-soft hover:text-gold-soft transition-colors"
          >
            ♪ Ouvir a música de vocês
          </a>
        )}
      </div>
    </main>
  );
}
