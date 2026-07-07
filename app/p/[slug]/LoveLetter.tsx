"use client";

import { useState } from "react";

export default function LoveLetter({ carta }: { carta: string }) {
  const [aberta, setAberta] = useState(false);

  if (!aberta) {
    return (
      <button
        onClick={() => setAberta(true)}
        className="w-full max-w-md rounded-3xl border border-[color:var(--line)] bg-night-2/60 backdrop-blur-sm p-10 flex flex-col items-center gap-3 hover:border-gold-soft/50 transition-colors"
      >
        <span className="relative text-4xl">
          💌
        </span>
        <h3 className="text-xl font-semibold text-star">Uma carta para você</h3>
        <p className="text-sm text-[color:var(--muted)]">Toque para abrir</p>
      </button>
    );
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-[color:var(--line)] bg-night-2/60 backdrop-blur-sm p-8 sm:p-10 text-left">
      <div className="flex justify-center text-3xl mb-4">❤️</div>
      <p className="whitespace-pre-wrap leading-relaxed text-[color:var(--parchment)]">
        {carta}
      </p>
      <div className="mt-6 flex justify-center gap-2 text-lg opacity-70">
        <span>❤️</span>
        <span>❤️</span>
        <span>❤️</span>
        <span>❤️</span>
        <span>❤️</span>
      </div>
      <button
        onClick={() => setAberta(false)}
        className="mt-6 mx-auto block text-xs uppercase tracking-widest text-[color:var(--muted)] hover:text-gold-soft"
      >
        fechar carta
      </button>
    </div>
  );
}
