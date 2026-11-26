"use client";

import { useEffect, useRef, useState } from "react";
import { DaNinoLogo } from "@/components/icons/DaNinoBrandIcons";
import { DICTIONARIES, type Locale, useLocale } from "@/lib/i18n";
import { handleAnchorClick, useMagnetic } from "@/lib/interactions";
import { getLenis, scrollToTarget } from "@/lib/lenis";
import styles from "./MinimalHeader.module.css";

const LOCALES: { code: Locale; label: string; name: string }[] = [
  { code: "es", label: "ES", name: "Español" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "en", label: "EN", name: "English" },
];

const NAV_ITEMS = [
  { id: "home", key: "home" },
  { id: "menu", key: "menu" },
  { id: "location", key: "location" },
  { id: "reviews", key: "reviews" },
] as const;

export function MinimalHeader() {
  const barFillRef = useRef<HTMLSpanElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.22);

  const [activeId, setActiveId] = useState<string>("home");
  const [brandVisible, setBrandVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [locale, setLocale] = useLocale();
  const dict = DICTIONARIES[locale];

  useEffect(() => {
    const skipEl = document.getElementById("skip-to-main");
    if (skipEl) {
      skipEl.textContent = dict.skipToMain;
    }
  }, [dict.skipToMain]);

  useEffect(() => {
    let rafId = 0;

    const updateProgressAndActive = () => {
      rafId = 0;
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;

      if (barFillRef.current) {
        barFillRef.current.style.transform = `scaleX(${ratio.toFixed(4)})`;
      }

      const showBrand = scrollY > window.innerHeight * 0.16;
      setBrandVisible((prev) => (prev === showBrand ? prev : showBrand));

      const probeY = window.innerHeight * 0.4;
      let current = "home";

      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const container = el.parentElement?.classList.contains("pin-spacer")
          ? el.parentElement
          : el;
        const rect = container.getBoundingClientRect();
        if (rect.top <= probeY) {
          current = item.id;
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
      if (target === "#home") {
        scrollToTarget(0);
      } else {
        scrollToTarget(target);
      }
      history.replaceState(null, "", target);
    });
  }

  return (
    <header
      className={`${styles.header} ${brandVisible ? styles.headerScrolled : styles.headerOpening}`}
    >
      <div className={styles.bar} aria-hidden="true">
        <span ref={barFillRef} className={styles.barFill} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.brandCluster}>
          <a
            id="header-brand-link"
            href="#home"
            className={`${styles.brand} ${brandVisible ? styles.brandShown : styles.brandHidden}`}
            aria-label={dict.header.brandAria}
            tabIndex={brandVisible ? 0 : -1}
            onClick={(event) => {
              event.preventDefault();
              setMenuOpen(false);
              scrollToTarget(0);
              history.replaceState(null, "", "#home");
            }}
          >
            <DaNinoLogo className={styles.brandLogoSvg} />
          </a>
        </div>

        <nav className={styles.nav} aria-label={dict.header.navAria}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            const label = dict.header.nav[item.key];
            return (
              <a
                key={item.id}
                id={`header-nav-${item.id}`}
                href={`#${item.id}`}
                onClick={(event) => {
                  if (item.id === "home") {
                    event.preventDefault();
                    scrollToTarget(0);
                    history.replaceState(null, "", "#home");
                    return;
                  }
                  handleAnchorClick(event);
                }}
                aria-current={isActive ? "location" : undefined}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
              >
                {label}
              </a>
            );
          })}
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
                  className={`${styles.langBtn} ${isCurrent ? styles.langBtnActive : ""}`}
                  onClick={() => setLocale(item.code)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <a
            id="header-cta-phone"
            ref={ctaRef}
            href="tel:+41313711131"
            className={styles.cta}
          >
            +41 31 371 11 31
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
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            const label = dict.header.nav[item.key];
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
            id="mobile-nav-cta-phone"
            href="tel:+41313711131"
            tabIndex={menuOpen ? 0 : -1}
            className={styles.mobileCta}
          >
            +41 31 371 11 31
          </a>
        </nav>
      </div>
    </header>
  );
}
