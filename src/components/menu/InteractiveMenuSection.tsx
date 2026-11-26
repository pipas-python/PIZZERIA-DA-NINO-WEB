"use client";

import { useMemo, useState } from "react";
import {
  DANINO_FULL_MENU,
  DANINO_SPECIAL_ITEM,
  type DaNinoMenuItem,
  type MenuCategoryId,
} from "@/config/menu";
import {
  DaNinoSpecialFrame,
  DietaryIcon,
  type DietaryTag,
} from "@/components/icons/DaNinoBrandIcons";
import { DICTIONARIES, useLocale } from "@/lib/i18n";
import styles from "./InteractiveMenuSection.module.css";

type DietaryFilter = "all" | "vegetarian" | "vegan" | "meat" | "fish";

const CATEGORY_ORDER: MenuCategoryId[] = [
  "pizze",
  "antipasti_dolci",
  "aperitivo",
  "birra_vino",
  "bibite_caffe",
];

export function InteractiveMenuSection() {
  const [locale] = useLocale();
  const dict = DICTIONARIES[locale];
  const tMenu = dict.menuSection;

  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>("pizze");
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>("all");

  const filteredItems = useMemo(() => {
    return DANINO_FULL_MENU.filter((item) => {
      if (item.isSpecial) return false;
      if (item.category !== activeCategory) return false;

      if (
        dietaryFilter === "vegetarian" &&
        item.dietary !== "vegetarian" &&
        item.dietary !== "vegan"
      ) {
        return false;
      }
      if (dietaryFilter === "vegan" && item.dietary !== "vegan") {
        return false;
      }
      if (dietaryFilter === "meat" && item.dietary !== "pork" && item.dietary !== "cow") {
        return false;
      }
      if (dietaryFilter === "fish" && item.dietary !== "fish") {
        return false;
      }

      return true;
    });
  }, [activeCategory, dietaryFilter]);

  const groupedSubcategories = useMemo(() => {
    const map = new Map<string, DaNinoMenuItem[]>();
    for (const item of filteredItems) {
      const existing = map.get(item.subCategory) ?? [];
      existing.push(item);
      map.set(item.subCategory, existing);
    }
    return Array.from(map.entries());
  }, [filteredItems]);

  const showDietaryFilters =
    activeCategory === "pizze" || activeCategory === "antipasti_dolci";

  return (
    <section
      id="menu"
      data-palette="pastel"
      className={styles.menuSection}
      aria-labelledby="menu-heading"
    >
      <div className="container">
        {/* ── Header ── */}
        <header className={styles.menuHeader}>
          <span className={styles.eyebrow}>{tMenu.eyebrow}</span>
          <h2 id="menu-heading" className={styles.title}>
            {tMenu.title}
          </h2>
          <p className={styles.priceRangeNote}>{tMenu.priceRangeNote}</p>
        </header>

        {/* ── Official Da Nino Pizza-Special Frame ── */}
        <div className={styles.specialShowcase}>
          <div className={styles.specialFrameWrap}>
            <DaNinoSpecialFrame className={styles.specialSvgFrame} />
            <div className={styles.specialInner}>
              <span className={styles.specialKicker}>{tMenu.specialHeading}</span>
              <h3 className={styles.specialName}>
                <span>{DANINO_SPECIAL_ITEM.name}</span>
                {DANINO_SPECIAL_ITEM.dietary && (
                  <DietaryIcon
                    tag={DANINO_SPECIAL_ITEM.dietary}
                    className={styles.specialDietaryIcon}
                  />
                )}
              </h3>
              <p className={styles.specialDesc}>{DANINO_SPECIAL_ITEM.description[locale]}</p>
              <span className={styles.specialPrice}>CHF 19.00</span>
            </div>
          </div>
        </div>

        {/* ── Clean Category & Dietary Controls ── */}
        <div className={styles.controlsBar}>
          <div className={styles.categoryTabs} role="tablist" aria-label={tMenu.title}>
            {CATEGORY_ORDER.map((catId) => {
              const isSelected = activeCategory === catId;
              return (
                <button
                  key={catId}
                  id={`menu-tab-${catId}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`${styles.categoryTab} ${isSelected ? styles.categoryTabActive : ""}`}
                  onClick={() => {
                    setActiveCategory(catId);
                    if (catId !== "pizze" && catId !== "antipasti_dolci") {
                      setDietaryFilter("all");
                    }
                  }}
                >
                  {tMenu.categories[catId]}
                </button>
              );
            })}
          </div>

          {showDietaryFilters && (
            <div className={styles.dietaryFilters} role="group" aria-label="Dietary filter">
              {(
                [
                  { id: "all", label: tMenu.filters.all, icon: undefined },
                  { id: "vegetarian", label: tMenu.filters.vegetarian, icon: "vegetarian" },
                  { id: "vegan", label: tMenu.filters.vegan, icon: "vegan" },
                  { id: "meat", label: tMenu.filters.meat, icon: "pork" },
                  { id: "fish", label: tMenu.filters.fish, icon: "fish" },
                ] as { id: DietaryFilter; label: string; icon?: DietaryTag }[]
              ).map((f) => {
                const isActive = dietaryFilter === f.id;
                return (
                  <button
                    key={f.id}
                    id={`dietary-filter-${f.id}`}
                    type="button"
                    aria-pressed={isActive}
                    className={`${styles.filterChip} ${isActive ? styles.filterChipActive : ""}`}
                    onClick={() => setDietaryFilter(f.id)}
                  >
                    {f.icon && <DietaryIcon tag={f.icon} className={styles.filterChipIcon} />}
                    <span>{f.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Menu Items Grid with Architectural 10px Da Nino Red Rules ── */}
        {groupedSubcategories.map(([subCatName, items]) => (
          <div key={subCatName} className={styles.subCategoryBlock}>
            <h3 className={styles.subTitle}>
              <span>{subCatName}</span>
              <span className={styles.subTitleUnderline} aria-hidden="true">
                <span />
                <span />
              </span>
            </h3>

            <div className={styles.menuGrid}>
              {items.map((item) => (
                <article key={item.id} className={styles.menuItem}>
                  <div className={styles.menuItemMain}>
                    <h4 className={styles.menuItemName}>
                      <span>{item.name}</span>
                      {item.dietary && (
                        <DietaryIcon
                          tag={item.dietary}
                          className={styles.menuItemDietaryIcon}
                        />
                      )}
                    </h4>
                    {item.description[locale] && (
                      <p className={styles.menuItemDesc}>{item.description[locale]}</p>
                    )}
                  </div>

                  <div className={styles.menuItemPrices}>
                    {item.prices.map((priceOpt) => {
                      const optKey = `${item.id}::${priceOpt.size ?? ""}`;
                      return (
                        <div key={optKey} className={styles.priceRow}>
                          {priceOpt.size && (
                            <span className={styles.priceSize}>{priceOpt.size}</span>
                          )}
                          <span className={styles.priceValue}>
                            <span className={styles.priceCurrency}>CHF</span>{" "}
                            {priceOpt.displayPrice}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}

        {/* ── Official Da Nino Dietary Legend ── */}
        <div className={styles.legendBar}>
          <ul className={styles.legendList} aria-label="Dietary legend">
            {(
              [
                { tag: "vegetarian", label: tMenu.legend.vegetarian },
                { tag: "vegan", label: tMenu.legend.vegan },
                { tag: "pork", label: tMenu.legend.pork },
                { tag: "cow", label: tMenu.legend.cow },
                { tag: "fish", label: tMenu.legend.fish },
              ] as { tag: DietaryTag; label: string }[]
            ).map((entry) => (
              <li key={entry.tag} className={styles.legendItem}>
                <DietaryIcon tag={entry.tag} className={styles.legendIcon} />
                <span>{entry.label}</span>
              </li>
            ))}
          </ul>
          <p className={styles.legendTax}>{tMenu.legend.taxNote}</p>
        </div>
      </div>
    </section>
  );
}
