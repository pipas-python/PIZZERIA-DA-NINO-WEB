# Pizzeria Da Nino am Eigerplatz (Bern) · 60 FPS Scrollytelling & Take-Away Web App

Aplicación web interactiva construida sobre la arquitectura de **Vértice Digital Studio (`ENTERPRISE-WEB-DESIGN`)** con **Next.js 16**, **React 19**, **GSAP + ScrollTrigger** y **Lenis Smooth Scroll** para transformar [`https://www.pizzeriadanino.ch/`](https://www.pizzeriadanino.ch/) en una experiencia gastronómica a 60 FPS conservando al 100 % su ADN visual suizo-italiano.

## ADN Visual & Características Principales

- **Paleta Oficial Extraída de `pizzeriadanino.ch` Vinculada al Scroll:**
  - **01 · Rojo Da Nino (`#D81E12` / `#E41F13`):** Hero scrollytelling del *Pizza-Special Numero Dodici* (`CHF 19.00`).
  - **02 · Carbón Antracita (`#141413` / `#1D1D1B`):** Scrollytelling de la pizza insignia *Pizza Eigerplatz* (`CHF 22.00`).
  - **03 · Papel Suizo (`#F4F4F4`) + Filetes `10px solid #E41F13`:** Scrollytelling de *Pizza alla Nutella* (`CHF 5.00 / 20.00`), **Take Away Karte Interactiva Completa** (69 artículos reales) y sección de **Vorbestellung & Tischreservation**.
- **Tipografía & Vectores Originales:**
  - Fuente `"Catalog"` (`Regular`, `Italic`, `Bold`, `Black` `.woff`) en `/public/fonts/`.
  - Sprite SVG oficial en `src/components/icons/DaNinoBrandIcons.tsx` (`#logo`, `#special-wide`, `#vegetarian`, `#vegan`, `#pork`, `#cow`, `#fish`).
- **Multilingüe (`DE / EN / ES`):** Alemán por defecto (`de_CH`) con cambio instantáneo a Inglés y Español en la cabecera.
- **Documentación del Master Prompt ECC Skills:** Ver [`PROMPT_ECC_SKILLS.md`](./PROMPT_ECC_SKILLS.md).

## Comandos Locales

```bash
npm install
npm run dev
npm run typecheck && npm run lint && npm run build
```
