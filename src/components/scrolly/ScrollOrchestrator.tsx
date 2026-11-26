"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { setLenis, setScrollMetrics } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Official Pizzeria Da Nino am Eigerplatz (Bern) Color System:
 *   - "red":    #D81E12 (Da Nino Red #E41F13 WCAG-calibrated for crisp #FFFFFF logo & type)
 *   - "dark":   #141413 (Wood-fired stone oven charcoal #1D1D1B)
 *   - "pastel": #F4F4F4 (Swiss editorial menu paper with #1D1D1B ink & #E41F13 rules)
 */
export const PALETTES = {
  red: {
    "--canvas-bg": "#d81e12",
    "--canvas-ink": "#ffffff",
    "--canvas-ink-muted": "rgba(255, 255, 255, 0.88)",
    "--canvas-surface": "rgba(255, 255, 255, 0.1)",
    "--canvas-surface-strong": "rgba(255, 255, 255, 0.18)",
    "--canvas-border": "rgba(255, 255, 255, 0.26)",
    "--canvas-btn-bg": "#ffffff",
    "--canvas-btn-ink": "#1d1d1b",
    "--canvas-accent": "#ffffff",
  },
  dark: {
    "--canvas-bg": "#141413",
    "--canvas-ink": "#f4f4f4",
    "--canvas-ink-muted": "rgba(244, 244, 244, 0.78)",
    "--canvas-surface": "rgba(244, 244, 244, 0.07)",
    "--canvas-surface-strong": "rgba(244, 244, 244, 0.13)",
    "--canvas-border": "rgba(244, 244, 244, 0.2)",
    "--canvas-btn-bg": "#e41f13",
    "--canvas-btn-ink": "#ffffff",
    "--canvas-accent": "#ff5447",
  },
  pastel: {
    "--canvas-bg": "#f4f4f4",
    "--canvas-ink": "#1d1d1b",
    "--canvas-ink-muted": "rgba(29, 29, 27, 0.76)",
    "--canvas-surface": "rgba(29, 29, 27, 0.05)",
    "--canvas-surface-strong": "rgba(29, 29, 27, 0.1)",
    "--canvas-border": "rgba(29, 29, 27, 0.16)",
    "--canvas-btn-bg": "#e41f13",
    "--canvas-btn-ink": "#ffffff",
    "--canvas-accent": "#e41f13",
  },
} as const;

type PaletteKey = keyof typeof PALETTES;

function isPaletteKey(value: string | undefined): value is PaletteKey {
  return value === "red" || value === "dark" || value === "pastel";
}

function scrollAnchorOf(el: HTMLElement) {
  return el.parentElement?.classList.contains("pin-spacer") ? el.parentElement : el;
}

export function ScrollOrchestrator({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.12,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
      touchMultiplier: 1.35,
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
      // Initial opening state is always Da Nino Red (#D81E12) behind the centered Hero Logo
      gsap.set(root, PALETTES.red);

      const sections = gsap.utils.toArray<HTMLElement>("[data-palette]");
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
              start: "top 88%",
              end: "top 24%",
              scrub: 0.55,
            },
          },
        );
      }
    });

    const refresh = () => ScrollTrigger.refresh();
    const refreshTimer = window.setTimeout(refresh, 160);
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
