import type { Metadata } from "next";
import { Instrument_Sans, Jersey_10 } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "./context/player_context";
import GlobalPlayer from "./components/global_song_player";
import { SongsProvider } from "./context/songs_context";
import { SelectedSongsProvider } from "./context/selected_song_context";
import { ThemesProvider } from "./context/theme_context";

const Jersey10 = Jersey_10({
  variable: "--font-jersey-10",
  weight: "400",
  subsets: ["latin"],
});

const InstrumentSans = Instrument_Sans({
  weight: "400",
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Echoes",
  description: "Bring light to your voice!",
  icons: "/main_page_icon.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${Jersey10.variable} ${InstrumentSans.variable} antialiased `}
      >
        <PlayerProvider>
          <SongsProvider>
            <SelectedSongsProvider>
              <ThemesProvider>{children}</ThemesProvider>
            </SelectedSongsProvider>
          </SongsProvider>
          <GlobalPlayer />
        </PlayerProvider>
      </body>
    </html>
  );
}
