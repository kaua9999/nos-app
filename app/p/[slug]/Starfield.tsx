"use client";

import { useEffect, useRef } from "react";

export default function Starfield({ tint = "warm" }: { tint?: "warm" | "neon" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let pontos: { x: number; y: number; r: number; tw: number; v: number }[] = [];

    function tamanho() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
    }

    function gerar() {
      const qtd = Math.floor((canvas!.width * canvas!.height) / 8500);
      pontos = Array.from({ length: qtd }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        r: Math.random() * 1.4 + 0.3,
        tw: Math.random() * Math.PI * 2,
        v: Math.random() * 0.015 + 0.005,
      }));
    }

    function desenhar() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      const cor = tint === "neon" ? "232,160,210" : "247,236,221";
      pontos.forEach((p) => {
        p.tw += p.v;
        const alpha = 0.35 + Math.sin(p.tw) * 0.35;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${cor},${Math.max(0, alpha)})`;
        ctx!.fill();
      });
      raf = requestAnimationFrame(desenhar);
    }

    tamanho();
    gerar();
    desenhar();

    const aoRedimensionar = () => {
      tamanho();
      gerar();
    };
    window.addEventListener("resize", aoRedimensionar);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", aoRedimensionar);
    };
  }, [tint]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
