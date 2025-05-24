"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SongsClient from "./client/lambda/songs/songs_client";
import SingButton from "./components/sing_button";
import { useSongs } from "./context/songs_context";
import { useTheme } from "./context/theme_context";
import Loading from "./components/loading";

async function getAllSongsInfo(): Promise<MusicLibrary> {
  const client = new SongsClient();
  return client.getAllSongs();
}

export default function Home() {
  const router = useRouter();
  const { setAllSongs } = useSongs();
  const { setAllThemes } = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function loadSongs() {
    const data = await getAllSongsInfo();
    const songs: Song[] = [];

    data.artists.forEach((artist: Artist) => {
      artist.albums.forEach((album: Album) => {
        const groupedTracks = album.tracks.reduce((acc, track: Track) => {
          const trackKey = track.name.replace(/\((.*?)\)\.\w+$/, "").trim();

          if (!acc[trackKey]) {
            acc[trackKey] = {};
          }

          acc[trackKey][track.type] = track.publicUrl;
          return acc;
        }, {} as Record<string, Record<string, string>>);

        Object.entries(groupedTracks).forEach(([, trackTypes]) => {
          songs.push({
            albumName: album.name,
            artistName: artist.name,
            coverUrl: album.cover.publicUrl,
            gifUrl: album.gif?.publicUrl || "",
            demoUrl: trackTypes["corte"] || trackTypes["demo"] || "",
            instrumentalUrl: trackTypes["instrumental"] || "",
            vocalUrl: trackTypes["vocal"] || "",
            lyricsUrl: album?.lyrics?.publicUrl || "",
          });
        });
      });
    });

    setAllSongs(songs);
    setAllThemes(data.themes);
    sessionStorage.setItem("songs", JSON.stringify(songs));
    sessionStorage.setItem("themes", JSON.stringify(data.themes));
    setIsLoading(false);
  }

  useEffect(() => {
    loadSongs();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <main className="h-screen flex flex-row items-center justify-center relative overflow-hidden p-14 bg-custom-radial">
      <section className="w-full h-full">
        <div className="flex flex-row items-center justify-between w-full h-full">
          <span>Karaokê</span>
          <div className="flex flex-col items-center justify-between h-full">
            <div />
            <div className="flex flex-col items-center">
              <h1 className="text-[150px] font-jersey -mb-10">ECHOES</h1>
              <article onClick={() => router.push("/pages/songs")}>
                <SingButton title="Bora?" />
              </article>
            </div>
            <div className="flex flex-col items-center">
              <Image width={40} height={40} alt="" src="/main_page_icon.svg" />
              <span>
                Solte a voz, <br /> deixe ecoar.
              </span>
            </div>
          </div>
          <span>Aniversauro da Dodora {"<3"} sz sz</span>
        </div>
      </section>
    </main>
  );
}
