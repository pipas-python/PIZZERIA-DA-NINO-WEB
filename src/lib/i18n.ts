"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import type { MenuCategoryId } from "@/config/menu";
import type { PizzaLayerSpec } from "@/config/products";

export type Locale = "de" | "en" | "es";

const LOCALE_EVENT = "danino:locale-change";
const STORAGE_KEY = "danino_locale";
const DEFAULT_LOCALE: Locale = "es";

export function isValidLocale(val: string | null | undefined): val is Locale {
  return val === "de" || val === "en" || val === "es";
}

let clientLocaleCache: Locale = DEFAULT_LOCALE;
let clientInitialized = false;

function initClientLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  if (clientInitialized) return clientLocaleCache;
  clientInitialized = true;

  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("lang");
  if (isValidLocale(fromQuery)) {
    clientLocaleCache = fromQuery;
    try {
      window.localStorage.setItem(STORAGE_KEY, fromQuery);
    } catch {
      // Ignore storage restrictions
    }
    return clientLocaleCache;
  }

  try {
    const fromStorage = window.localStorage.getItem(STORAGE_KEY);
    if (isValidLocale(fromStorage)) {
      clientLocaleCache = fromStorage;
      return clientLocaleCache;
    }
  } catch {
    // Ignore storage restrictions
  }

  clientLocaleCache = DEFAULT_LOCALE;
  return clientLocaleCache;
}

export function getClientLocaleSnapshot(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  return initClientLocale();
}

export function getServerLocaleSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

export function setAppLocale(next: Locale) {
  if (typeof window === "undefined") return;
  clientInitialized = true;
  clientLocaleCache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Ignore storage restrictions
  }
  document.documentElement.lang = next;
  window.dispatchEvent(new CustomEvent<{ locale: Locale }>(LOCALE_EVENT, { detail: { locale: next } }));
}

function subscribeLocale(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(LOCALE_EVENT, onStoreChange);
  return () => window.removeEventListener(LOCALE_EVENT, onStoreChange);
}

export function useLocale(): [Locale, (next: Locale) => void] {
  const locale = useSyncExternalStore(
    subscribeLocale,
    getClientLocaleSnapshot,
    getServerLocaleSnapshot,
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const updateLocale = useCallback((next: Locale) => {
    setAppLocale(next);
  }, []);

  return [locale, updateLocale];
}

export interface ReviewEntry {
  author: string;
  meta: string;
  timeAgo: string;
  quote: string;
  tag: string;
}

export interface UiDictionary {
  skipToMain: string;
  header: {
    brandAria: string;
    navAria: string;
    mobileNavAria: string;
    openMenuAria: string;
    closeMenuAria: string;
    langGroupAria: string;
    nav: {
      home: string;
      menu: string;
      location: string;
      reviews: string;
    };
  };
  hero: {
    metaLine: string;
    scrollCue: string;
    pizzaEyebrow: string;
    pizzaTitle: string;
    pizzaIngredients: string;
    pizzaNote: string;
    pizzaCta: string;
    layers: Record<PizzaLayerSpec["id"], string>;
  };
  menuSection: {
    specialHeading: string;
    eyebrow: string;
    title: string;
    priceRangeNote: string;
    categories: Record<MenuCategoryId, string>;
    filters: {
      all: string;
      vegetarian: string;
      vegan: string;
      meat: string;
      fish: string;
    };
    legend: {
      vegetarian: string;
      vegan: string;
      pork: string;
      cow: string;
      fish: string;
      taxNote: string;
    };
  };
  locationSection: {
    eyebrow: string;
    title: string;
    statusOpen: string;
    closesAt: string;
    addressStreet: string;
    addressCity: string;
    plusCode: string;
    services: [string, string, string];
    priceLabel: string;
    priceValue: string;
    priceReported: string;
    hoursLabel: string;
    hoursDays: string;
    hoursTime: string;
    peakTitle: string;
    peakLive: string;
    directionsCta: string;
    callCta: string;
  };
  reviewsSection: {
    eyebrow: string;
    ratingScore: string;
    totalCount: string;
    priceSummary: string;
    tags: [string, string, string, string];
    googleCta: string;
    items: [ReviewEntry, ReviewEntry, ReviewEntry];
    footerTagline: string;
  };
}

export const DICTIONARIES: Record<Locale, UiDictionary> = {
  es: {
    skipToMain: "Saltar al contenido",
    header: {
      brandAria: "Pizzeria Da Nino Bern — Inicio",
      navAria: "Navegación principal",
      mobileNavAria: "Navegación móvil",
      openMenuAria: "Abrir menú",
      closeMenuAria: "Cerrar menú",
      langGroupAria: "Idioma",
      nav: {
        home: "Home",
        menu: "Menu",
        location: "Location",
        reviews: "Reviews",
      },
    },
    hero: {
      metaLine: "Pizzería · Belpstrasse 65, Bern · ★ 4,8 (1.649)",
      scrollCue: "Scroll",
      pizzaEyebrow: "450 °C HORNO DE PIEDRA · 72H FERMENTACIÓN",
      pizzaTitle: "4 Stagioni.",
      pizzaIngredients: "Pelati · Fior di Latte · Setas · Alcachofas · Aceitunas · Salami · Albahaca",
      pizzaNote: "Masa fina y crujiente · Klein -CHF 2.00",
      pizzaCta: "Ver Menu",
      layers: {
        basil: "Albahaca & Aceite de Oliva",
        toppings: "Setas, Alcachofas, Aceitunas & Salami",
        mozzarella: "Mozzarella Fior di Latte",
        pelati: "Pelati San Marzano",
        crust: "Masa Napolitana 72h",
      },
    },
    menuSection: {
      specialHeading: "Pizza-Special",
      eyebrow: "CARTA OFICIAL · PRECIOS EN CHF",
      title: "Menu.",
      priceRangeNote: "Fr. 20–30 por persona · Consumo en el lugar & Retiros en la puerta",
      categories: {
        pizze: "Pizze",
        antipasti_dolci: "Antipasti & Dolci",
        aperitivo: "Aperitivo",
        birra_vino: "Birra & Vino",
        bibite_caffe: "Bibite & Cafe",
      },
      filters: {
        all: "Todas",
        vegetarian: "Vegetariana",
        vegan: "Vegana",
        meat: "Carne",
        fish: "Pescado",
      },
      legend: {
        vegetarian: "Vegetariano",
        vegan: "Vegano",
        pork: "Cerdo",
        cow: "Vacuno",
        fish: "Pescado",
        taxNote: "Todas las pizzas disponibles en tamaño pequeño (-CHF 2.00) · Precios en CHF IVA incl.",
      },
    },
    locationSection: {
      eyebrow: "LOCATION · AM EIGERPLATZ",
      title: "Belpstrasse 65.",
      statusOpen: "Abierto",
      closesAt: "Cierra a las 10:30 p. m.",
      addressStreet: "Belpstrasse 65",
      addressCity: "3007 Bern, Suiza",
      plusCode: "WCRJ+RH Berna, Suiza",
      services: ["Consumo en el lugar", "Retiros en la puerta", "Terraza interior y exterior"],
      priceLabel: "Precio medio",
      priceValue: "Fr. 20–30",
      priceReported: "por persona · Notificado por 149 personas",
      hoursLabel: "Horario",
      hoursDays: "Lunes – Viernes",
      hoursTime: "11:30 – 22:30",
      peakTitle: "Horas punta · Jueves",
      peakLive: "Menos concurrido de lo habitual",
      directionsCta: "Cómo llegar",
      callCta: "+41 31 371 11 31",
    },
    reviewsSection: {
      eyebrow: "RESEÑAS DE GOOGLE MAPS",
      ratingScore: "4,8",
      totalCount: "1.649 reseñas",
      priceSummary: "Pizzería · Fr. 20–30",
      tags: ["italiana · 30", "vegana · 16", "pizza napolitana · 14", "perfecto · 14"],
      googleCta: "Ver en Google Maps",
      items: [
        {
          author: "Cosi Raitmayr",
          meta: "Local Guide · 256 reseñas · 146 fotos",
          timeAgo: "Hace 3 meses",
          quote:
            "Amazing Pizzaria!! We got the pizza special, the siciliano and 4 stazione - each was insanely delicious. The staff was super friendly and attentive AND helpful. There is indoor and outdoor seating available as well. We also enjoyed the kombucha and mate drinks. Will definitely come back!",
          tag: "Pizza Special · Siciliana · 4 Stagioni",
        },
        {
          author: "AS SAWA",
          meta: "Local Guide · 512 reseñas · 11.968 fotos",
          timeAgo: "Hace 2 meses",
          quote:
            "I ordered the signature one I think, the 4 stagioni, I love the level of dough. It is thin and crust.",
          tag: "4 Stagioni · Thin Crust",
        },
        {
          author: "Tim bird",
          meta: "Local Guide · 136 reseñas · 125 fotos",
          timeAgo: "Hace 2 meses",
          quote:
            "We loved our visit to this place! Was busy even on a Monday and from the taste of the pizza I can see why! The pizza tasted great and was reasonably priced!",
          tag: "Dine-in · Bern",
        },
      ],
      footerTagline: "Pizzeria Da Nino · Belpstrasse 65, 3007 Bern · Klein aber fein",
    },
  },
  de: {
    skipToMain: "Zum Inhalt springen",
    header: {
      brandAria: "Pizzeria Da Nino Bern — Start",
      navAria: "Hauptnavigation",
      mobileNavAria: "Mobile Navigation",
      openMenuAria: "Menü öffnen",
      closeMenuAria: "Menü schliessen",
      langGroupAria: "Sprache",
      nav: {
        home: "Home",
        menu: "Menu",
        location: "Location",
        reviews: "Reviews",
      },
    },
    hero: {
      metaLine: "Pizzeria · Belpstrasse 65, Bern · ★ 4,8 (1.649)",
      scrollCue: "Scroll",
      pizzaEyebrow: "450 °C STEINOFEN · 72H TEIGRUHE",
      pizzaTitle: "4 Stagioni.",
      pizzaIngredients: "Pelati · Fior di Latte · Pilze · Artischocken · Oliven · Salame · Basilikum",
      pizzaNote: "Dünner, knuspriger Teig · Klein -CHF 2.00",
      pizzaCta: "Zum Menu",
      layers: {
        basil: "Basilikum & Olivenöl",
        toppings: "Pilze, Artischocken, Oliven & Salame",
        mozzarella: "Mozzarella Fior di Latte",
        pelati: "Pelati San Marzano",
        crust: "72h Steinofen-Teig",
      },
    },
    menuSection: {
      specialHeading: "Pizza-Special",
      eyebrow: "SPEISEKARTE · PREISE IN CHF",
      title: "Menu.",
      priceRangeNote: "Fr. 20–30 pro Person · Vor Ort essen & Abholung vor dem Laden",
      categories: {
        pizze: "Pizze",
        antipasti_dolci: "Antipasti & Dolci",
        aperitivo: "Aperitivo",
        birra_vino: "Birra & Vino",
        bibite_caffe: "Bibite & Cafe",
      },
      filters: {
        all: "Alle",
        vegetarian: "Vegetarisch",
        vegan: "Vegan",
        meat: "Fleisch",
        fish: "Fisch",
      },
      legend: {
        vegetarian: "Vegetarisch",
        vegan: "Vegan",
        pork: "Schwein",
        cow: "Rind",
        fish: "Fisch",
        taxNote: "Alle Pizze auch klein (-CHF 2.00) · Preise in CHF inkl. MwSt.",
      },
    },
    locationSection: {
      eyebrow: "LOCATION · AM EIGERPLATZ",
      title: "Belpstrasse 65.",
      statusOpen: "Geöffnet",
      closesAt: "Schliesst um 22:30 Uhr",
      addressStreet: "Belpstrasse 65",
      addressCity: "3007 Bern, Schweiz",
      plusCode: "WCRJ+RH Bern, Schweiz",
      services: ["Speisen vor Ort", "Abholung vor dem Laden", "Sitzplätze innen & aussen"],
      priceLabel: "Preisrahmen",
      priceValue: "Fr. 20–30",
      priceReported: "pro Person · Von 149 Gästen gemeldet",
      hoursLabel: "Öffnungszeiten",
      hoursDays: "Montag – Freitag",
      hoursTime: "11:30 – 22:30",
      peakTitle: "Stosszeiten · Donnerstag",
      peakLive: "Weniger besucht als gewöhnlich",
      directionsCta: "Route planen",
      callCta: "+41 31 371 11 31",
    },
    reviewsSection: {
      eyebrow: "GOOGLE MAPS REZENSIONEN",
      ratingScore: "4,8",
      totalCount: "1.649 Rezensionen",
      priceSummary: "Pizzeria · Fr. 20–30",
      tags: ["italienisch · 30", "vegan · 16", "neapolitanisch · 14", "perfekt · 14"],
      googleCta: "Auf Google Maps ansehen",
      items: [
        {
          author: "Cosi Raitmayr",
          meta: "Local Guide · 256 Rezensionen · 146 Fotos",
          timeAgo: "Vor 3 Monaten",
          quote:
            "Amazing Pizzaria!! We got the pizza special, the siciliano and 4 stazione - each was insanely delicious. The staff was super friendly and attentive AND helpful. There is indoor and outdoor seating available as well. We also enjoyed the kombucha and mate drinks. Will definitely come back!",
          tag: "Pizza Special · Siciliana · 4 Stagioni",
        },
        {
          author: "AS SAWA",
          meta: "Local Guide · 512 Rezensionen · 11.968 Fotos",
          timeAgo: "Vor 2 Monaten",
          quote:
            "I ordered the signature one I think, the 4 stagioni, I love the level of dough. It is thin and crust.",
          tag: "4 Stagioni · Thin Crust",
        },
        {
          author: "Tim bird",
          meta: "Local Guide · 136 Rezensionen · 125 Fotos",
          timeAgo: "Vor 2 Monaten",
          quote:
            "We loved our visit to this place! Was busy even on a Monday and from the taste of the pizza I can see why! The pizza tasted great and was reasonably priced!",
          tag: "Dine-in · Bern",
        },
      ],
      footerTagline: "Pizzeria Da Nino · Belpstrasse 65, 3007 Bern · Klein aber fein",
    },
  },
  en: {
    skipToMain: "Skip to content",
    header: {
      brandAria: "Pizzeria Da Nino Bern — Home",
      navAria: "Primary navigation",
      mobileNavAria: "Mobile navigation",
      openMenuAria: "Open menu",
      closeMenuAria: "Close menu",
      langGroupAria: "Language",
      nav: {
        home: "Home",
        menu: "Menu",
        location: "Location",
        reviews: "Reviews",
      },
    },
    hero: {
      metaLine: "Pizzeria · Belpstrasse 65, Bern · ★ 4.8 (1,649)",
      scrollCue: "Scroll",
      pizzaEyebrow: "450 °C STONE OVEN · 72H DOUGH",
      pizzaTitle: "4 Stagioni.",
      pizzaIngredients: "Pelati · Fior di Latte · Mushrooms · Artichokes · Olives · Salami · Basil",
      pizzaNote: "Thin & crisp dough · Small -CHF 2.00",
      pizzaCta: "View Menu",
      layers: {
        basil: "Genovese Basil & Olive Oil",
        toppings: "Mushrooms, Artichokes, Olives & Salami",
        mozzarella: "Fior di Latte Mozzarella",
        pelati: "San Marzano Pelati",
        crust: "72h Wood-Fired Crust",
      },
    },
    menuSection: {
      specialHeading: "Pizza-Special",
      eyebrow: "OFFICIAL MENU · PRICES IN CHF",
      title: "Menu.",
      priceRangeNote: "CHF 20–30 per person · Dine-in & Curbside pickup",
      categories: {
        pizze: "Pizze",
        antipasti_dolci: "Antipasti & Dolci",
        aperitivo: "Aperitivo",
        birra_vino: "Birra & Vino",
        bibite_caffe: "Bibite & Cafe",
      },
      filters: {
        all: "All",
        vegetarian: "Vegetarian",
        vegan: "Vegan",
        meat: "Meat",
        fish: "Fish",
      },
      legend: {
        vegetarian: "Vegetarian",
        vegan: "Vegan",
        pork: "Pork",
        cow: "Beef",
        fish: "Fish",
        taxNote: "All pizzas available small (-CHF 2.00) · Prices in CHF incl. VAT.",
      },
    },
    locationSection: {
      eyebrow: "LOCATION · AM EIGERPLATZ",
      title: "Belpstrasse 65.",
      statusOpen: "Open",
      closesAt: "Closes 10:30 PM",
      addressStreet: "Belpstrasse 65",
      addressCity: "3007 Bern, Switzerland",
      plusCode: "WCRJ+RH Bern, Switzerland",
      services: ["Dine-in", "Curbside pickup", "Indoor & outdoor seating"],
      priceLabel: "Price per person",
      priceValue: "CHF 20–30",
      priceReported: "Reported by 149 guests",
      hoursLabel: "Opening hours",
      hoursDays: "Monday – Friday",
      hoursTime: "11:30 AM – 10:30 PM",
      peakTitle: "Popular times · Thursday",
      peakLive: "Less busy than usual",
      directionsCta: "Directions",
      callCta: "+41 31 371 11 31",
    },
    reviewsSection: {
      eyebrow: "GOOGLE MAPS REVIEWS",
      ratingScore: "4.8",
      totalCount: "1,649 reviews",
      priceSummary: "Pizzeria · CHF 20–30",
      tags: ["italian · 30", "vegan · 16", "neapolitan pizza · 14", "perfect · 14"],
      googleCta: "View on Google Maps",
      items: [
        {
          author: "Cosi Raitmayr",
          meta: "Local Guide · 256 reviews · 146 photos",
          timeAgo: "3 months ago",
          quote:
            "Amazing Pizzaria!! We got the pizza special, the siciliano and 4 stazione - each was insanely delicious. The staff was super friendly and attentive AND helpful. There is indoor and outdoor seating available as well. We also enjoyed the kombucha and mate drinks. Will definitely come back!",
          tag: "Pizza Special · Siciliana · 4 Stagioni",
        },
        {
          author: "AS SAWA",
          meta: "Local Guide · 512 reviews · 11,968 photos",
          timeAgo: "2 months ago",
          quote:
            "I ordered the signature one I think, the 4 stagioni, I love the level of dough. It is thin and crust.",
          tag: "4 Stagioni · Thin Crust",
        },
        {
          author: "Tim bird",
          meta: "Local Guide · 136 reviews · 125 photos",
          timeAgo: "2 months ago",
          quote:
            "We loved our visit to this place! Was busy even on a Monday and from the taste of the pizza I can see why! The pizza tasted great and was reasonably priced!",
          tag: "Dine-in · Bern",
        },
      ],
      footerTagline: "Pizzeria Da Nino · Belpstrasse 65, 3007 Bern · Klein aber fein",
    },
  },
};
