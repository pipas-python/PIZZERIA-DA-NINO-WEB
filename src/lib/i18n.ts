"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import type { MenuCategoryId, MenuSubCategoryId, SizeKey } from "@/config/menu";
import type { PizzaLayerSpec } from "@/config/products";

export type Locale = "de" | "it" | "fr" | "en";

const LOCALE_EVENT = "danino:locale-change";
const STORAGE_KEY = "danino_locale";
const DEFAULT_LOCALE: Locale = "de";

export function isValidLocale(val: string | null | undefined): val is Locale {
  return val === "de" || val === "it" || val === "fr" || val === "en";
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
    document.title = DICTIONARIES[locale].pageTitle;
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
  pageTitle: string;
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
    srHeading: string;
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
    filterGroupAria: string;
    legendGroupAria: string;
    categories: Record<MenuCategoryId, string>;
    subCategories: Record<MenuSubCategoryId, string>;
    sizes: Record<SizeKey, string>;
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
    servicesAria: string;
    addressLabel: string;
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
    peakTicks: [string, string, string, string, string, string];
    directionsCta: string;
    callCta: string;
    mapIframeTitle: string;
    mapSatelliteBadge: string;
    mapUnlockTouch: string;
    mapLockTouch: string;
    mapOpenExternal: string;
  };
  reviewsSection: {
    eyebrow: string;
    ratingScore: string;
    starsAria: string;
    totalCount: string;
    priceSummary: string;
    tags: [string, string, string, string];
    googleCta: string;
    items: [ReviewEntry, ReviewEntry, ReviewEntry];
    footerTagline: string;
    privacyLabel: string;
    imprintLabel: string;
  };
}

export const DICTIONARIES: Record<Locale, UiDictionary> = {
  de: {
    pageTitle: "Pizzeria da Nino · Belpstrasse 65, 3007 Bern | Pizza & Take Away",
    skipToMain: "Zum Inhalt springen",
    header: {
      brandAria: "Pizzeria Da Nino Bern — Startseite",
      navAria: "Hauptnavigation",
      mobileNavAria: "Mobile Navigation",
      openMenuAria: "Menü öffnen",
      closeMenuAria: "Menü schliessen",
      langGroupAria: "Sprache wählen",
      nav: {
        home: "Start",
        menu: "Speisekarte",
        location: "Standort",
        reviews: "Bewertungen",
      },
    },
    hero: {
      srHeading: "Pizzeria Da Nino — Belpstrasse 65, 3007 Bern",
      metaLine: "Pizzeria · Belpstrasse 65, Bern · ★ 4,8 (1.649)",
      scrollCue: "Scrollen",
      pizzaEyebrow: "450 °C STEINOFEN · 72H TEIGRUHE",
      pizzaTitle: "4 Stagioni.",
      pizzaIngredients: "Tomaten · Fior di Latte · Pilze · Artischocken · Oliven · Salami · Basilikum",
      pizzaNote: "Dünner, knuspriger Teig · Klein -CHF 2.00",
      pizzaCta: "Zur Speisekarte",
      layers: {
        basil: "Frisches Basilikum & Olivenöl",
        toppings: "Pilze, Artischocken, Oliven & Salami",
        mozzarella: "Mozzarella Fior di Latte",
        pelati: "San-Marzano-Tomaten",
        crust: "72h Steinofen-Teig",
      },
    },
    menuSection: {
      specialHeading: "Pizza-Spezialität",
      eyebrow: "OFFIZIELLE SPEISEKARTE · PREISE IN CHF",
      title: "Speisekarte.",
      priceRangeNote: "Fr. 20–30 pro Person · Speisen vor Ort & Abholung vor dem Laden",
      filterGroupAria: "Ernährungsfilter",
      legendGroupAria: "Zutaten-Legende",
      categories: {
        pizze: "Pizzen",
        antipasti_dolci: "Vorspeisen & Desserts",
        aperitivo: "Aperitif & Alkoholfrei",
        birra_vino: "Bier & Wein",
        bibite_caffe: "Getränke & Kaffee",
      },
      subCategories: {
        pizza_special: "Pizza-Spezialität",
        pizze: "Pizzen",
        antipasti: "Vorspeisen",
        dolci: "Desserts",
        aperitivo: "Aperitif",
        senza_alcool: "Alkoholfrei",
        birra: "Bier",
        vino_bollicine: "Wein & Schaumwein",
        bibite: "Erfrischungsgetränke",
        digestivi_caffe: "Digestifs & Kaffee",
      },
      sizes: {
        slice: "Stück",
        whole: "Ganz",
        liter1: "1 Liter",
        "10 cl": "10 cl",
        "25 cl": "25 cl",
        "30 cl": "30 cl",
        "33 cl": "33 cl",
        "50 cl": "50 cl",
        "75 cl": "75 cl",
        "4 cl": "4 cl",
        "2 cl": "2 cl",
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
        taxNote: "Alle Pizzen auch klein (-CHF 2.00) · Preise in CHF inkl. MwSt.",
      },
    },
    locationSection: {
      eyebrow: "STANDORT · AM EIGERPLATZ",
      title: "Belpstrasse 65.",
      statusOpen: "Geöffnet",
      closesAt: "Schliesst um 22:30 Uhr",
      servicesAria: "Serviceoptionen",
      addressLabel: "Adresse",
      addressStreet: "Belpstrasse 65",
      addressCity: "3007 Bern, Schweiz",
      plusCode: "WCRJ+RH Bern, Schweiz",
      services: ["Speisen vor Ort", "Abholung vor dem Laden", "Sitzplätze innen & aussen"],
      priceLabel: "Preis pro Person",
      priceValue: "Fr. 20–30",
      priceReported: "Von 149 Gästen gemeldet",
      hoursLabel: "Öffnungszeiten",
      hoursDays: "Montag – Freitag",
      hoursTime: "11:30 – 22:30 Uhr",
      peakTitle: "Stosszeiten · Donnerstag",
      peakLive: "Weniger besucht als gewöhnlich",
      peakTicks: ["06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
      directionsCta: "Route planen",
      callCta: "+41 31 371 11 31",
      mapIframeTitle: "Satellitenkarte Pizzeria da Nino, Belpstrasse 65, 3007 Bern",
      mapSatelliteBadge: "Satellit",
      mapUnlockTouch: "Karte bewegen",
      mapLockTouch: "Fertig",
      mapOpenExternal: "In Google Maps öffnen ↗",
    },
    reviewsSection: {
      eyebrow: "GOOGLE MAPS BEWERTUNGEN",
      ratingScore: "4,8",
      starsAria: "4,8 von 5 Sternen",
      totalCount: "1.649 Bewertungen",
      priceSummary: "Pizzeria · Fr. 20–30",
      tags: ["italienisch · 30", "vegan · 16", "neapolitanische pizza · 14", "perfekt · 14"],
      googleCta: "Auf Google Maps ansehen",
      items: [
        {
          author: "Cosi Raitmayr",
          meta: "Local Guide · 256 Bewertungen · 146 Fotos",
          timeAgo: "Vor 3 Monaten",
          quote:
            "Fantastische Pizzeria!! Wir hatten das Pizza-Special, die Siciliana und die 4 Stagioni – jede einzelne war unglaublich lecker. Das Team war super freundlich, aufmerksam und hilfsbereit. Es gibt Sitzplätze drinnen und draussen. Auch Kombucha und Mate haben uns sehr geschmeckt. Wir kommen definitiv wieder!",
          tag: "Pizza-Special · Siciliana · 4 Stagioni",
        },
        {
          author: "AS SAWA",
          meta: "Local Guide · 512 Bewertungen · 11.968 Fotos",
          timeAgo: "Vor 2 Monaten",
          quote:
            "Ich habe die Hausspezialität bestellt, die 4 Stagioni – ich liebe diesen Teig. Er ist herrlich dünn und knusprig.",
          tag: "4 Stagioni · Knuspriger Teig",
        },
        {
          author: "Tim bird",
          meta: "Local Guide · 136 Bewertungen · 125 Fotos",
          timeAgo: "Vor 2 Monaten",
          quote:
            "Wir waren begeistert von unserem Besuch! Selbst an einem Montag war viel los, und beim Geschmack der Pizza versteht man sofort warum. Grossartige Pizza zu einem sehr fairen Preis!",
          tag: "Vor Ort · Bern",
        },
      ],
      footerTagline: "Pizzeria Da Nino · Belpstrasse 65, 3007 Bern · Klein aber fein",
      privacyLabel: "Datenschutz",
      imprintLabel: "Impressum",
    },
  },

  it: {
    pageTitle: "Pizzeria da Nino · Belpstrasse 65, 3007 Berna | Pizza & Asporto",
    skipToMain: "Vai al contenuto",
    header: {
      brandAria: "Pizzeria Da Nino Berna — Home",
      navAria: "Navigazione principale",
      mobileNavAria: "Navigazione mobile",
      openMenuAria: "Apri menu",
      closeMenuAria: "Chiudi menu",
      langGroupAria: "Seleziona lingua",
      nav: {
        home: "Home",
        menu: "Menu",
        location: "Posizione",
        reviews: "Recensioni",
      },
    },
    hero: {
      srHeading: "Pizzeria Da Nino — Belpstrasse 65, 3007 Berna",
      metaLine: "Pizzeria · Belpstrasse 65, Berna · ★ 4,8 (1.649)",
      scrollCue: "Scorri",
      pizzaEyebrow: "FORNO A PIETRA 450 °C · LIEVITAZIONE 72 ORE",
      pizzaTitle: "4 Stagioni.",
      pizzaIngredients: "Pelati · Fior di Latte · Funghi · Carciofi · Olive · Salame · Basilico",
      pizzaNote: "Impasto sottile e croccante · Piccola -CHF 2.00",
      pizzaCta: "Vedi il Menu",
      layers: {
        basil: "Basilico Genovese & Olio EVO",
        toppings: "Funghi, Carciofi, Olive & Salame",
        mozzarella: "Mozzarella Fior di Latte",
        pelati: "Pomodori Pelati San Marzano",
        crust: "Impasto Napoletano 72h",
      },
    },
    menuSection: {
      specialHeading: "Pizza Speciale",
      eyebrow: "CARTA UFFICIALE · PREZZI IN CHF",
      title: "Menu.",
      priceRangeNote: "Fr. 20–30 a persona · Consumazione sul posto & Ritiro all’esterno",
      filterGroupAria: "Filtri alimentari",
      legendGroupAria: "Legenda ingredienti",
      categories: {
        pizze: "Pizze",
        antipasti_dolci: "Antipasti & Dolci",
        aperitivo: "Aperitivo & Analcolici",
        birra_vino: "Birra & Vino",
        bibite_caffe: "Bibite & Caffè",
      },
      subCategories: {
        pizza_special: "Pizza Speciale",
        pizze: "Pizze",
        antipasti: "Antipasti",
        dolci: "Dolci",
        aperitivo: "Aperitivo",
        senza_alcool: "Senza alcol",
        birra: "Birra",
        vino_bollicine: "Vino e Bollicine",
        bibite: "Bibite",
        digestivi_caffe: "Digestivi & Caffè",
      },
      sizes: {
        slice: "Fetta",
        whole: "Intera",
        liter1: "1 litro",
        "10 cl": "10 cl",
        "25 cl": "25 cl",
        "30 cl": "30 cl",
        "33 cl": "33 cl",
        "50 cl": "50 cl",
        "75 cl": "75 cl",
        "4 cl": "4 cl",
        "2 cl": "2 cl",
      },
      filters: {
        all: "Tutte",
        vegetarian: "Vegetariana",
        vegan: "Vegana",
        meat: "Carne",
        fish: "Pesce",
      },
      legend: {
        vegetarian: "Vegetariano",
        vegan: "Vegano",
        pork: "Maiale",
        cow: "Manzo",
        fish: "Pesce",
        taxNote: "Tutte le pizze disponibili anche piccole (-CHF 2.00) · Prezzi in CHF IVA incl.",
      },
    },
    locationSection: {
      eyebrow: "POSIZIONE · AM EIGERPLATZ",
      title: "Belpstrasse 65.",
      statusOpen: "Aperto",
      closesAt: "Chiude alle 22:30",
      servicesAria: "Opzioni di servizio",
      addressLabel: "Indirizzo",
      addressStreet: "Belpstrasse 65",
      addressCity: "3007 Berna, Svizzera",
      plusCode: "WCRJ+RH Berna, Svizzera",
      services: ["Consumazione sul posto", "Ritiro all’esterno", "Tavoli interni ed esterni"],
      priceLabel: "Prezzo a persona",
      priceValue: "Fr. 20–30",
      priceReported: "Segnalato da 149 ospiti",
      hoursLabel: "Orari di apertura",
      hoursDays: "Lunedì – Venerdì",
      hoursTime: "11:30 – 22:30",
      peakTitle: "Orari di punta · Giovedì",
      peakLive: "Meno affollato del solito",
      peakTicks: ["06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
      directionsCta: "Indicazioni stradali",
      callCta: "+41 31 371 11 31",
      mapIframeTitle: "Mappa satellitare Pizzeria da Nino, Belpstrasse 65, 3007 Berna",
      mapSatelliteBadge: "Satellite",
      mapUnlockTouch: "Muovi mappa",
      mapLockTouch: "Chiudi",
      mapOpenExternal: "Apri in Google Maps ↗",
    },
    reviewsSection: {
      eyebrow: "RECENSIONI GOOGLE MAPS",
      ratingScore: "4,8",
      starsAria: "4,8 su 5 stelle",
      totalCount: "1.649 recensioni",
      priceSummary: "Pizzeria · Fr. 20–30",
      tags: ["italiana · 30", "vegana · 16", "pizza napoletana · 14", "perfetto · 14"],
      googleCta: "Vedi su Google Maps",
      items: [
        {
          author: "Cosi Raitmayr",
          meta: "Local Guide · 256 recensioni · 146 foto",
          timeAgo: "3 mesi fa",
          quote:
            "Pizzeria straordinaria!! Abbiamo preso la pizza speciale, la Siciliana e la 4 Stagioni: ognuna era incredibilmente deliziosa. Personale super cordiale, attento e disponibile. Ci sono posti a sedere sia all’interno che all’aperto. Ottimi anche kombucha e mate. Torneremo sicuramente!",
          tag: "Pizza Speciale · Siciliana · 4 Stagioni",
        },
        {
          author: "AS SAWA",
          meta: "Local Guide · 512 recensioni · 11.968 foto",
          timeAgo: "2 mesi fa",
          quote:
            "Ho ordinato una delle specialità della casa, la 4 Stagioni: adoro la qualità dell’impasto, sottile e croccante al punto giusto.",
          tag: "4 Stagioni · Impasto Sottile",
        },
        {
          author: "Tim bird",
          meta: "Local Guide · 136 recensioni · 125 foto",
          timeAgo: "2 mesi fa",
          quote:
            "Abbiamo adorato la nostra visita! Era pieno persino di lunedì e assaggiando la pizza si capisce subito perché. Sapore eccezionale e prezzi davvero onesti!",
          tag: "Sul posto · Berna",
        },
      ],
      footerTagline: "Pizzeria Da Nino · Belpstrasse 65, 3007 Berna · Piccola ma raffinata",
      privacyLabel: "Privacy",
      imprintLabel: "Note legali",
    },
  },

  fr: {
    pageTitle: "Pizzeria da Nino · Belpstrasse 65, 3007 Berne | Pizza & À emporter",
    skipToMain: "Aller au contenu",
    header: {
      brandAria: "Pizzeria Da Nino Berne — Accueil",
      navAria: "Navigation principale",
      mobileNavAria: "Navigation mobile",
      openMenuAria: "Ouvrir le menu",
      closeMenuAria: "Fermer le menu",
      langGroupAria: "Choisir la langue",
      nav: {
        home: "Accueil",
        menu: "Carte",
        location: "Adresse",
        reviews: "Avis",
      },
    },
    hero: {
      srHeading: "Pizzeria Da Nino — Belpstrasse 65, 3007 Berne",
      metaLine: "Pizzeria · Belpstrasse 65, Berne · ★ 4,8 (1.649)",
      scrollCue: "Défiler",
      pizzaEyebrow: "FOUR SUR PIERRE 450 °C · FERMENTATION 72H",
      pizzaTitle: "4 Stagioni.",
      pizzaIngredients: "Tomates pelati · Fior di Latte · Champignons · Artichauts · Olives · Salami · Basilic",
      pizzaNote: "Pâte fine et croustillante · Petite -CHF 2.00",
      pizzaCta: "Voir la Carte",
      layers: {
        basil: "Basilic Frais & Huile d’Olive",
        toppings: "Champignons, Artichauts, Olives & Salami",
        mozzarella: "Mozzarella Fior di Latte",
        pelati: "Tomates Pelati San Marzano",
        crust: "Pâte Napolitaine 72h",
      },
    },
    menuSection: {
      specialHeading: "Pizza Spéciale",
      eyebrow: "CARTE OFFICIELLE · PRIX EN CHF",
      title: "La Carte.",
      priceRangeNote: "Fr. 20–30 par personne · Repas sur place & Retrait devant le restaurant",
      filterGroupAria: "Filtres alimentaires",
      legendGroupAria: "Légende des ingrédients",
      categories: {
        pizze: "Pizzas",
        antipasti_dolci: "Entrées & Desserts",
        aperitivo: "Apéritif & Sans alcool",
        birra_vino: "Bières & Vins",
        bibite_caffe: "Boissons & Café",
      },
      subCategories: {
        pizza_special: "Pizza Spéciale",
        pizze: "Pizzas",
        antipasti: "Entrées",
        dolci: "Desserts",
        aperitivo: "Apéritif",
        senza_alcool: "Sans alcool",
        birra: "Bières",
        vino_bollicine: "Vins & Effervescents",
        bibite: "Boissons fraîches",
        digestivi_caffe: "Digestifs & Café",
      },
      sizes: {
        slice: "Part",
        whole: "Entière",
        liter1: "1 litre",
        "10 cl": "10 cl",
        "25 cl": "25 cl",
        "30 cl": "30 cl",
        "33 cl": "33 cl",
        "50 cl": "50 cl",
        "75 cl": "75 cl",
        "4 cl": "4 cl",
        "2 cl": "2 cl",
      },
      filters: {
        all: "Toutes",
        vegetarian: "Végétarien",
        vegan: "Végan",
        meat: "Viande",
        fish: "Poisson",
      },
      legend: {
        vegetarian: "Végétarien",
        vegan: "Végan",
        pork: "Porc",
        cow: "Bœuf",
        fish: "Poisson",
        taxNote: "Toutes les pizzas aussi en petit format (-CHF 2.00) · Prix en CHF TVA incl.",
      },
    },
    locationSection: {
      eyebrow: "ADRESSE · AM EIGERPLATZ",
      title: "Belpstrasse 65.",
      statusOpen: "Ouvert",
      closesAt: "Ferme à 22:30",
      servicesAria: "Options de service",
      addressLabel: "Adresse",
      addressStreet: "Belpstrasse 65",
      addressCity: "3007 Berne, Suisse",
      plusCode: "WCRJ+RH Berne, Suisse",
      services: ["Repas sur place", "Retrait à l’extérieur", "Places intérieures & terrasse"],
      priceLabel: "Prix par personne",
      priceValue: "Fr. 20–30",
      priceReported: "Signalé par 149 clients",
      hoursLabel: "Horaires d’ouverture",
      hoursDays: "Lundi – Vendredi",
      hoursTime: "11:30 – 22:30",
      peakTitle: "Heures d’affluence · Jeudi",
      peakLive: "Moins fréquenté qu’à l’accoutumée",
      peakTicks: ["06h", "09h", "12h", "15h", "18h", "21h"],
      directionsCta: "Itinéraire",
      callCta: "+41 31 371 11 31",
      mapIframeTitle: "Vue satellite Pizzeria da Nino, Belpstrasse 65, 3007 Berne",
      mapSatelliteBadge: "Satellite",
      mapUnlockTouch: "Déplacer la carte",
      mapLockTouch: "Fermer",
      mapOpenExternal: "Ouvrir dans Google Maps ↗",
    },
    reviewsSection: {
      eyebrow: "AVIS GOOGLE MAPS",
      ratingScore: "4,8",
      starsAria: "4,8 sur 5 étoiles",
      totalCount: "1.649 avis",
      priceSummary: "Pizzeria · Fr. 20–30",
      tags: ["italienne · 30", "végane · 16", "pizza napolitaine · 14", "parfait · 14"],
      googleCta: "Voir sur Google Maps",
      items: [
        {
          author: "Cosi Raitmayr",
          meta: "Local Guide · 256 avis · 146 photos",
          timeAgo: "Il y a 3 mois",
          quote:
            "Pizzeria incroyable !! Nous avons pris la pizza spéciale, la Siciliana et la 4 Stagioni : chacune était absolument délicieuse. Le personnel était super sympathique, attentif et serviable. Places assises à l’intérieur comme en terrasse, et excellents kombucha et maté. Nous reviendrons sans hésiter !",
          tag: "Pizza Spéciale · Siciliana · 4 Stagioni",
        },
        {
          author: "AS SAWA",
          meta: "Local Guide · 512 avis · 11.968 photos",
          timeAgo: "Il y a 2 mois",
          quote:
            "J’ai commandé la spécialité de la maison, la 4 Stagioni : j’adore la qualité de la pâte, fine et parfaitement croustillante.",
          tag: "4 Stagioni · Pâte Fine",
        },
        {
          author: "Tim bird",
          meta: "Local Guide · 136 avis · 125 photos",
          timeAgo: "Il y a 2 mois",
          quote:
            "Nous avons adoré notre visite ! C’était animé même un lundi et dès la première bouchée on comprend pourquoi. Une pizza savoureuse à un prix très raisonnable !",
          tag: "Sur place · Berne",
        },
      ],
      footerTagline: "Pizzeria Da Nino · Belpstrasse 65, 3007 Berne · Petite mais raffinée",
      privacyLabel: "Confidentialité",
      imprintLabel: "Mentions légales",
    },
  },

  en: {
    pageTitle: "Pizzeria da Nino · Belpstrasse 65, 3007 Bern | Pizza & Take Away",
    skipToMain: "Skip to content",
    header: {
      brandAria: "Pizzeria Da Nino Bern — Home",
      navAria: "Primary navigation",
      mobileNavAria: "Mobile navigation",
      openMenuAria: "Open menu",
      closeMenuAria: "Close menu",
      langGroupAria: "Select language",
      nav: {
        home: "Home",
        menu: "Menu",
        location: "Location",
        reviews: "Reviews",
      },
    },
    hero: {
      srHeading: "Pizzeria Da Nino — Belpstrasse 65, 3007 Bern",
      metaLine: "Pizzeria · Belpstrasse 65, Bern · ★ 4.8 (1,649)",
      scrollCue: "Scroll",
      pizzaEyebrow: "450 °C STONE OVEN · 72H DOUGH",
      pizzaTitle: "4 Stagioni.",
      pizzaIngredients: "Pelati tomatoes · Fior di Latte · Mushrooms · Artichokes · Olives · Salami · Basil",
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
      specialHeading: "Pizza Special",
      eyebrow: "OFFICIAL MENU · PRICES IN CHF",
      title: "Menu.",
      priceRangeNote: "CHF 20–30 per person · Dine-in & Curbside pickup",
      filterGroupAria: "Dietary filter",
      legendGroupAria: "Dietary legend",
      categories: {
        pizze: "Pizzas",
        antipasti_dolci: "Starters & Desserts",
        aperitivo: "Aperitif & Alcohol-Free",
        birra_vino: "Beer & Wine",
        bibite_caffe: "Drinks & Coffee",
      },
      subCategories: {
        pizza_special: "Pizza Special",
        pizze: "Pizzas",
        antipasti: "Starters",
        dolci: "Desserts",
        aperitivo: "Aperitif",
        senza_alcool: "Alcohol-free",
        birra: "Beer",
        vino_bollicine: "Wine & Sparkling",
        bibite: "Soft Drinks",
        digestivi_caffe: "Digestifs & Coffee",
      },
      sizes: {
        slice: "Slice",
        whole: "Whole",
        liter1: "1 liter",
        "10 cl": "10 cl",
        "25 cl": "25 cl",
        "30 cl": "30 cl",
        "33 cl": "33 cl",
        "50 cl": "50 cl",
        "75 cl": "75 cl",
        "4 cl": "4 cl",
        "2 cl": "2 cl",
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
      servicesAria: "Service options",
      addressLabel: "Address",
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
      peakTicks: ["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
      directionsCta: "Directions",
      callCta: "+41 31 371 11 31",
      mapIframeTitle: "Satellite map of Pizzeria da Nino, Belpstrasse 65, 3007 Bern",
      mapSatelliteBadge: "Satellite",
      mapUnlockTouch: "Explore map",
      mapLockTouch: "Done",
      mapOpenExternal: "Open in Google Maps ↗",
    },
    reviewsSection: {
      eyebrow: "GOOGLE MAPS REVIEWS",
      ratingScore: "4.8",
      starsAria: "4.8 out of 5 stars",
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
      footerTagline: "Pizzeria Da Nino · Belpstrasse 65, 3007 Bern · Small but fine",
      privacyLabel: "Privacy Policy",
      imprintLabel: "Legal Notice",
    },
  },
};
