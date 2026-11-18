"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { submitBriefAction, type ContactActionState } from "@/app/actions/contact";
import { DaNinoLogo } from "@/components/icons/DaNinoBrandIcons";
import type { ProductKey } from "@/config/products";
import { useTakeAwayCart } from "@/lib/cart";
import { DICTIONARIES, useLocale } from "@/lib/i18n";
import { useVipRestaurant } from "@/lib/vip";
import styles from "./ClosingConversion.module.css";

gsap.registerPlugin(ScrollTrigger);

const INITIAL_STATE: ContactActionState = { status: "idle" };

type ConceptKey = ProductKey | "table";

export function ClosingConversion() {
  const sectionRef = useRef<HTMLElement>(null);
  const sealRef = useRef<SVGSVGElement>(null);
  const [state, formAction, isPending] = useActionState(submitBriefAction, INITIAL_STATE);
  const [conceptKey, setConceptKey] = useState<ConceptKey>("dodici");
  const [dismissedSuccess, setDismissedSuccess] = useState(false);
  const [vipName] = useVipRestaurant();

  const [locale] = useLocale();
  const dict = DICTIONARIES[locale];
  const tClosing = dict.closing;

  const { items: cartItems, totalChf, summaryString, clear } = useTakeAwayCart();

  const currentConceptLabel = tClosing.concepts[conceptKey];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>("[data-closing-reveal]", section);
      gsap.fromTo(
        blocks,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        },
      );

      if (sealRef.current) {
        gsap.to(sealRef.current, {
          rotation: 180,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onSelectConcept = (event: Event) => {
      const detail = (event as CustomEvent<{ conceptKey?: ConceptKey }>).detail;
      if (detail?.conceptKey && detail.conceptKey in tClosing.concepts) {
        setConceptKey(detail.conceptKey);
        setDismissedSuccess(true);
      }
    };
    window.addEventListener("atelier:select-concept", onSelectConcept);
    return () => window.removeEventListener("atelier:select-concept", onSelectConcept);
  }, [tClosing.concepts]);

  const showSuccess = state.status === "success" && state.submission && !dismissedSuccess;

  return (
    <section
      id="contacto"
      ref={sectionRef}
      data-palette="pastel"
      className={styles.closing}
      aria-labelledby="contacto-heading"
    >
      <div className={`container ${styles.grid}`}>
        <div className={styles.editorial}>
          <span data-closing-reveal className={`mono ${styles.eyebrow}`}>
            {vipName
              ? `${tClosing.eyebrowVipPrefix} ${vipName.toUpperCase()}`
              : tClosing.eyebrowDefault}
          </span>

          <h2 id="contacto-heading" data-closing-reveal className={styles.headline}>
            {vipName ? tClosing.headlineVip(vipName) : tClosing.headlineDefault}
          </h2>

          <p data-closing-reveal className={styles.lead}>
            {tClosing.lead}
          </p>

          {/* ── Bloques Oficiales de Öffnungszeiten & Kontakt de pizzeriadanino.ch ── */}
          <div data-closing-reveal className={styles.infoCardsGrid}>
            <div className={styles.infoBox}>
              <h3 className={styles.infoBoxTitle}>{tClosing.hoursTitle}</h3>
              <p className={styles.infoBoxBody}>
                <strong>{tClosing.hoursDays}</strong>
                <br />
                <span className="mono">{tClosing.hoursTime}</span>
              </p>
            </div>

            <div className={styles.infoBox}>
              <h3 className={styles.infoBoxTitle}>{tClosing.addressTitle}</h3>
              <p className={styles.infoBoxBody}>
                <strong>Pizzeria da Nino</strong>
                <br />
                <a
                  id="footer-maps-link"
                  href="https://maps.app.goo.gl/Jo1shiBUqdx8UY939"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.infoLink}
                >
                  <em>{tClosing.addressStreet}</em> ↗
                </a>
                <br />
                {tClosing.addressCity}
              </p>
              <div className={styles.contactLinksRow}>
                <a id="contact-phone-link" href="tel:+41313711131" className={`mono ${styles.contactPill}`}>
                  {tClosing.phoneLabel}
                </a>
                <a
                  id="contact-email-link"
                  href="mailto:info@pizzeriadanino.ch"
                  className={`mono ${styles.contactPill}`}
                >
                  info@pizzeriadanino.ch
                </a>
                <a
                  id="contact-ig-link"
                  href="https://www.instagram.com/pizzeria_danino/?hl=de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mono ${styles.contactPill}`}
                >
                  @pizzeria_danino
                </a>
              </div>
            </div>
          </div>

          <div data-closing-reveal className={styles.sealWrap} aria-hidden="true">
            <svg ref={sealRef} viewBox="0 0 220 220" className={styles.rotatingSeal}>
              <defs>
                <path
                  id="sealCirclePath"
                  d="M 110, 110 m -82, 0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0"
                />
              </defs>
              <circle
                cx="110"
                cy="110"
                r="98"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.24"
                strokeDasharray="4 8"
              />
              <text className={styles.sealText}>
                <textPath href="#sealCirclePath" startOffset="0%">
                  {tClosing.sealText}
                </textPath>
              </text>
            </svg>
          </div>
        </div>

        <div data-closing-reveal className={styles.card}>
          {showSuccess && state.submission ? (
            <div className={styles.successState} role="status" aria-live="polite">
              <div className={styles.successHeader}>
                <span className={`mono ${styles.badge}`}>{tClosing.successBadge}</span>
                <span className={`mono ${styles.refBadge}`}>{state.submission.referenceCode}</span>
              </div>
              <h3>{tClosing.successTitle(state.submission.restaurantName)}</h3>
              <p>
                {tClosing.successBody(state.submission.dishFocus, state.submission.contactChannel)}
              </p>

              <div className={styles.successActions}>
                <a
                  id="brief-confirm-whatsapp-link"
                  href={state.submission.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappBtn}
                >
                  {tClosing.successWhatsappBtn}
                </a>
                <button
                  id="brief-reset-btn"
                  type="button"
                  className={styles.resetBtn}
                  onClick={() => setDismissedSuccess(true)}
                >
                  {tClosing.successResetBtn}
                </button>
              </div>
            </div>
          ) : (
            <form
              id="brief-contact-form"
              action={formAction}
              onSubmit={() => setDismissedSuccess(false)}
              className={styles.form}
              noValidate
            >
              <input id="locale-field" type="hidden" name="locale" value={locale} />
              <input
                id="dish-focus-hidden"
                type="hidden"
                name="dishFocus"
                value={currentConceptLabel}
              />
              <input
                id="cart-summary-hidden"
                type="hidden"
                name="cartSummary"
                value={summaryString}
              />

              <div className={styles.formHeader}>
                <span className={`mono ${styles.badge}`}>
                  {vipName ? tClosing.formBadgeVip(vipName) : tClosing.formBadgeDefault}
                </span>
                <h3>{tClosing.formTitle}</h3>
              </div>

              <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor="website-field">{tClosing.honeypotLabel}</label>
                <input
                  id="website-field"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {state.status === "error" && state.message && (
                <p className={styles.formAlert} role="alert">
                  {state.message}
                </p>
              )}

              {/* Resumen en vivo de los platos seleccionados en la Take Away Karte */}
              <div className={styles.cartSummaryBox}>
                <div className={styles.cartSummaryHeader}>
                  <span className="mono">{tClosing.cartSummaryLabel}</span>
                  {cartItems.length > 0 && (
                    <button
                      id="form-cart-clear-btn"
                      type="button"
                      className={`mono ${styles.cartSummaryClear}`}
                      onClick={clear}
                    >
                      {dict.menuSection.cartBar.clearBtn}
                    </button>
                  )}
                </div>
                {cartItems.length > 0 ? (
                  <div className={styles.cartSummaryItems}>
                    <p className={styles.cartSummaryList}>{summaryString}</p>
                    <strong className={`mono ${styles.cartSummaryTotal}`}>
                      Total: CHF {totalChf.toFixed(2)}
                    </strong>
                  </div>
                ) : (
                  <p className={styles.cartEmptyText}>{tClosing.cartEmptyHint}</p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="restaurant-name">{tClosing.restaurantLabel}</label>
                <input
                  key={vipName || "default-guest"}
                  id="restaurant-name"
                  name="restaurantName"
                  type="text"
                  required
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  placeholder={tClosing.restaurantPlaceholder}
                  defaultValue={vipName}
                  aria-invalid={Boolean(state.fieldErrors?.restaurantName)}
                  aria-describedby={
                    state.fieldErrors?.restaurantName ? "restaurant-name-error" : undefined
                  }
                />
                {state.fieldErrors?.restaurantName && (
                  <span id="restaurant-name-error" className={styles.fieldError} role="alert">
                    {state.fieldErrors.restaurantName}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="dish-focus">{tClosing.dishFocusLabel}</label>
                <select
                  id="dish-focus"
                  value={conceptKey}
                  onChange={(e) => setConceptKey(e.target.value as ConceptKey)}
                >
                  <option value="dodici">{tClosing.concepts.dodici}</option>
                  <option value="eigerplatz">{tClosing.concepts.eigerplatz}</option>
                  <option value="dolce">{tClosing.concepts.dolce}</option>
                  <option value="table">{tClosing.concepts.table}</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-channel">{tClosing.contactLabel}</label>
                <input
                  id="contact-channel"
                  name="contactChannel"
                  type="text"
                  required
                  autoComplete="tel"
                  placeholder={tClosing.contactPlaceholder}
                  aria-invalid={Boolean(state.fieldErrors?.contactChannel)}
                  aria-describedby={
                    state.fieldErrors?.contactChannel ? "contact-channel-error" : undefined
                  }
                />
                {state.fieldErrors?.contactChannel && (
                  <span id="contact-channel-error" className={styles.fieldError} role="alert">
                    {state.fieldErrors.contactChannel}
                  </span>
                )}
              </div>

              <button
                id="brief-submit-btn"
                type="submit"
                disabled={isPending}
                className={styles.submitBtn}
              >
                {isPending ? tClosing.submitPending : tClosing.submitIdle}
              </button>

              <div className={styles.directRow}>
                <span>{tClosing.directPrompt}</span>
                <div className={styles.contactLinksRow}>
                  <a
                    id="direct-whatsapp-link"
                    href={`${
                      process.env.NEXT_PUBLIC_CONTACT_URL || "https://wa.me/41313711131"
                    }?text=${encodeURIComponent(
                      cartItems.length > 0
                        ? `${tClosing.whatsappDefaultText} (${summaryString} — Total CHF ${totalChf.toFixed(2)})`
                        : tClosing.whatsappDefaultText,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.directLink}
                  >
                    WhatsApp ↗
                  </a>
                  <a id="direct-phone-link" href="tel:+41313711131" className={styles.directLink}>
                    {tClosing.directWhatsappLink}
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      <footer className={`container ${styles.footer}`}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrandRow}>
            <DaNinoLogo className={styles.footerLogoSvg} />
            <span>{tClosing.footerTagline}</span>
          </div>

          <div className={styles.footerRight}>
            <a
              id="footer-datenschutz-link"
              href="https://www.pizzeriadanino.ch/datenschutz/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.legalLink}
            >
              Datenschutz
            </a>
            <span>•</span>
            <a
              id="footer-impressum-link"
              href="https://www.pizzeriadanino.ch/impressum/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.legalLink}
            >
              Impressum
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
