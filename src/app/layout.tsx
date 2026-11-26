import type { Metadata, Viewport } from "next";
import { DaNinoSvgSprite } from "@/components/icons/DaNinoBrandIcons";
import "./fonts.css";
import "./globals.css";

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
  title: "Pizzeria da Nino · Belpstrasse 65, 3007 Bern | Pizza & Take Away",
  description:
    "Pizzeria da Nino am Eigerplatz (Belpstrasse 65, 3007 Bern). ★ 4,8 (1.649 reseñas) · Fr. 20–30 · Consumo en el lugar y Take Away. Abierto hasta las 22:30.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://www.pizzeriadanino.ch/",
    siteName: "Pizzeria da Nino Bern",
    title: "Pizzeria da Nino · Belpstrasse 65, 3007 Bern",
    description:
      "Pizzas artesanas al horno de piedra, Menu oficial en CHF, Location en Belpstrasse 65 y 4,8 ★ (1.649 reseñas).",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pizzeria da Nino · Belpstrasse 65, 3007 Bern",
    description: "Pizzeria da Nino · ★ 4,8 (1.649) · Fr. 20–30 · +41 31 371 11 31.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <DaNinoSvgSprite />
        <a id="skip-to-main" href="#home" className="skip-link">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
