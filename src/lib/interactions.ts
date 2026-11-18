"use client";

import { useCallback, useRef } from "react";
import gsap from "gsap";
import { scrollToTarget } from "@/lib/lenis";

/**
 * Micro-interacción "magnética" para CTAs: el botón sigue sutilmente al puntero.
 * Solo se activa con puntero fino (ratón/trackpad) y sin `prefers-reduced-motion`.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.28) {
  const cleanupRef = useRef<(() => void) | null>(null);

  return useCallback(
    (node: T | null) => {
      cleanupRef.current?.();
      cleanupRef.current = null;
      if (!node) return;

      const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!canHover || reduced) return;

      const xTo = gsap.quickTo(node, "x", { duration: 0.45, ease: "power3.out" });
      const yTo = gsap.quickTo(node, "y", { duration: 0.45, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        const rect = node.getBoundingClientRect();
        xTo((event.clientX - (rect.left + rect.width / 2)) * strength);
        yTo((event.clientY - (rect.top + rect.height / 2)) * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      node.addEventListener("pointermove", onMove);
      node.addEventListener("pointerleave", onLeave);
      cleanupRef.current = () => {
        node.removeEventListener("pointermove", onMove);
        node.removeEventListener("pointerleave", onLeave);
        gsap.set(node, { x: 0, y: 0 });
      };
    },
    [strength],
  );
}

/** Intercepta clicks en enlaces internos (#id) para usar el scroll suave de Lenis. */
export function handleAnchorClick(event: React.MouseEvent<HTMLAnchorElement>) {
  const href = event.currentTarget.getAttribute("href");
  if (!href || !href.startsWith("#")) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  scrollToTarget(href);
  history.replaceState(null, "", href);
}
