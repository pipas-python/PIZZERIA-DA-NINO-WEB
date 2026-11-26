import { DA_NINO_ECC_PRODUCT_PROMPTS } from "@/config/product-prompts";

export type CanvasPalette = "red" | "dark" | "pastel";

export interface PizzaLayerSpec {
  id: "basil" | "toppings" | "mozzarella" | "pelati" | "crust";
  imageSrc: string;
  prompt?: string;
  /** Vertical offset when exploded (px relative to stage center at base 480px width) */
  explodedY: number;
  /** Subtle horizontal offset when exploded (px) */
  explodedX: number;
  /** Rotation in degrees when exploded */
  explodedRotate: number;
  /** Scale multiplier when exploded */
  explodedScale: number;
  /** Vertical offset when nestled inside the crust rim (px) */
  assembledY: number;
  /** Stacking order (top garnish highest, dough crust lowest) */
  zIndex: number;
  /** Relative width inside the cornicione crust (1.0 = full crust width) */
  widthScale: number;
  imageWidth: number;
  imageHeight: number;
}

export interface SignaturePizzaConfig {
  id: string;
  assembledImageSrc: string;
  assembledWidth: number;
  assembledHeight: number;
  priceDisplay: string;
  layers: PizzaLayerSpec[];
}

function getPrompt(layerId: string): string | undefined {
  return DA_NINO_ECC_PRODUCT_PROMPTS.find((p) => p.layerId === layerId)?.prompt;
}

export const SIGNATURE_PIZZA: SignaturePizzaConfig = {
  id: "home",
  assembledImageSrc: "/assets/pizza/00-assembled.webp",
  assembledWidth: 984,
  assembledHeight: 477,
  priceDisplay: "CHF 20.00",
  layers: [
    {
      id: "basil",
      imageSrc: "/assets/pizza/01-basil.webp",
      prompt: getPrompt("basil"),
      explodedY: -224,
      explodedX: -8,
      explodedRotate: -3.2,
      explodedScale: 1.04,
      assembledY: -18,
      zIndex: 6,
      widthScale: 0.72,
      imageWidth: 844,
      imageHeight: 373,
    },
    {
      id: "toppings",
      imageSrc: "/assets/pizza/02-toppings.webp",
      prompt: getPrompt("toppings"),
      explodedY: -116,
      explodedX: 10,
      explodedRotate: 2.4,
      explodedScale: 1.02,
      assembledY: -12,
      zIndex: 5,
      widthScale: 0.77,
      imageWidth: 884,
      imageHeight: 398,
    },
    {
      id: "mozzarella",
      imageSrc: "/assets/pizza/03-mozzarella.webp",
      prompt: getPrompt("mozzarella"),
      explodedY: -6,
      explodedX: -6,
      explodedRotate: -1.8,
      explodedScale: 1.0,
      assembledY: -6,
      zIndex: 4,
      widthScale: 0.8,
      imageWidth: 904,
      imageHeight: 410,
    },
    {
      id: "pelati",
      imageSrc: "/assets/pizza/04-pelati.webp",
      prompt: getPrompt("pelati"),
      explodedY: 102,
      explodedX: 7,
      explodedRotate: 1.5,
      explodedScale: 1.0,
      assembledY: 0,
      zIndex: 3,
      widthScale: 0.82,
      imageWidth: 914,
      imageHeight: 414,
    },
    {
      id: "crust",
      imageSrc: "/assets/pizza/05-crust.webp",
      prompt: getPrompt("crust"),
      explodedY: 212,
      explodedX: 0,
      explodedRotate: 0,
      explodedScale: 1.0,
      assembledY: 8,
      zIndex: 2,
      widthScale: 1.0,
      imageWidth: 984,
      imageHeight: 477,
    },
  ],
};
