import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { InteractiveMenuSection } from "@/components/menu/InteractiveMenuSection";
import { AmbientCanvasStage } from "@/components/scrolly/AmbientCanvasStage";
import { ClosingConversion } from "@/components/scrolly/ClosingConversion";
import { ProductSection } from "@/components/scrolly/ProductSection";
import { ScrollOrchestrator } from "@/components/scrolly/ScrollOrchestrator";
import { DaNinoConversionSections } from "@/components/sections/DaNinoConversionSections";
import { PRODUCTS_SHOWCASE } from "@/config/products";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Pizzeria Da Nino am Eigerplatz Bern",
  description:
    "Pizzeria Da Nino am Eigerplatz in Bern (Belpstrasse 65). Restaurant & Take Away — Klein aber fein. Handwerkliche Pizze, Pizza-Special Numero Dodici, Aperitivo & Dolci della casa.",
  url: "https://www.pizzeriadanino.ch/",
  telephone: "+41 31 371 11 31",
  email: "info@pizzeriadanino.ch",
  servesCuisine: ["Italian", "Pizza", "Aperitivo"],
  priceRange: "CHF 5.00 - CHF 23.00",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Belpstrasse 65",
    addressLocality: "Bern",
    postalCode: "3007",
    addressRegion: "BE",
    addressCountry: "CH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 46.9420183,
    longitude: 7.4311663,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "11:30",
      closes: "22:30",
    },
  ],
  sameAs: ["https://www.instagram.com/pizzeria_danino/"],
};

export default function HomePage() {
  return (
    <ScrollOrchestrator>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <AmbientCanvasStage />
      <MinimalHeader />
      <main id="top" tabIndex={-1}>
        {PRODUCTS_SHOWCASE.map((product, index) => (
          <ProductSection
            key={product.id}
            product={product}
            isOpeningHero={index === 0}
          />
        ))}
        <InteractiveMenuSection />
        <DaNinoConversionSections />
        <ClosingConversion />
      </main>
    </ScrollOrchestrator>
  );
}
