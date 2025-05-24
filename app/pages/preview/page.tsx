"use client";

import BackscreenButton from "@/app/components/backscreen_button";
import Loading from "@/app/components/loading";
import SingButton from "@/app/components/sing_button";
import { useDevMode } from "@/app/context/dev_mode_context";
import { usePlayer } from "@/app/context/player_context";
import { useSongs } from "@/app/context/songs_context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function PreviewSongPage() {
  const { selectedSong } = useSongs();
  const { playPreloadedUrl, preloadUrl, stop } = usePlayer();
  const router = useRouter();
  const [lyric, setLyrics] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isDevMode } = useDevMode();

  useEffect(() => {
    if (!selectedSong?.lyricsUrl) return;
    fetch(selectedSong.lyricsUrl)
      .then((res) => res.text())
      .then((text) => {
        setLyrics(text.replace(/([a-z])([A-Z])/g, "$1\n$2"));
        preloadUrl(selectedSong.demoUrl).then((res) => {
          if (res) {
            setIsLoading(false);
            playPreloadedUrl();
          }
        });
      })
      .catch((err) => console.error("Failed to fetch lyrics:", err));
  }, [
    selectedSong?.lyricsUrl,
    playPreloadedUrl,
    preloadUrl,
    selectedSong?.demoUrl,
  ]);

  if (!selectedSong) {
    return;
  }
  const handleClick = () => {
    stop();
    setIsLoading(true);
    preloadUrl(
      isDevMode ? selectedSong.vocalUrl : selectedSong.instrumentalUrl
    ).then((res) => {
      if (res) {
        router.push(`/pages/echoes`);
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="max-h-screen flex flex-row items-center justify-between relative overflow-hidden p-14 bg-custom-radial">
      <aside
        className="w-[52%] pb-10 -ml-60 animate-spin "
        style={{ animationDuration: "7s" }}
      >
        <Image
          alt={selectedSong.albumName}
          src={selectedSong.coverUrl}
          width={20}
          height={20}
          className="w-full h-full object-cover rounded-full"
          unoptimized
        />
      </aside>
      <aside className="w-[50%] max-h-screen flex flex-col gap-6">
        <section className="flex self-end-safe justify-end-safe">
          <BackscreenButton />
        </section>
        <section className="w-full flex flex-col self-end-safe justify-end-safe text-end">
          <span className="w-full self-center text-8xl uppercase font-jersey text-end">
            {selectedSong?.albumName}
          </span>
          <span className="w-full self-center text-5xl uppercase font-jersey text-end">
            {selectedSong?.artistName}
          </span>
        </section>
        <section className="w-full">
          <p className="whitespace-pre-line font-instrument-sans text-2xl text-end">
            {lyric}
          </p>
        </section>
        <section
          onClick={handleClick}
          className=" w-full flex self-end-safe justify-end-safe"
        >
          <SingButton title="Cantar" />
        </section>
      </aside>
    </main>
  );
}

export default function PreviewSong() {
  return (
    <Suspense>
      <PreviewSongPage />
    </Suspense>
  );
}
