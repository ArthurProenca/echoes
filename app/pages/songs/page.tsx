/* eslint-disable @next/next/no-img-element */

"use client";

import SongsClient from "@/app/client/lambda/songs/songs_client";
import { useEffect, useState } from "react";

async function getAllSongsInfo(): Promise<MusicLibrary> {
  const client = new SongsClient();
  return client.getAllSongs();
}

export default function SongsScreen() {
  const [songInfos, setSongInfos] = useState<MusicLibrary>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [currentAudio, setCurrentAudio] = useState<Track[]>();
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  
  async function loadSongs() {
    const data = await getAllSongsInfo();
    setSongInfos(data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadSongs();
  }, []);

  useEffect(() => {
    if (currentAudio) {
      const filteredAudio = currentAudio.find((track) => track.type === "corte");

      if (filteredAudio) {
        // Pausa o áudio atual (se houver) antes de tocar o novo áudio
        if (audio) {
          audio.pause();
          audio.src = "";
        }

        const backgroundAudio = new Audio(filteredAudio.publicUrl);
        backgroundAudio.loop = true;
        backgroundAudio.volume = 0.2;
        setAudio(backgroundAudio);
        backgroundAudio.play(); // Toca o áudio assim que é configurado
      }
    }

    return () => {
      // Pausar e limpar o áudio quando o componente for desmontado ou mudar a faixa
      if (audio) {
        audio.pause();
        audio.src = "";
      }
    };
  }, [currentAudio, audio]);

  const handleAudioPlay = (track: Track[]) => {
    setCurrentAudio(track); // Atualiza o estado com a faixa central
  };

  if (!songInfos) return null;

  const allSongs = songInfos.artists.flatMap((artist) =>
    artist.albums.map((song) => ({
      ...song,
      artistName: artist.name,
    }))
  );

  const visibleSongs = allSongs.slice(startIndex, startIndex + 3);

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
          className="bg-purple-600 text-white px-6 py-3 rounded-xl text-xl"
        >
          Começar
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
            const isLeft = idx === 0;
            const isCenter = idx === 1;
            const isRight = idx === 2;

            let handleClick = () => {};

            if (isCenter && !currentAudio) {
              handleAudioPlay(song.tracks);
            }
            if (isLeft && startIndex > 0) {
              handleClick = () => {
                setStartIndex((prev) => Math.max(0, prev - 1));
                setCurrentAudio(undefined);
              };
            } else if (isRight && startIndex < allSongs.length - 3) {
              handleClick = () => {
                setStartIndex((prev) =>
                  Math.min(prev + 1, allSongs.length - 3)
                );
                setCurrentAudio(undefined);
              };
            }

            return (
              <button
                key={idx}
                onClick={handleClick}
                className={`rounded-full max-w-[500px] max-h-[500px] transition-all duration-300 cursor-pointer focus:outline-none ${
                  isCenter
                    ? "z-2 -mr-12 -ml-12"
                    : "opacity-40 blur-[2px] z-1 w-[270px] h-[270px]"
                }`}
                style={{
                  padding: 0,
                  border: "none",
                  background: "transparent",
                  cursor: isCenter ? "default" : "pointer",
                }}
              >
                <img
                  alt={song.cover.name}
                  src={song.cover.publicUrl}
                  className="w-full h-full object-cover rounded-full"
                />
              </button>
            );
          })}
        </section>

        <section className="w-full h-40">
          <img alt="" className="w-full h-40" src="./wave_effect.gif" />
        </section>

        <section className="flex flex-row justify-center items-center gap-16">
          {visibleSongs.map((song, idx) => {
            const isCenter = idx === 1;
            return (
              <div className="flex flex-col" key={idx}>
                <h3
                  className="text-5xl font-jersey uppercase"
                  style={{ color: isCenter ? "#9D5FFE" : "#FFFFFF" }}
                >
                  {song.name}
                </h3>
                <span className="self-center text-2xl uppercase">
                  {isCenter ? song.artistName : ""}
                </span>
              </div>
            );
          })}
        </section>
      </article>
    </main>
  );
}
