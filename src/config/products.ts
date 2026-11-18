import type { DietaryTag } from "@/components/icons/DaNinoBrandIcons";

export type ProductKey = "dodici" | "eigerplatz" | "dolce";

export type RenderMode = "layers" | "sequence" | "video";

export type CanvasPalette = "red" | "dark" | "pastel";

export interface ProductLayerSpec {
  id: string;
  label: string;
  /**
   * Ruta en /public/assets/<producto>/<archivo>.webp
   */
  imageSrc?: string;
  /** Desplazamiento vertical en estado deconstruido (px relativos al centro) */
  explodedY: number;
  /** Desplazamiento horizontal sutil en estado deconstruido (px) */
  explodedX?: number;
  /** Rotación en grados durante el estado deconstruido */
  explodedRotate: number;
  /** Escala en estado deconstruido */
  explodedScale?: number;
  /** Desplazamiento vertical final una vez ensamblado (px) */
  assembledY: number;
  /** Orden de apilamiento */
  zIndex: number;
  /** Ancho relativo de la capa respecto al ancho base del escenario (1 = 360px en desktop) */
  widthScale?: number;
  /** Dimensiones intrínsecas del archivo (evita saltos de layout / CLS) */
  imageWidth?: number;
  imageHeight?: number;
}

export interface ProductScrollyConfig {
  id: string;
  key: ProductKey;
  /** Paleta del fondo mientras la sección está en pantalla (rojo Da Nino → carbón horno → papel suizo) */
  palette: CanvasPalette;
  indexLabel: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  dietaryTag: DietaryTag;
  priceChf: string;
  menuItemId: string;
  tags: string[];
  /** Dos bandas de tipografía cinética gigante para el fondo en paralaje */
  kineticWords: [string, string];
  metricValue: string;
  metricLabel: string;
  ctaLabel: string;
  /** Esculturas 3D generativas y mockups de interfaz para dinamizar el fondo */
  generativeVisuals: {
    sculpturePrimarySrc: string;
    sculptureSecondarySrc: string;
    uiMockupSrc: string;
    uiMockupLabel: string;
  };
  renderMode: RenderMode;
  layers: ProductLayerSpec[];
  sequence?: {
    frameCount: number;
    pathPattern: string;
  };
  videoSrc?: string;
}

export const PRODUCTS_SHOWCASE: ProductScrollyConfig[] = [
  {
    id: "pizza-numero-dodici",
    key: "dodici",
    palette: "red",
    indexLabel: "01",
    navLabel: "01 · Nº Dodici",
    eyebrow: "01 / PIZZA-SPECIAL · AM EIGERPLATZ BERN",
    title: "Numero Dodici.",
    subtitle:
      "Kürbiscreme, geröstete Shiitake-Pilze, gebackener Kürbis, karamellisierte Zwiebeln, Kürbiskerne und gereifter Sbrinz AOP.",
    dietaryTag: "vegetarian",
    priceChf: "CHF 19.00",
    menuItemId: "special-numero-dodici",
    tags: ["PIZZA-SPECIAL", "VEGETARISCH", "CHF 19.00"],
    kineticWords: [
      "NUMERO DODICI · KÜRBISCREME · SHIITAKE · SBRINZ AOP ·",
      "PIZZERIA DA NINO · EIGERPLATZ BERN · KLEIN ABER FEIN ·",
    ],
    metricValue: "CHF 19.00",
    metricLabel: "Pizza-Special · Take Away & Restaurant",
    ctaLabel: "Numero Dodici vorbestellen",
    generativeVisuals: {
      sculpturePrimarySrc: "/assets/generative/orb-vermilion.webp",
      sculptureSecondarySrc: "/assets/generative/prism-glass.webp",
      uiMockupSrc: "/assets/generative/danino-special-ui.webp",
      uiMockupLabel: "SPECIAL · NUMERO DODICI",
    },
    renderMode: "layers",
    layers: [
      {
        id: "sbrinz-seeds",
        label: "Sbrinz & Kürbiskerne",
        imageSrc: "/assets/dodici/01-sbrinz-seeds.webp",
        imageWidth: 720,
        imageHeight: 281,
        widthScale: 0.78,
        explodedY: -280,
        explodedX: 14,
        explodedRotate: 11,
        explodedScale: 1.07,
        assembledY: -18,
        zIndex: 5,
      },
      {
        id: "caramel-onions",
        label: "Karamellisierte Zwiebeln & Kürbis",
        imageSrc: "/assets/dodici/02-caramel-onions.webp",
        imageWidth: 720,
        imageHeight: 325,
        widthScale: 0.76,
        explodedY: -150,
        explodedX: -16,
        explodedRotate: -8,
        explodedScale: 1.04,
        assembledY: -13,
        zIndex: 4,
      },
      {
        id: "shiitake-cheese",
        label: "Shiitake-Pilze & Fior di Latte",
        imageSrc: "/assets/dodici/03-shiitake-cheese.webp",
        imageWidth: 720,
        imageHeight: 363,
        widthScale: 0.82,
        explodedY: -20,
        explodedX: 12,
        explodedRotate: 5,
        explodedScale: 1.02,
        assembledY: -8,
        zIndex: 3,
      },
      {
        id: "pumpkin-cream",
        label: "Goldene Kürbiscreme",
        imageSrc: "/assets/dodici/04-pumpkin-cream.webp",
        imageWidth: 720,
        imageHeight: 327,
        widthScale: 0.86,
        explodedY: 110,
        explodedX: -12,
        explodedRotate: -5,
        explodedScale: 1,
        assembledY: -4,
        zIndex: 2,
      },
      {
        id: "crust",
        label: "72h Sauerteig-Pizzateig",
        imageSrc: "/assets/dodici/05-crust.webp",
        imageWidth: 720,
        imageHeight: 397,
        widthScale: 1,
        explodedY: 250,
        explodedX: 6,
        explodedRotate: 4,
        explodedScale: 1.02,
        assembledY: 6,
        zIndex: 1,
      },
    ],
  },
  {
    id: "pizza-eigerplatz",
    key: "eigerplatz",
    palette: "dark",
    indexLabel: "02",
    navLabel: "02 · Eigerplatz",
    eyebrow: "02 / HAUS-SIGNATURE · BELPSTRASSE 65",
    title: "Pizza Eigerplatz.",
    subtitle:
      "Unser Klassiker am Eigerplatz: San-Marzano-Pelati, aromatische Pilzcreme, Prosciutto, cremige Stracciatella di Burrata, Coppa und kaltgepresstes Olivenöl.",
    dietaryTag: "pork",
    priceChf: "CHF 22.00",
    menuItemId: "pizza-eigerplatz-item",
    tags: ["STRACCIATELLA DI BURRATA", "COPPA & PROSCIUTTO", "CHF 22.00"],
    kineticWords: [
      "EIGERPLATZ · STRACCIATELLA DI BURRATA · PILZCREME · COPPA ·",
      "BELPSTRASSE 65 · 3007 BERN · RESTAURANT & TAKE AWAY ·",
    ],
    metricValue: "CHF 22.00",
    metricLabel: "Signature Pizza · Frisch aus dem Ofen",
    ctaLabel: "Pizza Eigerplatz wählen",
    generativeVisuals: {
      sculpturePrimarySrc: "/assets/generative/torus-obsidian.webp",
      sculptureSecondarySrc: "/assets/generative/orb-vermilion.webp",
      uiMockupSrc: "/assets/generative/danino-takeaway-ui.webp",
      uiMockupLabel: "SIGNATURE · EIGERPLATZ",
    },
    renderMode: "layers",
    layers: [
      {
        id: "basil-oil",
        label: "Basilikum & Olivenöl extra vergine",
        imageSrc: "/assets/eigerplatz/01-basil-oil.webp",
        imageWidth: 720,
        imageHeight: 383,
        widthScale: 0.78,
        explodedY: -280,
        explodedX: 14,
        explodedRotate: 12,
        explodedScale: 1.08,
        assembledY: -14,
        zIndex: 5,
      },
      {
        id: "coppa-prosciutto",
        label: "Coppa & Prosciutto",
        imageSrc: "/assets/eigerplatz/02-coppa-prosciutto.webp",
        imageWidth: 720,
        imageHeight: 325,
        widthScale: 0.75,
        explodedY: -150,
        explodedX: -16,
        explodedRotate: -8,
        explodedScale: 1.04,
        assembledY: -12,
        zIndex: 4,
      },
      {
        id: "stracciatella",
        label: "Stracciatella di Burrata",
        imageSrc: "/assets/eigerplatz/03-stracciatella.webp",
        imageWidth: 720,
        imageHeight: 363,
        widthScale: 0.82,
        explodedY: -20,
        explodedX: 12,
        explodedRotate: 5,
        explodedScale: 1.02,
        assembledY: -8,
        zIndex: 3,
      },
      {
        id: "pelati-pilzcreme",
        label: "San-Marzano-Pelati & Pilzcreme",
        imageSrc: "/assets/eigerplatz/04-pelati-pilzcreme.webp",
        imageWidth: 720,
        imageHeight: 327,
        widthScale: 0.86,
        explodedY: 110,
        explodedX: -12,
        explodedRotate: -5,
        explodedScale: 1,
        assembledY: -4,
        zIndex: 2,
      },
      {
        id: "crust",
        label: "Knuspriger Holzofen-Teig",
        imageSrc: "/assets/eigerplatz/05-crust.webp",
        imageWidth: 720,
        imageHeight: 397,
        widthScale: 1,
        explodedY: 250,
        explodedX: 6,
        explodedRotate: 4,
        explodedScale: 1.02,
        assembledY: 6,
        zIndex: 1,
      },
    ],
  },
  {
    id: "pizza-alla-nutella",
    key: "dolce",
    palette: "pastel",
    indexLabel: "03",
    navLabel: "03 · Dolce Nutella",
    eyebrow: "03 / DOLCI DELLA CASA & APERITIVO · 100% VEGAN",
    title: "Pizza alla Nutella.",
    subtitle:
      "Hausgemachte Nutella vegetale und geröstete grüne Pistazien auf warmem, knusprigem Teig — als Slice zum Espresso oder ganz zum Teilen.",
    dietaryTag: "vegan",
    priceChf: "CHF 5.00 / 20.00",
    menuItemId: "dolci-pizza-nutella-slice",
    tags: ["100% VEGAN", "SLICE CHF 5.00", "GANZ CHF 20.00"],
    kineticWords: [
      "PIZZA ALLA NUTELLA · NUTELLA VEGETALE · PISTAZIEN ·",
      "TIRAMISÙ DELLA CASA · SPUMONI · APEROL SPRITZ PICCOLINO ·",
    ],
    metricValue: "CHF 5.00",
    metricLabel: "Slice (CHF 5.00) oder Ganz (CHF 20.00)",
    ctaLabel: "Dolce zur Bestellung",
    generativeVisuals: {
      sculpturePrimarySrc: "/assets/generative/knot-pearl.webp",
      sculptureSecondarySrc: "/assets/generative/torus-obsidian.webp",
      uiMockupSrc: "/assets/generative/danino-aperitivo-ui.webp",
      uiMockupLabel: "DOLCI · NUTELLA VEGETALE",
    },
    renderMode: "layers",
    layers: [
      {
        id: "pistachios",
        label: "Geröstete grüne Pistazien",
        imageSrc: "/assets/dolce/01-pistachios.webp",
        imageWidth: 720,
        imageHeight: 281,
        widthScale: 0.76,
        explodedY: -270,
        explodedX: -12,
        explodedRotate: -10,
        explodedScale: 1.06,
        assembledY: -18,
        zIndex: 5,
      },
      {
        id: "hazelnut-crumble",
        label: "Haselnuss-Schoko-Swirl",
        imageSrc: "/assets/dolce/02-hazelnut-crumble.webp",
        imageWidth: 720,
        imageHeight: 248,
        widthScale: 0.78,
        explodedY: -145,
        explodedX: 16,
        explodedRotate: 7,
        explodedScale: 1.04,
        assembledY: -13,
        zIndex: 4,
      },
      {
        id: "mascarpone-crema",
        label: "Pflanzliche Stracciatella-Crema",
        imageSrc: "/assets/dolce/03-mascarpone-crema.webp",
        imageWidth: 720,
        imageHeight: 363,
        widthScale: 0.82,
        explodedY: -20,
        explodedX: -14,
        explodedRotate: -5,
        explodedScale: 1.02,
        assembledY: -8,
        zIndex: 3,
      },
      {
        id: "nutella-vegetale",
        label: "Nutella vegetale della casa",
        imageSrc: "/assets/dolce/04-nutella-vegetale.webp",
        imageWidth: 720,
        imageHeight: 327,
        widthScale: 0.86,
        explodedY: 110,
        explodedX: 10,
        explodedRotate: 4,
        explodedScale: 1.02,
        assembledY: -4,
        zIndex: 2,
      },
      {
        id: "sweet-crust",
        label: "Knuspriger Dolce-Pizzateig",
        imageSrc: "/assets/dolce/05-sweet-crust.webp",
        imageWidth: 720,
        imageHeight: 397,
        widthScale: 1,
        explodedY: 250,
        explodedX: -6,
        explodedRotate: -3,
        explodedScale: 1,
        assembledY: 6,
        zIndex: 1,
      },
    ],
  },
];
