"use client";

import BackscreenButton from "@/app/components/backscreen_button";
import SingButton from "@/app/components/sing_button";
import SongPlayer from "@/app/components/song_player";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function PreviewSong() {
  const searchParams = useSearchParams();
  const dataParamRaw = searchParams.get("data");
  const coverPublicUrl = searchParams.get("publicUrl");
  const artist = searchParams.get("artistName");
  const songName = searchParams.get("songName");
  console.log(dataParamRaw)
  if (!dataParamRaw || !coverPublicUrl) {
    return <main>Holly molly u fucked up</main>;
  }

  const dataParam: Track = JSON.parse(decodeURIComponent(dataParamRaw));

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

  return (
    <main className="max-h-screen flex flex-row items-center justify-between relative overflow-hidden p-14">
      <aside
        className="w-[52%] pb-10 -ml-60 animate-spin "
        style={{ animationDuration: "7s" }}
      >
        <Image
          alt={""}
          src={coverPublicUrl}
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
          <span className="w-full self-center text-9xl uppercase font-jersey text-end">
            {songName}
          </span>
          <span className="w-full self-center text-5xl uppercase font-jersey text-end">
            {artist}
          </span>
        </section>
        <section className="w-full">
          <p className="whitespace-pre-line font-instrument-sans text-3xl text-end">
            {formatted}
          </p>
        </section>
        <section className=" w-full flex self-end-safe justify-end-safe">
          <SingButton />
        </section>
      </aside>
      <SongPlayer url={dataParam.publicUrl} />
    </main>
  );
}
