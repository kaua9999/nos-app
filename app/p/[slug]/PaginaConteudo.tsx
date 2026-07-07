import { TEMAS, parseLinhaDoTempo, parsePromessas, type Pagina } from "@/lib/supabase";
import Starfield from "./Starfield";
import LiveCounter from "./LiveCounter";
import LoveLetter from "./LoveLetter";
import MusicPlayer from "./MusicPlayer";

const TEMA_LABEL: Record<string, string> = Object.fromEntries(
  TEMAS.map((t) => [t.id, t.nome])
);

// Cada tema muda o fundo, a moldura das fotos e se tem estrelas animadas.
export const TEMA_ESTILO: Record<
  string,
  {
    fundo: string;
    estrelas: "warm" | "neon" | null;
    card: string;
    foto: string;
  }
> = {
  "ceu-estrelado": {
    fundo: "bg-[radial-gradient(ellipse_at_50%_0%,#2e2153,#1b1330_70%)]",
    estrelas: "warm",
    card: "border border-[color:var(--line)] bg-night-2/60 backdrop-blur-sm",
    foto: "rounded-lg border border-[color:var(--line)]",
  },
  polaroid: {
    fundo: "bg-[linear-gradient(160deg,#efe3ce,#d8c6a5)]",
    estrelas: null,
    card: "border border-black/10 bg-[#fffaf0]/70",
    foto: "rounded-sm border-[6px] border-white shadow-lg rotate-[-2deg]",
  },
  "carta-antiga": {
    fundo: "bg-[linear-gradient(160deg,#3a2a20,#5e4530)]",
    estrelas: null,
    card: "border border-[#8a6a4a]/40 bg-[#3a2a20]/50",
    foto: "rounded border-4 border-[#8a6a4a]/50",
  },
  neon: {
    fundo: "bg-[radial-gradient(ellipse_at_50%_0%,#341c4e,#12121a_70%)]",
    estrelas: "neon",
    card: "border border-[#e3a0a6]/25 bg-night-2/50 backdrop-blur-sm shadow-[0_0_40px_rgba(232,160,210,0.08)]",
    foto: "rounded-lg border border-[#e3a0a6]/30",
  },
};

export default function PaginaConteudo({ pagina }: { pagina: Pagina }) {
  const estilo = TEMA_ESTILO[pagina.tema] ?? TEMA_ESTILO["ceu-estrelado"];
  const fotoCapa = pagina.fotos[0] ?? null;
  const marcos = parseLinhaDoTempo(pagina.linha_do_tempo);
  const promessas = parsePromessas(pagina.promessas);

  return (
    <main className={`relative flex-1 overflow-hidden ${estilo.fundo}`}>
      {estilo.estrelas && (
        <div className="fixed inset-0 z-0">
          <Starfield tint={estilo.estrelas} />
        </div>
      )}

      {/* HERO — foto do casal desfocada de fundo, se tiver */}
      <section className="relative z-10 min-h-[85vh] flex flex-col items-center justify-center text-center px-6 py-20">
        {fotoCapa && (
          <div className="absolute inset-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fotoCapa}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover blur-2xl scale-110 opacity-30"
            />
            <div className={`absolute inset-0 ${estilo.fundo} opacity-80`} />
          </div>
        )}

        <div className="relative z-10">
          <p className="text-xs uppercase tracking-widest text-gold-soft font-mono">
            ✦ {TEMA_LABEL[pagina.tema] ?? pagina.tema}
          </p>
          <h1 className="mt-4 text-5xl sm:text-7xl font-semibold">
            {pagina.nome_casal}
          </h1>
          {pagina.mensagem && (
            <p className="mt-6 text-lg italic text-[color:var(--parchment)] max-w-md mx-auto">
              &ldquo;{pagina.mensagem}&rdquo;
            </p>
          )}

          {pagina.data_especial && (
            <div className="mt-12">
              <LiveCounter dataEspecial={pagina.data_especial} />
              {pagina.cidade && (
                <p className="mt-4 text-xs text-[color:var(--muted)] font-mono">
                  desde {pagina.cidade}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* GALERIA */}
      {pagina.fotos.length > 0 && (
        <section className="relative z-10 px-6 py-20">
          <div className={`max-w-3xl mx-auto rounded-3xl p-8 sm:p-12 ${estilo.card}`}>
            <p className="text-xs uppercase tracking-widest text-gold-soft font-mono text-center mb-8">
              ✦ nossos momentos
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {pagina.fotos.map((url, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={url}
                  alt={`Foto ${i + 1} de ${pagina.nome_casal}`}
                  className={`w-full aspect-square object-cover ${estilo.foto}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LINHA DO TEMPO */}
      {marcos.length > 0 && (
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-gold-soft font-mono text-center mb-10">
              ✦ nossa linha do tempo
            </p>
            <div className="space-y-8 border-l border-[color:var(--line)] pl-6">
              {marcos.map((m, i) => (
                <div key={i}>
                  {m.data && (
                    <p className="text-xs font-mono text-gold-soft">{m.data}</p>
                  )}
                  {m.titulo && (
                    <h3 className="mt-1 text-xl font-semibold">{m.titulo}</h3>
                  )}
                  {m.descricao && (
                    <p className="mt-1 text-sm text-[color:var(--muted)]">
                      {m.descricao}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROMESSAS */}
      {promessas.length > 0 && (
        <section className="relative z-10 px-6 py-20">
          <div className={`max-w-xl mx-auto text-center rounded-3xl p-10 sm:p-14 ${estilo.card}`}>
            <p className="text-xs uppercase tracking-widest text-gold-soft font-mono mb-8">
              ✦ minhas promessas
            </p>
            <ul className="space-y-4">
              {promessas.map((p, i) => (
                <li key={i} className="text-lg italic text-[color:var(--parchment)]">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CARTA + MÚSICA */}
      <section className="relative z-10 px-6 py-20 pb-28 text-center flex flex-col items-center gap-4">
        {pagina.carta && <LoveLetter carta={pagina.carta} />}
        {pagina.musica_url && <MusicPlayer url={pagina.musica_url} />}
      </section>
    </main>
  );
}
