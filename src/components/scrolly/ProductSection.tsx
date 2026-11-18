"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProductScrollyConfig } from "@/config/products";
import { DietaryIcon } from "@/components/icons/DaNinoBrandIcons";
import { CulinaryLayerArtwork } from "@/components/placeholders/CulinaryArtwork";
import { addCartItem } from "@/lib/cart";
import { DICTIONARIES, useLocale } from "@/lib/i18n";
import { handleAnchorClick, useMagnetic } from "@/lib/interactions";
import { scrollToTarget } from "@/lib/lenis";
import { CanvasSequenceStage } from "./CanvasSequenceStage";
import styles from "./ProductSection.module.css";

gsap.registerPlugin(ScrollTrigger);

interface ProductSectionProps {
  product: ProductScrollyConfig;
  isOpeningHero?: boolean;
}

export function ProductSection({ product, isOpeningHero = false }: ProductSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltWrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const orbitRingOuterRef = useRef<SVGGElement>(null);
  const orbitRingInnerRef = useRef<SVGGElement>(null);
  const steamGroupRef = useRef<SVGGElement>(null);
  const kineticTopRef = useRef<HTMLDivElement>(null);
  const kineticBottomRef = useRef<HTMLDivElement>(null);
  const sculpturePrimaryRef = useRef<HTMLImageElement>(null);
  const sculptureSecondaryRef = useRef<HTMLImageElement>(null);
  const copyColRef = useRef<HTMLDivElement>(null);
  const phaseLabelRef = useRef<HTMLSpanElement>(null);
  const phaseBarRef = useRef<HTMLSpanElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const sequenceProgressRef = useRef<number>(0);
  const rawProgressRef = useRef<number>(0);
  const magneticRef = useMagnetic<HTMLAnchorElement>();

  const [locale] = useLocale();
  const dict = DICTIONARIES[locale];
  const tProduct = dict.products[product.key];
  const phasesRef = useRef(dict.scrolly.phases);

  const [xrayOpen, setXrayOpen] = useState(false);
  const [activeLayerIdx, setActiveLayerIdx] = useState<number | null>(null);
  const [pdfMode, setPdfMode] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);

  useEffect(() => {
    phasesRef.current = dict.scrolly.phases;
    if (phaseLabelRef.current) {
      const p = rawProgressRef.current;
      if (p < 0.24) {
        phaseLabelRef.current.textContent = dict.scrolly.phases.p1;
      } else if (p < 0.58) {
        phaseLabelRef.current.textContent = dict.scrolly.phases.p2;
      } else {
        phaseLabelRef.current.textContent = dict.scrolly.phases.p3;
      }
    }
  }, [dict.scrolly.phases]);

  // Paralaje 3D interactivo al mover el puntero sobre la sección (GSAP quickTo)
  useEffect(() => {
    const section = sectionRef.current;
    const tiltWrap = tiltWrapRef.current;
    const scPrimary = sculpturePrimaryRef.current;
    const scSecondary = sculptureSecondaryRef.current;
    if (!section || !tiltWrap) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;

    gsap.set(tiltWrap, { transformPerspective: 900 });
    const rotY = gsap.quickTo(tiltWrap, "rotationY", { duration: 0.6, ease: "power3.out" });
    const rotX = gsap.quickTo(tiltWrap, "rotationX", { duration: 0.6, ease: "power3.out" });
    const moveX = gsap.quickTo(tiltWrap, "x", { duration: 0.6, ease: "power3.out" });
    const moveY = gsap.quickTo(tiltWrap, "y", { duration: 0.6, ease: "power3.out" });
    const sc1X = scPrimary
      ? gsap.quickTo(scPrimary, "x", { duration: 0.85, ease: "power3.out" })
      : null;
    const sc1Y = scPrimary
      ? gsap.quickTo(scPrimary, "y", { duration: 0.85, ease: "power3.out" })
      : null;
    const sc2X = scSecondary
      ? gsap.quickTo(scSecondary, "x", { duration: 0.95, ease: "power3.out" })
      : null;
    const sc2Y = scSecondary
      ? gsap.quickTo(scSecondary, "y", { duration: 0.95, ease: "power3.out" })
      : null;

    const onPointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      rotY(nx * 14);
      rotX(-ny * 11);
      moveX(nx * 18);
      moveY(ny * 14);
      sc1X?.(-nx * 28);
      sc1Y?.(-ny * 22);
      sc2X?.(nx * 24);
      sc2Y?.(ny * 20);
    };

    const onPointerLeave = () => {
      rotY(0);
      rotX(0);
      moveX(0);
      moveY(0);
      sc1X?.(0);
      sc1Y?.(0);
      sc2X?.(0);
      sc2Y?.(0);
    };

    section.addEventListener("pointermove", onPointerMove, { passive: true });
    section.addEventListener("pointerleave", onPointerLeave);
    return () => {
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const glow = glowRef.current;
    const orbitOuter = orbitRingOuterRef.current;
    const orbitInner = orbitRingInnerRef.current;
    const steamGroup = steamGroupRef.current;
    const kineticTop = kineticTopRef.current;
    const kineticBottom = kineticBottomRef.current;
    const scPrimary = sculpturePrimaryRef.current;
    const scSecondary = sculptureSecondaryRef.current;
    const copyCol = copyColRef.current;
    const scrollHint = scrollHintRef.current;
    if (!section || !stage || !copyCol) return;

    const layers = gsap.utils.toArray<HTMLElement>("[data-scrolly-layer]", stage);
    const callouts = gsap.utils.toArray<HTMLElement>("[data-scrolly-callout]", stage);
    const copyItems = gsap.utils.toArray<HTMLElement>("[data-scrolly-copy]", copyCol);

    const ratio = Math.min(360, window.innerWidth * 0.76) / 360;
    const explodedYs = product.layers.map((l) => l.explodedY);
    const tallestLayer = Math.max(
      ...product.layers.map((l) =>
        l.imageWidth && l.imageHeight ? 360 * (l.widthScale ?? 1) * (l.imageHeight / l.imageWidth) : 150,
      ),
    );
    const explodedSpan = (Math.max(...explodedYs) - Math.min(...explodedYs) + tallestLayer) * ratio;
    const fitFor = (reserved: number) =>
      gsap.utils.clamp(0.5, 1, (window.innerHeight - reserved) / explodedSpan);

    const updateHud = (progress: number) => {
      rawProgressRef.current = progress;
      const norm = Math.max(0, Math.min(1, (progress - 0.1) / 0.44));
      sequenceProgressRef.current = norm;

      if (phaseBarRef.current) {
        phaseBarRef.current.style.transform = `scaleX(${progress.toFixed(3)})`;
      }
      if (phaseLabelRef.current) {
        if (progress < 0.24) {
          phaseLabelRef.current.textContent = phasesRef.current.p1;
        } else if (progress < 0.58) {
          phaseLabelRef.current.textContent = phasesRef.current.p2;
        } else {
          phaseLabelRef.current.textContent = phasesRef.current.p3;
        }
      }
    };

    const mm = gsap.matchMedia();

    // ── Desktop (>= 960px): Deconstruido + Fondos Cinéticos -> Ensamblaje -> Derecha + Copy Compacto
    mm.add("(min-width: 960px) and (prefers-reduced-motion: no-preference)", () => {
      const fit = fitFor(180);
      gsap.set(stage, { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: fit });
      gsap.set(copyItems, { opacity: 0, y: 34 });
      if (glow) gsap.set(glow, { opacity: 0.42, scale: 0.85 });
      if (orbitOuter) gsap.set(orbitOuter, { rotation: 0, scale: 1.08, transformOrigin: "50% 50%" });
      if (orbitInner) gsap.set(orbitInner, { rotation: 0, scale: 0.92, transformOrigin: "50% 50%" });
      if (steamGroup) gsap.set(steamGroup, { opacity: 0, y: 18 });
      if (kineticTop) gsap.set(kineticTop, { xPercent: 0 });
      if (kineticBottom) gsap.set(kineticBottom, { xPercent: -18 });
      if (scPrimary) gsap.set(scPrimary, { rotation: -18, scale: 0.9, yPercent: 0 });
      if (scSecondary) gsap.set(scSecondary, { rotation: 15, scale: 0.92, yPercent: 0 });
      if (scrollHint) gsap.set(scrollHint, { opacity: 1, y: 0 });

      product.layers.forEach((spec, idx) => {
        const el = layers[idx];
        if (!el) return;
        gsap.set(el, {
          x: (spec.explodedX ?? 0) * ratio,
          y: spec.explodedY * ratio,
          rotation: spec.explodedRotate,
          scale: spec.explodedScale ?? 1,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=230%",
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateHud(self.progress),
        },
      });

      // Bandas tipográficas monumentales de fondo en direcciones opuestas
      if (kineticTop) {
        tl.to(kineticTop, { xPercent: -22, duration: 0.96, ease: "none" }, 0);
      }
      if (kineticBottom) {
        tl.to(kineticBottom, { xPercent: 4, duration: 0.96, ease: "none" }, 0);
      }

      // Esculturas 3D generativas no gastronómicas en paralaje rotatorio
      if (scPrimary) {
        tl.to(
          scPrimary,
          { rotation: 78, scale: 1.14, yPercent: -24, duration: 0.96, ease: "none" },
          0,
        );
      }
      if (scSecondary) {
        tl.to(
          scSecondary,
          { rotation: -92, scale: 1.08, yPercent: 22, duration: 0.96, ease: "none" },
          0,
        );
      }

      // Rotación continua de los anillos orbitales detrás del plato
      if (orbitOuter) {
        tl.to(orbitOuter, { rotation: 135, scale: 0.96, duration: 0.96, ease: "none" }, 0);
      }
      if (orbitInner) {
        tl.to(orbitInner, { rotation: -160, scale: 1.04, duration: 0.96, ease: "none" }, 0);
      }

      if (scrollHint) {
        tl.to(scrollHint, { opacity: 0, y: 12, duration: 0.14, ease: "power1.out" }, 0);
      }

      // Fase 1 (0.00 -> 0.12): Expansión sutil en vista explosionada
      tl.to(
        layers,
        {
          y: (idx: number) => (product.layers[idx]?.explodedY ?? 0) * ratio * 1.06,
          duration: 0.12,
          ease: "none",
        },
        0,
      );

      // Fase 2 (0.12 -> 0.56): Convergencia de capas hasta ensamblar el producto
      product.layers.forEach((spec, idx) => {
        const el = layers[idx];
        if (!el) return;
        tl.to(
          el,
          {
            x: 0,
            y: spec.assembledY * ratio,
            rotation: 0,
            scale: 1,
            duration: 0.44,
            ease: "power2.inOut",
          },
          0.12,
        );
      });

      tl.to(stage, { scale: 1, duration: 0.44, ease: "power2.inOut" }, 0.12);

      if (callouts.length > 0) {
        tl.to(
          callouts,
          {
            opacity: 0,
            x: 16,
            duration: 0.24,
            stagger: 0.02,
            ease: "power1.out",
          },
          0.22,
        );
      }

      if (glow) {
        tl.to(glow, { opacity: 0.9, scale: 1.12, duration: 0.42, ease: "power2.out" }, 0.28);
      }

      // Ondas de aroma/vapor emergen cuando el plato queda ensamblado
      if (steamGroup) {
        tl.to(steamGroup, { opacity: 0.85, y: -8, duration: 0.32, ease: "power2.out" }, 0.46);
      }

      // Fase 3 (0.58 -> 0.96): Desplazamiento a la derecha + Revelación de impacto en la izquierda
      tl.to(
        stage,
        {
          x: () => Math.min(window.innerWidth * 0.22, 290),
          scale: 1.05,
          duration: 0.36,
          ease: "power2.inOut",
        },
        0.58,
      );

      tl.to(
        copyItems,
        {
          opacity: 1,
          y: 0,
          duration: 0.28,
          stagger: 0.055,
          ease: "power3.out",
        },
        0.62,
      );
    });

    // ── Mobile / Tablet (< 960px)
    mm.add("(max-width: 959px) and (prefers-reduced-motion: no-preference)", () => {
      const fit = fitFor(260);
      gsap.set(stage, { xPercent: -50, yPercent: -47, x: 0, y: 0, scale: fit });
      gsap.set(copyItems, { opacity: 0, y: 24 });
      if (orbitOuter) gsap.set(orbitOuter, { rotation: 0, transformOrigin: "50% 50%" });
      if (orbitInner) gsap.set(orbitInner, { rotation: 0, transformOrigin: "50% 50%" });
      if (kineticTop) gsap.set(kineticTop, { xPercent: 0 });
      if (kineticBottom) gsap.set(kineticBottom, { xPercent: -18 });
      if (scrollHint) gsap.set(scrollHint, { opacity: 1, y: 0 });

      product.layers.forEach((spec, idx) => {
        const el = layers[idx];
        if (!el) return;
        gsap.set(el, {
          x: (spec.explodedX ?? 0) * ratio * 0.6,
          y: spec.explodedY * ratio,
          rotation: spec.explodedRotate * 0.75,
          scale: spec.explodedScale ?? 1,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=185%",
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateHud(self.progress),
        },
      });

      if (kineticTop) tl.to(kineticTop, { xPercent: -18, duration: 0.96, ease: "none" }, 0);
      if (kineticBottom) tl.to(kineticBottom, { xPercent: 2, duration: 0.96, ease: "none" }, 0);
      if (scPrimary) tl.to(scPrimary, { rotation: 64, yPercent: -16, duration: 0.96, ease: "none" }, 0);
      if (scSecondary) tl.to(scSecondary, { rotation: -72, yPercent: 16, duration: 0.96, ease: "none" }, 0);
      if (orbitOuter) tl.to(orbitOuter, { rotation: 110, duration: 0.96, ease: "none" }, 0);
      if (orbitInner) tl.to(orbitInner, { rotation: -120, duration: 0.96, ease: "none" }, 0);

      if (scrollHint) {
        tl.to(scrollHint, { opacity: 0, duration: 0.14 }, 0);
      }

      product.layers.forEach((spec, idx) => {
        const el = layers[idx];
        if (!el) return;
        tl.to(
          el,
          {
            x: 0,
            y: spec.assembledY * ratio,
            rotation: 0,
            scale: 1,
            duration: 0.44,
            ease: "power2.inOut",
          },
          0.1,
        );
      });

      tl.to(stage, { scale: 0.9, duration: 0.44, ease: "power2.inOut" }, 0.1);

      if (callouts.length > 0) {
        tl.to(callouts, { opacity: 0, duration: 0.2 }, 0.2);
      }

      tl.to(
        stage,
        {
          yPercent: -94,
          scale: 0.62,
          duration: 0.36,
          ease: "power2.inOut",
        },
        0.56,
      );

      tl.to(
        copyItems,
        {
          opacity: 1,
          y: 0,
          duration: 0.28,
          stagger: 0.05,
          ease: "power3.out",
        },
        0.6,
      );
    });

    // ── Movimiento reducido
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(stage, { xPercent: 0, yPercent: 0, x: 0, y: 0, scale: 1 });
      gsap.set(copyItems, { opacity: 1, y: 0 });
      gsap.set(callouts, { opacity: 0 });
      if (scrollHint) gsap.set(scrollHint, { opacity: 0 });
      product.layers.forEach((spec, idx) => {
        const el = layers[idx];
        if (!el) return;
        gsap.set(el, { x: 0, y: spec.assembledY * ratio, rotation: 0, scale: 1 });
      });
    });

    return () => mm.revert();
  }, [product]);

  // Motor interactivo en tiempo real: Modo Rayos X (separación + foco por ingrediente) y Modo Carta PDF Plana
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const inspectors = gsap.utils.toArray<HTMLElement>("[data-layer-inspector]", stage);
    if (inspectors.length === 0) return;

    const ratio = Math.min(360, window.innerWidth * 0.76) / 360;

    if (pdfMode) {
      gsap.to(inspectors, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 0.78,
        opacity: 0.08,
        duration: 0.38,
        ease: "power3.out",
        overwrite: "auto",
      });
      return;
    }

    if (xrayOpen) {
      product.layers.forEach((spec, idx) => {
        const el = inspectors[idx];
        if (!el) return;
        const deltaY = (spec.explodedY - spec.assembledY) * ratio * 0.62;
        const deltaX = (spec.explodedX ?? 0) * ratio * 0.5;
        const isSelected = activeLayerIdx === idx;
        const isDimmed = activeLayerIdx !== null && !isSelected;

        gsap.to(el, {
          x: isSelected ? deltaX * 0.35 : deltaX,
          y: deltaY,
          rotation: isSelected ? 0 : spec.explodedRotate * 0.55,
          scale: isSelected ? 1.1 : isDimmed ? 0.92 : 1.01,
          opacity: isDimmed ? 0.24 : 1,
          duration: 0.46,
          ease: isSelected ? "back.out(1.6)" : "power3.out",
          overwrite: "auto",
        });
      });
      return;
    }

    gsap.to(inspectors, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      duration: 0.44,
      ease: "power3.inOut",
      overwrite: "auto",
    });
  }, [xrayOpen, activeLayerIdx, pdfMode, product]);

  const HeadingTag = isOpeningHero ? "h1" : "h2";

  function getLayerLabel(layerId: string, fallback: string) {
    return tProduct.layers[layerId] ?? fallback;
  }

  function handlePreviewClick() {
    window.dispatchEvent(
      new CustomEvent("atelier:select-concept", {
        detail: { conceptKey: product.key },
      }),
    );
    scrollToTarget("#take-away-karte");
    history.replaceState(null, "", "#take-away-karte");
  }

  function handleQuickAddBag() {
    const numericPrice = product.key === "dodici" ? 19.0 : product.key === "eigerplatz" ? 22.0 : 5.0;
    addCartItem({
      id: product.menuItemId,
      name: tProduct.pdfDishName,
      size: product.key === "dolce" ? "slice" : undefined,
      priceChf: numericPrice,
    });
    setAddedToBag(true);
    window.setTimeout(() => setAddedToBag(false), 1800);
  }

  function toggleXrayMode() {
    setPdfMode(false);
    setXrayOpen((prev) => {
      const next = !prev;
      if (!next) setActiveLayerIdx(null);
      return next;
    });
  }

  function togglePdfMode() {
    setXrayOpen(false);
    setActiveLayerIdx(null);
    setPdfMode((prev) => !prev);
  }

  function selectInspectorLayer(idx: number) {
    setPdfMode(false);
    if (!xrayOpen) {
      setXrayOpen(true);
      setActiveLayerIdx(idx);
      return;
    }
    setActiveLayerIdx((prev) => (prev === idx ? null : idx));
  }

  const activeLayerObj = activeLayerIdx !== null ? product.layers[activeLayerIdx] : null;
  const activeLayerTranslated = activeLayerObj
    ? getLayerLabel(activeLayerObj.id, activeLayerObj.label)
    : "";

  return (
    <section
      id={product.id}
      ref={sectionRef}
      className={`${styles.section} ${isOpeningHero ? styles.openingSection : ""}`}
      data-palette={product.palette}
      aria-labelledby={`${product.id}-title`}
    >
      {/* Tipografía cinética monumental + esculturas 3D generativas no gastronómicas en segundo plano */}
      <div className={styles.kineticBackdrop} aria-hidden="true">
        <div ref={kineticTopRef} className={styles.kineticTrack}>
          <span>{tProduct.kineticWords[0]}</span>
          <span>{tProduct.kineticWords[0]}</span>
        </div>
        <div ref={kineticBottomRef} className={`${styles.kineticTrack} ${styles.kineticTrackReverse}`}>
          <span>{tProduct.kineticWords[1]}</span>
          <span>{tProduct.kineticWords[1]}</span>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={sculpturePrimaryRef}
          src={product.generativeVisuals.sculpturePrimarySrc}
          alt=""
          width={280}
          height={280}
          loading={isOpeningHero ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className={styles.sculpturePrimary}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={sculptureSecondaryRef}
          src={product.generativeVisuals.sculptureSecondarySrc}
          alt=""
          width={240}
          height={240}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={styles.sculptureSecondary}
        />
      </div>

      <div className={`container ${styles.viewport}`}>
        {/* HUD de fase con micro-barra de progreso */}
        <div className={styles.phaseHud} aria-hidden="true">
          <div className={styles.phaseLeft}>
            <span className={`mono ${styles.phaseIndex}`}>{product.indexLabel} / 03</span>
            <span className={styles.phaseMeter}>
              <span ref={phaseBarRef} className={styles.phaseMeterFill} />
            </span>
          </div>
          <span ref={phaseLabelRef} className={`mono ${styles.phaseLabel}`}>
            {dict.scrolly.phases.p1}
          </span>
        </div>

        {/* Columna izquierda interactiva: titular + 1 frase + controles en vivo (Rayos X y PDF vs 60 FPS) */}
        <div ref={copyColRef} className={styles.copyCol}>
          <span data-scrolly-copy className={`mono ${styles.eyebrow}`}>
            {tProduct.eyebrow}
          </span>

          <HeadingTag
            id={`${product.id}-title`}
            data-scrolly-copy
            className={`${styles.title} ${isOpeningHero ? styles.heroTitle : ""}`}
          >
            <span>{tProduct.title}</span>
            <DietaryIcon tag={product.dietaryTag} className={styles.titleDietaryIcon} />
          </HeadingTag>

          <p data-scrolly-copy className={styles.subtitle}>
            {tProduct.subtitle}
          </p>

          {/* Controles interactivos de retención: Rayos X de capas + Comparador Carta PDF vs 60 FPS */}
          <div data-scrolly-copy className={styles.labControlsRow}>
            <button
              id={`xray-toggle-${product.key}`}
              type="button"
              aria-pressed={xrayOpen}
              className={`mono ${styles.labControlBtn} ${xrayOpen ? styles.labControlBtnActive : ""}`}
              onClick={toggleXrayMode}
            >
              <span>{xrayOpen ? dict.scrolly.xrayAssemble : dict.scrolly.xrayExplode}</span>
            </button>

            <button
              id={`pdf-toggle-${product.key}`}
              type="button"
              aria-pressed={pdfMode}
              className={`mono ${styles.labControlBtn} ${pdfMode ? styles.labControlBtnActive : ""}`}
              onClick={togglePdfMode}
            >
              <span>{pdfMode ? dict.scrolly.pdfBackTo60 : dict.scrolly.pdfCompare}</span>
            </button>
          </div>

          {xrayOpen ? (
            <div
              data-scrolly-copy
              className={styles.inspectorPanel}
              role="group"
              aria-label={dict.scrolly.inspectorGroupAria}
            >
              <div className={styles.inspectorHeader}>
                <span className="mono">
                  {activeLayerIdx !== null
                    ? `${dict.scrolly.inspectorIsolatedPrefix}: ${activeLayerTranslated.toUpperCase()}`
                    : dict.scrolly.inspectorPrompt}
                </span>
              </div>
              <div className={styles.inspectorGrid}>
                {product.layers.map((layer, idx) => {
                  const isSelected = activeLayerIdx === idx;
                  const layerLabel = getLayerLabel(layer.id, layer.label);
                  return (
                    <button
                      key={layer.id}
                      id={`inspector-chip-${product.key}-${layer.id}`}
                      type="button"
                      aria-pressed={isSelected}
                      className={`mono ${styles.inspectorChip} ${
                        isSelected ? styles.inspectorChipActive : ""
                      }`}
                      onClick={() => selectInspectorLayer(idx)}
                    >
                      <span className={styles.inspectorIndex}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.inspectorName}>{layerLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <button
              id={`ui-preview-${product.key}`}
              type="button"
              data-scrolly-copy
              className={styles.uiPreviewCard}
              onClick={handlePreviewClick}
              aria-label={`${dict.scrolly.previewAriaPrefix} ${tProduct.uiMockupLabel}: ${tProduct.metricValue} ${tProduct.metricLabel}`}
            >
              <span className={styles.uiPreviewThumbWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.generativeVisuals.uiMockupSrc}
                  alt=""
                  width={225}
                  height={160}
                  loading="lazy"
                  decoding="async"
                  className={styles.uiPreviewImg}
                />
              </span>
              <span className={styles.uiPreviewMeta}>
                <span className={`mono ${styles.uiPreviewBadge}`}>
                  {tProduct.uiMockupLabel} ↗
                </span>
                <span className={styles.metricValue}>{tProduct.metricValue}</span>
                <span className={styles.metricLabel}>{tProduct.metricLabel}</span>
              </span>
            </button>
          )}

          <div data-scrolly-copy className={styles.actionCluster}>
            <button
              id={`quick-add-${product.key}`}
              type="button"
              className={styles.ctaBtn}
              onClick={handleQuickAddBag}
            >
              <span>{addedToBag ? dict.menuSection.addedFlash : tProduct.addBagLabel}</span>
            </button>
            <a
              id={`cta-${product.key}`}
              ref={magneticRef}
              href="#take-away-karte"
              className={styles.secondaryCtaBtn}
              onClick={handleAnchorClick}
            >
              {dict.header.navFullMenu}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        {/* Escenario central con anillos orbitales SVG, vapor animado y paralaje 3D al puntero */}
        <div ref={stageRef} className={styles.stageWrap}>
          <div ref={glowRef} className={styles.stageGlow} aria-hidden="true" />

          {/* Retícula orbital gastronómica y ondas de calor rotando con el scroll */}
          <svg
            className={styles.orbitBackdrop}
            viewBox="0 0 520 520"
            fill="none"
            aria-hidden="true"
          >
            <g ref={orbitRingOuterRef}>
              <circle
                cx="260"
                cy="260"
                r="238"
                stroke="currentColor"
                strokeOpacity="0.16"
                strokeWidth="1"
                strokeDasharray="4 10"
              />
              <circle cx="260" cy="22" r="3.5" fill="currentColor" fillOpacity="0.45" />
              <circle cx="498" cy="260" r="3.5" fill="currentColor" fillOpacity="0.45" />
              <circle cx="260" cy="498" r="3.5" fill="currentColor" fillOpacity="0.45" />
              <circle cx="22" cy="260" r="3.5" fill="currentColor" fillOpacity="0.45" />
            </g>
            <g ref={orbitRingInnerRef}>
              <circle
                cx="260"
                cy="260"
                r="186"
                stroke="currentColor"
                strokeOpacity="0.12"
                strokeWidth="1.2"
                strokeDasharray="36 18"
              />
              <line
                x1="260"
                y1="52"
                x2="260"
                y2="76"
                stroke="currentColor"
                strokeOpacity="0.28"
                strokeWidth="1.2"
              />
              <line
                x1="260"
                y1="444"
                x2="260"
                y2="468"
                stroke="currentColor"
                strokeOpacity="0.28"
                strokeWidth="1.2"
              />
            </g>
            {/* Trazos de vapor/aroma que emergen al ensamblar */}
            <g ref={steamGroupRef} className={styles.steamWaves}>
              <path
                d="M205 118C198 98 214 82 206 62"
                stroke="currentColor"
                strokeOpacity="0.38"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M260 102C252 78 270 60 260 36"
                stroke="currentColor"
                strokeOpacity="0.48"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M315 118C308 98 324 82 316 62"
                stroke="currentColor"
                strokeOpacity="0.38"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          </svg>

          <div ref={tiltWrapRef} className={styles.tiltStage}>
            {product.renderMode === "sequence" && product.sequence ? (
              <CanvasSequenceStage
                frameCount={product.sequence.frameCount}
                pathPattern={product.sequence.pathPattern}
                progressRef={sequenceProgressRef}
                className={styles.sequenceCanvas}
              />
            ) : product.renderMode === "video" && product.videoSrc ? (
              <video
                src={product.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className={styles.stageVideo}
              />
            ) : (
              <div
                className={styles.layersStack}
                role="img"
                aria-label={`${tProduct.navLabel.replace(/^\d+ · /, "")}: ${product.layers
                  .map((layer) => getLayerLabel(layer.id, layer.label).toLowerCase())
                  .join(", ")}`}
              >
                {product.layers.map((layer, idx) => {
                  const layerLabel = getLayerLabel(layer.id, layer.label);
                  return (
                    <div
                      key={layer.id}
                      data-scrolly-layer
                      className={styles.layerItem}
                      style={
                        {
                          zIndex: layer.zIndex,
                          "--layer-scale": layer.widthScale ?? 1,
                          "--float-delay": `${idx * -0.55}s`,
                        } as React.CSSProperties
                      }
                    >
                      <div data-layer-inspector className={styles.layerInspector}>
                        <div className={styles.layerFloat}>
                          {layer.imageSrc ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={layer.imageSrc}
                              alt=""
                              width={layer.imageWidth}
                              height={layer.imageHeight}
                              className={styles.layerImg}
                              loading={isOpeningHero ? "eager" : "lazy"}
                              fetchPriority={isOpeningHero ? "high" : "auto"}
                              decoding="async"
                              draggable={false}
                            />
                          ) : (
                            <div className={styles.layerArt}>
                              <CulinaryLayerArtwork product={product.key} layerId={layer.id} />
                            </div>
                          )}
                        </div>

                        <span
                          data-scrolly-callout
                          className={`mono ${styles.layerCallout} ${
                            xrayOpen && (activeLayerIdx === null || activeLayerIdx === idx)
                              ? styles.layerCalloutForceVisible
                              : ""
                          }`}
                          aria-hidden="true"
                        >
                          {String(idx + 1).padStart(2, "0")} · {layerLabel}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tarjeta comparativa de Carta QR / PDF Estática tradicional */}
            {pdfMode && (
              <div
                className={styles.pdfOverlayCard}
                role="region"
                aria-label={dict.scrolly.pdfRegionAria}
              >
                <div className={`mono ${styles.pdfFileHeader}`}>
                  <span>{dict.scrolly.pdfFileName}</span>
                  <span>{dict.scrolly.pdfPageLabel}</span>
                </div>
                <div className={styles.pdfBody}>
                  <div className={styles.pdfRow}>
                    <strong>{tProduct.pdfDishName}</strong>
                    <span className="mono">{tProduct.samplePrice}</span>
                  </div>
                  <p className={styles.pdfIngredients}>
                    {dict.scrolly.pdfIngredientsPrefix}:{" "}
                    {product.layers
                      .map((l) => getLayerLabel(l.id, l.label).toLowerCase())
                      .join(", ")}
                    .
                  </p>
                  <span className={`mono ${styles.pdfWarning}`}>
                    {dict.scrolly.pdfWarning}
                  </span>
                </div>
                <button
                  id={`pdf-restore-stage-${product.key}`}
                  type="button"
                  className={styles.pdfRestoreBtn}
                  onClick={() => setPdfMode(false)}
                >
                  {dict.scrolly.pdfRestoreBtn}
                </button>
              </div>
            )}
          </div>
        </div>

        {isOpeningHero && (
          <div ref={scrollHintRef} className={styles.scrollCue} aria-hidden="true">
            <span className="mono">{dict.scrolly.scrollCue}</span>
            <span className={styles.scrollArrow}>↓</span>
          </div>
        )}
      </div>
    </section>
  );
}
