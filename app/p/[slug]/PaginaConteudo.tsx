import { TEMAS, parseLinhaDoTempo, parsePromessas, type Pagina } from "@/lib/supabase";
import Starfield from "./Starfield";
import FloatingHearts from "./FloatingHearts";
import LiveCounter from "./LiveCounter";
import StarMap from "./StarMap";
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

// Título grande de seção, no estilo caloroso (laranja->dourado) do site de
// referência, com o "eyebrow" em cima.
function TituloSecao({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="text-center mb-10">
      <p className="text-xs uppercase tracking-widest text-gold-soft font-mono">
        ✦ {eyebrow}
      </p>
      <h2
        className="mt-3 text-3xl sm:text-4xl font-semibold bg-clip-text text-transparent"
        style={{
          backgroundImage: "linear-gradient(90deg,#e8664f,#e8c692)",
        }}
      >
        {children}
      </h2>
    </div>
  );
}

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
      <div className="fixed inset-0 z-0">
        <FloatingHearts />
      </div>

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

      {/* MAPA DAS ESTRELAS — bússola circular estilizada */}
      {pagina.data_especial && (
        <section className="relative z-10 px-6 py-20">
          <TituloSecao eyebrow="o céu daquele dia">
            Como estavam as estrelas
          </TituloSecao>
          <StarMap cidade={pagina.cidade} data={pagina.data_especial} />
        </section>
      )}

      {/* GALERIA */}
      {pagina.fotos.length > 0 && (
        <section className="relative z-10 px-6 py-20">
          <TituloSecao eyebrow="memórias eternizadas">
            Nossos Momentos
          </TituloSecao>
          <div className={`max-w-3xl mx-auto rounded-3xl p-8 sm:p-12 ${estilo.card}`}>
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
          <TituloSecao eyebrow="momentos que construíram nossa história">
            Nossa Linha do Tempo
          </TituloSecao>
          <div className="max-w-xl mx-auto space-y-8 border-l border-[color:var(--line)] pl-6">
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
        </section>
      )}

      {/* PROMESSAS */}
      {promessas.length > 0 && (
        <section className="relative z-10 px-6 py-20">
          <TituloSecao eyebrow="compromissos eternos, de mim para você">
            Minhas Promessas
          </TituloSecao>
          <div className="max-w-xl mx-auto space-y-4">
            {promessas.map((p, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 rounded-2xl p-5 text-left ${estilo.card}`}
              >
                <span className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#e8664f]/25 to-gold/20 border border-gold/30 flex items-center justify-center text-xl text-gold-soft">
                  {p.icone}
                </span>
                <div>
                  <h3 className="font-semibold text-star">{p.titulo}</h3>
                  {p.descricao && (
                    <p className="mt-1 text-sm text-[color:var(--muted)]">
                      {p.descricao}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CARTA + MÚSICA */}
      <section className="relative z-10 px-6 py-16 pb-16 text-center flex flex-col items-center gap-4">
        {pagina.carta && <LoveLetter carta={pagina.carta} />}
        {pagina.musica_url && <MusicPlayer url={pagina.musica_url} />}
      </section>

      <footer className="relative z-10 pb-12 text-center text-xs text-[color:var(--muted)] font-mono">
        feito com amor ❤ para {pagina.nome_casal}
      </footer>
    </main>
  );
}
