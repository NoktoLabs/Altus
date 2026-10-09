import type { Metadata } from "next";
import { Instrument_Serif, IBM_Plex_Mono, Archivo } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ALTUS — Experience the Tower",
  description: "61 floors above the ordinary. A scroll-driven journey through ALTUS, a concept residential tower.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${instrumentSerif.variable} ${ibmPlexMono.variable} ${archivo.variable}`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
