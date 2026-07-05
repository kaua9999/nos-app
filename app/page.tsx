import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl text-center">
        <span className="text-xs uppercase tracking-widest text-gold-soft font-mono">
          ✦ presente digital personalizado
        </span>
        <h1 className="mt-5 text-4xl sm:text-5xl font-semibold leading-tight">
          Todo casal tem uma <em className="italic text-gold-soft">constelação</em> só dele.
        </h1>
        <p className="mt-5 text-lg text-[color:var(--muted)] max-w-lg mx-auto">
          Monte a página de vocês dois em minutos: fotos, a história, a
          trilha sonora e uma prévia de como vai ficar antes de qualquer
          coisa.
        </p>
        <Link
          href="/criar"
          className="inline-flex items-center gap-2 mt-9 rounded-full bg-gold text-night font-semibold px-7 py-4 hover:bg-gold-soft transition-colors"
        >
          Criar minha página →
        </Link>
      </div>
    </main>
  );
}
