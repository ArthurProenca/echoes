"use client";

import { usePlayer } from "@/app/context/player_context";
import { useSelectedSong } from "@/app/context/selected_song_context";
import { useTheme } from "@/app/context/theme_context";
import Image from "next/image";
import { useEffect, useState } from "react";

function Echoes() {
  const { setUrl } = usePlayer();
  const { currentSongGifUrl, currentSongUrl } = useSelectedSong();
  const { getRandomTheme } = useTheme();
  const [theme, setTheme] = useState<Theme>();

  useEffect(() => {
    setUrl(currentSongUrl);
  }, [currentSongUrl, setUrl]);

  useEffect(() => {
    const selectedTheme = getRandomTheme();
    setTheme(selectedTheme);
  }, [getRandomTheme]);

  if (!currentSongGifUrl || !currentSongUrl) {
    setUrl("stop");

    return (
      <main className="flex items-center justify-center h-screen bg-black">
        <p className="text-white">Você não selecionou</p>
      </main>
    );
  }

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {theme && (
        <video
          src={theme.publicUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
      )}

      <div className="relative z-10 flex items-center justify-center h-full">
        <Image
          src={currentSongGifUrl}
          alt=""
          width={720}
          height={720}
          unoptimized
        />
      </div>
    </main>
  );
}

export default Echoes;
