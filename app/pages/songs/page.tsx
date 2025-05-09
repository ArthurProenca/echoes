"use client";

import SongsClient from "@/app/client/lambda/songs/songs_client";
import Image from "next/image";
import { useEffect, useState } from "react";
import SongCover from "../../components/song_cover";
import SongTitle from "../../components/song_title";
import SongPlayer from "@/app/components/song_player";

async function getAllSongsInfo(): Promise<MusicLibrary> {
  const client = new SongsClient();
  return client.getAllSongs();
}

export default function SongsScreen() {
  const [songInfos, setSongInfos] = useState<MusicLibrary>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleClick(direction: string) {
    function next() {
      setCurrentIndex((prev) => (prev + 1) % allSongs.length);
    }

    function prev() {
      setCurrentIndex((prev) => (prev - 1 + allSongs.length) % allSongs.length);
    }

    switch (direction) {
      case "left":
        prev();
        break;
      case "right":
        next();
        break;
    }
  }

  async function loadSongs() {
    const data = await getAllSongsInfo();
    setSongInfos(data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadSongs();
  }, []);

  if (!songInfos) return null;

  const allSongs = songInfos.artists.flatMap((artist) =>
    artist.albums.map((song) => ({
      ...song,
      artistName: artist.name,
    }))
  );

  const visibleSongs = [
    allSongs[(currentIndex - 1 + allSongs.length) % allSongs.length], // left
    allSongs[currentIndex], // center
    allSongs[(currentIndex + 1) % allSongs.length], // right
  ];
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
  if (!userInteracted) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <button
          onClick={() => setUserInteracted(true)}
        >
                OII

        </button>
      </main>
    );
  }
  return (
    <main className="min-h-screen flex flex-col items-center justify-start relative">
      <section>
        <h1 className="pt-12 pb-8 text-6xl font-jersey">ECHOES</h1>
      </section>

      <article className="w-full flex-grow items-center">
        <section className="flex flex-row justify-center items-center">
          {visibleSongs.map((song, idx) => {
            let position = "";

            if (idx == 0) {
              position = "left";
            } else if (idx == 1) {
              position = "center";
            } else {
              position = "right";
            }
            return (
              <button
                className="relative"
                key={idx}
                onClick={() => handleClick(position)}
              >
                <SongCover
                  id={idx}
                  isCenter={idx == 1}
                  name={song.name}
                  artist={song.artistName}
                  publicUrl={song.cover.publicUrl}
                  tracks={song.tracks}
                />
              </button>
            );
          })}
        </section>

        <section className="w-full h-50">
          <Image
            width={1}
            height={1}
            alt=""
            className="w-full h-full"
            src="/wave_effect.gif"
            unoptimized
          />
        </section>

        <section className="flex flex-row justify-center items-center gap-65">
          {visibleSongs.map((song, idx) => {
            const isCenter = idx === 1;
            return (
              <SongTitle
                key={idx}
                id={idx}
                artist={song.artistName}
                isCenter={isCenter}
                title={song.name}
              />
            );
          })}
        </section>
      </article>
      <SongPlayer key={visibleSongs[1].tracks[0].publicUrl} url={visibleSongs[1].tracks[0].publicUrl} />

    </main>
  );
}
