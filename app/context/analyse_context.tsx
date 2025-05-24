"use client";
import { createContext, useContext, useState } from "react";
import AnalyserClient from "../client/lambda/songs/analyser_client";
import { useSongs } from "./songs_context";

interface AnalyseContextType {
  blob: Blob;
  setBlob: React.Dispatch<React.SetStateAction<Blob>>;
  analyseResult: EchoeAnalyse;
  setAnalyseResult: React.Dispatch<React.SetStateAction<EchoeAnalyse>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sendToAnalyse: () => Promise<EchoeAnalyse | undefined>;
}

const AnalyseContext = createContext<AnalyseContextType | undefined>(undefined);

export const AnalyseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [blob, setBlob] = useState<Blob>(new Blob());
  const [analyseResult, setAnalyseResult] = useState<EchoeAnalyse>({
    dynamics_rms_similarity: "N/A",
    pitch_similarity: "N/A",
    timbre_centroid_similarity: "N/A",
    timbre_contrast_similarity: "N/A",
    timbre_mfcc_similarity: "N/A",
    timing_onset_similarity: "N/A",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { selectedSong } = useSongs();

  async function sendToAnalyse() {
    const client = new AnalyserClient();
    if (!blob || !selectedSong?.vocalUrl) {
      return;
    }
    return client.soundAnalyse(blob, selectedSong.vocalUrl);
  }

  return (
    <AnalyseContext.Provider
      value={{
        blob,
        setBlob,
        analyseResult,
        setAnalyseResult,
        isLoading,
        setIsLoading,
        sendToAnalyse,
      }}
    >
      {children}
    </AnalyseContext.Provider>
  );
};

export const useAnalyse = () => {
  const context = useContext(AnalyseContext);
  if (!context) {
    throw new Error("useAnalyse must be used within a AnalyseProvider");
  }
  return context;
};
