"use client";

import BackscreenButton from "@/app/components/backscreen_button";
import Loading from "@/app/components/loading";
import { usePlayer } from "@/app/context/player_context";
import { useRecorder } from "@/app/context/recorder_context";
import { useSongs } from "@/app/context/songs_context";
import { useTheme } from "@/app/context/theme_context";
import Image from "next/image";
import { useEffect, useState } from "react";

function Echoes() {
  const { playPreloadedUrl, onEnded } = usePlayer();
  const { selectedSong } = useSongs();
  const { getRandomTheme } = useTheme();

  const [theme, setTheme] = useState<Theme>();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [gifLoaded, setGifLoaded] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const { startRecording, stopRecording } = useRecorder();

  useEffect(() => {
    setTheme(getRandomTheme());
  }, [getRandomTheme]);

  useEffect(() => {
    if (gifLoaded && videoLoaded) {
      setAllLoaded(true);
      playPreloadedUrl();
      startRecording(); // inicia gravação quando tudo carregar
    }
  }, [gifLoaded, videoLoaded, playPreloadedUrl, startRecording]);

  useEffect(() => {
    onEnded(() => {
      stopRecording(); // para gravação quando a música termina
    });
  }, [onEnded, stopRecording]);

  if (selectedSong && (!selectedSong.gifUrl || !selectedSong.vocalUrl)) {
    return (
      <main className="flex items-center justify-center h-screen bg-black">
        <p className="text-white">Você não selecionou</p>
      </main>
    );
  }

  if (!selectedSong) return null;

  return (
    <>
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

        {!allLoaded && <Loading />}

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
    </>
  );
}

export default Echoes;
