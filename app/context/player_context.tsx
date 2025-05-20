"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";

type PlayerContextType = {
  setUrl: (url: string) => void;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  url: string;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [url, setUrlState] = useState<string>("");

  useEffect(() => {
    audioRef.current = new Audio();
  }, []);

  const setUrl = (newUrl: string) => {
    if (!audioRef.current || !newUrl) return;

    audioRef.current.src = newUrl;
    audioRef.current.load();

    audioRef.current
      .play()
      .catch((err) => console.warn("Erro ao tentar tocar:", err));

    setUrlState(newUrl);
  };

  return (
    <PlayerContext.Provider value={{ setUrl, audioRef, url }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer deve ser usado dentro do PlayerProvider");
  }
  return context;
};
