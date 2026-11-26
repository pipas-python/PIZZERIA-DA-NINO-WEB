import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { InteractiveMenuSection } from "@/components/menu/InteractiveMenuSection";
import { AmbientCanvasStage } from "@/components/scrolly/AmbientCanvasStage";
import { HeroPizzaStage } from "@/components/scrolly/HeroPizzaStage";
import { ScrollOrchestrator } from "@/components/scrolly/ScrollOrchestrator";
import { LocationSection } from "@/components/sections/LocationSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Pizzeria da Nino",
  description:
    "Pizzeria da Nino am Eigerplatz (Belpstrasse 65, 3007 Bern). Pizzeria · Speisen vor Ort & Abholung vor dem Laden.",
  url: "https://www.pizzeriadanino.ch/",
  telephone: "+41 31 371 11 31",
  email: "info@pizzeriadanino.ch",
  servesCuisine: ["Italian", "Pizza", "Neapolitan Pizza"],
  priceRange: "CHF 20-30",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "1649",
  },
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
        <HeroPizzaStage />
        <InteractiveMenuSection />
        <LocationSection />
        <ReviewsSection />
      </main>
    </ScrollOrchestrator>
  );
}
