"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import type { ProductKey } from "@/config/products";

export type Locale = "de" | "en" | "es";

const LOCALE_EVENT = "danino:locale-change";
const STORAGE_KEY = "danino_locale";
const DEFAULT_LOCALE: Locale = "de";

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

export interface ProductTranslation {
  navLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  kineticWords: [string, string];
  metricValue: string;
  metricLabel: string;
  ctaLabel: string;
  addBagLabel: string;
  uiMockupLabel: string;
  samplePrice: string;
  pdfDishName: string;
  layers: Record<string, string>;
}

export interface UiDictionary {
  skipToMain: string;
  header: {
    brandAria: string;
    locationBadge: string;
    vipPrefix: string;
    vipTitlePrefix: string;
    navAria: string;
    mobileNavAria: string;
    navFullMenu: string;
    ctaDemo: string;
    mobileCtaDemo: string;
    openMenuAria: string;
    closeMenuAria: string;
    langGroupAria: string;
  };
  scrolly: {
    phases: {
      p1: string;
      p2: string;
      p3: string;
    };
    xrayAssemble: string;
    xrayExplode: string;
    pdfBackTo60: string;
    pdfCompare: string;
    inspectorGroupAria: string;
    inspectorIsolatedPrefix: string;
    inspectorPrompt: string;
    pdfRegionAria: string;
    pdfFileName: string;
    pdfPageLabel: string;
    pdfIngredientsPrefix: string;
    pdfWarning: string;
    pdfRestoreBtn: string;
    scrollCue: string;
    previewAriaPrefix: string;
  };
  menuSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
    specialHeading: string;
    specialAddBtn: string;
    categories: {
      pizze: string;
      antipasti_dolci: string;
      aperitivo: string;
      birra_vino: string;
      bibite_caffe: string;
    };
    filters: {
      all: string;
      vegetarian: string;
      vegan: string;
      meat: string;
      fish: string;
    };
    searchPlaceholder: string;
    clearSearch: string;
    emptyResult: string;
    addBtn: string;
    addedFlash: string;
    legend: {
      vegetarian: string;
      vegan: string;
      pork: string;
      cow: string;
      fish: string;
      taxNote: string;
    };
    cartBar: {
      bagTitle: string;
      checkoutBtn: string;
      clearBtn: string;
    };
  };
  closing: {
    eyebrowDefault: string;
    eyebrowVipPrefix: string;
    headlineDefault: string;
    headlineVip: (name: string) => string;
    lead: string;
    hoursTitle: string;
    hoursDays: string;
    hoursTime: string;
    addressTitle: string;
    addressStreet: string;
    addressCity: string;
    phoneLabel: string;
    sealText: string;
    successBadge: string;
    successTitle: (name: string) => string;
    successBody: (focus: string, channel: string) => string;
    successWhatsappBtn: string;
    successResetBtn: string;
    formBadgeDefault: string;
    formBadgeVip: (name: string) => string;
    formTitle: string;
    honeypotLabel: string;
    restaurantLabel: string;
    restaurantPlaceholder: string;
    dishFocusLabel: string;
    concepts: {
      dodici: string;
      eigerplatz: string;
      dolce: string;
      table: string;
    };
    cartSummaryLabel: string;
    cartEmptyHint: string;
    contactLabel: string;
    contactPlaceholder: string;
    submitIdle: string;
    submitPending: string;
    directPrompt: string;
    directWhatsappLink: string;
    whatsappDefaultText: string;
    footerTagline: string;
    vipToggleActive: (name: string) => string;
    vipToggleIdle: string;
    vipBuilderLabel: string;
    vipBuilderPlaceholder: string;
    vipBuilderCopied: string;
    vipBuilderSubmit: string;
    vipBuilderClear: string;
  };
  products: Record<ProductKey, ProductTranslation>;
}

export const DICTIONARIES: Record<Locale, UiDictionary> = {
  de: {
    skipToMain: "Zum Hauptinhalt springen",
    header: {
      brandAria: "Pizzeria Da Nino am Eigerplatz Bern — nach oben",
      locationBadge: "AM EIGERPLATZ · BERN",
      vipPrefix: "GAST",
      vipTitlePrefix: "Persönliche Einladung für",
      navAria: "Hauptnavigation Pizzeria Da Nino",
      mobileNavAria: "Mobile Navigation",
      navFullMenu: "Take Away Karte",
      ctaDemo: "Take Away / Tisch",
      mobileCtaDemo: "Vorbestellen oder Tisch reservieren →",
      openMenuAria: "Navigationsmenü öffnen",
      closeMenuAria: "Navigationsmenü schließen",
      langGroupAria: "Sprache wählen",
    },
    scrolly: {
      phases: {
        p1: "01 · ZUTATEN-EXPLOSION",
        p2: "02 · FRISCH AUS DEM OFEN",
        p3: "03 · TAKE AWAY & GENUSS",
      },
      xrayAssemble: "✦ Pizza zusammensetzen",
      xrayExplode: "✦ 5-Schichten Inspektor",
      pdfBackTo60: "← Zurück zur Pizza",
      pdfCompare: "🔥 Steinofen-Steckbrief",
      inspectorGroupAria: "Interaktiver Zutaten-Schichten-Inspektor",
      inspectorIsolatedPrefix: "ISOLIERTE ZUTAT",
      inspectorPrompt: "ZUTAT ANTIPPEN ZUM ISOLIEREN:",
      pdfRegionAria: "Steinofen-Rezeptur & Back-Spezifikation",
      pdfFileName: "STEINOFEN-REZEPTUR · 450 °C",
      pdfPageLabel: "BELPSTRASSE 65 · BERN",
      pdfIngredientsPrefix: "5 Frisch-Schichten",
      pdfWarning: "✦ 72H TEIGRUHE · KLEIN -CHF 2.00 · FRISCH AUS DEM OFEN",
      pdfRestoreBtn: "← Zurück zur Steinofen-Ansicht",
      scrollCue: "SCROLLEN ZUM BACKEN",
      previewAriaPrefix: "Auswahl öffnen",
    },
    menuSection: {
      eyebrow: "KOMPLETTE KARTE · RESTAURANT & TAKE AWAY",
      title: "Take Away Karte",
      subtitle:
        "Klein aber fein am Eigerplatz in Bern. Tippe auf ein Gericht oder Getränk, um es direkt deiner Take-Away-Vorbestellung hinzuzufügen.",
      specialHeading: "Pizza-Special",
      specialAddBtn: "+ Numero Dodici (CHF 19.00)",
      categories: {
        pizze: "Pizze (20)",
        antipasti_dolci: "Antipasti & Dolci",
        aperitivo: "Aperitivo & Senza Alcool",
        birra_vino: "Birra, Vino & Bollicine",
        bibite_caffe: "Bibite, Digestivi & Cafe",
      },
      filters: {
        all: "Alle",
        vegetarian: "Vegetarisch",
        vegan: "Vegan",
        meat: "Schwein & Rind",
        fish: "Fisch",
      },
      searchPlaceholder: "Pizza, Zutat oder Getränk suchen (z. B. Stracciatella, Burrata, Spumoni)…",
      clearSearch: "Filter zurücksetzen",
      emptyResult: "Keine Einträge für diesen Filter gefunden.",
      addBtn: "+ Wahl",
      addedFlash: "✓ Im Korb",
      legend: {
        vegetarian: "vegetarisch",
        vegan: "vegan",
        pork: "Schwein",
        cow: "Rind",
        fish: "Fisch",
        taxNote: "Take Away Preise in CHF inkl. MwSt",
      },
      cartBar: {
        bagTitle: "Deine Take-Away Auswahl",
        checkoutBtn: "Jetzt vorbestellen →",
        clearBtn: "Leeren",
      },
    },
    closing: {
      eyebrowDefault: "BELPSTRASSE 65 · 3007 BERN · 031 371 11 31",
      eyebrowVipPrefix: "PERSÖNLICHE EINLADUNG FÜR",
      headlineDefault: "Komm vorbei, wir freuen uns.",
      headlineVip: (name: string) => `Komm vorbei, ${name} — wir freuen uns!`,
      lead: "Restaurant & Take Away am Eigerplatz in Bern. Klein aber fein: Bestelle deine Pizza zur Abholung vor oder reserviere deinen Tisch direkt online oder telefonisch.",
      hoursTitle: "Öffnungszeiten",
      hoursDays: "Montag – Freitag",
      hoursTime: "11.30 – 22:30 Uhr",
      addressTitle: "Kontakt & Standort",
      addressStreet: "Belpstrasse 65 (am Eigerplatz)",
      addressCity: "3007 Bern · Schweiz",
      phoneLabel: "+41 31 371 11 31",
      sealText: "PIZZERIA DA NINO · AM EIGERPLATZ BERN · KLEIN ABER FEIN ·",
      successBadge: "DA NINO EIGERPLATZ",
      successTitle: (name: string) => `Grazie mille, ${name}!`,
      successBody: (focus: string, channel: string) =>
        `Deine Anfrage (${focus}) ist bereit. Bestätige sie mit einem Klick per WhatsApp oder ruf uns kurz unter 031 371 11 31 an (${channel}).`,
      successWhatsappBtn: "Per WhatsApp bestätigen →",
      successResetBtn: "Neue Bestellung / Reservation",
      formBadgeDefault: "TAKE AWAY & TISCHRESERVATION",
      formBadgeVip: (name: string) => `RESERVATION · ${name.toUpperCase()}`,
      formTitle: "Take-Away vorbestellen oder Tisch reservieren",
      honeypotLabel: "Dieses Feld nicht ausfüllen",
      restaurantLabel: "Dein Name",
      restaurantPlaceholder: "z. B. Lukas Meier",
      dishFocusLabel: "Wunsch-Modus & Abholzeit / Tisch",
      concepts: {
        dodici: "Take Away · Pizza-Special Numero Dodici (CHF 19.00)",
        eigerplatz: "Take Away · Signature Pizza Eigerplatz (CHF 22.00)",
        dolce: "Take Away · Pizza alla Nutella & Aperitivo",
        table: "Tischreservation im Restaurant (Belpstrasse 65)",
      },
      cartSummaryLabel: "Ausgewählte Artikel aus der Take-Away Karte",
      cartEmptyHint: "Noch keine Artikel gewählt — du kannst oben in der Karte Pizze & Bibite antippen.",
      contactLabel: "Telefon / WhatsApp oder E-Mail + Wunschzeit (Mo–Fr 11.30–22.30)",
      contactPlaceholder: "+41 79 123 45 67 · Heute 18:30 Uhr",
      submitIdle: "Vorbestellung / Reservation absenden →",
      submitPending: "Wird gesendet…",
      directPrompt: "Lieber direkt telefonisch bestellen?",
      directWhatsappLink: "031 371 11 31 anrufen ↗",
      whatsappDefaultText:
        "Ciao Pizzeria Da Nino! Ich möchte gerne für heute an der Belpstrasse 65 bestellen / reservieren.",
      footerTagline: "PIZZERIA DA NINO · Belpstrasse 65 · 3007 Bern · 031 371 11 31",
      vipToggleActive: (name: string) => `✦ Persönlicher Gast-Link: ${name}`,
      vipToggleIdle: "✦ Einladungs-Link für Freunde teilen",
      vipBuilderLabel: "EINLADUNG PERSONALISIEREN (?para=):",
      vipBuilderPlaceholder: "Name des Gastes oder Teams (z. B. Team Eigerplatz)",
      vipBuilderCopied: "✓ Link in Zwischenablage kopiert",
      vipBuilderSubmit: "Aktivieren & Link kopieren",
      vipBuilderClear: "Zurücksetzen",
    },
    products: {
      dodici: {
        navLabel: "01 · Nº Dodici",
        eyebrow: "01 / PIZZA-SPECIAL · VEGETARISCH · CHF 19.00",
        title: "Numero Dodici.",
        subtitle:
          "Kürbiscreme, Shiitake-Pilze, gebackener Kürbis, karamellisierte Zwiebeln, geröstete Kürbiskerne und würziger Sbrinz.",
        kineticWords: [
          "NUMERO DODICI · KÜRBISCREME · SHIITAKE · SBRINZ ·",
          "PIZZERIA DA NINO · EIGERPLATZ BERN · KLEIN ABER FEIN ·",
        ],
        metricValue: "CHF 19.00",
        metricLabel: "Pizza-Special · Frisch aus dem Ofen",
        ctaLabel: "Numero Dodici bestellen",
        addBagLabel: "+ In den Take-Away Korb (CHF 19.00)",
        uiMockupLabel: "PIZZA-SPECIAL · DODICI",
        samplePrice: "CHF 19.00",
        pdfDishName: "numero dodici",
        layers: {
          "sbrinz-seeds": "Sbrinz & Kürbiskerne",
          "caramel-onions": "Karamellisierte Zwiebeln & Kürbis",
          "shiitake-cheese": "Shiitake-Pilze & Fior di Latte",
          "pumpkin-cream": "Samtige Kürbiscreme",
          crust: "72h Sauerteig-Pizzateig",
        },
      },
      eigerplatz: {
        navLabel: "02 · Eigerplatz",
        eyebrow: "02 / HAUS-SIGNATURE · BELPSTRASSE 65 · CHF 22.00",
        title: "Pizza Eigerplatz.",
        subtitle:
          "San-Marzano-Pelati, hausgemachte Pilzcreme, Prosciutto, cremige Stracciatella di Burrata, Coppa und Olivenöl.",
        kineticWords: [
          "PIZZA EIGERPLATZ · STRACCIATELLA DI BURRATA · COPPA ·",
          "PILZCREME · PROSCIUTTO · BELPSTRASSE 65 BERN ·",
        ],
        metricValue: "CHF 22.00",
        metricLabel: "Signature Pizza am Eigerplatz",
        ctaLabel: "Eigerplatz vorbestellen",
        addBagLabel: "+ In den Take-Away Korb (CHF 22.00)",
        uiMockupLabel: "SIGNATURE · EIGERPLATZ",
        samplePrice: "CHF 22.00",
        pdfDishName: "Eigerplatz",
        layers: {
          "basil-oil": "Basilikum & Olivenöl",
          "coppa-prosciutto": "Coppa & Prosciutto",
          stracciatella: "Stracciatella di Burrata",
          "pelati-pilzcreme": "Pelati & Pilzcreme",
          crust: "Knuspriger Holzofen-Teig",
        },
      },
      dolce: {
        navLabel: "03 · Dolce Nutella",
        eyebrow: "03 / DOLCI & APERITIVO · VEGAN · SLICE CHF 5.00",
        title: "Pizza alla Nutella.",
        subtitle:
          "Cremige Nutella vegetale und geröstete grüne Pistazien auf heißem, knusprigem Teig — als Slice (5.00) oder Ganz (20.00).",
        kineticWords: [
          "PIZZA ALLA NUTELLA · NUTELLA VEGETALE · PISTAZIEN ·",
          "SPUMONI · APEROL SPRITZ PICCOLINO · TIRAMISÙ DELLA CASA ·",
        ],
        metricValue: "CHF 5.00",
        metricLabel: "Slice CHF 5.00 · Ganz CHF 20.00",
        ctaLabel: "Dolce & Aperitivo wählen",
        addBagLabel: "+ Slice in den Korb (CHF 5.00)",
        uiMockupLabel: "DOLCI · NUTELLA VEGETALE",
        samplePrice: "CHF 5.00",
        pdfDishName: "Pizza alla nutella",
        layers: {
          pistachios: "Geröstete Pistazien",
          "hazelnut-crumble": "Haselnuss-Kakao-Swirl",
          "mascarpone-crema": "Pflanzliche Stracciatella",
          "nutella-vegetale": "Nutella vegetale della casa",
          "sweet-crust": "Knuspriger Dolce-Teig",
        },
      },
    },
  },
  en: {
    skipToMain: "Skip to main content",
    header: {
      brandAria: "Pizzeria Da Nino am Eigerplatz Bern — back to top",
      locationBadge: "EIGERPLATZ · BERN",
      vipPrefix: "GUEST",
      vipTitlePrefix: "Personal invitation for",
      navAria: "Pizzeria Da Nino navigation",
      mobileNavAria: "Mobile navigation",
      navFullMenu: "Take Away Menu",
      ctaDemo: "Take Away / Table",
      mobileCtaDemo: "Pre-order Take Away or book a table →",
      openMenuAria: "Open navigation menu",
      closeMenuAria: "Close navigation menu",
      langGroupAria: "Select language",
    },
    scrolly: {
      phases: {
        p1: "01 · INGREDIENT DECONSTRUCTION",
        p2: "02 · FRESH FROM THE OVEN",
        p3: "03 · TAKE AWAY & DINE IN",
      },
      xrayAssemble: "✦ Assemble pizza",
      xrayExplode: "✦ 5-Layer Inspector",
      pdfBackTo60: "← Back to Pizza",
      pdfCompare: "🔥 Stone-Oven Spec",
      inspectorGroupAria: "Interactive ingredient layer inspector",
      inspectorIsolatedPrefix: "ISOLATED INGREDIENT",
      inspectorPrompt: "TAP AN INGREDIENT TO ISOLATE:",
      pdfRegionAria: "Stone-oven recipe & bake specification",
      pdfFileName: "STONE-OVEN RECIPE · 450 °C",
      pdfPageLabel: "BELPSTRASSE 65 · BERN",
      pdfIngredientsPrefix: "5 Artisan Layers",
      pdfWarning: "✦ 72H FERMENTATION · SMALL -CHF 2.00 · BAKED FRESH",
      pdfRestoreBtn: "← Back to Stone-Oven View",
      scrollCue: "SCROLL TO BAKE",
      previewAriaPrefix: "Select item",
    },
    menuSection: {
      eyebrow: "COMPLETE MENU · RESTAURANT & TAKE AWAY",
      title: "Take Away Karte",
      subtitle:
        "Small but mighty at Eigerplatz in Bern. Tap any pizza, aperitivo, or dessert to add it directly to your Take-Away pre-order.",
      specialHeading: "Pizza-Special",
      specialAddBtn: "+ Numero Dodici (CHF 19.00)",
      categories: {
        pizze: "Pizze (20)",
        antipasti_dolci: "Antipasti & Dolci",
        aperitivo: "Aperitivo & Alcohol-Free",
        birra_vino: "Birra, Vino & Bubbles",
        bibite_caffe: "Soft Drinks, Digestivi & Espresso",
      },
      filters: {
        all: "All",
        vegetarian: "Vegetarian",
        vegan: "Vegan",
        meat: "Pork & Beef",
        fish: "Fish",
      },
      searchPlaceholder: "Search pizza, ingredient, or drink (e.g. Stracciatella, Burrata, Spumoni)…",
      clearSearch: "Reset filters",
      emptyResult: "No menu items match this filter.",
      addBtn: "+ Add",
      addedFlash: "✓ Added",
      legend: {
        vegetarian: "vegetarian",
        vegan: "vegan",
        pork: "pork",
        cow: "beef",
        fish: "fish",
        taxNote: "Take Away prices in CHF incl. VAT",
      },
      cartBar: {
        bagTitle: "Your Take-Away Bag",
        checkoutBtn: "Complete Pre-Order →",
        clearBtn: "Clear",
      },
    },
    closing: {
      eyebrowDefault: "BELPSTRASSE 65 · 3007 BERN · +41 31 371 11 31",
      eyebrowVipPrefix: "PERSONAL INVITATION FOR",
      headlineDefault: "Drop by, we look forward to seeing you.",
      headlineVip: (name: string) => `Drop by, ${name} — we look forward to welcoming you!`,
      lead: "Restaurant & Take Away at Eigerplatz in Bern. Klein aber fein: Pre-order your artisan pizza for quick pickup or book your table online or by phone.",
      hoursTitle: "Opening Hours",
      hoursDays: "Monday – Friday",
      hoursTime: "11:30 – 22:30",
      addressTitle: "Contact & Location",
      addressStreet: "Belpstrasse 65 (am Eigerplatz)",
      addressCity: "3007 Bern · Switzerland",
      phoneLabel: "+41 31 371 11 31",
      sealText: "PIZZERIA DA NINO · AM EIGERPLATZ BERN · KLEIN ABER FEIN ·",
      successBadge: "DA NINO EIGERPLATZ",
      successTitle: (name: string) => `Grazie mille, ${name}!`,
      successBody: (focus: string, channel: string) =>
        `Your request (${focus}) is ready. Confirm it with one tap via WhatsApp or call us at 031 371 11 31 (${channel}).`,
      successWhatsappBtn: "Confirm via WhatsApp →",
      successResetBtn: "New pre-order / booking",
      formBadgeDefault: "TAKE AWAY & TABLE RESERVATION",
      formBadgeVip: (name: string) => `VIP TABLE · ${name.toUpperCase()}`,
      formTitle: "Pre-order Take Away or book a table",
      honeypotLabel: "Do not fill this field",
      restaurantLabel: "Your Name",
      restaurantPlaceholder: "e.g. Lukas Meier",
      dishFocusLabel: "Order mode & preferred pickup / table",
      concepts: {
        dodici: "Take Away · Pizza-Special Numero Dodici (CHF 19.00)",
        eigerplatz: "Take Away · Signature Pizza Eigerplatz (CHF 22.00)",
        dolce: "Take Away · Pizza alla Nutella & Aperitivo",
        table: "Table reservation at Belpstrasse 65 (Dine-in)",
      },
      cartSummaryLabel: "Selected items from the Take-Away Menu",
      cartEmptyHint: "No items selected yet — tap any pizza or drink in the menu above to add it.",
      contactLabel: "Phone / WhatsApp or email + preferred time (Mon–Fri 11:30–22:30)",
      contactPlaceholder: "+41 79 123 45 67 · Today at 18:30",
      submitIdle: "Send Pre-Order / Reservation →",
      submitPending: "Sending…",
      directPrompt: "Prefer to order directly by phone?",
      directWhatsappLink: "Call 031 371 11 31 ↗",
      whatsappDefaultText:
        "Ciao Pizzeria Da Nino! I would like to place a Take-Away order / reserve a table at Belpstrasse 65.",
      footerTagline: "PIZZERIA DA NINO · Belpstrasse 65 · 3007 Bern · +41 31 371 11 31",
      vipToggleActive: (name: string) => `✦ Personal guest link: ${name}`,
      vipToggleIdle: "✦ Create personalized invitation link",
      vipBuilderLabel: "PERSONALIZE INVITATION (?para=):",
      vipBuilderPlaceholder: "Guest or group name (e.g. Team Eigerplatz)",
      vipBuilderCopied: "✓ Invitation link copied",
      vipBuilderSubmit: "Activate & copy link",
      vipBuilderClear: "Clear",
    },
    products: {
      dodici: {
        navLabel: "01 · Nº Dodici",
        eyebrow: "01 / PIZZA-SPECIAL · VEGETARIAN · CHF 19.00",
        title: "Numero Dodici.",
        subtitle:
          "Velvety pumpkin cream, roasted shiitake mushrooms, oven-baked Hokkaido pumpkin, caramelized onions, toasted pumpkin seeds, and aged Sbrinz AOP.",
        kineticWords: [
          "NUMERO DODICI · PUMPKIN CREAM · SHIITAKE · SBRINZ AOP ·",
          "PIZZERIA DA NINO · EIGERPLATZ BERN · KLEIN ABER FEIN ·",
        ],
        metricValue: "CHF 19.00",
        metricLabel: "Seasonal Pizza-Special · Bern",
        ctaLabel: "Pre-order Numero Dodici",
        addBagLabel: "+ Add to Take-Away Bag (CHF 19.00)",
        uiMockupLabel: "PIZZA-SPECIAL · DODICI",
        samplePrice: "CHF 19.00",
        pdfDishName: "numero dodici",
        layers: {
          "sbrinz-seeds": "Sbrinz AOP & pumpkin seeds",
          "caramel-onions": "Caramelized onions & pumpkin",
          "shiitake-cheese": "Shiitake mushrooms & fior di latte",
          "pumpkin-cream": "Roasted pumpkin cream",
          crust: "72h sourdough crust",
        },
      },
      eigerplatz: {
        navLabel: "02 · Eigerplatz",
        eyebrow: "02 / HOUSE SIGNATURE · BELPSTRASSE 65 · CHF 22.00",
        title: "Pizza Eigerplatz.",
        subtitle:
          "San Marzano pelati, aromatic wild mushroom cream, cured prosciutto, creamy Stracciatella di Burrata, artisan coppa, and olive oil.",
        kineticWords: [
          "PIZZA EIGERPLATZ · STRACCIATELLA DI BURRATA · COPPA ·",
          "MUSHROOM CREAM · PROSCIUTTO · BELPSTRASSE 65 BERN ·",
        ],
        metricValue: "CHF 22.00",
        metricLabel: "Flagship Eigerplatz Signature",
        ctaLabel: "Pre-order Eigerplatz",
        addBagLabel: "+ Add to Take-Away Bag (CHF 22.00)",
        uiMockupLabel: "SIGNATURE · EIGERPLATZ",
        samplePrice: "CHF 22.00",
        pdfDishName: "Eigerplatz",
        layers: {
          "basil-oil": "Fresh basil & olive oil",
          "coppa-prosciutto": "Artisan Coppa & Prosciutto",
          stracciatella: "Stracciatella di Burrata",
          "pelati-pilzcreme": "Pelati & mushroom cream",
          crust: "Wood-fired sourdough crust",
        },
      },
      dolce: {
        navLabel: "03 · Dolce Nutella",
        eyebrow: "03 / DOLCI & APERITIVO · VEGAN · SLICE CHF 5.00",
        title: "Pizza alla Nutella.",
        subtitle:
          "Warm house Nutella vegetale and crushed roasted green pistachios on crispy wood-fired dough — by the slice (5.00) or whole (20.00).",
        kineticWords: [
          "PIZZA ALLA NUTELLA · NUTELLA VEGETALE · PISTACHIOS ·",
          "SPUMONI · APEROL SPRITZ PICCOLINO · TIRAMISÙ DELLA CASA ·",
        ],
        metricValue: "CHF 5.00",
        metricLabel: "Slice CHF 5.00 · Whole CHF 20.00",
        ctaLabel: "Order Dolce & Aperitivo",
        addBagLabel: "+ Add Slice to Bag (CHF 5.00)",
        uiMockupLabel: "DOLCI · NUTELLA VEGETALE",
        samplePrice: "CHF 5.00",
        pdfDishName: "Pizza alla nutella",
        layers: {
          pistachios: "Roasted Sicilian pistachios",
          "hazelnut-crumble": "Hazelnut-cocoa swirl",
          "mascarpone-crema": "Plant-based Stracciatella",
          "nutella-vegetale": "House Nutella vegetale",
          "sweet-crust": "Crispy dolce pizza dough",
        },
      },
    },
  },
  es: {
    skipToMain: "Saltar al contenido principal",
    header: {
      brandAria: "Pizzeria Da Nino am Eigerplatz Bern — volver arriba",
      locationBadge: "EIGERPLATZ · BERNA",
      vipPrefix: "INVITADO",
      vipTitlePrefix: "Invitación personalizada para",
      navAria: "Navegación Pizzeria Da Nino",
      mobileNavAria: "Navegación móvil",
      navFullMenu: "Carta Take Away",
      ctaDemo: "Take Away / Mesa",
      mobileCtaDemo: "Pedir Take Away o reservar mesa →",
      openMenuAria: "Abrir menú de navegación",
      closeMenuAria: "Cerrar menú de navegación",
      langGroupAria: "Seleccionar idioma",
    },
    scrolly: {
      phases: {
        p1: "01 · DECONSTRUCCIÓN DE INGREDIENTES",
        p2: "02 · RECIÉN SALIDA DEL HORNO",
        p3: "03 · TAKE AWAY & MESA",
      },
      xrayAssemble: "✦ Ensamblar pizza",
      xrayExplode: "✦ Inspector 5 Capas",
      pdfBackTo60: "← Volver a la Pizza",
      pdfCompare: "🔥 Ficha del Horno",
      inspectorGroupAria: "Inspector táctil de capas de ingredientes",
      inspectorIsolatedPrefix: "INGREDIENTE AISLADO",
      inspectorPrompt: "TOCA UN INGREDIENTE PARA AISLARLO:",
      pdfRegionAria: "Receta tradicional y especificación de horno de piedra",
      pdfFileName: "RECETA HORNO DE PIEDRA · 450 °C",
      pdfPageLabel: "BELPSTRASSE 65 · BERNA",
      pdfIngredientsPrefix: "5 Capas Artesanas",
      pdfWarning: "✦ 72H FERMENTACIÓN · PEQUEÑA -CHF 2.00 · HORNEADA AL MOMENTO",
      pdfRestoreBtn: "← Volver a la Vista del Horno",
      scrollCue: "DESLIZA PARA HORNEAR",
      previewAriaPrefix: "Seleccionar plato",
    },
    menuSection: {
      eyebrow: "CARTA COMPLETA · RESTAURANTE & TAKE AWAY",
      title: "Take Away Karte",
      subtitle:
        "Klein aber fein en Eigerplatz, Berna. Toca cualquier pizza, aperitivo o postre para añadirlo directamente a tu pedido Take-Away.",
      specialHeading: "Pizza-Special",
      specialAddBtn: "+ Numero Dodici (CHF 19.00)",
      categories: {
        pizze: "Pizze (20)",
        antipasti_dolci: "Antipasti & Dolci",
        aperitivo: "Aperitivo & Sin Alcohol",
        birra_vino: "Birra, Vino & Bollicine",
        bibite_caffe: "Bibite, Digestivi & Caffè",
      },
      filters: {
        all: "Todas",
        vegetarian: "Vegetariana",
        vegan: "Vegana",
        meat: "Cerdo y Res",
        fish: "Pescado",
      },
      searchPlaceholder: "Buscar pizza, ingrediente o bebida (ej. Stracciatella, Burrata, Spumoni)…",
      clearSearch: "Limpiar filtros",
      emptyResult: "No se encontraron platos con este filtro.",
      addBtn: "+ Añadir",
      addedFlash: "✓ Añadido",
      legend: {
        vegetarian: "vegetariano",
        vegan: "vegano",
        pork: "cerdo",
        cow: "res",
        fish: "pescado",
        taxNote: "Precios Take Away en CHF IVA incl.",
      },
      cartBar: {
        bagTitle: "Tu pedido Take-Away",
        checkoutBtn: "Finalizar pedido →",
        clearBtn: "Vaciar",
      },
    },
    closing: {
      eyebrowDefault: "BELPSTRASSE 65 · 3007 BERN · +41 31 371 11 31",
      eyebrowVipPrefix: "INVITACIÓN PERSONAL PARA",
      headlineDefault: "Pásate a vernos, te esperamos.",
      headlineVip: (name: string) => `¡Pásate a vernos, ${name} — te esperamos en Eigerplatz!`,
      lead: "Restaurant & Take Away en Eigerplatz, Berna. Klein aber fein: Encarga tu pizza artesanal para recoger sin esperas o reserva tu mesa online o por teléfono.",
      hoursTitle: "Horario de Apertura",
      hoursDays: "Lunes – Viernes",
      hoursTime: "11:30 – 22:30 h",
      addressTitle: "Contacto y Ubicación",
      addressStreet: "Belpstrasse 65 (am Eigerplatz)",
      addressCity: "3007 Bern · Suiza",
      phoneLabel: "+41 31 371 11 31",
      sealText: "PIZZERIA DA NINO · AM EIGERPLATZ BERN · KLEIN ABER FEIN ·",
      successBadge: "DA NINO EIGERPLATZ",
      successTitle: (name: string) => `¡Grazie mille, ${name}!`,
      successBody: (focus: string, channel: string) =>
        `Tu solicitud (${focus}) está lista. Confírmala en un clic por WhatsApp o llámanos al 031 371 11 31 (${channel}).`,
      successWhatsappBtn: "Confirmar por WhatsApp →",
      successResetBtn: "Nuevo pedido / reserva",
      formBadgeDefault: "TAKE AWAY & RESERVA DE MESA",
      formBadgeVip: (name: string) => `MESA VIP · ${name.toUpperCase()}`,
      formTitle: "Encargar Take-Away o reservar mesa",
      honeypotLabel: "No completar este campo",
      restaurantLabel: "Tu nombre",
      restaurantPlaceholder: "Ej. Lukas Meier",
      dishFocusLabel: "Modalidad y hora de recogida / mesa",
      concepts: {
        dodici: "Take Away · Pizza-Special Numero Dodici (CHF 19.00)",
        eigerplatz: "Take Away · Signature Pizza Eigerplatz (CHF 22.00)",
        dolce: "Take Away · Pizza alla Nutella & Aperitivo",
        table: "Reserva de mesa en Belpstrasse 65 (Restaurante)",
      },
      cartSummaryLabel: "Artículos seleccionados de la Carta Take-Away",
      cartEmptyHint: "Aún no has añadido platos — puedes tocar cualquier pizza o bebida en la carta superior.",
      contactLabel: "Teléfono / WhatsApp o correo + hora deseada (Lun–Vie 11:30–22:30)",
      contactPlaceholder: "+41 79 123 45 67 · Hoy 18:30 h",
      submitIdle: "Enviar pedido / reserva →",
      submitPending: "Enviando…",
      directPrompt: "¿Prefieres pedir directamente por teléfono?",
      directWhatsappLink: "Llamar al 031 371 11 31 ↗",
      whatsappDefaultText:
        "¡Ciao Pizzeria Da Nino! Quiero hacer un pedido Take-Away / reservar mesa en Belpstrasse 65.",
      footerTagline: "PIZZERIA DA NINO · Belpstrasse 65 · 3007 Bern · +41 31 371 11 31",
      vipToggleActive: (name: string) => `✦ Enlace de invitado activo: ${name}`,
      vipToggleIdle: "✦ Crear enlace de invitación para compartir",
      vipBuilderLabel: "PERSONALIZAR INVITACIÓN (?para=):",
      vipBuilderPlaceholder: "Nombre del invitado o grupo (ej. Equipo Eigerplatz)",
      vipBuilderCopied: "✓ Enlace copiado al portapapeles",
      vipBuilderSubmit: "Activar y copiar enlace",
      vipBuilderClear: "Limpiar",
    },
    products: {
      dodici: {
        navLabel: "01 · Nº Dodici",
        eyebrow: "01 / PIZZA-SPECIAL · VEGETARIANA · CHF 19.00",
        title: "Numero Dodici.",
        subtitle:
          "Crema de calabaza asada, setas shiitake, calabaza al horno, cebolla caramelizada, semillas de calabaza tostadas y queso suizo Sbrinz AOP.",
        kineticWords: [
          "NUMERO DODICI · CREMA DE CALABAZA · SHIITAKE · SBRINZ ·",
          "PIZZERIA DA NINO · EIGERPLATZ BERN · KLEIN ABER FEIN ·",
        ],
        metricValue: "CHF 19.00",
        metricLabel: "Pizza-Special de temporada · Berna",
        ctaLabel: "Encargar Numero Dodici",
        addBagLabel: "+ Añadir al pedido Take-Away (CHF 19.00)",
        uiMockupLabel: "PIZZA-SPECIAL · DODICI",
        samplePrice: "CHF 19.00",
        pdfDishName: "numero dodici",
        layers: {
          "sbrinz-seeds": "Sbrinz AOP y semillas de calabaza",
          "caramel-onions": "Cebolla caramelizada y calabaza",
          "shiitake-cheese": "Setas shiitake y fior di latte",
          "pumpkin-cream": "Crema dorada de calabaza",
          crust: "Masa madre 72h al horno",
        },
      },
      eigerplatz: {
        navLabel: "02 · Eigerplatz",
        eyebrow: "02 / PIZZA INSIGNIA · BELPSTRASSE 65 · CHF 22.00",
        title: "Pizza Eigerplatz.",
        subtitle:
          "Tomates pelati San Marzano, crema artesanal de setas, prosciutto, cremosa Stracciatella di Burrata, coppa curada y aceite de oliva virgen extra.",
        kineticWords: [
          "PIZZA EIGERPLATZ · STRACCIATELLA DI BURRATA · COPPA ·",
          "CREMA DE SETAS · PROSCIUTTO · BELPSTRASSE 65 BERN ·",
        ],
        metricValue: "CHF 22.00",
        metricLabel: "Pizza insignia de Eigerplatz",
        ctaLabel: "Encargar Pizza Eigerplatz",
        addBagLabel: "+ Añadir al pedido Take-Away (CHF 22.00)",
        uiMockupLabel: "INSIGNIA · EIGERPLATZ",
        samplePrice: "CHF 22.00",
        pdfDishName: "Eigerplatz",
        layers: {
          "basil-oil": "Albahaca fresca y aceite de oliva",
          "coppa-prosciutto": "Coppa artesanal y Prosciutto",
          stracciatella: "Stracciatella di Burrata",
          "pelati-pilzcreme": "Pelati y crema de setas",
          crust: "Masa artesanal al horno",
        },
      },
      dolce: {
        navLabel: "03 · Dolce Nutella",
        eyebrow: "03 / DOLCI & APERITIVO · VEGANA · PORCIÓN CHF 5.00",
        title: "Pizza alla Nutella.",
        subtitle:
          "Nutella vegetale casera fundida y pistachos verdes tostados sobre masa crujiente recién horneada — en porción (5.00) o entera (20.00).",
        kineticWords: [
          "PIZZA ALLA NUTELLA · NUTELLA VEGETALE · PISTACHOS ·",
          "SPUMONI · APEROL SPRITZ PICCOLINO · TIRAMISÙ DELLA CASA ·",
        ],
        metricValue: "CHF 5.00",
        metricLabel: "Porción CHF 5.00 · Entera CHF 20.00",
        ctaLabel: "Elegir Dolce & Aperitivo",
        addBagLabel: "+ Añadir porción al pedido (CHF 5.00)",
        uiMockupLabel: "DOLCI · NUTELLA VEGETALE",
        samplePrice: "CHF 5.00",
        pdfDishName: "Pizza alla nutella",
        layers: {
          pistachios: "Pistachos verdes tostados",
          "hazelnut-crumble": "Remolino de avellana y cacao",
          "mascarpone-crema": "Stracciatella vegetal cremosa",
          "nutella-vegetale": "Nutella vegetale della casa",
          "sweet-crust": "Masa crujiente dolce",
        },
      },
    },
  },
};
