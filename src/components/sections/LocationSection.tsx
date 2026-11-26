"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DICTIONARIES, useLocale } from "@/lib/i18n";
import styles from "./LocationSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const PEAK_HEIGHTS = [8, 12, 18, 34, 78, 64, 26, 38, 88, 96, 68, 32];

export function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [locale] = useLocale();
  const t = DICTIONARIES[locale].locationSection;
  const [mapTouchActive, setMapTouchActive] = useState(false);
  const [mapMounted, setMapMounted] = useState(false);

  const satelliteEmbedUrl = `https://www.google.com/maps/embed?origin=mfe&pb=!1m4!2m1!1sPizzeria+da+Nino,+Belpstrasse+65,+3007+Bern!5e1!6i18!3m1!1s${locale}!5m1!1s${locale}`;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || mapMounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMapMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [mapMounted]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-loc-reveal]", section);
      gsap.fromTo(
        items,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="location"
      ref={sectionRef}
      data-palette="dark"
      className={styles.section}
      aria-labelledby="location-heading"
    >
      <div className={`container ${styles.grid}`}>
        {/* ── Left Column: Address, Hours, Price & Direct Actions ── */}
        <div className={styles.infoCol}>
          <span data-loc-reveal className={styles.eyebrow}>
            {t.eyebrow}
          </span>

          <h2 id="location-heading" data-loc-reveal className={styles.title}>
            {t.title}
          </h2>

          <div data-loc-reveal className={styles.statusRow}>
            <span className={styles.statusDot} aria-hidden="true" />
            <strong className={styles.statusOpen}>{t.statusOpen}</strong>
            <span className={styles.statusSep}>·</span>
            <span className={styles.statusCloses}>{t.closesAt}</span>
          </div>

          <ul data-loc-reveal className={styles.servicesRow} aria-label={t.servicesAria}>
            {t.services.map((srv) => (
              <li key={srv} className={styles.servicePill}>
                {srv}
              </li>
            ))}
          </ul>

          <div data-loc-reveal className={styles.detailsGrid}>
            <div className={styles.detailBlock}>
              <span className={styles.detailLabel}>{t.addressLabel}</span>
              <p className={styles.detailPrimary}>
                {t.addressStreet}, {t.addressCity}
              </p>
              <span className={styles.detailSub}>{t.plusCode}</span>
            </div>

            <div className={styles.detailBlock}>
              <span className={styles.detailLabel}>{t.hoursLabel}</span>
              <p className={styles.detailPrimary}>{t.hoursDays}</p>
              <span className={styles.detailSub}>{t.hoursTime}</span>
            </div>

            <div className={styles.detailBlock}>
              <span className={styles.detailLabel}>{t.priceLabel}</span>
              <p className={styles.detailPrimary}>{t.priceValue}</p>
              <span className={styles.detailSub}>{t.priceReported}</span>
            </div>
          </div>

          <div data-loc-reveal className={styles.actionsRow}>
            <a
              id="location-directions-btn"
              href="https://maps.app.goo.gl/Jo1shiBUqdx8UY939"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryBtn}
            >
              <span>{t.directionsCta}</span>
              <span aria-hidden="true">↗</span>
            </a>

            <a
              id="location-phone-btn"
              href="tel:+41313711131"
              className={styles.secondaryBtn}
            >
              {t.callCta}
            </a>
          </div>
        </div>

        {/* ── Right Column: Live Google Maps Satellite View + Peak Hours ── */}
        <div data-loc-reveal className={styles.visualCol}>
          <div className={styles.mapCard} data-lenis-prevent>
            <div className={styles.mapViewport}>
              <span className={styles.satelliteBadge}>{t.mapSatelliteBadge}</span>

              {mapMounted && (
                <iframe
                  key={locale}
                  id="danino-satellite-map"
                  src={satelliteEmbedUrl}
                  title={t.mapIframeTitle}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className={`${styles.mapIframe} ${
                    mapTouchActive ? styles.mapIframeTouchUnlocked : ""
                  }`}
                />
              )}

              {/* Mobile touch scroll guard: prevents getting stuck inside the map while scrolling vertically */}
              {!mapTouchActive ? (
                <button
                  id="map-touch-unlock-btn"
                  type="button"
                  className={styles.mobileMapShield}
                  onClick={() => setMapTouchActive(true)}
                >
                  <span className={styles.mobileMapPill}>{t.mapUnlockTouch}</span>
                </button>
              ) : (
                <button
                  id="map-touch-lock-btn"
                  type="button"
                  className={styles.mobileMapLockBtn}
                  onClick={() => setMapTouchActive(false)}
                >
                  {t.mapLockTouch} ✕
                </button>
              )}
            </div>

            <div className={styles.mapOverlayBar}>
              <div>
                <strong className={styles.mapPinTitle}>Pizzeria da Nino</strong>
                <span className={styles.mapPinSub}>
                  {t.addressStreet} · {t.plusCode}
                </span>
              </div>
              <a
                id="location-open-gmaps-link"
                href="https://maps.app.goo.gl/Jo1shiBUqdx8UY939"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapOpenArrow}
              >
                {t.mapOpenExternal}
              </a>
            </div>
          </div>

          <div className={styles.peakCard}>
            <div className={styles.peakHeader}>
              <strong className={styles.peakTitle}>{t.peakTitle}</strong>
              <span className={styles.peakLive}>{t.peakLive}</span>
            </div>

            <div className={styles.peakChart} aria-hidden="true">
              {PEAK_HEIGHTS.map((h, idx) => (
                <div key={idx} className={styles.peakBarTrack}>
                  <span
                    className={`${styles.peakBarFill} ${
                      idx === 8 ? styles.peakBarActive : ""
                    }`}
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>

            <div className={styles.peakTicksRow} aria-hidden="true">
              {t.peakTicks.map((tick) => (
                <span key={tick} className={styles.peakTick}>
                  {tick}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
