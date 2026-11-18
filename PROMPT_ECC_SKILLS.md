# Master Prompt & Arquitectura ECC Skills — Pizzeria Da Nino am Eigerplatz (Bern)

> **Proyecto:** Transformación integral de [`https://www.pizzeriadanino.ch/`](https://www.pizzeriadanino.ch/) (actualmente una página estática que solo muestra la carta en texto) en una **Web App Scrollytelling a 60 FPS + Carta Take-Away Interactiva** tomando como motor base **Vértice Digital Studio Web App** (`ENTERPRISE-WEB-DESIGN`).
> **Repositorio Destino:** [`pipas-python/PIZZERIA-DA-NINO-WEB`](https://github.com/pipas-python/PIZZERIA-DA-NINO-WEB)

---

## 1. Observación y Auditoría Técnica de `https://www.pizzeriadanino.ch/`

### 1.1 Diagnóstico del Sitio Actual
Al inspeccionar el DOM y la hoja de estilos de producción (`/wp-content/themes/danino/dist/main.css`), la web actual presenta las siguientes limitaciones:
- **Contenido 100 % estático y solo texto:** No muestra ni una sola fotografía de sus pizzas artesanales ni de su masa madre horneada.
- **Sin flujo de conversión ni pedido:** Aunque el título principal es *"Take Away Karte"*, el usuario no puede seleccionar pizzas, calcular su total en `CHF`, ni enviar una pre-orden de recogida o reserva de mesa.
- **Monolingüe (`de-DE`):** Ubicada en el corazón de Berna (*Belpstrasse 65, 3007 Bern — am Eigerplatz*), carece de selector de idioma (`DE / EN / ES`) para residentes internacionales y turistas.

### 1.2 ADN Visual Extraído (Para Mantener al 100 % la Identidad de Marca)
Del CSS y SVG originales de `pizzeriadanino.ch` se extrajeron los siguientes tokens y activos oficiales:

| Elemento de Marca | Token Original en `pizzeriadanino.ch` | Aplicación en `PIZZERIA-DA-NINO-WEB` |
|---|---|---|
| **Rojo Insignia Da Nino** | `--red: #E41F13` | Lienzo Hero 01 (`#D81E12` calibrado a WCAG AA 4.6:1 con texto `#FFFFFF`) + filetes arquitectónicos `10px solid #E41F13` |
| **Carbón Antracita** | `--black: #1D1D1B` / `--text-color: #1D1D1B` | Lienzo Scrolly 02 (`#141413` → `#1D1D1B` horno de leña) + tinta tipográfica principal sobre papel suizo |
| **Papel Suizo / Alabastro** | `--background-color: #F4F4F4` | Lienzo Scrolly 03 + Fondo de la `Take Away Karte` interactiva y sección de contacto |
| **Blanco Puro** | `--white: #FFFFFF` | Tarjetas de producto, superficies elevadas y tinta de alto contraste sobre lienzo rojo y oscuro |
| **Tipografía Oficial** | `font-family: "Catalog", sans-serif` (`Regular`, `Italic`, `Bold`, `Black` `.woff`) | Archivos `.woff` originales integrados en `/public/fonts/` y declarados en `src/app/fonts.css` con `font-display: swap` |
| **Iconografía SVG Oficial** | `<symbol id="logo">`, `#special-wide`, `#vegetarian`, `#vegan`, `#pork`, `#cow`, `#fish` | Extraídos íntegros en `src/components/icons/DaNinoBrandIcons.tsx` |
| **Firma Gráfica Suiza** | `border-top/bottom: 10px solid var(--red)` + `font-variant-numeric: tabular-nums` | Conservada en el `body`, en las cabeceras de la `Take Away Karte` a doble columna y en los precios en `CHF` |

---

## 2. Pacto de Skills ECC Aplicadas al Proyecto

| Skill ECC | Reglas Clave Aplicadas |
|---|---|
| **`web-app-development`** | **1. Stack:** Next.js 16 (App Router) + React 19 + TypeScript strict + **Vanilla CSS & CSS Modules** (0 % Tailwind).<br>**2. Dinamismo 60 FPS:** **GSAP 3.13 + ScrollTrigger** + **Lenis 1.3 Smooth Scroll** + **Canvas 2D de partículas reactivas**.<br>**3. Anti-Clichés Estrictos:** Sin morado sobre oscuro, sin bordes de neón brillantes, sin píldoras con punto pulsante encima del `<h1>`, sin texto con gradiente CSS, sin fondos de rejilla/mesh, sin tarjetas sobre-anidadas, **sin placeholders vacíos**.<br>**4. SEO & Accesibilidad:** Único `<h1>` en apertura, HTML5 semántico, `id` único y descriptivo en cada botón/input/enlace, JSON-LD `Restaurant` con coordenadas exactas de Berna (`46.9420183, 7.4311663`). |
| **`github`** | Creación del nuevo repositorio `pipas-python/PIZZERIA-DA-NINO-WEB` mediante `create_github_repository`, commits atómicos y push directo a `origin/main`. |
| **`env-setup`** | Verificación determinista con `npm run typecheck`, `npm run lint` y `npm run build` sin errores ni warnings. |

---

## 3. Master Prompt ECC (Listo para Reutilizar o Ejecutar)

```markdown
# ROL Y OBJETIVO
Actúa como Principal Creative Technologist y Arquitecto Frontend en Vértice Digital Studio.
Tu misión es construir la aplicación web completa para **Pizzeria Da Nino am Eigerplatz (Bern)** (`https://www.pizzeriadanino.ch/`), transformando su actual página estática de solo texto en una experiencia **Scrollytelling 60 FPS + Take-Away Web App** sobre la arquitectura base de **Vértice Digital Studio (`ENTERPRISE-WEB-DESIGN`)**, cumpliendo estrictamente las **Skills pactadas de ECC (`web-app-development`, `github`, `env-setup`)**.

# 1. ADN DE MARCA Y PALETA OBLIGATORIA (EXTRAÍDA DE PIZZERIADANINO.CH)
Respeta al 100 % la identidad visual suizo-italiana de Pizzeria Da Nino:
- **Paleta Dinámica Vinculada al Scroll (`ScrollOrchestrator.tsx`):**
  1. **Tramo 01 (0 % – 33 % · Hero Pizza-Special `Numero Dodici`):** Rojo Da Nino `#D81E12` (calibración WCAG AA de `#E41F13`) con tinta `#FFFFFF`.
  2. **Tramo 02 (34 % – 66 % · Signature `Pizza Eigerplatz`):** Carbón Antracita `#141413` / `#1D1D1B` con tinta `#F4F4F4` y acentos `#E41F13`.
  3. **Tramo 03 (67 % – 100 % · Dolce `Pizza alla Nutella` + `Take Away Karte` + `Vorbestellung & Kontakt`):** Papel Suizo `#F4F4F4` con tinta `#1D1D1B`, tarjetas `#FFFFFF` y barras arquitectónicas de `10px solid #E41F13`.
- **Tipografía:** Fuente oficial `"Catalog"` (`Regular 400`, `Italic 400`, `Bold 700`, `Black 900`) servida desde `/public/fonts/` con `font-display: swap` y `font-variant-numeric: tabular-nums` para todos los precios en `CHF`.
- **Activos Vectoriales Originales (`DaNinoBrandIcons.tsx`):**
  - Logotipo caligráfico original (`#danino-logo`).
  - Marco estrellado rojo para el Pizza-Special (`#danino-special-wide`).
  - Iconos dietéticos oficiales (`#danino-vegetarian`, `#danino-vegan`, `#danino-pork`, `#danino-cow`, `#danino-fish`).

# 2. COREOGRAFÍA SCROLLYTELLING 60 FPS (3 PRODUCTOS REALES DECONSTRUIDOS)
Cada capítulo fija el viewport (`pin: true`, `scrub: 0.9`) y ejecuta 3 fases:
- **Fase 1 (0.00 → 0.12):** Explosión de ingredientes flotantes con etiquetas técnicas (`01 · ...`) y anillos orbitales SVG.
- **Fase 2 (0.12 → 0.56):** Convergencia suave de las 5 capas hasta hornear/ensamblar la pizza en el centro con ondas de vapor.
- **Fase 3 (0.58 → 0.96):** Desplazamiento del escenario a la derecha y revelación escalonada de la columna editorial izquierda con controles interactivos:
  - **Modo Rayos X (`✦ Röntgen · Zutaten`):** Aísla cualquier capa en 3D al tocar su chip.
  - **Comparador (`📄 vs. Alte Text-Karte`):** Contrasta en vivo la antigua carta de texto plano con la experiencia 60 FPS.
  - **Compra en 1 Toque (`+ In den Take-Away Korb`):** Añade la pizza directamente a la bolsa Take-Away.

## Productos Estrella Deconstruidos:
1. **01 · PIZZA-SPECIAL `NUMERO DODICI`** (`vegetarian` · `CHF 19.00` · Lienzo Rojo `#D81E12`):
   - Capa 01: `Sbrinz & Kürbiskerne` (Lascas de Sbrinz AOP suizo y semillas de calabaza tostadas)
   - Capa 02: `Karamellisierte Zwiebeln & Kürbis` (Cebolla roja caramelizada y calabaza Hokkaido asada)
   - Capa 03: `Shiitake-Pilze & Fior di Latte` (Setas shiitake asadas y mozzarella fundida)
   - Capa 04: `Goldene Kürbiscreme` (Crema aterciopelada de calabaza asada)
   - Capa 05: `72h Sauerteig-Pizzateig` (Masa madre napolitana al horno con alveolos tostados)
2. **02 · HAUS-SIGNATURE `PIZZA EIGERPLATZ`** (`pork` · `CHF 22.00` · Lienzo Carbón `#141413`):
   - Capa 01: `Basilikum & Olivenöl extra vergine`
   - Capa 02: `Coppa & Prosciutto`
   - Capa 03: `Stracciatella di Burrata`
   - Capa 04: `San-Marzano-Pelati & Pilzcreme`
   - Capa 05: `Knuspriger Holzofen-Teig`
3. **03 · DOLCI & APERITIVO `PIZZA ALLA NUTELLA`** (`vegan` · `Slice CHF 5.00 / Ganz CHF 20.00` · Lienzo Papel Suizo `#F4F4F4`):
   - Capa 01: `Geröstete grüne Pistazien`
   - Capa 02: `Haselnuss-Kakao-Swirl`
   - Capa 03: `Pflanzliche Stracciatella-Crema`
   - Capa 04: `Nutella vegetale della casa`
   - Capa 05: `Knuspriger Dolce-Pizzateig`

# 3. CARTA TAKE-AWAY COMPLETA E INTERACTIVA (`InteractiveMenuSection.tsx`)
Debajo de los 3 capítulos scrollytelling, despliega la **Take Away Karte** completa con los 69 artículos reales de `pizzeriadanino.ch`:
- Banner superior **Pizza-Special (`numero dodici`)** enmarcado con el SVG `#special-wide` original en `#E41F13`.
- Pestañas por categoría: `Pizze (20)`, `Antipasti & Dolci`, `Aperitivo & Senza Alcool`, `Birra, Vino & Bollicine`, `Bibite, Digestivi & Cafe`.
- Filtros dietéticos interactivos con iconos SVG (`Alle`, `Vegetarisch`, `Vegan`, `Schwein & Rind`, `Fisch`) + buscador instantáneo.
- Botón `+ Wahl` en cada artículo/tamaño sincronizado con el estado global `useTakeAwayCart()`.
- Leyenda oficial en rojo `#E41F13`: *"vegetarisch · vegan · Schwein · Rind · Fisch — Take Away Preise in CHF inkl. MwSt"*.

# 4. VORBESTELLUNG, TISCHRESERVATION & MULTILINGÜISMO (DE / EN / ES)
- Selector instantáneo `DE | EN | ES` en la cabecera con **Alemán (`de`)** como idioma por defecto.
- Sección final (`ClosingConversion.tsx`) con datos reales verificados:
  - **Dirección:** Belpstrasse 65, 3007 Bern (am Eigerplatz) + enlace a Google Maps.
  - **Horario:** Montag – Freitag · 11.30 – 22:30.
  - **Contacto:** `+41 31 371 11 31`, `info@pizzeriadanino.ch`, `@pizzeria_danino`.
  - Formulario conectado a Server Action (`submitBriefAction`) que adjunta automáticamente el resumen de artículos del carrito Take-Away y genera confirmación en 1 clic hacia WhatsApp / teléfono.
```

---

## 4. Prompts de Generación de Imágenes para Gemini Flash (`generate_image` + Chroma-Key `#FF00FF`)

Para generar o regenerar cualquiera de las capas fotorrealistas con **Gemini Flash** y recortarlas automáticamente con `scratch/keyout.py` a `.webp` transparente de `720px` de ancho:

### 4.1 Pizza 01 — `Numero Dodici` (`/public/assets/dodici/`)
1. **`01-sbrinz-seeds.webp`**
   > `High-end commercial food photography of shaved Swiss Sbrinz cheese curls and toasted green pumpkin seeds arranged in a flat horizontal circular pizza topping layer, viewed from a 35-degree elevated front-three-quarter perspective. Crisp studio lighting, appetizing texture, no plate, no shadow on background, completely isolated on a solid flat pure #FF00FF magenta chroma-key background.`
2. **`02-caramel-onions.webp`**
   > `High-end commercial food photography of glossy caramelized purple-red onion rings and roasted golden Hokkaido pumpkin wedges arranged in a flat horizontal circular pizza topping layer, viewed from a 35-degree elevated front-three-quarter perspective. Crisp studio lighting, appetizing sheen, no plate, no shadow on background, completely isolated on a solid flat pure #FF00FF magenta chroma-key background.`
3. **`03-shiitake-cheese.webp`**
   > `High-end commercial food photography of sautéed brown shiitake mushroom slices and melted fior di latte mozzarella cheese disc viewed from a 35-degree elevated front-three-quarter perspective. Crisp studio lighting, golden blistered cheese spots, no plate, no shadow on background, completely isolated on a solid flat pure #FF00FF magenta chroma-key background.`
4. **`04-pumpkin-cream.webp`**
   > `High-end commercial food photography of a flat circular disc of velvety golden-orange roasted pumpkin cream pizza sauce with spoon swirl texture, viewed from a 35-degree elevated front-three-quarter perspective. Crisp studio lighting, rich savory color, no plate, no crust, no shadow on background, completely isolated on a solid flat pure #FF00FF magenta chroma-key background.`
5. **`05-crust.webp`**
   > `High-end commercial food photography of an artisan wood-fired Neapolitan sourdough pizza crust base with airy leopard-spotted charred cornicione rim, viewed from a 35-degree elevated front-three-quarter perspective. Crisp studio lighting, flour dusting, no toppings, no plate, no shadow on background, completely isolated on a solid flat pure #FF00FF magenta chroma-key background.`

### 4.2 Pizza 02 — `Pizza Eigerplatz` (`/public/assets/eigerplatz/`)
1. **`01-basil-oil.webp`**
   > `High-end commercial food photography of fresh green Italian basil leaves and golden extra-virgin olive oil droplets floating in a flat horizontal circular pizza topping layer, viewed from a 35-degree elevated front-three-quarter perspective. Crisp studio lighting, no plate, no shadow on background, completely isolated on a solid flat pure #FF00FF magenta chroma-key background.`
2. **`02-coppa-prosciutto.webp`**
   > `High-end commercial food photography of artisanal folded ribbons of cured Italian Coppa and marbled Prosciutto crudo arranged in a flat horizontal circular pizza topping layer, viewed from a 35-degree elevated front-three-quarter perspective. Crisp studio lighting, no plate, no shadow on background, completely isolated on a solid flat pure #FF00FF magenta chroma-key background.`
3. **`03-stracciatella.webp`**
   > `High-end commercial food photography of creamy white Stracciatella di Burrata cheese curds spread in a flat circular pizza topping layer, viewed from a 35-degree elevated front-three-quarter perspective. Crisp studio lighting, glossy dairy texture, no plate, no shadow on background, completely isolated on a solid flat pure #FF00FF magenta chroma-key background.`
4. **`04-pelati-pilzcreme.webp`**
   > `High-end commercial food photography of a flat circular pizza sauce layer of crushed red San Marzano Pelati tomatoes marbled with earthy wild mushroom cream (Pilzcreme), viewed from a 35-degree elevated front-three-quarter perspective. Crisp studio lighting, no crust, no plate, no shadow on background, completely isolated on a solid flat pure #FF00FF magenta chroma-key background.`
5. **`05-crust.webp`**
   > `High-end commercial food photography of an artisan wood-fired Neapolitan pizza dough crust with blistered cornicione, viewed from a 35-degree elevated front-three-quarter perspective. Crisp studio lighting, no toppings, no shadow on background, completely isolated on a solid flat pure #FF00FF magenta chroma-key background.`

### 4.3 Pizza 03 — `Pizza alla Nutella` (`/public/assets/dolce/`)
1. **`01-pistachios.webp`**
   > `High-end commercial food photography of crushed emerald-green roasted Sicilian pistachios and whole pistachio kernels arranged in a flat horizontal circular pizza topping layer, viewed from a 35-degree elevated front-three-quarter perspective. Crisp studio lighting, no plate, no shadow on background, completely isolated on a solid flat pure #FF00FF magenta chroma-key background.`
2. **`02-hazelnut-crumble.webp`**
   > `High-end commercial food photography of glossy dark chocolate-hazelnut drizzle ribbons and toasted Piedmont hazelnut crunch arranged in a flat horizontal circular pizza layer, viewed from a 35-degree elevated front-three-quarter perspective. Crisp studio lighting, no plate, no shadow on background, completely isolated on a solid flat pure #FF00FF magenta chroma-key background.`
3. **`03-mascarpone-crema.webp`**
   > `High-end commercial food photography of whipped plant-based stracciatella and hazelnut cream clouds arranged in a flat circular pizza layer, viewed from a 35-degree elevated front-three-quarter perspective. Crisp studio lighting, no plate, no shadow on background, completely isolated on a solid flat pure #FF00FF magenta chroma-key background.`
4. **`04-nutella-vegetale.webp`**
   > `High-end commercial food photography of a flat circular pizza sauce disc of rich glossy dark chocolate-hazelnut Nutella spread with spatula swirls, viewed from a 35-degree elevated front-three-quarter perspective. Crisp studio lighting, no crust, no plate, no shadow on background, completely isolated on a solid flat pure #FF00FF magenta chroma-key background.`
5. **`05-sweet-crust.webp`**
   > `High-end commercial food photography of a golden-brown crispy wood-fired sweet dessert pizza dough base with caramelized rim, viewed from a 35-degree elevated front-three-quarter perspective. Crisp studio lighting, no toppings, no shadow on background, completely isolated on a solid flat pure #FF00FF magenta chroma-key background.`
