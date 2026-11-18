# Carpeta de Fuentes Personalizadas (`/public/fonts`)

Coloca aquí tus fuentes en formato `.woff2` (recomendado por compresión y soporte universal):

- `display-bold.woff2` (títulos de gran formato)
- `sans-regular.woff2` (cuerpo y botones)

Luego descomenta los bloques `@font-face` en `src/app/fonts.css` y actualiza `--font-display` y `--font-sans` en `src/app/globals.css`, o cárgalas con `next/font/local` desde `src/app/layout.tsx`.
