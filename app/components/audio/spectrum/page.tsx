"use client";

import { useEffect, useRef } from "react";
import AudioMotionAnalyzer from "audiomotion-analyzer";

type AudioSpectrumProps = {
  src: string;
};

export default function AudioSpectrum({ src }: AudioSpectrumProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const analyzerRef = useRef<AudioMotionAnalyzer | null>(null);

  useEffect(() => {
    const audioEl = audioRef.current;
    const container = containerRef.current;
    const containerSrc = document.getElementById("audioId") as HTMLMediaElement;
    if (!audioEl || !container || !containerSrc) return;

    const handleCanPlay = () => {
      if (!analyzerRef.current) {
        analyzerRef.current = new AudioMotionAnalyzer(container, {
          mode: 0,
          source: containerSrc,
          channelLayout: "single",
          frequencyScale: "bark",
          gradient: "rainbow",
          linearAmplitude: true,
          linearBoost: 1.8,
          maxFreq: 20000,
          minFreq: 20,
          mirror: 0,
          overlay: false,
          radial: false,
          reflexAlpha: 0.25,
          reflexBright: 1,
          reflexFit: true,
          reflexRatio: 0.3,
          showPeaks: true,
          showScaleX: true,
          weightingFilter: "D",
        });
        console.log("Analyzer iniciado");
      }
    };

    audioEl.addEventListener("canplay", handleCanPlay);

    return () => {
      audioEl.removeEventListener("canplay", handleCanPlay);
      analyzerRef.current?.destroy();
    };
  }, []);

  return (
    <div>
      <audio
        id="audioId"
        ref={audioRef}
        src={src}
        controls
        crossOrigin="anonymous"
      />
      <div ref={containerRef} style={{ width: "100%", height: "200px" }} />
    </div>
  );
}
