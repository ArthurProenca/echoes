"use client";

import { createContext, useContext, useState } from "react";

interface SelectedSongContextType {
  currentSongUrl: string;
  setCurrentSongUrl: React.Dispatch<React.SetStateAction<string>>;
  currentSongDemoUrl: string;
  setCurrentSongDemoUrl: React.Dispatch<React.SetStateAction<string>>;
  currentSongGifUrl: string;
  setCurrentSongGifUrl: React.Dispatch<React.SetStateAction<string>>;
  currentSongCoverUrl: string;
  setCurrentSongCoverUrl: React.Dispatch<React.SetStateAction<string>>;
  currentSongArtistName: string;
  setCurrentSongArtistName: React.Dispatch<React.SetStateAction<string>>;
  currentSongName: string;
  setCurrentSongName: React.Dispatch<React.SetStateAction<string>>;
}

const SelectedSongContext = createContext<SelectedSongContextType | undefined>(
  undefined
);

export const SelectedSongsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentSongUrl, setCurrentSongUrl] = useState<string>("");
  const [currentSongDemoUrl, setCurrentSongDemoUrl] = useState<string>("");
  const [currentSongGifUrl, setCurrentSongGifUrl] = useState<string>("");
  const [currentSongCoverUrl, setCurrentSongCoverUrl] = useState<string>("");
  const [currentSongArtistName, setCurrentSongArtistName] = useState<string>("");
  const [currentSongName, setCurrentSongName] = useState<string>("");

  return (
    <SelectedSongContext.Provider
      value={{
        currentSongUrl,
        setCurrentSongUrl,
        currentSongDemoUrl,
        setCurrentSongDemoUrl,
        currentSongGifUrl,
        setCurrentSongGifUrl,
        currentSongCoverUrl,
        setCurrentSongCoverUrl,
        currentSongArtistName,
        setCurrentSongArtistName,
        currentSongName,
        setCurrentSongName,
      }}
    >
      {children}
    </SelectedSongContext.Provider>
  );
};

export const useSelectedSong = () => {
  const context = useContext(SelectedSongContext);
  if (!context) {
    throw new Error("useSelectedSong must be used within a SongsProvider");
  }
  return context;
};
