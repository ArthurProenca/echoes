"use client";
import { SongCoverType } from "@/app/types/song_cover_type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelectedSong } from "../context/selected_song_context";

export default function SongCover(props: SongCoverType) {
  const router = useRouter();
  const {
    setCurrentSongCoverUrl,
    setCurrentSongDemoUrl,
    setCurrentSongGifUrl,
    setCurrentSongUrl,
    setCurrentSongArtistName,
    setCurrentSongName
  } = useSelectedSong();
  const shortTrack = props.tracks.find((track) => track.type === "corte");

  if (!shortTrack) {
    return;
  }

  function goToPreviewPage(tracks: Track[], publicUrl: string) {
    const track = tracks.find((track) => track.type === "corte");
    const instrumentalTrack = tracks.find(
      (track) => track.type === "instrumental"
    );
    if (!instrumentalTrack || !track) {
      return;
    }

    setCurrentSongCoverUrl(publicUrl);
    setCurrentSongGifUrl(props.gif);
    setCurrentSongUrl(instrumentalTrack.publicUrl);
    setCurrentSongDemoUrl(track?.publicUrl);
    setCurrentSongArtistName(props.artist);
    setCurrentSongName(props.name);
    router.push(
      `/pages/preview`
    );
  }

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
