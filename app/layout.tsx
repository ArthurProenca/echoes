import type { Metadata } from "next";
import { Instrument_Sans, Jersey_10 } from "next/font/google";
import { PlayerProvider } from "./context/player_context";
import { SongsProvider } from "./context/songs_context";
import { ThemesProvider } from "./context/theme_context";
import "./globals.css";
import { DevModeProvider } from "./context/dev_mode_context";
import { RecorderProvider } from "./context/recorder_context";

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
            <ThemesProvider>
              <DevModeProvider>
                <RecorderProvider>{children}</RecorderProvider>
              </DevModeProvider>
            </ThemesProvider>
          </SongsProvider>
        </PlayerProvider>
      </body>
    </html>
  );
}
