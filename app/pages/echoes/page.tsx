"use client";

import { usePlayer } from "@/app/context/player_context";
import { useSelectedSong } from "@/app/context/selected_song_context";
import Image from "next/image";
import { useEffect } from "react";

function Echoes() {
  const { setUrl } = usePlayer();
  const { currentSongGifUrl, currentSongUrl } = useSelectedSong();

  useEffect(() => {
    setUrl(currentSongUrl);
  }, [currentSongUrl, setUrl]);
  
  if (!currentSongGifUrl || !currentSongUrl) {
    setUrl("stop");

    return (
      <main className="flex items-center justify-center h-screen">
        <p>Você não selecionou</p>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center h-screen">
      <Image src={currentSongGifUrl} alt="" width={720} height={366} />
    </main>
  );
}

export default Echoes;
