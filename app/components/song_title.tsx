import { useEffect, useState } from "react";
import { SongTitleType } from "@/app/types/song_title_type";

export default function SongTitle(songTitleType: Readonly<SongTitleType>) {
  const { isCenter, title, artist } = songTitleType;
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isCenter) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 400); // duração da animação
      return () => clearTimeout(timeout);
    }
  }, [isCenter]);

  return (
    <div
      className="flex flex-col items-center justify-center w-[300px] h-[120px] text-center"
      key={songTitleType.id}
    >
      <h3
        className="text-5xl font-jersey uppercase leading-tight truncate"
        style={{
          color: isCenter ? "#9D5FFE" : "#FFFFFF",
          opacity: isCenter ? "1" : "0.29",
          transform: animate && isCenter ? "scale(1.05)" : "scale(1)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        {title}
      </h3>
      <span
        className="text-2xl uppercase font-instrument-sans leading-tight"
        style={{
          opacity: isCenter ? "1" : "0",
          transition: "opacity 0.4s ease",
        }}
      >
        {artist}
      </span>
    </div>
  );
}
