import type { DietaryTag } from "@/components/icons/DaNinoBrandIcons";
import { DA_NINO_ECC_PRODUCT_PROMPTS } from "@/config/product-prompts";

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
  /**
   * Prompt canónico ECC (#FF00FF chroma-key, 15 grados, 80-85% ancho) utilizado para generar la capa
   */
  prompt?: string;
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
  priceNumericChf: number;
  smallPriceNumericChf?: number;
  ovenSpec: string;
  fermentationSpec: string;
  menuItemId: string;
  tags: string[];
  /** Dos bandas de tipografía cinética gigante para el fondo en paralaje */
  kineticWords: [string, string];
  metricValue: string;
  metricLabel: string;
  ctaLabel: string;
  /** Elementos culinarios flotantes en desenfoque de campo para dinamizar el fondo */
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

function getPrompt(layerId: string): string | undefined {
  return DA_NINO_ECC_PRODUCT_PROMPTS.find((p) => p.layerId === layerId)?.prompt;
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
    priceNumericChf: 19.0,
    smallPriceNumericChf: 17.0,
    ovenSpec: "450 °C Steinofen · Belpstrasse 65",
    fermentationSpec: "72h Teigruhe · Klein -CHF 2.00",
    menuItemId: "special-numero-dodici",
    tags: ["PIZZA-SPECIAL #12", "VEGETARISCH", "CHF 19.00"],
    kineticWords: [
      "NUMERO DODICI · KÜRBISCREME · SHIITAKE · SBRINZ AOP ·",
      "PIZZERIA DA NINO · EIGERPLATZ BERN · KLEIN ABER FEIN ·",
    ],
    metricValue: "CHF 19.00",
    metricLabel: "Pizza-Special · Take Away & Restaurant (Klein CHF 17.00)",
    ctaLabel: "Numero Dodici vorbestellen",
    generativeVisuals: {
      sculpturePrimarySrc: "/assets/dodici/01-sbrinz-seeds.webp",
      sculptureSecondarySrc: "/assets/eigerplatz/01-basil-oil.webp",
      uiMockupSrc: "/assets/dodici/05-crust.webp",
      uiMockupLabel: "SPECIAL · NUMERO DODICI",
    },
    renderMode: "layers",
    layers: [
      {
        id: "sbrinz-seeds",
        label: "Sbrinz & Kürbiskerne",
        imageSrc: "/assets/dodici/01-sbrinz-seeds.webp",
        prompt: getPrompt("dodici-01-sbrinz-seeds"),
        imageWidth: 720,
        imageHeight: 292,
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
        label: "Karamellisierte Zwiebeln & Shiitake",
        imageSrc: "/assets/dodici/02-caramel-onions.webp",
        prompt: getPrompt("dodici-02-caramel-onions"),
        imageWidth: 720,
        imageHeight: 394,
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
        label: "Sbrinz AOP & Fior di Latte",
        imageSrc: "/assets/dodici/03-shiitake-cheese.webp",
        prompt: getPrompt("dodici-03-shiitake-cheese"),
        imageWidth: 720,
        imageHeight: 328,
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
        prompt: getPrompt("dodici-04-pumpkin-cream"),
        imageWidth: 720,
        imageHeight: 260,
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
        label: "72h Steinofen-Pizzateig",
        imageSrc: "/assets/dodici/05-crust.webp",
        prompt: getPrompt("dodici-05-crust"),
        imageWidth: 720,
        imageHeight: 400,
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
    priceNumericChf: 22.0,
    smallPriceNumericChf: 20.0,
    ovenSpec: "450 °C Steinofen · Belpstrasse 65",
    fermentationSpec: "Stracciatella frisch nach dem Backen",
    menuItemId: "pizza-eigerplatz-item",
    tags: ["STRACCIATELLA DI BURRATA", "COPPA & PROSCIUTTO", "CHF 22.00"],
    kineticWords: [
      "EIGERPLATZ · STRACCIATELLA DI BURRATA · PILZCREME · COPPA ·",
      "BELPSTRASSE 65 · 3007 BERN · RESTAURANT & TAKE AWAY ·",
    ],
    metricValue: "CHF 22.00",
    metricLabel: "Signature Pizza · Frisch aus dem Ofen (Klein CHF 20.00)",
    ctaLabel: "Pizza Eigerplatz wählen",
    generativeVisuals: {
      sculpturePrimarySrc: "/assets/eigerplatz/01-basil-oil.webp",
      sculptureSecondarySrc: "/assets/eigerplatz/02-coppa-prosciutto.webp",
      uiMockupSrc: "/assets/eigerplatz/05-crust.webp",
      uiMockupLabel: "SIGNATURE · EIGERPLATZ",
    },
    renderMode: "layers",
    layers: [
      {
        id: "basil-oil",
        label: "Basilikum & Olivenöl extra vergine",
        imageSrc: "/assets/eigerplatz/01-basil-oil.webp",
        prompt: getPrompt("eigerplatz-01-basil-oil"),
        imageWidth: 720,
        imageHeight: 391,
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
        label: "Coppa & Rohschinken",
        imageSrc: "/assets/eigerplatz/02-coppa-prosciutto.webp",
        prompt: getPrompt("eigerplatz-02-coppa-prosciutto"),
        imageWidth: 720,
        imageHeight: 335,
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
        prompt: getPrompt("eigerplatz-03-stracciatella"),
        imageWidth: 720,
        imageHeight: 371,
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
        prompt: getPrompt("eigerplatz-04-pelati-pilzcreme"),
        imageWidth: 720,
        imageHeight: 338,
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
        prompt: getPrompt("eigerplatz-05-crust"),
        imageWidth: 720,
        imageHeight: 400,
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
      "Hausgemachte Nutella vegetale, Mascarpone-Crema und geröstete grüne Bronte-Pistazien auf warmem Brioche-Pizzateig — als Slice zum Espresso oder ganz zum Teilen.",
    dietaryTag: "vegan",
    priceChf: "CHF 5.00 / 20.00",
    priceNumericChf: 5.0,
    smallPriceNumericChf: 20.0,
    ovenSpec: "Dolce aus dem Steinofen",
    fermentationSpec: "Slice CHF 5.00 · Ganze Pizza CHF 20.00",
    menuItemId: "dolci-pizza-nutella-slice",
    tags: ["100% VEGAN", "SLICE CHF 5.00", "GANZ CHF 20.00"],
    kineticWords: [
      "PIZZA ALLA NUTELLA · NUTELLA VEGETALE · PISTAZIEN ·",
      "TIRAMISÙ DELLA CASA · SPUMONI · APEROL SPRITZ PICCOLINO ·",
    ],
    metricValue: "CHF 5.00",
    metricLabel: "Slice (CHF 5.00) oder Ganze Pizza (CHF 20.00)",
    ctaLabel: "Dolce zur Bestellung",
    generativeVisuals: {
      sculpturePrimarySrc: "/assets/dolce/02-hazelnut-crumble.webp",
      sculptureSecondarySrc: "/assets/eigerplatz/01-basil-oil.webp",
      uiMockupSrc: "/assets/dolce/01-pistachios.webp",
      uiMockupLabel: "DOLCI · NUTELLA & PISTAZIEN",
    },
    renderMode: "layers",
    layers: [
      {
        id: "pistachios",
        label: "Bronte-Pistazien & Brioche-Krone",
        imageSrc: "/assets/dolce/01-pistachios.webp",
        prompt: getPrompt("dolce-01-pistachios"),
        imageWidth: 720,
        imageHeight: 338,
        widthScale: 0.82,
        explodedY: -270,
        explodedX: -12,
        explodedRotate: -8,
        explodedScale: 1.06,
        assembledY: -26,
        zIndex: 5,
      },
      {
        id: "hazelnut-crumble",
        label: "Geröstete Piemonteser Haselnüsse",
        imageSrc: "/assets/dolce/02-hazelnut-crumble.webp",
        prompt: getPrompt("dolce-02-hazelnut-crumble"),
        imageWidth: 720,
        imageHeight: 335,
        widthScale: 0.78,
        explodedY: -145,
        explodedX: 16,
        explodedRotate: 7,
        explodedScale: 1.04,
        assembledY: -16,
        zIndex: 4,
      },
      {
        id: "mascarpone-crema",
        label: "Samtiger Mascarpone-Schmelz",
        imageSrc: "/assets/dolce/03-mascarpone-crema.webp",
        prompt: getPrompt("dolce-03-mascarpone-crema"),
        imageWidth: 720,
        imageHeight: 328,
        widthScale: 0.82,
        explodedY: -20,
        explodedX: -14,
        explodedRotate: -5,
        explodedScale: 1.02,
        assembledY: -9,
        zIndex: 3,
      },
      {
        id: "nutella-vegetale",
        label: "Warme Nutella-Haselnuss-Ganache",
        imageSrc: "/assets/dolce/04-nutella-vegetale.webp",
        prompt: getPrompt("dolce-04-nutella-vegetale"),
        imageWidth: 720,
        imageHeight: 260,
        widthScale: 0.86,
        explodedY: 110,
        explodedX: 10,
        explodedRotate: 4,
        explodedScale: 1.02,
        assembledY: -2,
        zIndex: 2,
      },
      {
        id: "sweet-crust",
        label: "Goldbrauner Süsser Steinofen-Teig",
        imageSrc: "/assets/dolce/05-sweet-crust.webp",
        prompt: getPrompt("dolce-05-sweet-crust"),
        imageWidth: 720,
        imageHeight: 327,
        widthScale: 0.86,
        explodedY: 250,
        explodedX: -6,
        explodedRotate: -3,
        explodedScale: 1,
        assembledY: 12,
        zIndex: 1,
      },
    ],
  },
];
