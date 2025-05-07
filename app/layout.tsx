import type { Metadata } from "next";
import { Instrument_Sans, Jersey_10 } from "next/font/google";
import "./globals.css";

const Jersey10 = Jersey_10({
  variable: "--font-jersey-10",
  weight: "400"
});

const InstrumentSans = Instrument_Sans({
  weight: "400",
  variable: "--font-instrument-sans"
});

export const metadata: Metadata = {
  title: "Echoes",
  description: "Bring light to your voice!",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${Jersey10.variable} ${InstrumentSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
