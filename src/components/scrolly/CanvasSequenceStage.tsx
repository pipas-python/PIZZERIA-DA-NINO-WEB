"use client";

import { useEffect, useRef } from "react";

interface CanvasSequenceStageProps {
  frameCount: number;
  pathPattern: string;
  progressRef: React.MutableRefObject<number>;
  className?: string;
}

/**
 * Renderizador modular de secuencia de fotogramas en <canvas>.
 * Cuando configures `renderMode: "sequence"` en `src/config/products.ts`,
 * este componente precarga las imágenes y dibuja el frame exacto sincronizado con GSAP ScrollTrigger.
 */
export function CanvasSequenceStage({
  frameCount,
  pathPattern,
  progressRef,
  className,
}: CanvasSequenceStageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnFrameRef = useRef<number>(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;
    const loaded: HTMLImageElement[] = new Array(frameCount);

    const drawFrame = (index: number) => {
      const clamped = Math.max(0, Math.min(frameCount - 1, index));
      const img = loaded[clamped];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const targetW = Math.round(rect.width * dpr);
      const targetH = Math.round(rect.height * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scale = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;
      const dx = (canvas.width - drawW) / 2;
      const dy = (canvas.height - drawH) / 2;

      ctx.drawImage(img, dx, dy, drawW, drawH);
      lastDrawnFrameRef.current = clamped;
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      const padded = String(i + 1).padStart(4, "0");
      img.src = pathPattern.replace("{index}", padded);
      img.onload = () => {
        if (!cancelled && i === 0 && lastDrawnFrameRef.current === -1) {
          drawFrame(0);
        }
      };
      loaded[i] = img;
    }

    imagesRef.current = loaded;

    let rafId = 0;
    const tick = () => {
      if (cancelled) return;
      const targetFrame = Math.round(progressRef.current * (frameCount - 1));
      if (targetFrame !== lastDrawnFrameRef.current) {
        drawFrame(targetFrame);
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(rafId);
    };
  }, [frameCount, pathPattern, progressRef]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
