"use client";

export default function FloatingHearts({ count = 14 }: { count?: number }) {
  const hearts = Array.from({ length: count }, (_, i) => {
    const left = (i * 37) % 100;
    const delay = (i * 1.7) % 12;
    const duration = 10 + (i % 5) * 3;
    const size = 14 + (i % 4) * 8;
    const opacity = 0.12 + (i % 3) * 0.08;
    return { left, delay, duration, size, opacity, key: i };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.key}
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animation: `float-heart ${h.duration}s linear ${h.delay}s infinite`,
          }}
          className="absolute bottom-[-10%] text-[#e8664f]"
        >
          ❤
        </span>
      ))}
      <style>{`
        @keyframes float-heart {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-115vh) translateX(20px) rotate(15deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
