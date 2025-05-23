"use client";
import { SongCoverType } from "@/app/types/song_cover_type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePlayer } from "../context/player_context";
import { useEffect } from "react";
import { useSongs } from "../context/songs_context";

export default function SongCover(props: SongCoverType) {
  const router = useRouter();
  const { selectedSong } = useSongs();
  const { setUrl } = usePlayer();

  function goToPreviewPage() {
    router.push(`/pages/preview`);
  }

  useEffect(() => {
    if (!selectedSong || !props.isCenter) {
      return;
    }
    setUrl(selectedSong?.demoUrl);
  }, [selectedSong]);

  return (
    <div
      key={props.id}
      className={`rounded-full max-w-[500px] max-h-[500px] transition-all duration-300 cursor-pointer focus:outline-none ${
        props.isCenter
          ? "z-20 -mr-12 -ml-12"
          : "opacity-40 blur-[2px] z-10 w-[270px] h-[270px]"
      }`}
      style={{
        padding: 0,
        border: "none",
        background: "transparent",
        cursor: props.isCenter ? "default" : "pointer",
        position: "relative",
      }}
    >
      <Image
        onClick={props.isCenter ? () => goToPreviewPage() : () => {}}
        alt={props.name}
        src={props.publicUrl}
        width={30}
        height={30}
        className="w-full h-full object-cover rounded-full"
        unoptimized
      />
    </div>
  );
}
