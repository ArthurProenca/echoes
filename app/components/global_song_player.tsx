"use client";

import { usePlayer } from "../context/player_context";
import SongPlayer from "./song_player";

export default function GlobalPlayer() {
  const { url } = usePlayer();

  if (!url) return null;

  return <SongPlayer url={url} />;
}
