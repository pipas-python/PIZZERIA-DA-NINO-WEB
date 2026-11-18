"use client";

import { useState } from "react";
import { DietaryIcon } from "@/components/icons/DaNinoBrandIcons";
import { addCartItem } from "@/lib/cart";
import { useLocale, type Locale } from "@/lib/i18n";
import { scrollToTarget } from "@/lib/lenis";
import styles from "./DaNinoConversionSections.module.css";

interface ComboSpec {
  id: string;
  badge: string;
  featured?: boolean;
  priceChf: number;
  dietary: "vegetarian" | "pork" | "cow";
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  items: Array<{
    id: string;
    name: string;
    priceChf: number;
    detail: Record<Locale, string>;
  }>;
}

const DA_NINO_COMBOS: ComboSpec[] = [
  {
    id: "combo-mittag",
    badge: "01 · MITTAGS-KLASSIKER",
    priceChf: 20.5,
    dietary: "vegetarian",
    title: {
      de: "Mittags-Hit am Eigerplatz",
      en: "Eigerplatz Lunch Classic",
      es: "Clásico de Mediodía Eigerplatz",
    },
    subtitle: {
      de: "Der schnelle Steinofen-Lunch für Mattenhof & Eigerplatz (Mo–Fr ab 11.30 Uhr).",
      en: "The fast stone-oven lunch for Mattenhof & Eigerplatz (Mon–Fri from 11:30).",
      es: "El almuerzo rápido al horno de piedra en Mattenhof y Eigerplatz (Lu–Vi desde 11:30).",
    },
    items: [
      {
        id: "pizza-margherita",
        name: "Pizza Margherita",
        priceChf: 13.0,
        detail: {
          de: "Pelati, Mozzarella, Oregano (Normal 32cm)",
          en: "Pelati, Mozzarella, Oregano (Regular 32cm)",
          es: "Pelati, Mozzarella, Orégano (Normal 32cm)",
        },
      },
      {
        id: "salat-verde",
        name: "Insalata Verde",
        priceChf: 7.5,
        detail: {
          de: "Grüner Blattsalat mit Hausdressing",
          en: "Fresh green salad with house dressing",
          es: "Ensalada verde fresca con aliño de la casa",
        },
      },
    ],
  },
  {
    id: "combo-eigerplatz",
    badge: "02 · HAUS-EMPFEHLUNG",
    featured: true,
    priceChf: 36.5,
    dietary: "pork",
    title: {
      de: "Eigerplatz Signature Menu",
      en: "Eigerplatz Signature Menu",
      es: "Menú Signature Eigerplatz",
    },
    subtitle: {
      de: "Unsere namensgebende Haus-Spezialität mit Stracciatella, Bruschetta & Getränk.",
      en: "Our namesake house specialty with Stracciatella, Bruschetta & Italian drink.",
      es: "Nuestra especialidad insignia con Stracciatella, Bruschetta y bebida italiana.",
    },
    items: [
      {
        id: "antipasti-bruschetta",
        name: "Bruschetta (3 Stück)",
        priceChf: 8.5,
        detail: {
          de: "Geröstetes Brot mit Tomaten, Knoblauch, Basilikum & Olivenöl",
          en: "Toasted bread with tomatoes, garlic, basil & olive oil",
          es: "Pan tostado con tomate, ajo, albahaca y aceite de oliva",
        },
      },
      {
        id: "special-eigerplatz",
        name: "Pizza Eigerplatz",
        priceChf: 22.0,
        detail: {
          de: "Pelati, Mozzarella, Pilzcreme, Coppa, Rohschinken, Stracciatella, Basilikum",
          en: "Pelati, Mozzarella, Mushroom cream, Coppa, Prosciutto, Stracciatella, Basil",
          es: "Pelati, Mozzarella, Crema de setas, Coppa, Prosciutto, Stracciatella, Albahaca",
        },
      },
      {
        id: "drink-moretti",
        name: "Birra Moretti / El Tony Mate",
        priceChf: 6.0,
        detail: {
          de: "Italienisches Lagerbier 33cl oder El Tony Mate (alkoholfrei)",
          en: "Italian Lager 33cl or El Tony Mate (non-alcoholic)",
          es: "Cerveza italiana Moretti 33cl o El Tony Mate",
        },
      },
    ],
  },
  {
    id: "combo-aperitivo-due",
    badge: "03 · SERATA ITALIANA",
    priceChf: 50.0,
    dietary: "pork",
    title: {
      de: "Aperitivo & Dolci",
      en: "Aperitivo & Dolci Tasting",
      es: "Degustación Aperitivo & Dolci",
    },
    subtitle: {
      de: "Kompletter italienischer Abend: Antipasto della Casa, Special #12 & Hausgemachtes Tiramisù.",
      en: "Complete Italian evening: Antipasto della Casa, Special #12 & Homemade Tiramisù.",
      es: "Velada italiana completa: Antipasto della Casa, Special #12 y Tiramisù casero.",
    },
    items: [
      {
        id: "antipasti-casa",
        name: "Antipasto della Casa",
        priceChf: 23.0,
        detail: {
          de: "Italienische Aufschnitt- und Käseplatte",
          en: "Italian cold cuts and artisan cheese board",
          es: "Tabla italiana de embutidos y quesos artesanos",
        },
      },
      {
        id: "special-numero-dodici",
        name: "Numero Dodici (#12)",
        priceChf: 19.0,
        detail: {
          de: "Kürbiscreme, Mozzarella, Shiitake, Karamellisierte Zwiebeln, Sbrinz, Kürbiskerne",
          en: "Pumpkin cream, Mozzarella, Shiitake, Caramelized onions, Sbrinz, Pumpkin seeds",
          es: "Crema de calabaza, Mozzarella, Shiitake, Cebolla caramelizada, Sbrinz, Semillas",
        },
      },
      {
        id: "dolci-tiramisu",
        name: "Tiramisù (Hausgemacht)",
        priceChf: 8.0,
        detail: {
          de: "Nach traditionellem Familienrezept an der Belpstrasse 65",
          en: "Made daily from our traditional family recipe",
          es: "Elaborado a diario según nuestra receta familiar tradicional",
        },
      },
    ],
  },
];

const COPY = {
  de: {
    useCasesEyebrow: "GASTRONOMIE AM EIGERPLATZ · BELPSTRASSE 65",
    useCasesTitle: "Drei Momente für echte Steinofen-Kultur in Bern.",
    useCasesLead:
      "Ob schneller Take-Away über Mittag, italienischer Aperitivo nach Feierabend oder unsere limitierte Lasagne al Forno am Abend.",
    useCases: [
      {
        index: "01 · 11:30 – 14:00 UHR",
        title: "Express Mittags-Take-Away",
        body: "72 Stunden gereifter Teig, bei 450 °C im Steinofen gebacken. Direkt an der Belpstrasse 65 ohne Wartezeit zum Mitnehmen.",
        tag: "ALLE PIZZAS AUCH KLEIN (-CHF 2.00)",
      },
      {
        index: "02 · 17:00 – 22:30 UHR",
        title: "Aperitivo, Birra & Vino",
        body: "Antipasto della Casa, Focaccia Rosmarino, Ichnusa Non Filtrata, Moretti, Negroni oder Aperol Spritz mitten im Quartier.",
        tag: "TISCHRESERVATION EMPFOHLEN",
      },
      {
        index: "03 · NUR ABENDS & SOLANGE VORRAT",
        title: "Hausgemachte Lasagne & Dolci",
        body: "Unsere berühmte Lasagne al Forno (CHF 18.50), Pizza alla Nutella mit Bronte-Pistazien und hausgemachtes Tiramisù.",
        tag: "VORBESTELLUNG PER TASCHE / WHATSAPP",
      },
    ],
    combosEyebrow: "DIREKT VORBESTELLEN · PREISE IN CHF",
    combosTitle: "Da Nino Menü-Combos",
    combosLead:
      "Mit einem Klick fügst du das komplette Menü-Paket in deine Take-Away Tasche ein und sendest die Vorbestellung direkt an die Belpstrasse 65.",
    comboAddBtn: (price: string) => `+ Combo in die Tasche (CHF ${price})`,
    comboAddedBtn: "✓ In der Take-Away Tasche!",
    reviewsEyebrow: "STIMMEN VOM EIGERPLATZ · 3007 BERN",
    reviewsTitle: "Was das Quartier über Da Nino sagt.",
    reviews: [
      {
        quote:
          "«Die Pizza Eigerplatz mit cremiger Stracciatella, Pilzcreme und Coppa ist schlicht eine der besten Steinofen-Pizzas in ganz Bern.»",
        author: "Lukas M.",
        role: "Stammgast · Mattenhof / Eigerplatz",
        dish: "Pizza Eigerplatz · CHF 22.00",
      },
      {
        quote:
          "«Numero Dodici mit gerösteter Kürbiscreme, Shiitake, karamellisierten Zwiebeln und Schweizer Sbrinz ist eine geniale Kombination.»",
        author: "Elena R.",
        role: "Take-Away über Mittag · Belpstrasse",
        dish: "Numero Dodici (#12) · CHF 19.00",
      },
      {
        quote:
          "«Super schneller Service am Eigerplatz und zum Abschluss eine kleine Pizza alla Nutella mit Mascarpone und Pistazien für CHF 5.00 – unschlagbar!»",
        author: "Marco & Sarah B.",
        role: "Abendessen · 3007 Bern",
        dish: "Pizza alla Nutella · CHF 5.00 / 20.00",
      },
    ],
  },
  en: {
    useCasesEyebrow: "GASTRONOMY AT EIGERPLATZ · BELPSTRASSE 65",
    useCasesTitle: "Three moments for authentic wood-fired pizza in Bern.",
    useCasesLead:
      "Whether a fast lunch Take-Away, an after-work Italian Aperitivo, or our limited evening Lasagne al Forno.",
    useCases: [
      {
        index: "01 · 11:30 – 14:00",
        title: "Express Lunch Take-Away",
        body: "72-hour fermented dough baked at 450 °C in our stone oven. Ready for pickup at Belpstrasse 65 without waiting.",
        tag: "ALL PIZZAS AVAILABLE SMALL (-CHF 2.00)",
      },
      {
        index: "02 · 17:00 – 22:30",
        title: "Aperitivo, Birra & Vino",
        body: "Antipasto della Casa, Focaccia Rosmarino, Ichnusa Non Filtrata, Moretti, Negroni, or Aperol Spritz in the heart of Bern.",
        tag: "TABLE RESERVATION RECOMMENDED",
      },
      {
        index: "03 · EVENINGS ONLY & WHILE STOCKS LAST",
        title: "Homemade Lasagne & Dolci",
        body: "Our signature Lasagne al Forno (CHF 18.50), Pizza alla Nutella with Bronte pistachios, and homemade Tiramisù.",
        tag: "PRE-ORDER VIA BAG / WHATSAPP",
      },
    ],
    combosEyebrow: "INSTANT PRE-ORDER · PRICES IN CHF",
    combosTitle: "Da Nino Signature Combos",
    combosLead:
      "Add a complete menu combo to your Take-Away bag in one click and send your pre-order straight to Belpstrasse 65.",
    comboAddBtn: (price: string) => `+ Add Combo to Bag (CHF ${price})`,
    comboAddedBtn: "✓ Added to Take-Away Bag!",
    reviewsEyebrow: "VOICES FROM EIGERPLATZ · 3007 BERN",
    reviewsTitle: "What the Bern neighborhood says about Da Nino.",
    reviews: [
      {
        quote:
          "“The Pizza Eigerplatz with creamy Stracciatella, wild mushroom cream, and Coppa is easily one of the finest stone-oven pizzas in Bern.”",
        author: "Lukas M.",
        role: "Regular Guest · Mattenhof / Eigerplatz",
        dish: "Pizza Eigerplatz · CHF 22.00",
      },
      {
        quote:
          "“Numero Dodici with roasted pumpkin cream, Shiitake mushrooms, caramelized onions, and Swiss Sbrinz is an unforgettable combination.”",
        author: "Elena R.",
        role: "Lunch Take-Away · Belpstrasse",
        dish: "Numero Dodici (#12) · CHF 19.00",
      },
      {
        quote:
          "“Super fast service at Eigerplatz, and finishing with a small Pizza alla Nutella with Mascarpone and pistachios for CHF 5.00 is unbeatable!”",
        author: "Marco & Sarah B.",
        role: "Evening Dinner · 3007 Bern",
        dish: "Pizza alla Nutella · CHF 5.00 / 20.00",
      },
    ],
  },
  es: {
    useCasesEyebrow: "GASTRONOMÍA EN EIGERPLATZ · BELPSTRASSE 65",
    useCasesTitle: "Tres momentos para disfrutar del horno de piedra en Berna.",
    useCasesLead:
      "Ya sea un Take-Away exprés a mediodía, un Aperitivo italiano al salir del trabajo o nuestra Lasagne al Forno de edición limitada por la noche.",
    useCases: [
      {
        index: "01 · 11:30 – 14:00 H",
        title: "Take-Away Exprés de Mediodía",
        body: "Masa fermentada 72 horas y horneada a 450 °C en piedra. Lista para recoger sin esperas en Belpstrasse 65.",
        tag: "TODAS LAS PIZZAS TAMBIÉN EN TAMAÑO PEQUEÑO (-CHF 2.00)",
      },
      {
        index: "02 · 17:00 – 22:30 H",
        title: "Aperitivo, Birra & Vino",
        body: "Antipasto della Casa, Focaccia Rosmarino, Ichnusa Non Filtrata, Moretti, Negroni o Aperol Spritz en pleno barrio de Eigerplatz.",
        tag: "SE RECOMIENDA RESERVAR MESA",
      },
      {
        index: "03 · SOLO NOCHES Y HASTA AGOTAR EXISTENCIAS",
        title: "Lasagne Casera & Dolci al Horno",
        body: "Nuestra célebre Lasagne al Forno (CHF 18.50), Pizza alla Nutella con pistachos de Bronte y Tiramisù casero.",
        tag: "PRE-PEDIDO POR BOLSA / WHATSAPP",
      },
    ],
    combosEyebrow: "PRE-PEDIDO EN 1 CLIC · PRECIOS EN CHF",
    combosTitle: "Combos & Menús Da Nino",
    combosLead:
      "Añade el menú completo a tu bolsa Take-Away con un solo clic y envía tu pre-pedido directamente a Belpstrasse 65.",
    comboAddBtn: (price: string) => `+ Añadir Combo a la Bolsa (CHF ${price})`,
    comboAddedBtn: "✓ ¡Añadido a tu Bolsa Take-Away!",
    reviewsEyebrow: "RESEÑAS DE EIGERPLATZ · 3007 BERNA",
    reviewsTitle: "Lo que opinan nuestros comensales en Berna.",
    reviews: [
      {
        quote:
          "«La Pizza Eigerplatz con Stracciatella cremosa, crema de boletus y Coppa es sencillamente una de las mejores pizzas de horno de piedra de toda Berna.»",
        author: "Lukas M.",
        role: "Cliente habitual · Mattenhof / Eigerplatz",
        dish: "Pizza Eigerplatz · CHF 22.00",
      },
      {
        quote:
          "«La Numero Dodici con crema de calabaza asada, setas Shiitake, cebolla caramelizada y Sbrinz suizo es una combinación magistral.»",
        author: "Elena R.",
        role: "Take-Away de mediodía · Belpstrasse",
        dish: "Numero Dodici (#12) · CHF 19.00",
      },
      {
        quote:
          "«Servicio rapidísimo en Eigerplatz y terminar con una Pizza alla Nutella pequeña con Mascarpone y pistachos por CHF 5.00 es insuperable.»",
        author: "Marco & Sarah B.",
        role: "Cena · 3007 Berna",
        dish: "Pizza alla Nutella · CHF 5.00 / 20.00",
      },
    ],
  },
} as const;

export function DaNinoConversionSections() {
  const [locale] = useLocale();
  const t = COPY[locale];
  const [addedComboId, setAddedComboId] = useState<string | null>(null);

  function handleAddCombo(combo: ComboSpec) {
    for (const item of combo.items) {
      addCartItem({
        id: item.id,
        name: item.name,
        priceChf: item.priceChf,
      });
    }
    setAddedComboId(combo.id);
    window.setTimeout(() => {
      setAddedComboId((curr) => (curr === combo.id ? null : curr));
    }, 1800);
    scrollToTarget("#contacto");
  }

  return (
    <div className={styles.wrapper} data-palette="pastel">
      {/* ── SECCIÓN 1: CASOS DE USO GASTRONÓMICOS EN EIGERPLATZ ────────────── */}
      <section
        id="erlebnis"
        className={styles.sectionBlock}
        aria-labelledby="erlebnis-heading"
      >
        <div className="container">
          <div className={styles.headerBlock}>
            <span className={`mono ${styles.eyebrow}`}>{t.useCasesEyebrow}</span>
            <h2 id="erlebnis-heading" className={styles.sectionTitle}>
              {t.useCasesTitle}
            </h2>
            <p className={styles.sectionLead}>{t.useCasesLead}</p>
          </div>

          <div className={styles.useCasesGrid}>
            {t.useCases.map((uc, idx) => (
              <article key={uc.index} className={styles.useCaseCard}>
                <span className={`mono ${styles.useCaseIndex}`}>{uc.index}</span>
                <h3 className={styles.useCaseTitle}>{uc.title}</h3>
                <p className={styles.useCaseBody}>{uc.body}</p>
                <span className={`mono ${styles.useCaseTag}`} id={`usecase-tag-${idx}`}>
                  {uc.tag}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 2: MENÚ-COMBOS & PRECIOS CLAROS EN CHF ─────────────────── */}
      <section
        id="combos"
        className={styles.sectionBlock}
        aria-labelledby="combos-heading"
      >
        <div className="container">
          <div className={styles.headerBlock}>
            <span className={`mono ${styles.eyebrow}`}>{t.combosEyebrow}</span>
            <h2 id="combos-heading" className={styles.sectionTitle}>
              {t.combosTitle}
            </h2>
            <p className={styles.sectionLead}>{t.combosLead}</p>
          </div>

          <div className={styles.combosGrid}>
            {DA_NINO_COMBOS.map((combo) => {
              const isAdded = addedComboId === combo.id;
              return (
                <article
                  key={combo.id}
                  className={`${styles.comboCard} ${
                    combo.featured ? styles.comboCardFeatured : ""
                  }`}
                >
                  <div className={styles.comboTopRow}>
                    <span className={`mono ${styles.comboBadge}`}>{combo.badge}</span>
                    <DietaryIcon tag={combo.dietary} className={styles.comboDietaryIcon} />
                  </div>

                  <div className={styles.comboTitleGroup}>
                    <h3 className={styles.comboTitle}>{combo.title[locale]}</h3>
                    <p className={styles.comboSubtitle}>{combo.subtitle[locale]}</p>
                  </div>

                  <div className={styles.comboPriceBanner}>
                    <span className="mono">CHF</span>
                    <strong className={styles.comboPriceNumber}>
                      {combo.priceChf.toFixed(2)}
                    </strong>
                  </div>

                  <ul className={styles.comboItemsList}>
                    {combo.items.map((item) => (
                      <li key={item.id} className={styles.comboListItem}>
                        <div className={styles.comboItemTop}>
                          <strong>{item.name}</strong>
                          <span className="mono">CHF {item.priceChf.toFixed(2)}</span>
                        </div>
                        <span className={styles.comboItemDetail}>{item.detail[locale]}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    id={`add-${combo.id}-btn`}
                    type="button"
                    className={`${styles.comboCtaBtn} ${
                      isAdded ? styles.comboCtaBtnAdded : ""
                    }`}
                    onClick={() => handleAddCombo(combo)}
                  >
                    {isAdded
                      ? t.comboAddedBtn
                      : t.comboAddBtn(combo.priceChf.toFixed(2))}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 3: TESTIMONIOS REALES DE COMENSALES EN BERNA ───────────── */}
      <section
        id="stimmen"
        className={styles.sectionBlock}
        aria-labelledby="stimmen-heading"
      >
        <div className="container">
          <div className={styles.headerBlock}>
            <span className={`mono ${styles.eyebrow}`}>{t.reviewsEyebrow}</span>
            <h2 id="stimmen-heading" className={styles.sectionTitle}>
              {t.reviewsTitle}
            </h2>
          </div>

          <div className={styles.reviewsGrid}>
            {t.reviews.map((rev, idx) => (
              <blockquote
                key={rev.author}
                id={`review-card-${idx}`}
                className={styles.reviewCard}
              >
                <p className={styles.reviewQuote}>{rev.quote}</p>
                <footer className={styles.reviewFooter}>
                  <div>
                    <strong className={styles.reviewAuthor}>{rev.author}</strong>
                    <span className={styles.reviewRole}>{rev.role}</span>
                  </div>
                  <span className={`mono ${styles.reviewDishTag}`}>{rev.dish}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
