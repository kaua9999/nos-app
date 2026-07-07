"use client";

import { useState } from "react";

export default function LoveLetter({ carta }: { carta: string }) {
  const [aberta, setAberta] = useState(false);

  if (!aberta) {
    return (
      <button
        onClick={() => setAberta(true)}
        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] px-7 py-3.5 text-sm hover:border-gold-soft hover:text-gold-soft transition-colors"
      >
        💌 Abrir carta
      </button>
    );
  }

  return (
    <div className="mt-2 rounded-2xl border border-[color:var(--line)] bg-night-2/60 p-8 text-left animate-[fadeIn_0.4s_ease]">
      <p className="whitespace-pre-wrap leading-relaxed text-[color:var(--parchment)] italic">
        {carta}
      </p>
      <button
        onClick={() => setAberta(false)}
        className="mt-6 text-xs uppercase tracking-widest text-[color:var(--muted)] hover:text-gold-soft"
      >
        fechar carta
      </button>
    </div>
  );
}
