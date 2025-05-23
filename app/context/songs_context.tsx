"use client";
import { createContext, useContext, useState } from "react";

interface SongsContextType {
  allSongs: Song[];
  setAllSongs: React.Dispatch<React.SetStateAction<Song[]>>;
  selectedSong?: Song;
  setSelectedSong: React.Dispatch<React.SetStateAction<Song | undefined>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const SongsContext = createContext<SongsContextType | undefined>(undefined);

export const SongsProvider = ({ children }: { children: React.ReactNode }) => {
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | undefined>(undefined);
  const [currentIndex, setCurrentIndex] = useState(1);

  return (
    <SongsContext.Provider
      value={{
        allSongs,
        setAllSongs,
        selectedSong,
        setSelectedSong,
        currentIndex,
        setCurrentIndex,
      }}
    >
      {children}
    </SongsContext.Provider>
  );
};

export const useSongs = () => {
  const context = useContext(SongsContext);
  if (!context) {
    throw new Error("useSongs must be used within a provider");
  }
  return context;
};
