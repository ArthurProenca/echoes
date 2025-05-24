"use client";

import { useSongs } from "@/app/context/songs_context";
import Image from "next/image";
import { useEffect, useState } from "react";
import SongCover from "../../components/song_cover";
import SongTitle from "../../components/song_title";
import { useTheme } from "@/app/context/theme_context";
import Loading from "@/app/components/loading";
import { useDevMode } from "@/app/context/dev_mode_context";

export default function SongsScreen() {
  const {
    allSongs,
    setSelectedSong,
    currentIndex,
    setCurrentIndex,
    setAllSongs,
  } = useSongs();
  const { setAllThemes } = useTheme();
  const [visibleSongs, setVisibleSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setIsDevMode, isDevMode } = useDevMode();

  useEffect(() => {
    if (allSongs.length >= 3) {
      const total = allSongs.length;
      const left = (currentIndex - 1 + total) % total;
      const center = currentIndex % total;
      const right = (currentIndex + 1) % total;
      setIsLoading(false);
      setVisibleSongs([allSongs[left], allSongs[center], allSongs[right]]);
    }
  }, [allSongs, currentIndex]);

  useEffect(() => {
    const cachedSongs = sessionStorage.getItem("songs");
    const cachedThemes = sessionStorage.getItem("themes");
    if (allSongs.length == 0 && cachedSongs && cachedThemes) {
      setAllSongs(JSON.parse(cachedSongs));
      setAllThemes(JSON.parse(cachedThemes));
    }
  }, [allSongs, setAllSongs, setAllThemes]);

  useEffect(() => {
    if (visibleSongs.length === 3) {
      setSelectedSong(visibleSongs[1]);
    }
  }, [visibleSongs, setSelectedSong]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start relative bg-custom-radial">
      <section>
        <h1
          className="pt-12 pb-8 text-6xl font-jersey select-none cursor-pointer"
          style={{ color: isDevMode ? "#9D5FFE" : "" }}
          onDoubleClick={() => setIsDevMode((prev) => !prev)}
          title="Double-click to toggle dev mode"
        >
          ECHOES
        </h1>
      </section>

      <article className="w-full flex-grow items-center">
        <section className="flex flex-row justify-center items-center gap-4 mb-4">
          {visibleSongs.map((song, idx) => {
            const isCenter = idx === 1;
            const position = isCenter ? "center" : idx === 0 ? "left" : "right";

            return (
              <button
                className={isCenter ? "song-center" : "song-side"}
                key={song.albumName + idx}
                onClick={() => {
                  if (position === "left") {
                    setCurrentIndex(
                      (currentIndex - 1 + allSongs.length) % allSongs.length
                    );
                  } else if (position === "right") {
                    setCurrentIndex((currentIndex + 1) % allSongs.length);
                  }
                }}
              >
                <SongCover
                  id={idx}
                  isCenter={isCenter}
                  name={song.albumName}
                  artist={song.artistName}
                  publicUrl={song.coverUrl}
                />
              </button>
            );
          })}
        </section>

        <section className="w-full h-36">
          <Image
            width={1}
            height={1}
            alt=""
            className="w-full h-full"
            src="/wave_effect.gif"
            unoptimized
            priority
          />
        </section>

        <section className="flex flex-row justify-center-safe items-center gap-24 mt-6">
          {visibleSongs.map((song, idx) => {
            const isCenter = idx === 1;
            return (
              <SongTitle
                key={song.albumName + idx}
                id={idx}
                artist={song.artistName}
                isCenter={isCenter}
                title={song.albumName}
              />
            );
          })}
        </section>
      </article>
    </main>
  );
}
