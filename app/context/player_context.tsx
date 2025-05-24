"use client";
import React, { createContext, useContext, useEffect, useRef } from "react";

type PlayerContextType = {
  preloadUrl: (url: string) => Promise<boolean>;
  playPreloadedUrl: () => void;
  stop: () => void;
  onEnded: (callback: () => void) => () => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const endedCallbacks = useRef<(() => void)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    audioRef.current = new Audio();

    const audio = audioRef.current;

    const handleEnded = () => {
      endedCallbacks.current.forEach((cb) => cb());
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.src = "";
      audio.removeEventListener("ended", handleEnded);
      endedCallbacks.current = [];
    };
  }, []);

  const preloadUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!audioRef.current) return resolve(false);

      const audio = audioRef.current;
      audio.src = url;
      audio.preload = "auto";

      const handleCanPlayThrough = () => {
        audio.removeEventListener("canplaythrough", handleCanPlayThrough);
        resolve(true);
      };

      const timeout = setTimeout(() => {
        audio.removeEventListener("canplaythrough", handleCanPlayThrough);
        resolve(false);
      }, 5000);

      audio.addEventListener("canplaythrough", () => {
        clearTimeout(timeout);
        handleCanPlayThrough();
      });
    });
  };

  const playPreloadedUrl = () => {
    const audio = audioRef.current;
    if (audio?.src) {
      audio.play().catch((err) => {
        console.warn("Erro ao tocar áudio:", err);
      });
    }
  };

  const stop = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const onEnded = (callback: () => void) => {
    endedCallbacks.current.push(callback);
    return () => {
      endedCallbacks.current = endedCallbacks.current.filter(
        (cb) => cb !== callback
      );
    };
  };

  return (
    <PlayerContext.Provider
      value={{ preloadUrl, playPreloadedUrl, stop, onEnded }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer deve ser usado dentro do PlayerProvider");
  }
  return context;
};
