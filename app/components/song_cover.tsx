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
  const { preloadUrl, playPreloadedUrl } = usePlayer();

  function goToPreviewPage() {
    router.push(`/pages/preview`);
  }

  useEffect(() => {
    if (!selectedSong || !props.isCenter) {
      return;
    }
    preloadUrl(selectedSong.demoUrl).then((res) => {
      if (res) {
        playPreloadedUrl();
      }
    });
  }, [selectedSong, playPreloadedUrl, preloadUrl, props.isCenter]);

  return (
    <div
      key={props.id}
      className={`rounded-full max-w-[500px] max-h-[500px] transition-all duration-700 ease-in-out transform cursor-pointer focus:outline-none
        ${
          props.isCenter
            ? "z-20 -mr-12 -ml-12 scale-100 rotate-0 opacity-100"
            : "z-10 w-[270px] h-[270px] scale-90 opacity-50 hover:scale-100 hover:rotate-3 hover:opacity-90"
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
        className="w-full h-full object-cover rounded-full transition-transform duration-700 ease-in-out"
        unoptimized
        draggable={false}
      />
    </div>
  );
}
