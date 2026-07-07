"use client";

import { useEffect, useState } from "react";

export default function LiveCounter({ dataEspecial }: { dataEspecial: string }) {
  const [agora, setAgora] = useState<number | null>(null);

  useEffect(() => {
    setAgora(Date.now());
    const t = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (agora === null) return null; // evita piscar número errado no primeiro render

  const inicio = new Date(dataEspecial + "T00:00:00").getTime();
  const diffMs = Math.max(0, agora - inicio);

  const segTotal = Math.floor(diffMs / 1000);
  const dias = Math.floor(segTotal / 86400);
  const horas = Math.floor((segTotal % 86400) / 3600);
  const minutos = Math.floor((segTotal % 3600) / 60);
  const segundos = segTotal % 60;

  const semanas = Math.floor(dias / 7);
  const luasCheias = Math.floor(dias / 29.5);
  const batimentos = Math.floor(diffMs / 1000) * 1.2; // ~72bpm ≈ 1.2 por segundo

  return (
    <div>
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {[
          { valor: dias, label: "dias" },
          { valor: horas, label: "horas" },
          { valor: minutos, label: "min" },
          { valor: segundos, label: "seg" },
        ].map((item) => (
          <div key={item.label}>
            <p className="font-mono text-2xl sm:text-3xl text-gold-soft tabular-nums">
              {String(item.valor).padStart(2, "0")}
            </p>
            <p className="text-[11px] uppercase tracking-widest text-[color:var(--muted)] mt-1">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-[color:var(--muted)] font-mono">
        <span>{semanas.toLocaleString("pt-BR")} fins de semana</span>
        <span>·</span>
        <span>{luasCheias.toLocaleString("pt-BR")} luas cheias</span>
        <span>·</span>
        <span>{Math.floor(batimentos).toLocaleString("pt-BR")} batimentos</span>
      </div>
    </div>
  );
}
