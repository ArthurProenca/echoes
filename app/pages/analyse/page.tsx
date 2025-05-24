"use client";
import BackscreenButton from "@/app/components/backscreen_button";
import { usePlayer } from "@/app/context/player_context";
import { useRecorder } from "@/app/context/recorder_context";
import { useSongs } from "@/app/context/songs_context";
import { useEffect, useState } from "react";

function EchoesAnalyse() {
  const { selectedSong } = useSongs();
  //const { analyseResult, sendToAnalyse } = useAnalyse();
  const { stopRecording } = useRecorder();

  const { stop } = usePlayer();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const profileKeyMap = new Map<number, string>([
    [20, "A intenção foi boa, mas... <br/> a voz não acompanhou!"],
    [50, "Se fosse no chuveiro, tava 100%!"],
    [80, "Muito bom! Já pode abrir um show... <br/> no karaokê do bairro!"],
    [100, "Vem Grammy! <br/> Você nasceu pra isso!"],
  ]);

  // Rotação dos textos enquanto carrega
  const rotatingTexts = ["TOM DE VOZ?", "ENTONAÇÃO?", "TIMBRE?", "RITMO?"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    stop();
    stopRecording().then(() => {
      setIsLoading(false);
    });
  });

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoading, rotatingTexts.length]);

  const displayTitle = isLoading ? rotatingTexts[currentIndex] : "TOM DE VOZ?";
  const displaySubtitle = isLoading ? "Calculando..." : "Análise completa!";

  return (
    <main className="min-h-screen flex flex-col items-center justify-between relative bg-custom-radial p-14">
      <section className="flex w-full justify-end z-30">
        <BackscreenButton />
      </section>
      <section>
        <h1
          className="pt-12 pb-8 text-6xl font-jersey select-none uppercase"
          title="Double-click to toggle dev mode"
        >
          será que você é o(a) novo(a) {selectedSong?.artistName}?
        </h1>
      </section>

      <div className="flex items-center justify-center">
        <div className="relative w-80 h-80 rounded-full pulse-shadow-outer">
          <div className="relative w-80 h-80 rounded-full pulse-shadow-inner">
            <div className="gap-4 w-80 h-80 rounded-full bg-[rgba(205,118,242,1)] flex items-center justify-center text-white text-center flex-col">
              <span id="title" className="text-4xl font-bold">
                {displayTitle}
              </span>
              <span id="subtitle" className="text-2xl">
                {displaySubtitle}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p
          className="font-instrument-sans text-3xl"
          style={{ fontStyle: "italic" }}
          dangerouslySetInnerHTML={{ __html: profileKeyMap.get(50) + "" }}
        />
      </div>
      <div />
    </main>
  );
}

export default EchoesAnalyse;
