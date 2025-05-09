import { SongTitleType } from "@/app/types/song_title_type";

export default function SongTitle(songTitleType: Readonly<SongTitleType>) {
  return (
    <div className="flex flex-col" key={songTitleType.id}>
      <h3
        className="text-5xl font-jersey uppercase"
        style={{
          color: songTitleType.isCenter ? "#9D5FFE" : "#FFFFFF",
          opacity: songTitleType.isCenter ? "100%" : "29%",
        }}
      >
        {songTitleType.title}
      </h3>
      <span
        className="self-center text-2xl uppercase font-instrument-sans"
        style={{ opacity: songTitleType.isCenter ? "100%" : "0%" }}
      >
        {songTitleType.artist}
      </span>
    </div>
  );
}
