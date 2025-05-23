"use client";

import { useSongs } from "@/app/context/songs_context";
import Image from "next/image";
import { useEffect, useState } from "react";
import SongCover from "../../components/song_cover";
import SongTitle from "../../components/song_title";
import { useTheme } from "@/app/context/theme_context";

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

  useEffect(() => {
    if (allSongs.length >= 3) {
      setVisibleSongs(allSongs.slice(currentIndex - 1, currentIndex + 2));
    }
  }, [allSongs, currentIndex]);

  useEffect(() => {
    const cachedSongs = sessionStorage.getItem("songs");
    const cachedThemes = sessionStorage.getItem("themes");
    if (allSongs.length == 0 && cachedSongs && cachedThemes) {
      setAllSongs(JSON.parse(cachedSongs));
      setAllThemes(JSON.parse(cachedThemes));
    }
  }, [allSongs]);

  useEffect(() => {
    if (visibleSongs.length === 3) {
      setSelectedSong(visibleSongs[1]);
    }
  }, [visibleSongs, setSelectedSong]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start relative bg-custom-radial">
      <section>
        <h1 className="pt-12 pb-8 text-6xl font-jersey">ECHOES</h1>
      </section>

      <article className="w-full flex-grow items-center">
        <section className="flex flex-row justify-center items-center gap-4 mb-4">
          {visibleSongs.map((song, idx) => {
            const isCenter = idx === 1;
            const position = isCenter ? "center" : idx === 0 ? "left" : "right";

            return (
              <button
                className={isCenter ? "song-center" : "song-side"}
                key={song.albumName}
                onClick={() => {
                  if (position === "left" && currentIndex > 1) {
                    setCurrentIndex(currentIndex - 1);
                  } else if (
                    position === "right" &&
                    currentIndex < allSongs.length - 2
                  ) {
                    setCurrentIndex(currentIndex + 1);
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
                key={song.albumName}
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
