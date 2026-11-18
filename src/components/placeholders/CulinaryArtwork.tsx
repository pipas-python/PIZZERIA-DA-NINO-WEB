import type { ProductKey } from "@/config/products";

interface LayerArtProps {
  product: ProductKey;
  layerId: string;
}

/**
 * Ilustraciones vectoriales multicapa de respaldo para cada ingrediente de Pizzeria Da Nino.
 * Todas las capas principales cuentan con activos fotorrealistas WebP en /public/assets/<producto>/.
 */
export function CulinaryLayerArtwork({ product, layerId }: LayerArtProps) {
  return (
    <svg viewBox="0 0 420 140" fill="none" aria-hidden="true" data-product={product} data-layer={layerId}>
      <ellipse cx="210" cy="70" rx="176" ry="48" fill="#E41F13" fillOpacity="0.85" />
      <ellipse cx="210" cy="66" rx="154" ry="38" fill="#F4F4F4" fillOpacity="0.35" />
    </svg>
  );
}
