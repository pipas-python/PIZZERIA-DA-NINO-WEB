import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Syne } from "next/font/google";
import { DaNinoSvgSprite } from "@/components/icons/DaNinoBrandIcons";
import "./fonts.css";
import "./globals.css";

const displayFont = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display-loaded",
  display: "swap",
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-loaded",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-loaded",
  display: "swap",
});

function resolveMetadataBase() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw && /^https?:\/\//.test(raw)) {
    try {
      return new URL(raw);
    } catch {
      // Fallback below
    }
  }
  return new URL("https://www.pizzeriadanino.ch");
}

export const viewport: Viewport = {
  themeColor: "#E41F13",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: "Pizzeria Da Nino am Eigerplatz Bern » 031 371 11 31 | Restaurant & Take Away",
  description:
    "Pizzeria Da Nino am Eigerplatz in Bern (Belpstrasse 65, 3007 Bern). Restaurant & Take Away — Klein aber fein. Interaktive 60-FPS-Speisekarte, Pizza-Special Numero Dodici, Aperitivo & Vorbestellung.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: "https://www.pizzeriadanino.ch/",
    siteName: "Pizzeria Da Nino am Eigerplatz Bern",
    title: "Pizzeria Da Nino am Eigerplatz Bern » 031 371 11 31 | Restaurant & Take Away",
    description:
      "Handwerkliche Pizze, Pizza-Special Numero Dodici, Stracciatella di Burrata, Aperitivo & Take Away an der Belpstrasse 65 in 3007 Bern.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pizzeria Da Nino am Eigerplatz Bern » 031 371 11 31",
    description:
      "Restaurant & Take Away am Eigerplatz (Belpstrasse 65, 3007 Bern). Klein aber fein — Komm vorbei, wir freuen uns.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable}`}
    >
      <body>
        <DaNinoSvgSprite />
        <a id="skip-to-main" href="#top" className="skip-link">
          Zum Hauptinhalt springen
        </a>
        {children}
      </body>
    </html>
  );
}
