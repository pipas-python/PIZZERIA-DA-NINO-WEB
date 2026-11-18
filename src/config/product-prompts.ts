/**
 * ECC Skill (`ecc-product-prompts`) — Canonical Deconstructed Product Layer Prompts
 * for Pizzeria Da Nino am Eigerplatz (Belpstrasse 65, 3007 Bern — https://www.pizzeriadanino.ch/)
 *
 * Geometry & Chroma-Key Contract:
 * - Camera perspective: 15-degree elevated side view ("seen from the side at eye level slightly elevated about 15 degrees")
 * - Framing: Perfectly centered, filling 80%–85% of the image width
 * - Background: Uniform solid magenta chroma-key (#FF00FF), zero background shadows, no plate, no props
 * - Post-processing: HSV chroma-key + purple-despill pipeline (`scripts/keyout.py`) -> 720px transparent .webp
 */

export interface EccLayerPromptSpec {
  layerId: string;
  productSlug: 'dodici' | 'eigerplatz' | 'dolce' | 'lasagne' | 'caprese';
  outputAssetPath: string;
  dishTitle: string;
  layerNameDe: string;
  layerNameEs: string;
  aspectRatio: '1:1';
  widthFillPercent: 80 | 85;
  prompt: string;
  promptV2?: string;
}

export const DA_NINO_ECC_PRODUCT_PROMPTS: EccLayerPromptSpec[] = [
  // ============================================================================
  // 01 · NUMERO DODICI (#12) — Pizza Special (CHF 19.00)
  // Kürbiscreme, Mozzarella, Shiitake Pilze, Karamellisierte Zwiebeln, Sbrinz, Kürbiskerne
  // ============================================================================
  {
    layerId: 'dodici-01-sbrinz-seeds',
    productSlug: 'dodici',
    outputAssetPath: '/assets/dodici/01-sbrinz-seeds.webp',
    dishTitle: '01 · Numero Dodici (Pizza Special #12)',
    layerNameDe: 'Geröstete Kürbiskerne & Sbrinz AOP Splitter',
    layerNameEs: 'Semillas de Calabaza Tostadas & Lascas de Sbrinz AOP',
    aspectRatio: '1:1',
    widthFillPercent: 80,
    prompt:
      'Photorealistic professional food photography of a single scattered floating layer of toasted dark-green Styrian pumpkin seeds and flaky golden-ivory aged Swiss Sbrinz cheese shavings with delicate drops of dark aged balsamic reduction, arranged as the top finishing layer of an exploded artisan pizza, seen from the side at eye level slightly elevated (about 15 degrees), perfectly centered, filling 80% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no props, soft studio lighting, crisp edges, high detail.',
    promptV2:
      'Photorealistic professional food photography of a single wide elliptical crown of roasted green pumpkin seeds and thin crystalline shavings of aged Swiss Sbrinz hard cheese, intact crisp silhouettes with a flat clean bottom plane (no plate, no stray crumbs below), seen from the side at eye level slightly elevated about 15 degrees, perfectly centered, filling 85% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no props, soft studio lighting, crisp edges, high detail.',
  },
  {
    layerId: 'dodici-02-caramel-onions',
    productSlug: 'dodici',
    outputAssetPath: '/assets/dodici/02-caramel-onions.webp',
    dishTitle: '01 · Numero Dodici (Pizza Special #12)',
    layerNameDe: 'Karamellisierte Rote Zwiebeln & Shiitake Pilze',
    layerNameEs: 'Cebolla Roja Caramelizada al Balsámico & Setas Shiitake',
    aspectRatio: '1:1',
    widthFillPercent: 85,
    prompt:
      'Photorealistic professional food photography of a single round layer of glossy balsamic-caramelized ruby red onion rings and thick seared umami brown Shiitake mushroom slices with golden roasted edges, arranged as one flat wide elliptical layer of an exploded artisan pizza, seen from the side at eye level slightly elevated about 15 degrees, perfectly centered, filling 85% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no props, soft studio lighting, crisp edges, high detail.',
  },
  {
    layerId: 'dodici-03-shiitake-cheese',
    productSlug: 'dodici',
    outputAssetPath: '/assets/dodici/03-shiitake-cheese.webp',
    dishTitle: '01 · Numero Dodici (Pizza Special #12)',
    layerNameDe: 'Geschmolzener Fior di Latte & Schweizer Sbrinz',
    layerNameEs: 'Fior di Latte Fundida & Reserva de Sbrinz Suizo',
    aspectRatio: '1:1',
    widthFillPercent: 85,
    prompt:
      'Photorealistic professional food photography of a single melted golden-ivory layer of artisan Fior di Latte mozzarella blended with aged Swiss Sbrinz cheese, gently bubbling and draping slightly at the outer edges with warm golden-brown oven blisters, as one flat layer of an exploded pizza, seen from the side at eye level slightly elevated about 15 degrees, perfectly centered, filling 85% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no props, soft studio lighting, crisp edges, high detail.',
  },
  {
    layerId: 'dodici-04-pumpkin-cream',
    productSlug: 'dodici',
    outputAssetPath: '/assets/dodici/04-pumpkin-cream.webp',
    dishTitle: '01 · Numero Dodici (Pizza Special #12)',
    layerNameDe: 'Hausgemachte Geröstete Kürbiscreme',
    layerNameEs: 'Crema Aterciopelada de Calabaza Hokkaido Asada',
    aspectRatio: '1:1',
    widthFillPercent: 85,
    prompt:
      'Photorealistic professional food photography of a thin round wavy layer of glossy velvety golden-orange roasted Hokkaido pumpkin cream sauce dripping slightly at the edges with subtle roasted sage and black pepper flecks, like the sauce layer of an exploded artisan pizza, seen from the side at eye level slightly elevated about 15 degrees so it appears as a flat wide ellipse, perfectly centered, filling 85% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no props, soft studio lighting, crisp edges, high detail.',
  },
  {
    layerId: 'dodici-05-crust',
    productSlug: 'dodici',
    outputAssetPath: '/assets/dodici/05-crust.webp',
    dishTitle: '01 · Numero Dodici (Pizza Special #12)',
    layerNameDe: '72h Steinofen-Pizzateig (Belpstrasse 65)',
    layerNameEs: 'Masa Napolitana de Horno de Piedra (Fermentación 72h)',
    aspectRatio: '1:1',
    widthFillPercent: 85,
    prompt:
      'Photorealistic professional food photography of a single artisan wood-fired Neapolitan pizza crust base, 72-hour fermented dough with a puffy golden-brown leopard-spotted charred cornicione rim, dusted with fine semolina flour and a clean flat bottom surface, seen from the side at eye level slightly elevated about 15 degrees, perfectly centered, filling 85% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no props, soft studio lighting, crisp edges, high detail.',
  },

  // ============================================================================
  // 02 · PIZZA EIGERPLATZ — Die Haus-Spezialität (CHF 22.00)
  // Pelati, Mozzarella, Pilzcreme, Coppa, Rohschinken, Stracciatella, Basilikum
  // ============================================================================
  {
    layerId: 'eigerplatz-01-basil-oil',
    productSlug: 'eigerplatz',
    outputAssetPath: '/assets/eigerplatz/01-basil-oil.webp',
    dishTitle: '02 · Pizza Eigerplatz (Signature Special)',
    layerNameDe: 'Frischer Genoveser Basilikum & Olivenöl Extra Vergine',
    layerNameEs: 'Hojas de Albahaca Genovesa Fresca & Aceite de Oliva Virgen Extra',
    aspectRatio: '1:1',
    widthFillPercent: 80,
    prompt:
      'Photorealistic professional food photography of a single floating elliptical crown of fresh emerald-green Genovese basil leaves and glossy droplets of cold-pressed Italian extra virgin olive oil, arranged as the top finishing layer of an exploded Neapolitan pizza, seen from the side at eye level slightly elevated (about 15 degrees), perfectly centered, filling 80% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no props, soft studio lighting, crisp edges, high detail.',
    promptV2:
      'Photorealistic professional food photography of a single wide elliptical arrangement of turgid fresh green basil leaves with visible leaf veins and golden olive oil droplets, intact crisp leaves with no stems sticking below the horizontal plane, seen from the side at eye level slightly elevated about 15 degrees, perfectly centered, filling 85% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no props, soft studio lighting, crisp edges, high detail.',
  },
  {
    layerId: 'eigerplatz-02-coppa-prosciutto',
    productSlug: 'eigerplatz',
    outputAssetPath: '/assets/eigerplatz/02-coppa-prosciutto.webp',
    dishTitle: '02 · Pizza Eigerplatz (Signature Special)',
    layerNameDe: 'Italienische Coppa & Luftgetrockneter Rohschinken',
    layerNameEs: 'Coppa Italiana Curada & Rohschinken (Prosciutto Crudo)',
    aspectRatio: '1:1',
    widthFillPercent: 85,
    prompt:
      'Photorealistic professional food photography of a single round layer of thin marbled ruby-red cured Italian Coppa slices and delicate folded ribbons of air-dried Prosciutto Crudo (Rohschinken) with warm crispy oven-kissed edges, arranged as one flat wide elliptical layer of an exploded Neapolitan pizza, seen from the side at eye level slightly elevated about 15 degrees, perfectly centered, filling 85% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no props, soft studio lighting, crisp edges, high detail.',
  },
  {
    layerId: 'eigerplatz-03-stracciatella',
    productSlug: 'eigerplatz',
    outputAssetPath: '/assets/eigerplatz/03-stracciatella.webp',
    dishTitle: '02 · Pizza Eigerplatz (Signature Special)',
    layerNameDe: 'Cremige Puglieser Stracciatella & Fior di Latte',
    layerNameEs: 'Stracciatella Cremosa de Puglia & Fior di Latte Fundida',
    aspectRatio: '1:1',
    widthFillPercent: 85,
    prompt:
      'Photorealistic professional food photography of a single round layer of glossy milky-white Pugliese Stracciatella cheese curds and melted Fior di Latte mozzarella with delicate golden wood-fired blister spots, arranged as one flat layer of an exploded Neapolitan pizza, seen from the side at eye level slightly elevated about 15 degrees so it appears as a flat wide ellipse, perfectly centered, filling 85% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no props, soft studio lighting, crisp edges, high detail.',
  },
  {
    layerId: 'eigerplatz-04-pelati-pilzcreme',
    productSlug: 'eigerplatz',
    outputAssetPath: '/assets/eigerplatz/04-pelati-pilzcreme.webp',
    dishTitle: '02 · Pizza Eigerplatz (Signature Special)',
    layerNameDe: 'San Marzano Pelati & Hausgemachte Steinpilzcreme',
    layerNameEs: 'Tomates Pelati San Marzano D.O.P. & Crema de Boletus',
    aspectRatio: '1:1',
    widthFillPercent: 85,
    prompt:
      'Photorealistic professional food photography of a single thin round swirled layer of crushed crimson San Marzano Pelati tomato sauce marbled with rich earthy wild porcini mushroom cream (Pilzcreme), seen from the side at eye level slightly elevated about 15 degrees so it appears as a flat wide ellipse, perfectly centered, filling 85% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no props, soft studio lighting, crisp edges, high detail.',
  },
  {
    layerId: 'eigerplatz-05-crust',
    productSlug: 'eigerplatz',
    outputAssetPath: '/assets/eigerplatz/05-crust.webp',
    dishTitle: '02 · Pizza Eigerplatz (Signature Special)',
    layerNameDe: 'Traditioneller Da Nino Steinofen-Boden',
    layerNameEs: 'Base Napolitana Artesana al Horno de Piedra',
    aspectRatio: '1:1',
    widthFillPercent: 85,
    prompt:
      'Photorealistic professional food photography of a single authentic wood-fired Neapolitan pizza dough base with an airy blistered golden-brown and dark leopard-charred cornicione crust rim and a thin tender center, seen from the side at eye level slightly elevated about 15 degrees, perfectly centered, filling 85% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no props, soft studio lighting, crisp edges, high detail.',
  },

  // ============================================================================
  // 03 · PIZZA ALLA NUTELLA — Dolci aus dem Steinofen (Klein CHF 5.00 / Gross CHF 20.00)
  // Mit Mascarpone, Haselnüssen & Pistazien
  // ============================================================================
  {
    layerId: 'dolce-01-pistachios',
    productSlug: 'dolce',
    outputAssetPath: '/assets/dolce/01-pistachios.webp',
    dishTitle: '03 · Pizza alla Nutella (Dolce Forno)',
    layerNameDe: 'Gehackte Bronte-Pistazien & Puderzucker-Krone',
    layerNameEs: 'Corona de Pistachos Verdes de Bronte & Azúcar Glas',
    aspectRatio: '1:1',
    widthFillPercent: 80,
    prompt:
      'Photorealistic professional food photography of a single top crown of golden wood-fired sweet brioche-pizza dough dusted with crushed emerald-green Bronte pistachios, toasted sesame-hazelnut seeds and fine white powdered icing sugar, intact low wide dome with a flat clean bottom edge (no bite, no crumb visible), seen from the side at eye level slightly elevated about 15 degrees, perfectly centered, filling 85% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no props, soft studio lighting, crisp edges, high detail.',
  },
  {
    layerId: 'dolce-02-hazelnut-crumble',
    productSlug: 'dolce',
    outputAssetPath: '/assets/dolce/02-hazelnut-crumble.webp',
    dishTitle: '03 · Pizza alla Nutella (Dolce Forno)',
    layerNameDe: 'Geröstete Piemonteser Haselnüsse & Krokant',
    layerNameEs: 'Avellanas Tostadas del Piamonte & Crocante Gianduja',
    aspectRatio: '1:1',
    widthFillPercent: 85,
    prompt:
      'Photorealistic professional food photography of a single round layer of crunchy roasted Piedmont hazelnut halves and caramelized golden-brown gianduja praline chunks arranged in a wide flat ring, as one layer of an exploded dessert pizza, seen from the side at eye level slightly elevated about 15 degrees, perfectly centered, filling 85% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no props, soft studio lighting, crisp edges, high detail.',
  },
  {
    layerId: 'dolce-03-mascarpone-crema',
    productSlug: 'dolce',
    outputAssetPath: '/assets/dolce/03-mascarpone-crema.webp',
    dishTitle: '03 · Pizza alla Nutella (Dolce Forno)',
    layerNameDe: 'Samtiger Italienischer Mascarpone-Schmelz',
    layerNameEs: 'Crema Batida de Mascarpone Italiano Fresco',
    aspectRatio: '1:1',
    widthFillPercent: 85,
    prompt:
      'Photorealistic professional food photography of a single wide draping layer of velvety whipped ivory-white Italian Mascarpone cream softening over warm pastry and folding gently at the corners, as one flat layer of an exploded dessert pizza, seen from the side at eye level slightly elevated about 15 degrees, perfectly centered, filling 85% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no props, soft studio lighting, crisp edges, high detail.',
  },
  {
    layerId: 'dolce-04-nutella-vegetale',
    productSlug: 'dolce',
    outputAssetPath: '/assets/dolce/04-nutella-vegetale.webp',
    dishTitle: '03 · Pizza alla Nutella (Dolce Forno)',
    layerNameDe: 'Warme Nutella Haselnuss-Kakao-Ganache',
    layerNameEs: 'Ganache Templada de Nutella, Cacao & Avellanas',
    aspectRatio: '1:1',
    widthFillPercent: 85,
    prompt:
      'Photorealistic professional food photography of a thin round wavy layer of glossy rich dark chocolate-hazelnut Nutella ganache dripping slightly in thick ribbons at the edges, like the chocolate layer of an exploded dessert pizza, seen from the side at eye level slightly elevated about 15 degrees so it appears as a flat wide ellipse, perfectly centered, filling 85% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no props, soft studio lighting, crisp edges, high detail.',
  },
  {
    layerId: 'dolce-05-sweet-crust',
    productSlug: 'dolce',
    outputAssetPath: '/assets/dolce/05-sweet-crust.webp',
    dishTitle: '03 · Pizza alla Nutella (Dolce Forno)',
    layerNameDe: 'Goldbrauner Süsser Steinofen-Teigboden',
    layerNameEs: 'Base Dulce Dorada al Horno de Piedra con Mantequilla',
    aspectRatio: '1:1',
    widthFillPercent: 85,
    prompt:
      'Photorealistic professional food photography of a single bottom base of a golden sweet wood-fired brioche-pizza dough, butter-toasted flat top surface with caramelized golden sides, seen from the side at eye level slightly elevated about 15 degrees, perfectly centered, filling 85% of the image width, isolated on a perfectly flat uniform solid magenta background (#FF00FF), no shadow on the background, no plate, no props, soft studio lighting, crisp edges, high detail.',
  },
];
