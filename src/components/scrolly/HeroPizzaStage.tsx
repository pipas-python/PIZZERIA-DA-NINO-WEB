"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DaNinoLogo } from "@/components/icons/DaNinoBrandIcons";
import { SIGNATURE_PIZZA } from "@/config/products";
import { DICTIONARIES, useLocale } from "@/lib/i18n";
import { handleAnchorClick, useMagnetic } from "@/lib/interactions";
import { PALETTES } from "./ScrollOrchestrator";
import styles from "./HeroPizzaStage.module.css";

gsap.registerPlugin(ScrollTrigger);

export function HeroPizzaStage() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoHeroRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltWrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const orbitOuterRef = useRef<SVGGElement>(null);
  const orbitInnerRef = useRef<SVGGElement>(null);
  const steamGroupRef = useRef<SVGGElement>(null);
  const assembledPizzaRef = useRef<HTMLImageElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.24);

  const [locale] = useLocale();
  const dict = DICTIONARIES[locale];
  const tHero = dict.hero;

  // Interactive 60 FPS 3D pointer tilt on the pizza stage
  useEffect(() => {
    const section = sectionRef.current;
    const tiltWrap = tiltWrapRef.current;
    if (!section || !tiltWrap) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;

    gsap.set(tiltWrap, { transformPerspective: 1000 });
    const rotY = gsap.quickTo(tiltWrap, "rotationY", { duration: 0.65, ease: "power3.out" });
    const rotX = gsap.quickTo(tiltWrap, "rotationX", { duration: 0.65, ease: "power3.out" });
    const moveX = gsap.quickTo(tiltWrap, "x", { duration: 0.65, ease: "power3.out" });
    const moveY = gsap.quickTo(tiltWrap, "y", { duration: 0.65, ease: "power3.out" });

    const onPointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      rotY(nx * 12);
      rotX(-ny * 9);
      moveX(nx * 16);
      moveY(ny * 12);
    };

    const onPointerLeave = () => {
      rotY(0);
      rotX(0);
      moveX(0);
      moveY(0);
    };

    section.addEventListener("pointermove", onPointerMove, { passive: true });
    section.addEventListener("pointerleave", onPointerLeave);
    return () => {
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  // Main ScrollTrigger Choreography:
  // 0.00: Centered Da Nino Logo in the middle of the viewport on Da Nino Red (#D81E12)
  // 0.04 -> 0.22: Centered Logo lifts & dissolves while canvas deepens to Wood-Fired Charcoal (#141413)
  // 0.12 -> 0.34: 5 Photorealistic Pizza Layers emerge in 3D exploded perspective
  // 0.34 -> 0.74: Layers converge into the cornicione crust & seamlessly fuse into whole baked pizza
  // 0.76 -> 1.00: Minimal signature caption & Menu CTA reveal
  useEffect(() => {
    const section = sectionRef.current;
    const logoHero = logoHeroRef.current;
    const scrollCue = scrollCueRef.current;
    const stage = stageRef.current;
    const glow = glowRef.current;
    const orbitOuter = orbitOuterRef.current;
    const orbitInner = orbitInnerRef.current;
    const steamGroup = steamGroupRef.current;
    const assembledPizza = assembledPizzaRef.current;
    const caption = captionRef.current;
    if (!section || !logoHero || !stage || !caption || !assembledPizza) return;

    const root = document.documentElement;
    const layers = gsap.utils.toArray<HTMLElement>("[data-pizza-layer]", stage);
    const callouts = gsap.utils.toArray<HTMLElement>("[data-pizza-callout]", stage);
    const captionItems = gsap.utils.toArray<HTMLElement>("[data-caption-item]", caption);

    const baseWidth = Math.min(480, window.innerWidth * 0.84);
    const ratio = baseWidth / 480;
    const explodedSpan = (212 - -224 + 210) * ratio;

    const mm = gsap.matchMedia();

    // ── Desktop (>= 960px)
    mm.add("(min-width: 960px) and (prefers-reduced-motion: no-preference)", () => {
      const fit = gsap.utils.clamp(0.62, 0.94, (window.innerHeight - 170) / explodedSpan);

      gsap.set(root, PALETTES.red);
      gsap.set(logoHero, { xPercent: -50, yPercent: -50, opacity: 1, scale: 1, y: 0 });
      if (scrollCue) gsap.set(scrollCue, { xPercent: -50, opacity: 1, y: 0 });

      gsap.set(stage, {
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 28,
        scale: fit * 0.9,
        opacity: 0,
      });
      gsap.set(assembledPizza, { opacity: 0, scale: 0.985, y: 8 * ratio });
      gsap.set(callouts, { opacity: 0, x: (idx) => (idx % 2 === 0 ? -12 : 12) });
      gsap.set(captionItems, { opacity: 0, y: 26 });

      if (glow) gsap.set(glow, { opacity: 0, scale: 0.78 });
      if (orbitOuter) gsap.set(orbitOuter, { rotation: 0, scale: 1.06, opacity: 0, transformOrigin: "50% 50%" });
      if (orbitInner) gsap.set(orbitInner, { rotation: 0, scale: 0.92, opacity: 0, transformOrigin: "50% 50%" });
      if (steamGroup) gsap.set(steamGroup, { opacity: 0, y: 16 });

      SIGNATURE_PIZZA.layers.forEach((spec, idx) => {
        const el = layers[idx];
        if (!el) return;
        gsap.set(el, {
          x: spec.explodedX * ratio,
          y: spec.explodedY * ratio * 1.12,
          rotation: spec.explodedRotate * 1.2,
          scale: spec.explodedScale,
          opacity: 0,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Centered Da Nino Logo lifts & fades out on first scroll
      if (scrollCue) {
        tl.to(scrollCue, { opacity: 0, y: 12, duration: 0.08, ease: "power1.out" }, 0);
      }
      tl.to(
        logoHero,
        {
          opacity: 0,
          y: -76,
          scale: 1.1,
          duration: 0.16,
          ease: "power2.inOut",
        },
        0.02,
      );

      // Transition canvas from Da Nino Red (#D81E12) to Wood-Fired Charcoal (#141413)
      tl.to(
        root,
        {
          ...PALETTES.dark,
          duration: 0.22,
          ease: "none",
        },
        0.05,
      );

      // 2. Pizza Stage & 5 Deconstructed Layers emerge in 3D space
      tl.to(
        stage,
        {
          opacity: 1,
          y: 0,
          scale: fit,
          duration: 0.18,
          ease: "power2.out",
        },
        0.11,
      );

      tl.to(
        layers,
        {
          opacity: 1,
          y: (idx: number) => (SIGNATURE_PIZZA.layers[idx]?.explodedY ?? 0) * ratio,
          rotation: (idx: number) => SIGNATURE_PIZZA.layers[idx]?.explodedRotate ?? 0,
          duration: 0.2,
          stagger: 0.022,
          ease: "power2.out",
        },
        0.12,
      );

      if (orbitOuter) {
        tl.to(orbitOuter, { opacity: 1, duration: 0.16 }, 0.15);
        tl.to(orbitOuter, { rotation: 120, scale: 0.98, duration: 0.85, ease: "none" }, 0.15);
      }
      if (orbitInner) {
        tl.to(orbitInner, { opacity: 1, duration: 0.16 }, 0.15);
        tl.to(orbitInner, { rotation: -140, scale: 1.04, duration: 0.85, ease: "none" }, 0.15);
      }
      if (glow) {
        tl.to(glow, { opacity: 0.45, scale: 0.92, duration: 0.2 }, 0.16);
      }

      tl.to(
        callouts,
        {
          opacity: 1,
          x: 0,
          duration: 0.12,
          stagger: 0.018,
          ease: "power2.out",
        },
        0.2,
      );

      // 3. Callouts retract and all 5 layers converge into the cornicione crust
      tl.to(
        callouts,
        {
          opacity: 0,
          x: (idx) => (idx % 2 === 0 ? 10 : -10),
          duration: 0.11,
          ease: "power1.in",
        },
        0.36,
      );

      SIGNATURE_PIZZA.layers.forEach((spec, idx) => {
        const el = layers[idx];
        if (!el) return;
        tl.to(
          el,
          {
            x: 0,
            y: spec.assembledY * ratio,
            rotation: 0,
            scale: 1,
            duration: 0.34,
            ease: "power2.inOut",
          },
          0.36 + (4 - idx) * 0.014,
        );
      });

      tl.to(stage, { scale: 1.04, duration: 0.36, ease: "power2.inOut" }, 0.36);

      if (glow) {
        tl.to(glow, { opacity: 0.95, scale: 1.14, duration: 0.3, ease: "power2.out" }, 0.52);
      }

      // Seamless photorealistic lock-in into whole freshly baked Quattro Stagioni pizza
      tl.to(
        assembledPizza,
        {
          opacity: 1,
          scale: 1,
          duration: 0.13,
          ease: "power2.inOut",
        },
        0.64,
      );
      tl.to(
        layers,
        {
          opacity: 0,
          duration: 0.11,
          ease: "power1.inOut",
        },
        0.67,
      );

      if (steamGroup) {
        tl.to(steamGroup, { opacity: 0.85, y: -8, duration: 0.22, ease: "power2.out" }, 0.68);
      }

      // 4. Glide assembled pizza right & reveal concise signature caption on left
      tl.to(
        stage,
        {
          x: () => Math.min(window.innerWidth * 0.19, 240),
          scale: 1.08,
          duration: 0.22,
          ease: "power2.inOut",
        },
        0.76,
      );

      tl.to(
        captionItems,
        {
          opacity: 1,
          y: 0,
          duration: 0.18,
          stagger: 0.035,
          ease: "power3.out",
        },
        0.79,
      );
    });

    // ── Mobile & Tablet (< 960px)
    mm.add("(max-width: 959px) and (prefers-reduced-motion: no-preference)", () => {
      const fit = gsap.utils.clamp(0.58, 0.88, (window.innerHeight - 230) / explodedSpan);

      gsap.set(root, PALETTES.red);
      gsap.set(logoHero, { xPercent: -50, yPercent: -50, opacity: 1, scale: 1, y: 0 });
      if (scrollCue) gsap.set(scrollCue, { xPercent: -50, opacity: 1, y: 0 });

      gsap.set(stage, {
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 22,
        scale: fit * 0.9,
        opacity: 0,
      });
      gsap.set(assembledPizza, { opacity: 0, scale: 0.985, y: 8 * ratio });
      gsap.set(captionItems, { opacity: 0, y: 20 });

      if (glow) gsap.set(glow, { opacity: 0, scale: 0.8 });
      if (orbitOuter) gsap.set(orbitOuter, { rotation: 0, opacity: 0, transformOrigin: "50% 50%" });
      if (orbitInner) gsap.set(orbitInner, { rotation: 0, opacity: 0, transformOrigin: "50% 50%" });
      if (steamGroup) gsap.set(steamGroup, { opacity: 0, y: 12 });

      SIGNATURE_PIZZA.layers.forEach((spec, idx) => {
        const el = layers[idx];
        if (!el) return;
        gsap.set(el, {
          x: spec.explodedX * ratio * 0.6,
          y: spec.explodedY * ratio * 1.08,
          rotation: spec.explodedRotate * 0.85,
          scale: spec.explodedScale,
          opacity: 0,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (scrollCue) {
        tl.to(scrollCue, { opacity: 0, y: 10, duration: 0.08 }, 0);
      }
      tl.to(logoHero, { opacity: 0, y: -56, scale: 1.08, duration: 0.16, ease: "power2.inOut" }, 0.02);
      tl.to(root, { ...PALETTES.dark, duration: 0.22, ease: "none" }, 0.05);

      tl.to(stage, { opacity: 1, y: 0, scale: fit, duration: 0.18, ease: "power2.out" }, 0.11);
      tl.to(
        layers,
        {
          opacity: 1,
          y: (idx: number) => (SIGNATURE_PIZZA.layers[idx]?.explodedY ?? 0) * ratio,
          duration: 0.2,
          stagger: 0.02,
          ease: "power2.out",
        },
        0.12,
      );

      if (orbitOuter) {
        tl.to(orbitOuter, { opacity: 0.9, duration: 0.15 }, 0.15);
        tl.to(orbitOuter, { rotation: 95, duration: 0.85, ease: "none" }, 0.15);
      }
      if (orbitInner) {
        tl.to(orbitInner, { opacity: 0.9, duration: 0.15 }, 0.15);
        tl.to(orbitInner, { rotation: -110, duration: 0.85, ease: "none" }, 0.15);
      }
      if (glow) {
        tl.to(glow, { opacity: 0.9, scale: 1.1, duration: 0.35 }, 0.42);
      }

      SIGNATURE_PIZZA.layers.forEach((spec, idx) => {
        const el = layers[idx];
        if (!el) return;
        tl.to(
          el,
          {
            x: 0,
            y: spec.assembledY * ratio,
            rotation: 0,
            scale: 1,
            duration: 0.34,
            ease: "power2.inOut",
          },
          0.35 + (4 - idx) * 0.012,
        );
      });

      tl.to(stage, { scale: 0.96, duration: 0.34, ease: "power2.inOut" }, 0.35);

      tl.to(assembledPizza, { opacity: 1, scale: 1, duration: 0.13, ease: "power2.inOut" }, 0.63);
      tl.to(layers, { opacity: 0, duration: 0.11, ease: "power1.inOut" }, 0.66);

      if (steamGroup) {
        tl.to(steamGroup, { opacity: 0.8, y: -6, duration: 0.2 }, 0.67);
      }

      tl.to(
        stage,
        {
          y: () => -Math.min(window.innerHeight * 0.15, 105),
          scale: 0.9,
          duration: 0.22,
          ease: "power2.inOut",
        },
        0.75,
      );

      tl.to(
        captionItems,
        {
          opacity: 1,
          y: 0,
          duration: 0.18,
          stagger: 0.035,
          ease: "power3.out",
        },
        0.78,
      );
    });

    // ── Reduced Motion Accessibility Fallback
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(root, PALETTES.dark);
      gsap.set(logoHero, { clearProps: "all" });
      gsap.set(stage, { clearProps: "all", opacity: 1 });
      gsap.set(layers, { opacity: 0 });
      gsap.set(assembledPizza, { opacity: 1, scale: 1, y: 0 });
      gsap.set(captionItems, { opacity: 1, y: 0 });
      if (scrollCue) gsap.set(scrollCue, { display: "none" });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      data-palette="dark"
      className={styles.section}
      aria-label="Pizzeria Da Nino Bern"
    >
      <div className={`container ${styles.viewport}`}>
        {/* ── OPENING BEAT: Centered Da Nino Logo right in the middle of the page ── */}
        <div ref={logoHeroRef} className={styles.heroLogoCenter}>
          <h1 className="sr-only">Pizzeria Da Nino — Belpstrasse 65, 3007 Bern</h1>
          <DaNinoLogo className={styles.heroLogoSvg} />
          <p className={styles.heroMetaLine}>{tHero.metaLine}</p>
        </div>

        {/* ── SCROLL STAGE: 5-Layer Deconstructed -> Seamlessly Assembled Wood-Fired Pizza ── */}
        <div ref={stageRef} className={styles.stageWrap}>
          <div ref={glowRef} className={styles.stageGlow} aria-hidden="true" />

          <svg
            className={styles.orbitBackdrop}
            viewBox="0 0 560 560"
            fill="none"
            aria-hidden="true"
          >
            <g ref={orbitOuterRef}>
              <circle
                cx="280"
                cy="280"
                r="254"
                stroke="currentColor"
                strokeOpacity="0.14"
                strokeWidth="1"
                strokeDasharray="4 12"
              />
              <circle cx="280" cy="26" r="3" fill="currentColor" fillOpacity="0.4" />
              <circle cx="534" cy="280" r="3" fill="currentColor" fillOpacity="0.4" />
              <circle cx="280" cy="534" r="3" fill="currentColor" fillOpacity="0.4" />
              <circle cx="26" cy="280" r="3" fill="currentColor" fillOpacity="0.4" />
            </g>
            <g ref={orbitInnerRef}>
              <circle
                cx="280"
                cy="280"
                r="198"
                stroke="currentColor"
                strokeOpacity="0.1"
                strokeWidth="1.1"
                strokeDasharray="36 20"
              />
            </g>
            <g ref={steamGroupRef} className={styles.steamWaves}>
              <path
                d="M222 142C215 120 232 102 224 80"
                stroke="currentColor"
                strokeOpacity="0.34"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M280 126C272 100 290 80 280 54"
                stroke="currentColor"
                strokeOpacity="0.45"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M338 142C331 120 348 102 340 80"
                stroke="currentColor"
                strokeOpacity="0.34"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          </svg>

          <div ref={tiltWrapRef} className={styles.tiltStage}>
            <div
              className={styles.layersStack}
              role="img"
              aria-label={`${tHero.pizzaTitle} — ${tHero.pizzaIngredients}`}
            >
              {SIGNATURE_PIZZA.layers.map((layer, idx) => {
                const layerLabel = tHero.layers[layer.id];
                return (
                  <div
                    key={layer.id}
                    data-pizza-layer
                    className={styles.layerItem}
                    style={
                      {
                        zIndex: layer.zIndex,
                        "--layer-scale": layer.widthScale,
                        "--float-delay": `${idx * -0.6}s`,
                      } as React.CSSProperties
                    }
                  >
                    <div className={styles.layerFloat}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={layer.imageSrc}
                        alt=""
                        width={layer.imageWidth}
                        height={layer.imageHeight}
                        className={styles.layerImg}
                        loading="eager"
                        fetchPriority={idx === 4 ? "high" : "auto"}
                        decoding="async"
                        draggable={false}
                      />
                    </div>

                    <span
                      data-pizza-callout
                      className={styles.layerCallout}
                      aria-hidden="true"
                    >
                      <span className={styles.calloutIndex}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span>{layerLabel}</span>
                    </span>
                  </div>
                );
              })}

              {/* Photorealistic whole assembled pizza locked in at identical perspective */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={assembledPizzaRef}
                src={SIGNATURE_PIZZA.assembledImageSrc}
                alt=""
                width={SIGNATURE_PIZZA.assembledWidth}
                height={SIGNATURE_PIZZA.assembledHeight}
                className={styles.assembledMasterImg}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* ── MINIMAL SIGNATURE CAPTION (Reveals once pizza is assembled) ── */}
        <div ref={captionRef} className={styles.captionCol}>
          <span data-caption-item className={styles.eyebrow}>
            {tHero.pizzaEyebrow}
          </span>
          <h2 data-caption-item className={styles.pizzaTitle}>
            {tHero.pizzaTitle}
          </h2>
          <p data-caption-item className={styles.pizzaIngredients}>
            {tHero.pizzaIngredients}
          </p>
          <div data-caption-item className={styles.priceAndAction}>
            <div className={styles.priceBlock}>
              <span className={styles.pizzaPrice}>{SIGNATURE_PIZZA.priceDisplay}</span>
              <span className={styles.pizzaNote}>{tHero.pizzaNote}</span>
            </div>
            <a
              id="hero-menu-cta"
              ref={ctaRef}
              href="#menu"
              onClick={handleAnchorClick}
              className={styles.menuCtaBtn}
            >
              <span>{tHero.pizzaCta}</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        {/* ── OPENING SCROLL INDICATOR ── */}
        <div ref={scrollCueRef} className={styles.scrollCue} aria-hidden="true">
          <span>{tHero.scrollCue}</span>
          <span className={styles.scrollArrow}>↓</span>
        </div>
      </div>
    </section>
  );
}
