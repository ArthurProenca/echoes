"use client";

import BackscreenButton from "@/app/components/backscreen_button";
import SingButton from "@/app/components/sing_button";
import { usePlayer } from "@/app/context/player_context";
import { useSelectedSong } from "@/app/context/selected_song_context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

function PreviewSongPage() {
  const { currentSongCoverUrl, currentSongArtistName, currentSongName } =
    useSelectedSong();
  const { setUrl } = usePlayer();
  const router = useRouter();

  if (!currentSongCoverUrl || !currentSongArtistName || !currentSongName) {
    return <div>Eita</div>;
  }

  const rawLyrics = `
Baby, you can find me under the lights
Diamonds under my eyes
Turn the rhythm up, don't you wanna just
Come along for the ride?
Ooh, my outfit so tight
You can see my heartbeat tonight
I can take the heat, baby, best believe
That's the moment I shine
'Cause every romance shakes and it bendsDon't give a damn
When the night's here, I don't do tears
Baby, no chance
`;
  const formatted = rawLyrics.replace(/([a-z])([A-Z])/g, "$1\n$2");

  const handleClick = () => {
    setUrl("stop");
    router.push(`/pages/echoes`);
  };

  return (
    <main className="max-h-screen flex flex-row items-center justify-between relative overflow-hidden p-14 bg-custom-radial" >
      <aside
        className="w-[52%] pb-10 -ml-60 animate-spin "
        style={{ animationDuration: "7s" }}
      >
        <Image
          alt={""}
          src={currentSongCoverUrl}
          width={20}
          height={20}
          className="w-full h-full object-cover rounded-full"
          unoptimized
        />
      </aside>
      <aside className="w-[50%] max-h-screen flex flex-col gap-6">
        <section className="flex self-end-safe justify-end-safe">
          <BackscreenButton />
        </section>
        <section className="w-full flex flex-col self-end-safe justify-end-safe text-end">
          <span className="w-full self-center text-8xl uppercase font-jersey text-end">
            {currentSongName}
          </span>
          <span className="w-full self-center text-5xl uppercase font-jersey text-end">
            {currentSongArtistName}
          </span>
        </section>
        <section className="w-full">
          <p className="whitespace-pre-line font-instrument-sans text-3xl text-end">
            {formatted}
          </p>
        </section>
        <section
          onClick={handleClick}
          className=" w-full flex self-end-safe justify-end-safe"
        >
          <SingButton title="Cantar"/>
        </section>
      </aside>
    </main>
  );
}

export default function PreviewSong() {
  return (
    <Suspense>
      <PreviewSongPage />
    </Suspense>
  );
}
