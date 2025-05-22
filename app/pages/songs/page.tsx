"use client";

import SongsClient from "@/app/client/lambda/songs/songs_client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import SongCover from "../../components/song_cover";
import SongTitle from "../../components/song_title";
import { usePlayer } from "@/app/context/player_context";
import { useSongs } from "@/app/context/songs_context";

async function getAllSongsInfo(): Promise<MusicLibrary> {
  const client = new SongsClient();
  return client.getAllSongs();
}

export default function SongsScreen() {
  const [songInfos, setSongInfos] = useState<MusicLibrary>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { currentIndex, setCurrentIndex } = useSongs();
  const { setUrl } = usePlayer();

  async function loadSongs() {
    const data = await getAllSongsInfo();
    setSongInfos(data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadSongs();
  }, []);

  const allSongs = useMemo(() => {
    return (
      songInfos?.artists.flatMap((artist) =>
        artist.albums.map((song) => ({
          ...song,
          artistName: artist.name,
        }))
      ) ?? []
    );
  }, [songInfos]);

  const visibleSongs = useMemo(
    () => [
      allSongs[(currentIndex - 1 + allSongs.length) % allSongs.length],
      allSongs[currentIndex],
      allSongs[(currentIndex + 1) % allSongs.length],
    ],
    [currentIndex, allSongs]
  );

  useEffect(() => {
    if (visibleSongs[1]?.tracks?.[0]?.publicUrl) {
      setUrl(visibleSongs[1].tracks[0].publicUrl);
    }
  }, [visibleSongs, setUrl]);

  function handleClick(direction: string) {
    if (direction === "left") {
      setCurrentIndex((prev) => (prev - 1 + allSongs.length) % allSongs.length);
    } else if (direction === "right") {
      setCurrentIndex((prev) => (prev + 1) % allSongs.length);
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xl text-purple-600">Carregando...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start relative">
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
                key={song.name + currentIndex}
                onClick={() => handleClick(position)}
              >
                <SongCover
                  id={idx}
                  isCenter={isCenter}
                  name={song.name}
                  artist={song.artistName}
                  publicUrl={song.cover.publicUrl}
                  tracks={song.tracks}
                  gif={song?.gif?.publicUrl}
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
          />
        </section>

        <section className="flex flex-row justify-center-safe items-center gap-24 mt-6">
          {visibleSongs.map((song, idx) => {
            const isCenter = idx === 1;
            return (
              <SongTitle
                key={song.name + currentIndex}
                id={idx}
                artist={song.artistName}
                isCenter={isCenter}
                title={song.name}
              />
            );
          })}
        </section>
      </article>
    </main>
  );
}
