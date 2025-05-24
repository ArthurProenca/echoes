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
  onEnded: (callback: () => void) => void;  // função para registrar callback de fim de música
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [url, setUrlState] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Armazena callbacks para "ended"
  const endedCallbacks = useRef<(() => void)[]>([]);

  useEffect(() => {
    audioRef.current = new Audio();

    const audio = audioRef.current;

    const onCanPlayThrough = () => {
      setIsLoaded(true);
    };

    const onEnded = () => {
      // Quando áudio terminar, chama todos os callbacks registrados
      endedCallbacks.current.forEach((cb) => cb());
    };

    audio.addEventListener("canplaythrough", onCanPlayThrough);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.src = "";
      audio.removeEventListener("canplaythrough", onCanPlayThrough);
      audio.removeEventListener("ended", onEnded);
      endedCallbacks.current = [];
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

  // Função para registrar callback do evento ended
  const onEnded = (callback: () => void) => {
    endedCallbacks.current.push(callback);
    // Opcional: retornar função para remover o callback depois
    return () => {
      endedCallbacks.current = endedCallbacks.current.filter((cb) => cb !== callback);
    };
  };

  return (
    <PlayerContext.Provider value={{ setUrl, isLoaded, audioRef, url, onEnded }}>
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
