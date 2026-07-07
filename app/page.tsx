import Link from "next/link";
import Starfield from "./p/[slug]/Starfield";

export default function Home() {
  return (
    <main className="relative flex-1 overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,#2e2153,#1b1330_70%)]">
      <Starfield tint="warm" />

      <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center">
        <span className="text-xs uppercase tracking-widest text-gold-soft font-mono">
          ✦ presente digital personalizado
        </span>
        <h1 className="mt-5 max-w-2xl text-4xl sm:text-6xl font-semibold leading-tight">
          A forma mais bonita de dizer{" "}
          <em className="italic text-gold-soft">eu te amo</em>
        </h1>
        <p className="mt-5 text-lg text-[color:var(--muted)] max-w-lg">
          Transforme a história de vocês numa página só de vocês dois: fotos,
          contador de dias juntos, linha do tempo, carta e o céu da noite em
          que tudo começou.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/criar"
            className="inline-flex items-center gap-2 rounded-full bg-gold text-night font-semibold px-8 py-4 hover:bg-gold-soft transition-colors"
          >
            🎁 Criar meu presente
          </Link>
          <Link
            href="/exemplo"
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] px-8 py-4 hover:border-gold-soft hover:text-gold-soft transition-colors"
          >
            Ver exemplo →
          </Link>
        </div>

        {/* Prova social */}
        <div className="mt-14 flex flex-col items-center gap-3">
          <p className="text-gold-soft tracking-widest text-sm">★★★★★</p>
          <p className="text-sm text-[color:var(--muted)]">
            feito pra emocionar quem você ama
          </p>
        </div>

        {/* Recursos rápidos */}
        <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[color:var(--muted)] font-mono uppercase tracking-wide">
          <span>✦ fica pronto na hora</span>
          <span>✦ link personalizado</span>
          <span>✦ qr code incluso</span>
          <span>✦ céu estrelado do dia especial</span>
        </div>
      </div>
    </main>
  );
}

