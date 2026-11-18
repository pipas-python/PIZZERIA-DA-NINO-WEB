"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis, setScrollMetrics } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Paletas oficiales de Pizzeria Da Nino am Eigerplatz (Bern):
 *   - "red":    #D81E12 (Rojo Da Nino #E41F13 calibrado a WCAG AA 4.6:1 con tinta #FFFFFF)
 *   - "dark":   #141413 (Carbón Antracita Da Nino #1D1D1B de horno de leña con acento #E41F13)
 *   - "pastel": #F4F4F4 (Papel Suizo original de pizzeriadanino.ch con tinta #1D1D1B y reglas #E41F13)
 */
const PALETTES = {
  red: {
    "--canvas-bg": "#d81e12",
    "--canvas-ink": "#ffffff",
    "--canvas-ink-muted": "rgba(255, 255, 255, 0.9)",
    "--canvas-surface": "rgba(255, 255, 255, 0.09)",
    "--canvas-surface-strong": "rgba(255, 255, 255, 0.16)",
    "--canvas-border": "rgba(255, 255, 255, 0.26)",
    "--canvas-btn-bg": "#ffffff",
    "--canvas-btn-ink": "#1d1d1b",
    "--canvas-accent": "#ffffff",
  },
  dark: {
    "--canvas-bg": "#141413",
    "--canvas-ink": "#f4f4f4",
    "--canvas-ink-muted": "rgba(244, 244, 244, 0.82)",
    "--canvas-surface": "rgba(244, 244, 244, 0.06)",
    "--canvas-surface-strong": "rgba(244, 244, 244, 0.12)",
    "--canvas-border": "rgba(244, 244, 244, 0.2)",
    "--canvas-btn-bg": "#e41f13",
    "--canvas-btn-ink": "#ffffff",
    "--canvas-accent": "#ff5447",
  },
  pastel: {
    "--canvas-bg": "#f4f4f4",
    "--canvas-ink": "#1d1d1b",
    "--canvas-ink-muted": "rgba(29, 29, 27, 0.82)",
    "--canvas-surface": "rgba(29, 29, 27, 0.05)",
    "--canvas-surface-strong": "rgba(29, 29, 27, 0.1)",
    "--canvas-border": "rgba(29, 29, 27, 0.18)",
    "--canvas-btn-bg": "#e41f13",
    "--canvas-btn-ink": "#ffffff",
    "--canvas-accent": "#c8190e",
  },
} as const;

type PaletteKey = keyof typeof PALETTES;

function isPaletteKey(value: string | undefined): value is PaletteKey {
  return value === "red" || value === "dark" || value === "pastel";
}

/** Usa el pin-spacer de GSAP cuando la sección está fijada para medir su posición real. */
function scrollAnchorOf(el: HTMLElement) {
  return el.parentElement?.classList.contains("pin-spacer") ? el.parentElement : el;
}

/**
 * Orquestador global: Smooth Scroll (Lenis) + interpolación de la paleta Da Nino vinculada al scroll.
 */
export function ScrollOrchestrator({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
      touchMultiplier: 1.4,
    });
    setLenis(lenis);

    lenis.on("scroll", (e: Lenis) => {
      setScrollMetrics(e.velocity, e.progress);
      ScrollTrigger.update();
    });

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const root = document.documentElement;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>("[data-palette]");
      const first = sections[0]?.dataset.palette;
      gsap.set(root, PALETTES[isPaletteKey(first) ? first : "red"]);

      for (let i = 1; i < sections.length; i += 1) {
        const prev = sections[i - 1].dataset.palette;
        const next = sections[i].dataset.palette;
        if (!isPaletteKey(prev) || !isPaletteKey(next) || prev === next) continue;

        gsap.fromTo(
          root,
          { ...PALETTES[prev] },
          {
            ...PALETTES[next],
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: scrollAnchorOf(sections[i]),
              start: "top 85%",
              end: "top 20%",
              scrub: 0.6,
            },
          },
        );
      }
    });

    const refresh = () => ScrollTrigger.refresh();
    const refreshTimer = window.setTimeout(refresh, 150);
    document.fonts?.ready.then(refresh).catch(() => undefined);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refresh);
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
}
