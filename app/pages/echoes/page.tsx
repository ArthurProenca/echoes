"use client";

import AnalyserClient from "@/app/client/lambda/songs/analyser_client";
import BackscreenButton from "@/app/components/backscreen_button";
import Loading from "@/app/components/loading";
import { usePlayer } from "@/app/context/player_context";
import { useSongs } from "@/app/context/songs_context";
import { useTheme } from "@/app/context/theme_context";
import { useRecorder } from "@/app/hooks/useRecorder";
import Image from "next/image";
import { useEffect, useState } from "react";

async function sendAudioToAnalyse(audio: Blob, vocalUrl: string) {
  const analyserClient = new AnalyserClient();
  return await analyserClient.soundAnalyse(audio, vocalUrl);
}

function Echoes() {
  const { playPreloadedUrl, onEnded } = usePlayer();
  const { selectedSong } = useSongs();
  const { getRandomTheme } = useTheme();

  const [theme, setTheme] = useState<Theme>();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [gifLoaded, setGifLoaded] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<EchoeAnalyse>();
  const [modalVisible, setModalVisible] = useState(false);

  const { start, stop } = useRecorder({
    onStop: async (audioBlob) => {
      const audioUrl = URL.createObjectURL(audioBlob);
      console.log("Áudio gravado (URL):", audioUrl);

      if (selectedSong?.vocalUrl) {
        try {
          const res = await sendAudioToAnalyse(
            audioBlob,
            selectedSong.vocalUrl
          );
          setAnalysisResult(res);
          setModalVisible(true);
        } catch (err) {
          console.error("Erro ao enviar para análise:", err);
        }
      }
    },
  });

  useEffect(() => {
    setTheme(getRandomTheme());
  }, [getRandomTheme]);

  useEffect(() => {
    if (gifLoaded && videoLoaded) {
      setAllLoaded(true);
      playPreloadedUrl();
      start(); // inicia gravação quando tudo carregar
    }
  }, [gifLoaded, videoLoaded, playPreloadedUrl, start]);

  useEffect(() => {
    onEnded(() => {
      stop(); // para gravação quando a música termina
    });
  }, [onEnded, stop]);

  if (selectedSong && (!selectedSong.gifUrl || !selectedSong.vocalUrl)) {
    return (
      <main className="flex items-center justify-center h-screen bg-black">
        <p className="text-white">Você não selecionou</p>
      </main>
    );
  }

  if (!selectedSong) return null;

  return (
    <>
      <main className="relative h-screen w-screen overflow-hidden p-14 bg-black">
        {theme && (
          <video
            src={theme.publicUrl}
            autoPlay
            loop
            muted
            playsInline
            className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-500 ${
              videoLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoadedData={() => setVideoLoaded(true)}
          />
        )}

        {!allLoaded && <Loading />}

        <section className="flex w-full justify-end z-30" onClick={stop}>
          <BackscreenButton />
        </section>

        <div
          className={`relative z-10 flex flex-col items-center justify-center h-full transition-opacity duration-500 ${
            gifLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={selectedSong.gifUrl}
            alt=""
            width={720}
            height={720}
            unoptimized
            onLoadingComplete={() => setGifLoaded(true)}
          />
        </div>
      </main>

      {modalVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setModalVisible(false)}
        >
          <div
            className="bg-gray-900 text-white max-w-lg max-h-[80vh] overflow-auto p-6 rounded-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-white text-xl font-bold hover:text-red-500"
              onClick={() => setModalVisible(false)}
              aria-label="Fechar modal"
            >
              &times;
            </button>
            <h2 className="text-2xl mb-4">Resultado da Análise</h2>
            <pre className="whitespace-pre-wrap break-words text-sm font-mono bg-gray-800 p-4 rounded">
              {JSON.stringify(analysisResult, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </>
  );
}

export default Echoes;
