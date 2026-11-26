"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DICTIONARIES, useLocale } from "@/lib/i18n";
import styles from "./LocationSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const PEAK_BARS = [
  { label: "6a. m.", h: 8 },
  { label: "", h: 12 },
  { label: "9a. m.", h: 18 },
  { label: "", h: 34 },
  { label: "12p. m.", h: 78 },
  { label: "", h: 64 },
  { label: "3p. m.", h: 26 },
  { label: "", h: 38 },
  { label: "6p. m.", h: 88, active: true },
  { label: "", h: 96 },
  { label: "9p. m.", h: 68 },
  { label: "", h: 32 },
];

export function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [locale] = useLocale();
  const t = DICTIONARIES[locale].locationSection;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-loc-reveal]", section);
      gsap.fromTo(
        items,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
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

          <ul data-loc-reveal className={styles.servicesRow} aria-label="Services">
            {t.services.map((srv) => (
              <li key={srv} className={styles.servicePill}>
                {srv}
              </li>
            ))}
          </ul>

          <div data-loc-reveal className={styles.detailsGrid}>
            <div className={styles.detailBlock}>
              <span className={styles.detailLabel}>Pizzeria da Nino</span>
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

        {/* ── Right Column: Architectural Eigerplatz Bern Map + Peak Hours ── */}
        <div data-loc-reveal className={styles.visualCol}>
          <a
            id="location-map-card"
            href="https://maps.app.goo.gl/Jo1shiBUqdx8UY939"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapCard}
            aria-label={`${t.directionsCta} — Belpstrasse 65, 3007 Bern`}
          >
            <svg
              viewBox="0 0 560 320"
              className={styles.mapSvg}
              aria-hidden="true"
            >
              <rect width="560" height="320" fill="#1b1b19" />
              {/* Subtle Bern street arteries around Eigerplatz & Belpstrasse */}
              <path
                d="M-20 238 L580 96 M118 -20 L254 340 M392 -20 L312 340 M-20 84 L580 198"
                stroke="rgba(244,244,244,0.1)"
                strokeWidth="12"
                fill="none"
              />
              <path
                d="M-20 168 L580 142"
                stroke="rgba(228,31,19,0.34)"
                strokeWidth="16"
                fill="none"
              />
              <path
                d="M-20 168 L580 142"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                fill="none"
              />
              <text
                x="44"
                y="156"
                fill="rgba(244,244,244,0.5)"
                fontSize="11"
                fontWeight="700"
                letterSpacing="2"
              >
                BELPSTRASSE
              </text>
              <text
                x="356"
                y="78"
                fill="rgba(244,244,244,0.38)"
                fontSize="10"
                fontWeight="700"
                letterSpacing="2"
              >
                EIGERPLATZ · 3007 BERN
              </text>

              {/* Da Nino Pin */}
              <circle cx="272" cy="155" r="34" fill="rgba(228,31,19,0.2)" />
              <circle cx="272" cy="155" r="18" fill="#e41f13" />
              <circle cx="272" cy="155" r="6" fill="#ffffff" />
            </svg>

            <div className={styles.mapOverlayBar}>
              <div>
                <strong className={styles.mapPinTitle}>Pizzeria da Nino</strong>
                <span className={styles.mapPinSub}>Belpstrasse 65 · WCRJ+RH Bern</span>
              </div>
              <span className={styles.mapOpenArrow} aria-hidden="true">
                Maps ↗
              </span>
            </div>
          </a>

          <div className={styles.peakCard}>
            <div className={styles.peakHeader}>
              <strong className={styles.peakTitle}>{t.peakTitle}</strong>
              <span className={styles.peakLive}>{t.peakLive}</span>
            </div>

            <div className={styles.peakChart} aria-hidden="true">
              {PEAK_BARS.map((bar, idx) => (
                <div key={idx} className={styles.peakCol}>
                  <div className={styles.peakBarTrack}>
                    <span
                      className={`${styles.peakBarFill} ${
                        bar.active ? styles.peakBarActive : ""
                      }`}
                      style={{ height: `${bar.h}%` }}
                    />
                  </div>
                  <span className={styles.peakTick}>{bar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
