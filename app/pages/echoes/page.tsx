"use client";

import BackscreenButton from "@/app/components/backscreen_button";
import { usePlayer } from "@/app/context/player_context";
import { useSongs } from "@/app/context/songs_context";
import { useTheme } from "@/app/context/theme_context";
import Image from "next/image";
import { useEffect, useState } from "react";

function Echoes() {
  const { setUrl, isLoaded } = usePlayer();
  const { selectedSong } = useSongs();
  const { getRandomTheme } = useTheme();
  const [theme, setTheme] = useState<Theme>();

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [gifLoaded, setGifLoaded] = useState(false);

  useEffect(() => {
    console.log("videoLoaded", videoLoaded);
  }, [videoLoaded]);

  useEffect(() => {
    console.log("isLoaded (audio)", isLoaded);
  }, [isLoaded]);

  useEffect(() => {
    console.log("gifLoaded", gifLoaded);
  }, [gifLoaded]);

  useEffect(() => {
    const selectedTheme = getRandomTheme();
    setTheme(selectedTheme);
  }, [getRandomTheme]);

  useEffect(() => {
    if (videoLoaded && gifLoaded && isLoaded && selectedSong?.vocalUrl) {
      setUrl(selectedSong.vocalUrl);
    }
  }, [videoLoaded, gifLoaded, isLoaded, selectedSong, setUrl]);

  useEffect(() => {
    if (selectedSong && videoLoaded && gifLoaded && selectedSong.vocalUrl) {
      setUrl(selectedSong.vocalUrl);
    }
  }, [selectedSong, setUrl, videoLoaded, gifLoaded]);

  if (selectedSong && (!selectedSong.gifUrl || !selectedSong.vocalUrl)) {
    return (
      <main className="flex items-center justify-center h-screen bg-black">
        <p className="text-white">Você não selecionou</p>
      </main>
    );
  }

  if (!selectedSong) {
    return null;
  }

  const isLoading = !videoLoaded || !gifLoaded || !isLoaded;

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
          <Image
            width={40}
            height={40}
            alt=""
            src="/main_page_icon.svg"
            className="animate-spin"
          />
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
          src={selectedSong.gifUrl}
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
