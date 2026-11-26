"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DaNinoLogo } from "@/components/icons/DaNinoBrandIcons";
import { DICTIONARIES, useLocale } from "@/lib/i18n";
import styles from "./ReviewsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const RATING_BARS = [
  { stars: 5, pct: 86 },
  { stars: 4, pct: 10 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

export function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [locale] = useLocale();
  const t = DICTIONARIES[locale].reviewsSection;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-rev-reveal]", section);
      gsap.fromTo(
        items,
        { opacity: 0, y: 24 },
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
      id="reviews"
      ref={sectionRef}
      data-palette="pastel"
      className={styles.section}
      aria-labelledby="reviews-heading"
    >
      <div className="container">
        {/* ── Google Maps 4.8 (1,649) Summary Block ── */}
        <div className={styles.summaryGrid}>
          <div data-rev-reveal className={styles.scoreCluster}>
            <span className={styles.eyebrow}>{t.eyebrow}</span>
            <div className={styles.scoreRow}>
              <h2 id="reviews-heading" className={styles.bigScore}>
                {t.ratingScore}
              </h2>
              <div className={styles.starsMeta}>
                <div className={styles.stars} aria-label="4.8 out of 5 stars">
                  ★★★★★
                </div>
                <strong className={styles.totalCount}>{t.totalCount}</strong>
                <span className={styles.priceSummary}>{t.priceSummary}</span>
              </div>
            </div>

            <div className={styles.tagsRow}>
              {t.tags.map((tag) => (
                <span key={tag} className={styles.topicChip}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div data-rev-reveal className={styles.barsCluster}>
            <div className={styles.barsList} aria-hidden="true">
              {RATING_BARS.map((row) => (
                <div key={row.stars} className={styles.barRow}>
                  <span className={styles.barLabel}>{row.stars}</span>
                  <div className={styles.barTrack}>
                    <span
                      className={styles.barFill}
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <a
              id="reviews-google-link"
              href="https://maps.app.goo.gl/Jo1shiBUqdx8UY939"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.googleLink}
            >
              <span>{t.googleCta}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* ── 3 Real Local Guide Reviews ── */}
        <div className={styles.reviewsGrid}>
          {t.items.map((rev, idx) => (
            <blockquote
              key={rev.author}
              id={`review-card-${idx}`}
              data-rev-reveal
              className={styles.reviewCard}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardStars} aria-hidden="true">
                  ★★★★★
                </span>
                <span className={styles.cardTime}>{rev.timeAgo}</span>
              </div>

              <p className={styles.reviewQuote}>“{rev.quote}”</p>

              <footer className={styles.reviewFooter}>
                <div>
                  <strong className={styles.reviewAuthor}>{rev.author}</strong>
                  <span className={styles.reviewMeta}>{rev.meta}</span>
                </div>
                <span className={styles.reviewTag}>{rev.tag}</span>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* ── Minimalist Swiss Footer ── */}
        <footer className={styles.footer}>
          <div className={styles.footerBrand}>
            <DaNinoLogo className={styles.footerLogo} />
            <span>{t.footerTagline}</span>
          </div>

          <div className={styles.footerLinks}>
            <a id="footer-web-link" href="http://pizzeriadanino.ch/" target="_blank" rel="noopener noreferrer">
              pizzeriadanino.ch
            </a>
            <span>·</span>
            <a id="footer-tel-link" href="tel:+41313711131">
              +41 31 371 11 31
            </a>
            <span>·</span>
            <a
              id="footer-datenschutz-link"
              href="https://www.pizzeriadanino.ch/datenschutz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Datenschutz
            </a>
            <span>·</span>
            <a
              id="footer-impressum-link"
              href="https://www.pizzeriadanino.ch/impressum/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Impressum
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
