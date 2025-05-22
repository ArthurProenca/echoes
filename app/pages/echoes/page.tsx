"use client";

import BackscreenButton from "@/app/components/backscreen_button";
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

  // Estados para controle de loading
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [gifLoaded, setGifLoaded] = useState(false);

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

  const isLoading = !videoLoaded || !gifLoaded;

  return (
    <main className="relative h-screen w-screen overflow-hidden p-14 bg-black">
      {theme && (
        <video
          src={theme.publicUrl}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-500 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoadedData={() => setVideoLoaded(true)}
        />
      )}

      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20">
          <Image width={40} height={40} alt="" src="/main_page_icon.svg" className="animate-spin" />
          <p className="text-white text-lg">Carregando...</p>
        </div>
      )}

      <section className="flex w-full justify-end z-30">
        <BackscreenButton />
      </section>

      <div
        className={`relative z-10 flex flex-col items-center justify-center h-full transition-opacity duration-500 ${
          gifLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={currentSongGifUrl}
          alt=""
          width={720}
          height={720}
          unoptimized
          onLoadingComplete={() => setGifLoaded(true)}
        />
      </div>
    </main>
  );
}

export default Echoes;
