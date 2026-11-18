"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { getScrollProgress, getScrollVelocity } from "@/lib/lenis";
import styles from "./AmbientCanvasStage.module.css";

interface Particle {
  x: number;
  y: number;
  size: number;
  depth: number;
  angle: number;
  spin: number;
  driftX: number;
  driftY: number;
  shape: "sesame" | "ember" | "flake";
  phase: number;
}

/**
 * Lienzo <canvas> atmosférico a 60 FPS sincronizado con gsap.ticker y la velocidad de Lenis.
 * Rellena el espacio negativo del fondo con:
 *   1. Orbes de iluminación volumétrica suave que siguen el puntero y el scroll.
 *   2. Partículas gastronómicas con paralaje multicapa (semillas de sésamo, ascuas de leña,
 *      motas de especias/harina) que cambian de color según el tramo del scroll (rojo → oscuro → pastel)
 *      y aceleran con la inercia de Lenis.
 */
export function AmbientCanvasStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const count = width < 768 ? 24 : 42;
    const shapes: Particle["shape"][] = ["sesame", "ember", "flake"];
    const particles: Particle[] = Array.from({ length: count }, (_, idx) => ({
      x: ((idx * 137.5) % 100) * (width / 100),
      y: ((idx * 73.1) % 100) * (height / 100),
      size: 2.2 + (idx % 5) * 1.15,
      depth: 0.35 + (idx % 7) * 0.16,
      angle: (idx * 0.7) % (Math.PI * 2),
      spin: ((idx % 2 === 0 ? 1 : -1) * (0.004 + (idx % 4) * 0.002)),
      driftX: (idx % 2 === 0 ? 1 : -1) * (0.12 + (idx % 3) * 0.08),
      driftY: -0.22 - (idx % 4) * 0.1,
      shape: shapes[idx % shapes.length],
      phase: idx * 0.9,
    }));

    let pointerX = width * 0.5;
    let pointerY = height * 0.5;
    let smoothPointerX = pointerX;
    let smoothPointerY = pointerY;
    let smoothVelocity = 0;

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const renderTick = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const progress = getScrollProgress();
      const rawVelocity = getScrollVelocity();
      smoothVelocity += (rawVelocity - smoothVelocity) * 0.14;
      smoothPointerX += (pointerX - smoothPointerX) * 0.06;
      smoothPointerY += (pointerY - smoothPointerY) * 0.06;

      // Selección cromática de atmósfera según progreso del scroll (Rojo -> Oscuro -> Pastel)
      const isDarkPhase = progress >= 0.24 && progress < 0.58;
      const isPastelPhase = progress >= 0.58;

      // 1. Orbes volumétricos suaves para eliminar la sensación de fondo plano
      const orb1X = width * 0.22 + Math.sin(time * 0.45) * 90 + (smoothPointerX - width * 0.5) * 0.08;
      const orb1Y = height * 0.32 + Math.cos(time * 0.38) * 70 + (smoothPointerY - height * 0.5) * 0.08;
      const orb2X = width * 0.78 + Math.cos(time * 0.32) * 110 - (smoothPointerX - width * 0.5) * 0.06;
      const orb2Y = height * 0.68 + Math.sin(time * 0.41) * 80 - (smoothPointerY - height * 0.5) * 0.06;

      const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 10, orb1X, orb1Y, Math.max(width, height) * 0.42);
      const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 10, orb2X, orb2Y, Math.max(width, height) * 0.38);

      if (isDarkPhase) {
        grad1.addColorStop(0, "rgba(224, 58, 45, 0.16)");
        grad1.addColorStop(1, "rgba(224, 58, 45, 0)");
        grad2.addColorStop(0, "rgba(255, 164, 92, 0.11)");
        grad2.addColorStop(1, "rgba(255, 164, 92, 0)");
      } else if (isPastelPhase) {
        grad1.addColorStop(0, "rgba(218, 55, 41, 0.09)");
        grad1.addColorStop(1, "rgba(218, 55, 41, 0)");
        grad2.addColorStop(0, "rgba(57, 22, 17, 0.07)");
        grad2.addColorStop(1, "rgba(57, 22, 17, 0)");
      } else {
        grad1.addColorStop(0, "rgba(255, 214, 153, 0.20)");
        grad1.addColorStop(1, "rgba(255, 214, 153, 0)");
        grad2.addColorStop(0, "rgba(57, 22, 17, 0.22)");
        grad2.addColorStop(1, "rgba(57, 22, 17, 0)");
      }

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Partículas culinarias con paralaje y estiramiento por velocidad de scroll
      const velocityPush = Math.max(-28, Math.min(28, smoothVelocity * 1.35));

      for (const p of particles) {
        p.angle += p.spin;
        p.x += p.driftX * p.depth + Math.sin(time * 0.9 + p.phase) * 0.18;
        p.y += (p.driftY - velocityPush * 0.42) * p.depth;

        if (p.y < -24) p.y = height + 24;
        if (p.y > height + 24) p.y = -24;
        if (p.x < -24) p.x = width + 24;
        if (p.x > width + 24) p.x = -24;

        const parallaxX = p.x + (smoothPointerX - width * 0.5) * 0.025 * p.depth;
        const parallaxY = p.y + (smoothPointerY - height * 0.5) * 0.025 * p.depth;
        const alpha = (0.18 + (p.depth / 1.5) * 0.34) * (isPastelPhase ? 0.65 : 0.9);

        ctx.save();
        ctx.translate(parallaxX, parallaxY);
        ctx.rotate(p.angle);

        if (p.shape === "sesame") {
          ctx.fillStyle = isPastelPhase
            ? `rgba(57, 22, 17, ${alpha})`
            : `rgba(255, 240, 210, ${alpha})`;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.45, p.size * 0.72, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "ember") {
          const stretch = 1 + Math.min(2.4, Math.abs(velocityPush) * 0.08);
          ctx.fillStyle = isDarkPhase
            ? `rgba(255, 138, 76, ${alpha * 1.15})`
            : isPastelPhase
              ? `rgba(168, 38, 28, ${alpha})`
              : `rgba(255, 218, 166, ${alpha})`;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.85, p.size * 0.85 * stretch, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = isPastelPhase
            ? `rgba(57, 22, 17, ${alpha * 0.85})`
            : `rgba(255, 255, 255, ${alpha * 0.75})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(-p.size, 0);
          ctx.lineTo(p.size, 0);
          ctx.stroke();
        }

        ctx.restore();
      }
    };

    gsap.ticker.add(renderTick);

    return () => {
      gsap.ticker.remove(renderTick);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
