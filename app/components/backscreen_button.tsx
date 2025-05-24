"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePlayer } from "../context/player_context";
import { useRecorder } from "../context/recorder_context";

interface props {
  readonly isHome: boolean;
}

export default function BackscreenButton(props: props) {
  const router = useRouter();
  const { stop } = usePlayer();
  const { stopRecording } = useRecorder();

  const handleClick = () => {
    stopRecording().then(() => {
      stop();
      if (props.isHome) {
        router.push("/pages/songs");
      } else {
        router.back();
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-row items-center gap-5 opacity-45"
    >
      <Image width={17} height={33} alt="" src="/back_arrow.svg" unoptimized />
      <span className="text-5xl font-jersey uppercase">VOLTAR</span>
    </button>
  );
}
