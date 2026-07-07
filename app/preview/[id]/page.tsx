import { notFound } from "next/navigation";
import { supabase, TEMAS, type Pedido } from "@/lib/supabase";

const TEMA_LABEL: Record<string, string> = Object.fromEntries(
  TEMAS.map((t) => [t.id, t.nome])
);

async function buscarPedido(id: string): Promise<Pedido | null> {
  const { data, error } = await supabase
    .from("pedidos")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return data as Pedido;
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pedido = await buscarPedido(id);
  if (!pedido) notFound();

  const instagramUser = process.env.NEXT_PUBLIC_INSTAGRAM_USER || "seu_usuario";
  const linkDirect = `https://ig.me/m/${instagramUser}`;

  return (
    <main className="flex-1 px-6 py-16">
      <div className="max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-gold-soft font-mono">
          ✦ prévia — ainda não publicado
        </span>
        <h1 className="mt-3 text-3xl font-semibold">{pedido.nome_casal}</h1>

        {/* Cartão da prévia com marca d'água */}
        <div className="relative mt-6 rounded-2xl overflow-hidden border border-[color:var(--line)] bg-night-2 p-8">
          <WatermarkOverlay />
          <p className="relative z-10 text-xs font-mono text-gold-soft uppercase tracking-widest">
            {TEMA_LABEL[pedido.tema] ?? pedido.tema}
          </p>
          {pedido.data_especial && (
            <p className="relative z-10 mt-1 text-sm text-[color:var(--muted)]">
              {new Date(pedido.data_especial + "T00:00:00").toLocaleDateString(
                "pt-BR"
              )}
              {pedido.cidade ? ` · ${pedido.cidade}` : ""}
            </p>
          )}
          {pedido.mensagem && (
            <p className="relative z-10 mt-5 whitespace-pre-wrap text-[color:var(--parchment)] italic">
              &ldquo;{pedido.mensagem}&rdquo;
            </p>
          )}
          {pedido.fotos.length > 0 && (
            <p className="relative z-10 mt-5 text-xs text-[color:var(--muted)]">
              {pedido.fotos.length} foto(s) anexada(s)
            </p>
          )}
        </div>

        {/* Código do pedido */}
        <div className="mt-8 rounded-2xl border border-[color:var(--line)] bg-night-2 p-6 text-center">
          <p className="text-sm text-[color:var(--muted)]">
            Seu código de pedido
          </p>
          <p className="mt-1 text-4xl font-mono font-semibold tracking-widest text-gold-soft">
            {pedido.codigo}
          </p>
          <p className="mt-3 text-sm text-[color:var(--muted)]">
            Copia esse código e manda pra gente pelo Direct pra seguir com o
            pagamento e receber a versão final, sem marca d&apos;água.
          </p>
          <a
            href={linkDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 rounded-full bg-gold text-night font-semibold px-7 py-3.5 hover:bg-gold-soft transition-colors"
          >
            Enviar pelo Direct →
          </a>
        </div>
      </div>
    </main>
  );
}

function WatermarkOverlay() {
  // Marca d'água repetida em diagonal, só visual -- CSS puro.
  const linhas = Array.from({ length: 5 });
  return (
    <div
      aria-hidden
      className="absolute inset-0 z-0 flex flex-col justify-between opacity-[0.14] pointer-events-none select-none"
      style={{ transform: "rotate(-18deg) scale(1.3)" }}
    >
      {linhas.map((_, i) => (
        <p
          key={i}
          className="whitespace-nowrap text-2xl font-mono font-semibold tracking-widest text-star"
        >
          AMOSTRA · NÃO PUBLICADO · AMOSTRA · NÃO PUBLICADO · AMOSTRA
        </p>
      ))}
    </div>
  );
}
