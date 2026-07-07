"use client";

import { useRef, useState } from "react";

function extrairYouTubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return m ? m[1] : null;
}

function extrairSpotifyEmbed(url: string): string | null {
  const m = url.match(/open\.spotify\.com\/(track|album|playlist)\/([a-zA-Z0-9]+)/);
  if (!m) return null;
  return `https://open.spotify.com/embed/${m[1]}/${m[2]}?utm_source=generator`;
}

export default function MusicPlayer({ url }: { url: string }) {
  const [tocando, setTocando] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const ytId = extrairYouTubeId(url);
  const spotifyEmbed = !ytId ? extrairSpotifyEmbed(url) : null;
  const arquivoDireto =
    !ytId && !spotifyEmbed && /\.(mp3|wav|ogg|m4a)(\?.*)?$/i.test(url);

  // Spotify já tem player próprio com botão de play -- só embutimos ele.
  if (spotifyEmbed) {
    return (
      <div className="mt-10 w-full max-w-sm mx-auto">
        <iframe
          src={spotifyEmbed}
          width="100%"
          height="152"
          style={{ borderRadius: 12, border: "none" }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    );
  }

  function tocar() {
    setTocando(true);
    if (arquivoDireto && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }

  return (
    <div className="mt-10 flex flex-col items-center gap-3">
      {!tocando ? (
        <button
          onClick={tocar}
          className="inline-flex items-center gap-2 rounded-full bg-gold text-night font-semibold px-7 py-3.5 hover:bg-gold-soft transition-colors"
        >
          ♪ Tocar nossa música
        </button>
      ) : (
        <p className="text-xs text-[color:var(--muted)] font-mono">
          ♪ tocando agora...
        </p>
      )}

      {ytId && tocando && (
        <iframe
          className="w-0 h-0 opacity-0 pointer-events-none absolute"
          src={`https://www.youtube.com/embed/${ytId}?autoplay=1&controls=0`}
          allow="autoplay"
          aria-hidden="true"
        />
      )}

      {arquivoDireto && <audio ref={audioRef} src={url} loop />}
    </div>
  );
}
