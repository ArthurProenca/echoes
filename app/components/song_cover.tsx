"use client";
import { SongCoverType } from "@/app/types/song_cover_type";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SongCover(props: SongCoverType) {
  const router = useRouter();

  const shortTrack = props.tracks.find((track) => track.type === "corte");

  if (!shortTrack) {
    return;
  }

  function goToPreviewPage(tracks: Track[], publicUrl: string) {
    const track = tracks.find((track) => track.type === "corte");
    router.push(
      `/pages/preview?data=${encodeURIComponent(
        JSON.stringify(track)
      )}&publicUrl=${encodeURIComponent(publicUrl)}&artistName=${props.artist}&songName=${props.name}`
    );
  }

  return (
    <div
      key={props.id}
      className={`rounded-full max-w-[500px] max-h-[500px] transition-all duration-300 cursor-pointer focus:outline-none ${
        props.isCenter
          ? "z-2 -mr-12 -ml-12"
          : "opacity-40 blur-[2px] z-1 w-[270px] h-[270px]"
      }`}
      style={{
        padding: 0,
        border: "none",
        background: "transparent",
        cursor: props.isCenter ? "default" : "pointer",
      }}
    >
      <Image
        onClick={
          props.isCenter
            ? () => goToPreviewPage(props.tracks, props.publicUrl)
            : () => {}
        }
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
