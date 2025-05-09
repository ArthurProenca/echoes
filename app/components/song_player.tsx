"use client";

import { useEffect, useRef } from "react";

interface SongPlayerProps {
  url: string;
}

export default function SongPlayer({ url }: SongPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handler = () => {
      const audio = audioRef.current;
      if (audio) {
        audio.play().catch((err) => {
          console.error("Falha ao tocar áudio:", err);
        });
      }
    };

    window.addEventListener("click", handler, { once: true });

    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  return (
    <audio ref={audioRef} src={url} preload="auto" hidden />
  );
}
