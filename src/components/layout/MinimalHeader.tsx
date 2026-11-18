"use client";

import { useEffect, useRef, useState } from "react";
import { DaNinoLogo } from "@/components/icons/DaNinoBrandIcons";
import { PRODUCTS_SHOWCASE } from "@/config/products";
import { useTakeAwayCart } from "@/lib/cart";
import { DICTIONARIES, type Locale, useLocale } from "@/lib/i18n";
import { handleAnchorClick, useMagnetic } from "@/lib/interactions";
import { getLenis, scrollToTarget } from "@/lib/lenis";
import { useVipRestaurant } from "@/lib/vip";
import styles from "./MinimalHeader.module.css";

const LOCALES: { code: Locale; label: string; name: string }[] = [
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "en", label: "EN", name: "English" },
  { code: "es", label: "ES", name: "Español" },
];

export function MinimalHeader() {
  const barFillRef = useRef<HTMLSpanElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.24);
  const [activeId, setActiveId] = useState<string>(PRODUCTS_SHOWCASE[0]?.id ?? "");
  const [menuOpen, setMenuOpen] = useState(false);
  const [vipName] = useVipRestaurant();
  const [locale, setLocale] = useLocale();
  const { totalItems } = useTakeAwayCart();
  const dict = DICTIONARIES[locale];

  useEffect(() => {
    const skipEl = document.getElementById("skip-to-main");
    if (skipEl) {
      skipEl.textContent = dict.skipToMain;
    }
  }, [dict.skipToMain]);

  // Barra de progreso actualizada directamente en el DOM (transform: scaleX) sin re-renders de React
  useEffect(() => {
    let rafId = 0;

    const updateProgressAndActive = () => {
      rafId = 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      if (barFillRef.current) {
        barFillRef.current.style.transform = `scaleX(${ratio.toFixed(4)})`;
      }

      const probeY = window.innerHeight * 0.38;
      const candidateIds = [
        ...PRODUCTS_SHOWCASE.map((item) => item.id),
        "take-away-karte",
        "contacto",
      ];
      let current = candidateIds[0] ?? "";

      for (const id of candidateIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const container = el.parentElement?.classList.contains("pin-spacer")
          ? el.parentElement
          : el;
        const rect = container.getBoundingClientRect();
        if (rect.top <= probeY) {
          current = id;
        }
      }

      setActiveId((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(updateProgressAndActive);
    };

    updateProgressAndActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }

    if (!menuOpen) return;

    const firstLink = drawerRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        toggleBtnRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      lenis?.start();
    };
  }, [menuOpen]);

  function onMobileNavigate(event: React.MouseEvent<HTMLAnchorElement>, target: string) {
    event.preventDefault();
    setMenuOpen(false);
    window.requestAnimationFrame(() => {
      scrollToTarget(target);
      history.replaceState(null, "", target);
    });
  }

  return (
    <header className={styles.header}>
      <div className={styles.bar} aria-hidden="true">
        <span ref={barFillRef} className={styles.barFill} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.brandCluster}>
          <a
            id="header-brand-link"
            href="#top"
            className={styles.brand}
            aria-label={dict.header.brandAria}
            onClick={(event) => {
              event.preventDefault();
              setMenuOpen(false);
              scrollToTarget(0);
              history.replaceState(null, "", "#top");
            }}
          >
            <DaNinoLogo className={styles.brandLogoSvg} />
            <span className={styles.brandLocation}>{dict.header.locationBadge}</span>
          </a>

          {vipName && (
            <span
              className={`mono ${styles.vipBadge}`}
              title={`${dict.header.vipTitlePrefix} ${vipName}`}
            >
              <span className={styles.vipDot} aria-hidden="true" />
              {dict.header.vipPrefix} · {vipName.toUpperCase()}
            </span>
          )}
        </div>

        <nav className={styles.nav} aria-label={dict.header.navAria}>
          {PRODUCTS_SHOWCASE.map((item) => {
            const isActive = activeId === item.id;
            const label = dict.products[item.key].navLabel;
            return (
              <a
                key={item.id}
                id={`header-nav-${item.id}`}
                href={`#${item.id}`}
                onClick={handleAnchorClick}
                aria-current={isActive ? "location" : undefined}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
              >
                {label}
              </a>
            );
          })}
          <a
            id="header-nav-take-away-karte"
            href="#take-away-karte"
            onClick={handleAnchorClick}
            aria-current={activeId === "take-away-karte" ? "location" : undefined}
            className={`${styles.navLink} ${
              activeId === "take-away-karte" ? styles.navLinkActive : ""
            }`}
          >
            {dict.header.navFullMenu}
          </a>
        </nav>

        <div className={styles.actions}>
          <div
            className={styles.langSwitcher}
            role="group"
            aria-label={dict.header.langGroupAria}
          >
            {LOCALES.map((item) => {
              const isCurrent = locale === item.code;
              return (
                <button
                  key={item.code}
                  id={`lang-switch-${item.code}`}
                  type="button"
                  aria-pressed={isCurrent}
                  aria-label={item.name}
                  className={`mono ${styles.langBtn} ${isCurrent ? styles.langBtnActive : ""}`}
                  onClick={() => setLocale(item.code)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <a
            id="header-cta-demo"
            ref={ctaRef}
            href="#contacto"
            onClick={handleAnchorClick}
            aria-current={activeId === "contacto" ? "location" : undefined}
            className={styles.cta}
          >
            <span>{dict.header.ctaDemo}</span>
            {totalItems > 0 && (
              <span className={`mono ${styles.cartCountPill}`}>{totalItems}</span>
            )}
          </a>

          <button
            id="header-mobile-menu-toggle"
            ref={toggleBtnRef}
            type="button"
            className={styles.menuBtn}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={menuOpen ? dict.header.closeMenuAria : dict.header.openMenuAria}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span
              className={`${styles.menuIcon} ${menuOpen ? styles.menuIconOpen : ""}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav-drawer"
        ref={drawerRef}
        className={`${styles.mobileDrawer} ${menuOpen ? styles.mobileDrawerOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav className={`container ${styles.mobileNav}`} aria-label={dict.header.mobileNavAria}>
          {PRODUCTS_SHOWCASE.map((item) => {
            const isActive = activeId === item.id;
            const label = dict.products[item.key].navLabel;
            return (
              <a
                key={item.id}
                id={`mobile-nav-${item.id}`}
                href={`#${item.id}`}
                tabIndex={menuOpen ? 0 : -1}
                aria-current={isActive ? "location" : undefined}
                className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ""}`}
                onClick={(event) => onMobileNavigate(event, `#${item.id}`)}
              >
                <span>{label}</span>
                <span aria-hidden="true">→</span>
              </a>
            );
          })}
          <a
            id="mobile-nav-take-away-karte"
            href="#take-away-karte"
            tabIndex={menuOpen ? 0 : -1}
            aria-current={activeId === "take-away-karte" ? "location" : undefined}
            className={`${styles.mobileLink} ${
              activeId === "take-away-karte" ? styles.mobileLinkActive : ""
            }`}
            onClick={(event) => onMobileNavigate(event, "#take-away-karte")}
          >
            <span>{dict.header.navFullMenu}</span>
            <span aria-hidden="true">→</span>
          </a>
          <a
            id="mobile-nav-cta-demo"
            href="#contacto"
            tabIndex={menuOpen ? 0 : -1}
            className={styles.mobileCta}
            onClick={(event) => onMobileNavigate(event, "#contacto")}
          >
            <span>{dict.header.mobileCtaDemo}</span>
            {totalItems > 0 && (
              <span className={`mono ${styles.cartCountPill}`}>{totalItems}</span>
            )}
          </a>
        </nav>
      </div>
    </header>
  );
}
