import type Lenis from "lenis";

/**
 * Referencia compartida a la instancia de Lenis creada por <ScrollOrchestrator />.
 * Expone también la velocidad instantánea y el progreso normalizado del scroll
 * para que los lienzos <canvas> y las cintas cinéticas reaccionen a la inercia sin crear listeners duplicados.
 */
let instance: Lenis | null = null;
let currentVelocity = 0;
let currentProgress = 0;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
  if (!lenis) {
    currentVelocity = 0;
  }
}

export function getLenis() {
  return instance;
}

export function setScrollMetrics(velocity: number, progress: number) {
  currentVelocity = velocity;
  currentProgress = progress;
}

export function getScrollVelocity() {
  return currentVelocity;
}

export function getScrollProgress() {
  return currentProgress;
}

/**
 * Desplaza suavemente hasta un ancla (#id) o al inicio (0).
 * Si la sección está fijada (pin de ScrollTrigger) se usa su pin-spacer
 * para aterrizar al inicio real de la coreografía.
 */
export function scrollToTarget(target: string | number) {
  const lenis = getLenis();

  if (typeof target === "number") {
    if (lenis) lenis.scrollTo(target);
    else window.scrollTo({ top: target, behavior: "smooth" });
    return;
  }

  const el = document.querySelector<HTMLElement>(target);
  if (!el) return;
  const anchor = el.parentElement?.classList.contains("pin-spacer") ? el.parentElement : el;

  if (lenis) {
    lenis.scrollTo(anchor, { offset: 0 });
  } else {
    anchor.scrollIntoView({ behavior: "smooth" });
  }
}
