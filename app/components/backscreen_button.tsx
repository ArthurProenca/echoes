"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePlayer } from "../context/player_context";

export default function BackscreenButton() {
  const router = useRouter();
  const { setUrl } = usePlayer();

  const handleClick = () => {
    setUrl("stop");
    router.back();
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
