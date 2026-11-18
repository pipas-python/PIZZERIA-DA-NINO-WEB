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
import { useTakeAwayCart } from "@/lib/cart";
import { DICTIONARIES, useLocale } from "@/lib/i18n";
import { scrollToTarget } from "@/lib/lenis";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [flashedKey, setFlashedKey] = useState<string | null>(null);

  const { items: cartItems, totalItems, totalChf, add, remove, clear } = useTakeAwayCart();

  function handleAddOption(item: DaNinoMenuItem, size: string | undefined, priceChf: number) {
    const key = `${item.id}::${size ?? ""}`;
    add({
      id: item.id,
      name: item.name,
      size,
      priceChf,
    });
    setFlashedKey(key);
    window.setTimeout(() => {
      setFlashedKey((prev) => (prev === key ? null : prev));
    }, 1200);
  }

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return DANINO_FULL_MENU.filter((item) => {
      if (item.isSpecial) return false;
      if (!q && item.category !== activeCategory) return false;

      if (dietaryFilter === "vegetarian" && item.dietary !== "vegetarian" && item.dietary !== "vegan") {
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

      if (q) {
        const inName = item.name.toLowerCase().includes(q);
        const inDesc = item.description[locale].toLowerCase().includes(q);
        const inSub = item.subCategory.toLowerCase().includes(q);
        return inName || inDesc || inSub;
      }

      return true;
    });
  }, [activeCategory, dietaryFilter, locale, searchQuery]);

  const groupedSubcategories = useMemo(() => {
    const map = new Map<string, DaNinoMenuItem[]>();
    for (const item of filteredItems) {
      const existing = map.get(item.subCategory) ?? [];
      existing.push(item);
      map.set(item.subCategory, existing);
    }
    return Array.from(map.entries());
  }, [filteredItems]);

  function getItemQty(id: string, size?: string) {
    const key = `${id}::${size ?? ""}`;
    return cartItems.find((c) => `${c.id}::${c.size ?? ""}` === key)?.qty ?? 0;
  }

  return (
    <section
      id="take-away-karte"
      data-palette="pastel"
      className={styles.menuSection}
      aria-labelledby="take-away-karte-heading"
    >
      <div className="container">
        {/* ── Banner Oficial Pizza-Special con el marco estrellado SVG original de Da Nino ── */}
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
              <div className={styles.specialFooter}>
                <span className={`mono ${styles.specialPrice}`}>CHF 19.00</span>
                <button
                  id="special-banner-add-btn"
                  type="button"
                  className={styles.specialAddBtn}
                  onClick={() => handleAddOption(DANINO_SPECIAL_ITEM, undefined, 19.0)}
                >
                  {flashedKey === `${DANINO_SPECIAL_ITEM.id}::`
                    ? tMenu.addedFlash
                    : tMenu.specialAddBtn}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Cabecera de la Take Away Karte ── */}
        <header className={styles.menuHeader}>
          <span className={`mono ${styles.eyebrow}`}>{tMenu.eyebrow}</span>
          <h2 id="take-away-karte-heading" className={styles.title}>
            {tMenu.title}
          </h2>
          <p className={styles.subtitle}>{tMenu.subtitle}</p>
        </header>

        {/* ── Barra de Controles: Categorías + Filtros Dietéticos con Iconos SVG + Buscador ── */}
        <div className={styles.controlsBar}>
          <div className={styles.categoryTabs} role="tablist" aria-label={tMenu.title}>
            {CATEGORY_ORDER.map((catId) => {
              const isSelected = activeCategory === catId && !searchQuery.trim();
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
                    setSearchQuery("");
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

          <div className={styles.filterAndSearchRow}>
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

            <div className={styles.searchWrap}>
              <input
                id="menu-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={tMenu.searchPlaceholder}
                aria-label={tMenu.searchPlaceholder}
                className={styles.searchInput}
              />
              {(searchQuery || dietaryFilter !== "all") && (
                <button
                  id="menu-reset-filters-btn"
                  type="button"
                  className={`mono ${styles.resetFilterBtn}`}
                  onClick={() => {
                    setSearchQuery("");
                    setDietaryFilter("all");
                  }}
                >
                  {tMenu.clearSearch}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Listado de Categorías con las barras arquitectónicas de 10px solid #E41F13 ── */}
        {groupedSubcategories.length === 0 ? (
          <div className={styles.emptyState}>
            <p>{tMenu.emptyResult}</p>
            <button
              id="menu-empty-reset-btn"
              type="button"
              className={styles.emptyResetBtn}
              onClick={() => {
                setSearchQuery("");
                setDietaryFilter("all");
              }}
            >
              {tMenu.clearSearch}
            </button>
          </div>
        ) : (
          groupedSubcategories.map(([subCatName, items]) => (
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
                      <div className={styles.menuItemHeader}>
                        <h4 className={styles.menuItemName}>
                          <span>{item.name}</span>
                          {item.dietary && (
                            <DietaryIcon
                              tag={item.dietary}
                              className={styles.menuItemDietaryIcon}
                            />
                          )}
                        </h4>
                      </div>
                      {item.description[locale] && (
                        <p className={styles.menuItemDesc}>{item.description[locale]}</p>
                      )}
                    </div>

                    <div className={styles.menuItemPrices}>
                      {item.prices.map((priceOpt, pIdx) => {
                        const optKey = `${item.id}::${priceOpt.size ?? ""}`;
                        const qty = getItemQty(item.id, priceOpt.size);
                        const isFlashed = flashedKey === optKey;
                        const safeSizeId = (priceOpt.size ?? String(pIdx)).replace(/\s+/g, "-");
                        return (
                          <div key={optKey} className={styles.priceRow}>
                            {priceOpt.size && (
                              <span className={`mono ${styles.priceSize}`}>{priceOpt.size}</span>
                            )}
                            <span className={`mono ${styles.priceValue}`}>
                              {priceOpt.displayPrice}
                            </span>
                            <div className={styles.priceActions}>
                              {qty > 0 && (
                                <button
                                  id={`menu-dec-${item.id}-${safeSizeId}`}
                                  type="button"
                                  aria-label={`Remove ${item.name}`}
                                  className={`mono ${styles.qtyMiniBtn}`}
                                  onClick={() => remove(item.id, priceOpt.size)}
                                >
                                  −
                                </button>
                              )}
                              <button
                                id={`menu-add-${item.id}-${safeSizeId}`}
                                type="button"
                                className={`mono ${styles.addBtn} ${
                                  qty > 0 || isFlashed ? styles.addBtnActive : ""
                                }`}
                                onClick={() =>
                                  handleAddOption(item, priceOpt.size, priceOpt.priceChf)
                                }
                              >
                                {isFlashed
                                  ? "✓"
                                  : qty > 0
                                    ? `${qty}× +`
                                    : tMenu.addBtn}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))
        )}

        {/* ── Leyenda Oficial Pizzeria Da Nino (Iconos SVG + Take Away Preise in CHF inkl. MwSt) ── */}
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

        {/* ── Barra Flotante / Integrada de Pedido Take-Away Activo ── */}
        {totalItems > 0 && (
          <div className={styles.activeCartBanner} role="region" aria-label={tMenu.cartBar.bagTitle}>
            <div className={styles.activeCartInfo}>
              <span className={`mono ${styles.activeCartCount}`}>{totalItems}×</span>
              <div>
                <strong className={styles.activeCartTitle}>{tMenu.cartBar.bagTitle}</strong>
                <span className={`mono ${styles.activeCartTotal}`}>
                  Total: CHF {totalChf.toFixed(2)}
                </span>
              </div>
            </div>
            <div className={styles.activeCartActions}>
              <button
                id="cart-banner-clear-btn"
                type="button"
                className={styles.cartClearBtn}
                onClick={clear}
              >
                {tMenu.cartBar.clearBtn}
              </button>
              <button
                id="cart-banner-checkout-btn"
                type="button"
                className={styles.cartCheckoutBtn}
                onClick={() => {
                  scrollToTarget("#contacto");
                  history.replaceState(null, "", "#contacto");
                }}
              >
                {tMenu.cartBar.checkoutBtn}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
