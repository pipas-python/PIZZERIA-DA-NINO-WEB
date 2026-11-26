/**
 * Canonical ECC Product Layer Prompts (`ecc-product-prompts` skill)
 * Pizzeria Da Nino am Eigerplatz (Belpstrasse 65, 3007 Bern)
 *
 * Single Master Pizza Scrollytelling Asset Set:
 * - Perspective: 15–18 degree elevated side view (wide elliptical layers ~2.1:1)
 * - Framing: Centered, filling 75%–85% of image width
 * - Isolation: Uniform solid magenta background (#FF00FF), HSV chroma-key + warm crust despill
 */

export interface EccProductPromptEntry {
  layerId: string;
  assetPath: string;
  prompt: string;
}

export const DA_NINO_ECC_PRODUCT_PROMPTS: EccProductPromptEntry[] = [
  {
    layerId: "assembled-master",
    assetPath: "/assets/pizza/00-assembled.webp",
    prompt:
      "Photorealistic professional food photography of a single whole freshly baked wood-fired Neapolitan Quattro Stagioni artisan pizza with a puffy golden-brown leopard-charred cornicione crust rim, crimson San Marzano tomato sauce, bubbling melted white Fior di Latte mozzarella, roasted mushrooms, artichokes, black olives, spicy salami, and fresh green basil leaves on top, intact clean flat bottom crust edge, seen from the side at eye level slightly elevated about 15 degrees, perfectly centered, filling 85% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no props, soft studio lighting, crisp edges, high detail.",
  },
  {
    layerId: "basil",
    assetPath: "/assets/pizza/01-basil.webp",
    prompt:
      "Photorealistic professional food photography of 8 individual fresh emerald-green Genovese basil leaves spaced apart in a wide oval ring with clear magenta background visible between each leaf, glistening with tiny golden olive oil droplets, floating on a single horizontal plane as the top garnish layer of an exploded Neapolitan pizza, seen from the side at eye level slightly elevated about 18 degrees, perfectly centered, filling 75% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no dough, no props, soft studio lighting, crisp edges, high detail.",
  },
  {
    layerId: "toppings",
    assetPath: "/assets/pizza/02-toppings.webp",
    prompt:
      "Photorealistic professional food photography of separated gourmet Quattro Stagioni pizza toppings arranged in a wide flat oval pattern with clear solid magenta background (#FF00FF) visible between every piece: roasted golden-brown cremini mushroom slices on the left, marinated pale-gold artichoke quarters at top, glossy black olives on the right, and crispy terracotta-red Italian salami rounds at front, all resting on one invisible horizontal plane with no crust and no cheese underneath, seen from the side at eye level slightly elevated about 18 degrees, perfectly centered, filling 78% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no props, soft studio lighting, crisp edges, high detail.",
  },
  {
    layerId: "mozzarella",
    assetPath: "/assets/pizza/03-mozzarella.webp",
    prompt:
      "Photorealistic professional food photography of a single round layer of creamy melted milky-white Fior di Latte and Buffalo mozzarella cheese with warm golden-brown wood-fired oven blisters and soft rounded edges (no long hanging drips), seen from the side at eye level slightly elevated about 15 degrees so it appears as a flat wide ellipse, perfectly centered, filling 84% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no props, soft studio lighting, crisp edges, high detail.",
  },
  {
    layerId: "pelati",
    assetPath: "/assets/pizza/04-pelati.webp",
    prompt:
      "Photorealistic professional food photography of a single thin round swirled layer of rich crimson-scarlet crushed San Marzano Pelati tomato pizza sauce with tiny dried oregano flecks and glossy olive oil sheen (clean flat bottom edge, no drips), seen from the side at eye level slightly elevated about 15 degrees so it appears as a flat wide ellipse, perfectly centered, filling 84% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no props, soft studio lighting, crisp edges, high detail.",
  },
  {
    layerId: "crust",
    assetPath: "/assets/pizza/05-crust.webp",
    prompt:
      "Photorealistic professional food photography of a single authentic wood-fired Neapolitan pizza dough crust base, 72-hour fermented dough with an airy puffy golden-brown and dark leopard-charred cornicione rim, fine semolina dusting, and an intact clean flat bottom edge, seen from the side at eye level slightly elevated about 15 degrees, perfectly centered, filling 85% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no props, soft studio lighting, crisp edges, high detail.",
  },
];
