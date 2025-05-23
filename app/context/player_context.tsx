"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type PlayerContextType = {
  setUrl: (url: string) => void;
  isLoaded: boolean;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  url: string;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [url, setUrlState] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio();

    const audio = audioRef.current;

    // Quando o áudio estiver carregado o suficiente para tocar sem interrupção
    const onCanPlayThrough = () => {
      setIsLoaded(true);
    };

    // Opcional: para resetar isLoaded quando mudar URL
    const onWaiting = () => {
      setIsLoaded(false);
    };

    audio.addEventListener("canplaythrough", onCanPlayThrough);
    audio.addEventListener("waiting", onWaiting);

    return () => {
      audio.pause();
      audio.src = "";
      audio.removeEventListener("canplaythrough", onCanPlayThrough);
      audio.removeEventListener("waiting", onWaiting);
    };
  }, []);

  const setUrl = (newUrl: string) => {
    if (!audioRef.current) return;

    if (newUrl === "stop") {
      audioRef.current.pause();
      setIsLoaded(false);
      setUrlState("");
      return;
    }

    if (url === newUrl) {
      // Mesma url, já tocando
      return;
    }

    setIsLoaded(false);
    setUrlState(newUrl);

    audioRef.current.src = newUrl;
    audioRef.current.load();

    audioRef.current.play().catch((err) => {
      console.warn("Erro ao tentar tocar:", err);
      setIsLoaded(false);
    });
  };

  return (
    <PlayerContext.Provider value={{ setUrl, isLoaded, audioRef, url }}>
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
