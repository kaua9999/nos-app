"use client";

import { useEffect, useRef } from "react";

export default function StarMap({
  cidade,
  data,
}: {
  cidade: string | null;
  data: string | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const tamanho = canvas.offsetWidth;
    canvas.width = tamanho;
    canvas.height = tamanho;
    const cx = tamanho / 2;
    const cy = tamanho / 2;
    const raio = tamanho / 2 - 14;

    // Gera pontos de estrela espalhados dentro do círculo, com seed fixa
    // baseada na cidade/data pra sempre desenhar a "mesma constelação"
    // pra essa página (não é astronomia real, é uma composição estilizada).
    const seedBase = (cidade || "") + (data || "");
    let seed = 0;
    for (let i = 0; i < seedBase.length; i++) seed += seedBase.charCodeAt(i);
    function rand() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }

    const pontos: { x: number; y: number; r: number }[] = [];
    const n = 60;
    for (let i = 0; i < n; i++) {
      const ang = rand() * Math.PI * 2;
      const dist = Math.sqrt(rand()) * raio * 0.92;
      pontos.push({
        x: cx + Math.cos(ang) * dist,
        y: cy + Math.sin(ang) * dist,
        r: rand() * 1.6 + 0.5,
      });
    }

    ctx.clearRect(0, 0, tamanho, tamanho);

    // círculo externo
    ctx.beginPath();
    ctx.arc(cx, cy, raio, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(232,198,146,0.35)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // marcas de graduação ao redor, tipo bússola
    for (let i = 0; i < 24; i++) {
      const ang = (i / 24) * Math.PI * 2;
      const r1 = raio + 4;
      const r2 = raio + (i % 6 === 0 ? 12 : 7);
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * r1, cy + Math.sin(ang) * r1);
      ctx.lineTo(cx + Math.cos(ang) * r2, cy + Math.sin(ang) * r2);
      ctx.strokeStyle = "rgba(232,198,146,0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // linhas de constelação conectando pontos próximos (estilizado)
    ctx.strokeStyle = "rgba(140,170,255,0.35)";
    ctx.lineWidth = 1;
    for (let i = 0; i < pontos.length - 1; i += 3) {
      const a = pontos[i];
      const b = pontos[i + 1];
      if (!b) continue;
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < tamanho * 0.28) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    // estrelas
    pontos.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "#fff8ec";
      ctx.fill();
    });

    // "lua" central discreta
    ctx.beginPath();
    ctx.arc(cx, cy, tamanho * 0.02, 0, Math.PI * 2);
    ctx.fillStyle = "#f7ecdd";
    ctx.shadowColor = "#f7ecdd";
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;
  }, [cidade, data]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-xs aspect-square">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="mt-6 text-center">
        {cidade && (
          <p className="text-lg font-semibold text-star">{cidade}</p>
        )}
        {data && (
          <p className="mt-1 text-sm text-[color:var(--muted)] font-mono">
            {new Date(data + "T00:00:00").toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
      </div>
    </div>
  );
}
