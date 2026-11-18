import type { DietaryTag } from "@/components/icons/DaNinoBrandIcons";
import type { Locale } from "@/lib/i18n";

export type MenuCategoryId =
  | "pizze"
  | "antipasti_dolci"
  | "aperitivo"
  | "birra_vino"
  | "bibite_caffe";

export interface MenuPriceOption {
  size?: string;
  priceChf: number;
  displayPrice: string;
}

export interface DaNinoMenuItem {
  id: string;
  category: MenuCategoryId;
  subCategory: string;
  name: string;
  dietary?: DietaryTag;
  isSpecial?: boolean;
  description: Record<Locale, string>;
  prices: MenuPriceOption[];
}

export const DANINO_SPECIAL_ITEM: DaNinoMenuItem = {
  id: "special-numero-dodici",
  category: "pizze",
  subCategory: "Pizza-Special",
  name: "numero dodici",
  dietary: "vegetarian",
  isSpecial: true,
  description: {
    de: "Kürbiscreme | Shiitake-Pilze | Gebackener Kürbis | Karamellisierte Zwiebeln | Kürbiskerne | Sbrinz",
    en: "Pumpkin cream | Shiitake mushrooms | Roasted pumpkin | Caramelized onions | Pumpkin seeds | Sbrinz AOP",
    es: "Crema de calabaza | Setas shiitake | Calabaza asada | Cebolla caramelizada | Semillas de calabaza | Queso Sbrinz",
  },
  prices: [{ priceChf: 19.0, displayPrice: "19.00" }],
};

export const DANINO_FULL_MENU: DaNinoMenuItem[] = [
  DANINO_SPECIAL_ITEM,

  // ── PIZZE ──────────────────────────────────────────────────────────────────
  {
    id: "pizza-margherita",
    category: "pizze",
    subCategory: "Pizze",
    name: "Margherita",
    dietary: "vegetarian",
    description: {
      de: "Pelati | Mozzarella fior di latte | Basilikum | Olivenöl",
      en: "Pelati tomatoes | Fior di latte mozzarella | Fresh basil | Extra-virgin olive oil",
      es: "Tomates pelati | Mozzarella fior di latte | Albahaca fresca | Aceite de oliva",
    },
    prices: [{ priceChf: 13.0, displayPrice: "13.00" }],
  },
  {
    id: "pizza-marinara",
    category: "pizze",
    subCategory: "Pizze",
    name: "Marinara",
    dietary: "vegan",
    description: {
      de: "Pelati gialli | Basilikum | Datterino-Tomaten | Salmoriglio | Oregano | Olivenöl",
      en: "Yellow pelati | Fresh basil | Datterino tomatoes | Salmoriglio | Oregano | Olive oil",
      es: "Pelati amarillos | Albahaca | Tomates Datterino | Salmoriglio | Orégano | Aceite de oliva",
    },
    prices: [{ priceChf: 13.0, displayPrice: "13.00" }],
  },
  {
    id: "pizza-bufalina",
    category: "pizze",
    subCategory: "Pizze",
    name: "Bufalina",
    dietary: "vegetarian",
    description: {
      de: "Pelati | Basilikum | Büffelmozzarella | Olivenöl",
      en: "Pelati tomatoes | Fresh basil | Buffalo mozzarella | Extra-virgin olive oil",
      es: "Tomates pelati | Albahaca | Mozzarella de búfala | Aceite de oliva",
    },
    prices: [{ priceChf: 15.0, displayPrice: "15.00" }],
  },
  {
    id: "pizza-diavola",
    category: "pizze",
    subCategory: "Pizze",
    name: "Diavola",
    dietary: "pork",
    description: {
      de: "Pelati | Mozzarella fior di latte | Salame piccante | rote Zwiebeln | Salmoriglio",
      en: "Pelati | Fior di latte mozzarella | Spicy salami | Red onions | Salmoriglio",
      es: "Pelati | Mozzarella fior di latte | Salami picante | Cebolla roja | Salmoriglio",
    },
    prices: [{ priceChf: 17.0, displayPrice: "17.00" }],
  },
  {
    id: "pizza-napoli",
    category: "pizze",
    subCategory: "Pizze",
    name: "Napoli",
    dietary: "fish",
    description: {
      de: "Pelati | Basilikum | Büffelmozzarella | Mozzarella fior di latte | Sardellen | Oliven | Oregano | Olivenöl",
      en: "Pelati | Basil | Buffalo mozzarella | Fior di latte | Anchovies | Olives | Oregano | Olive oil",
      es: "Pelati | Albahaca | Mozzarella de búfala | Fior di latte | Anchoas | Aceitunas | Orégano | Aceite de oliva",
    },
    prices: [{ priceChf: 17.0, displayPrice: "17.00" }],
  },
  {
    id: "pizza-prosciutto",
    category: "pizze",
    subCategory: "Pizze",
    name: "Prosciutto",
    dietary: "pork",
    description: {
      de: "Pelati | Basilikum | Mozzarella fior di latte | Prosciutto | Mascarpone | Olivenöl",
      en: "Pelati | Basil | Fior di latte mozzarella | Prosciutto | Mascarpone | Olive oil",
      es: "Pelati | Albahaca | Mozzarella fior di latte | Prosciutto | Mascarpone | Aceite de oliva",
    },
    prices: [{ priceChf: 17.0, displayPrice: "17.00" }],
  },
  {
    id: "pizza-white-funghi",
    category: "pizze",
    subCategory: "Pizze",
    name: "White Funghi",
    dietary: "vegetarian",
    description: {
      de: "Pilzrahmsauce | Mozzarella fior di latte | Zitrone | Pilze | Spinat | Olivenöl",
      en: "Mushroom cream sauce | Fior di latte | Lemon zest | Mushrooms | Spinach | Olive oil",
      es: "Salsa cremosa de setas | Fior di latte | Limón | Champiñones | Espinacas | Aceite de oliva",
    },
    prices: [{ priceChf: 17.0, displayPrice: "17.00" }],
  },
  {
    id: "pizza-trentasette",
    category: "pizze",
    subCategory: "Pizze",
    name: "Trentasette",
    dietary: "cow",
    description: {
      de: "Pelati | Büffelmozzarella | scharfe Rindersalami",
      en: "Pelati tomatoes | Buffalo mozzarella | Spicy beef salami",
      es: "Tomates pelati | Mozzarella de búfala | Salami picante de res",
    },
    prices: [{ priceChf: 18.0, displayPrice: "18.00" }],
  },
  {
    id: "pizza-filosofa",
    category: "pizze",
    subCategory: "Pizze",
    name: "Filosofa",
    dietary: "pork",
    description: {
      de: "Pelati | Mozzarella fior di latte | Salame piccante | Gorgonzola | Oliven",
      en: "Pelati | Fior di latte mozzarella | Spicy salami | Gorgonzola | Olives",
      es: "Pelati | Mozzarella fior di latte | Salami picante | Gorgonzola | Aceitunas",
    },
    prices: [{ priceChf: 18.0, displayPrice: "18.00" }],
  },
  {
    id: "pizza-basilico",
    category: "pizze",
    subCategory: "Pizze",
    name: "Basilico",
    dietary: "vegetarian",
    description: {
      de: "Pelati | Basilikum | Stracciatella di burrata | Pistazien | Basilikumpesto",
      en: "Pelati | Basil | Stracciatella di burrata | Pistachios | Basil pesto",
      es: "Pelati | Albahaca | Stracciatella di burrata | Pistachos | Pesto de albahaca",
    },
    prices: [{ priceChf: 18.0, displayPrice: "18.00" }],
  },
  {
    id: "pizza-basilico-vegetale",
    category: "pizze",
    subCategory: "Pizze",
    name: "Basilico vegetale",
    dietary: "vegan",
    description: {
      de: "Pelati | Basilikum | Pflanzliche Stracciatella della casa | Pistazien | Basilikumpesto",
      en: "Pelati | Basil | House plant-based Stracciatella | Pistachios | Basil pesto",
      es: "Pelati | Albahaca | Stracciatella vegetal de la casa | Pistachos | Pesto de albahaca",
    },
    prices: [{ priceChf: 18.0, displayPrice: "18.00" }],
  },
  {
    id: "pizza-siciliana",
    category: "pizze",
    subCategory: "Pizze",
    name: "Siciliana",
    dietary: "vegetarian",
    description: {
      de: "Pelati | Basilikum | Caponata | Stracciatella di burrata | Petersilie | rote Zwiebelcreme | Mandeln | Olivenöl",
      en: "Pelati | Basil | Caponata | Stracciatella di burrata | Parsley | Red onion cream | Almonds | Olive oil",
      es: "Pelati | Albahaca | Caponata | Stracciatella di burrata | Perejil | Crema de cebolla roja | Almendras | Aceite de oliva",
    },
    prices: [{ priceChf: 18.0, displayPrice: "18.00" }],
  },
  {
    id: "pizza-siciliana-vegetale",
    category: "pizze",
    subCategory: "Pizze",
    name: "Siciliana vegetale",
    dietary: "vegan",
    description: {
      de: "Pelati | Basilikum | Caponata | Pflanzliche Stracciatella della casa | Petersilie | rote Zwiebelcreme | Mandeln | Olivenöl",
      en: "Pelati | Basil | Caponata | House plant-based Stracciatella | Parsley | Red onion cream | Almonds | Olive oil",
      es: "Pelati | Albahaca | Caponata | Stracciatella vegetal de la casa | Perejil | Crema de cebolla roja | Almendras | Aceite de oliva",
    },
    prices: [{ priceChf: 18.0, displayPrice: "18.00" }],
  },
  {
    id: "pizza-prosciutto-funghi",
    category: "pizze",
    subCategory: "Pizze",
    name: "Prosciutto e funghi",
    dietary: "pork",
    description: {
      de: "Pelati | Basilikum | Mozzarella fior di latte | Prosciutto | Pilze | Olivenöl",
      en: "Pelati | Basil | Fior di latte mozzarella | Prosciutto | Mushrooms | Olive oil",
      es: "Pelati | Albahaca | Mozzarella fior di latte | Prosciutto | Champiñones | Aceite de oliva",
    },
    prices: [{ priceChf: 18.0, displayPrice: "18.00" }],
  },
  {
    id: "pizza-bolo",
    category: "pizze",
    subCategory: "Pizze",
    name: "Bolo",
    dietary: "cow",
    description: {
      de: "Pelati | Basilikum | Rindfleisch-Bolognese | Mozzarella fior di latte | Petersilie | Pfeffer | Olivenöl",
      en: "Pelati | Basil | Slow-cooked beef Bolognese | Fior di latte | Parsley | Black pepper | Olive oil",
      es: "Pelati | Albahaca | Boloñesa de res | Mozzarella fior di latte | Perejil | Pimienta | Aceite de oliva",
    },
    prices: [{ priceChf: 19.0, displayPrice: "19.00" }],
  },
  {
    id: "pizza-4-stagioni-vegetale",
    category: "pizze",
    subCategory: "Pizze",
    name: "4 Stagioni vegetale",
    dietary: "vegan",
    description: {
      de: "Pelati gialli | Basilikum | Pflanzliche Stracciatella della casa | Auberginen | Pilze | Oliven-Crumble | Artischocken",
      en: "Yellow pelati | Basil | House plant-based Stracciatella | Eggplant | Mushrooms | Olive crumble | Artichokes",
      es: "Pelati amarillos | Albahaca | Stracciatella vegetal | Berenjena | Setas | Crumble de aceitunas | Alcachofas",
    },
    prices: [{ priceChf: 19.0, displayPrice: "19.00" }],
  },
  {
    id: "pizza-4-stagioni-gialla",
    category: "pizze",
    subCategory: "Pizze",
    name: "4 Stagioni gialla",
    dietary: "pork",
    description: {
      de: "Pelati gialli | Basilikum | Stracciatella di burrata | Prosciutto | Pilze | Oliven-Crumble | Artischocken",
      en: "Yellow pelati | Basil | Stracciatella di burrata | Prosciutto | Mushrooms | Olive crumble | Artichokes",
      es: "Pelati amarillos | Albahaca | Stracciatella di burrata | Prosciutto | Setas | Crumble de aceitunas | Alcachofas",
    },
    prices: [{ priceChf: 20.0, displayPrice: "20.00" }],
  },
  {
    id: "pizza-nino",
    category: "pizze",
    subCategory: "Pizze",
    name: "Nino",
    dietary: "pork",
    description: {
      de: "Pelati | Mozzarella fior di latte | Rucola | Artischocken | Coppa | Olivenöl",
      en: "Pelati | Fior di latte mozzarella | Wild arugula | Artichokes | Coppa | Olive oil",
      es: "Pelati | Mozzarella fior di latte | Rúcula | Alcachofas | Coppa | Aceite de oliva",
    },
    prices: [{ priceChf: 21.0, displayPrice: "21.00" }],
  },
  {
    id: "pizza-eigerplatz-item",
    category: "pizze",
    subCategory: "Pizze",
    name: "Eigerplatz",
    dietary: "pork",
    description: {
      de: "Pelati | Pilzcreme | Prosciutto | Stracciatella di burrata | Coppa | Olivenöl",
      en: "Pelati | Mushroom cream | Prosciutto | Stracciatella di burrata | Coppa | Extra-virgin olive oil",
      es: "Pelati | Crema de setas | Prosciutto | Stracciatella di burrata | Coppa | Aceite de oliva",
    },
    prices: [{ priceChf: 22.0, displayPrice: "22.00" }],
  },

  // ── ANTIPASTI & DOLCI ──────────────────────────────────────────────────────
  {
    id: "antipasti-olive-verdi",
    category: "antipasti_dolci",
    subCategory: "Antipasti",
    name: "Olive verdi",
    dietary: "vegan",
    description: {
      de: "Marinierte grüne Oliven",
      en: "Marinated green Italian olives",
      es: "Aceitunas verdes italianas marinadas",
    },
    prices: [{ priceChf: 5.0, displayPrice: "5.00" }],
  },
  {
    id: "antipasti-insalata",
    category: "antipasti_dolci",
    subCategory: "Antipasti",
    name: "Insalata",
    dietary: "vegan",
    description: {
      de: "Frischer gemischter Blattsalat mit Hausdressing",
      en: "Fresh seasonal green salad with house dressing",
      es: "Ensalada fresca de temporada con vinagreta de la casa",
    },
    prices: [{ priceChf: 7.0, displayPrice: "7.00" }],
  },
  {
    id: "dolci-panna-cotta",
    category: "antipasti_dolci",
    subCategory: "Dolci",
    name: "Panna cotta",
    dietary: "vegetarian",
    description: {
      de: "al caramello",
      en: "al caramello · House caramel panna cotta",
      es: "al caramello · Panna cotta casera al caramelo",
    },
    prices: [{ priceChf: 7.0, displayPrice: "7.00" }],
  },
  {
    id: "dolci-tiramisu",
    category: "antipasti_dolci",
    subCategory: "Dolci",
    name: "Tiramisù",
    dietary: "vegetarian",
    description: {
      de: "della casa",
      en: "della casa · Classic house-made tiramisù",
      es: "della casa · Tiramisú clásico de la casa",
    },
    prices: [{ priceChf: 7.0, displayPrice: "7.00" }],
  },
  {
    id: "dolci-pizza-nutella-slice",
    category: "antipasti_dolci",
    subCategory: "Dolci",
    name: "Pizza alla nutella",
    dietary: "vegan",
    description: {
      de: "Nutella vegetale, Pistazien (Slice CHF 5.00 | Ganz CHF 20.00)",
      en: "Nutella vegetale, roasted pistachios (Slice CHF 5.00 | Whole CHF 20.00)",
      es: "Nutella vegetale, pistachos tostados (Porción CHF 5.00 | Entera CHF 20.00)",
    },
    prices: [
      { size: "slice", priceChf: 5.0, displayPrice: "5.00" },
      { size: "ganz", priceChf: 20.0, displayPrice: "20.00" },
    ],
  },
  {
    id: "dolci-glace",
    category: "antipasti_dolci",
    subCategory: "Dolci",
    name: "Glace am Stiel",
    description: {
      de: "diverse Sorten (Frag nach der aktuellen Auswahl)",
      en: "Assorted artisan ice cream bars",
      es: "Helados artesanales variados",
    },
    prices: [{ priceChf: 5.0, displayPrice: "5.00" }],
  },

  // ── APERITIVO & SENZA ALCOOL ───────────────────────────────────────────────
  {
    id: "aperitivo-spumoni",
    category: "aperitivo",
    subCategory: "Aperitivo",
    name: "Spumoni",
    description: {
      de: "Campari, Grapefruitsaft, Tonic Water",
      en: "Campari, fresh grapefruit juice, tonic water",
      es: "Campari, zumo de pomelo, agua tónica",
    },
    prices: [{ priceChf: 12.0, displayPrice: "12.00" }],
  },
  {
    id: "aperitivo-veronese",
    category: "aperitivo",
    subCategory: "Aperitivo",
    name: "Veronese",
    description: {
      de: "Amaro Montenegro, Tonic Water, Limette",
      en: "Amaro Montenegro, tonic water, fresh lime",
      es: "Amaro Montenegro, agua tónica, lima fresca",
    },
    prices: [{ priceChf: 9.0, displayPrice: "9.00" }],
  },
  {
    id: "aperitivo-spritz-piccolino",
    category: "aperitivo",
    subCategory: "Aperitivo",
    name: "Aperol Spritz piccolino",
    description: {
      de: "Aperol, Prosecco, Olive",
      en: "Aperol, Prosecco, green olive",
      es: "Aperol, Prosecco, aceituna verde",
    },
    prices: [{ priceChf: 9.0, displayPrice: "9.00" }],
  },
  {
    id: "aperitivo-negroni",
    category: "aperitivo",
    subCategory: "Aperitivo",
    name: "Negroni",
    description: {
      de: "Gin, Bitter, Vermouth rosso",
      en: "Gin, Italian bitter, sweet red vermouth",
      es: "Ginebra, bitter italiano, vermut rojo",
    },
    prices: [{ priceChf: 12.0, displayPrice: "12.00" }],
  },
  {
    id: "aperitivo-garibaldi",
    category: "aperitivo",
    subCategory: "Aperitivo",
    name: "Garibaldi",
    description: {
      de: "Campari, Orangensaft",
      en: "Campari, fluffy orange juice",
      es: "Campari, zumo de naranja",
    },
    prices: [{ priceChf: 10.0, displayPrice: "10.00" }],
  },
  {
    id: "aperitivo-vermouth-bianco",
    category: "aperitivo",
    subCategory: "Aperitivo",
    name: "Vermouth bianco",
    description: {
      de: "10 cl · Auf Eis mit Zitronenzeste",
      en: "10 cl · Served chilled over ice",
      es: "10 cl · Servido frío con piel de limón",
    },
    prices: [{ size: "10 cl", priceChf: 9.0, displayPrice: "9.00" }],
  },
  {
    id: "aperitivo-campari-soda",
    category: "aperitivo",
    subCategory: "Aperitivo",
    name: "Campari Soda",
    description: {
      de: "Der italienische Aperitivo-Klassiker",
      en: "Classic Italian Campari Soda",
      es: "El clásico aperitivo italiano",
    },
    prices: [{ priceChf: 8.0, displayPrice: "8.00" }],
  },
  {
    id: "aperitivo-pastis",
    category: "aperitivo",
    subCategory: "Aperitivo",
    name: "Pastis",
    description: {
      de: "Mit frischem Wasser serviert",
      en: "Served with chilled water",
      es: "Servido con agua fresca",
    },
    prices: [{ priceChf: 7.0, displayPrice: "7.00" }],
  },
  {
    id: "aperitivo-eds-rum-coke",
    category: "aperitivo",
    subCategory: "Aperitivo",
    name: "Ed’s Rum&Coke",
    description: {
      de: "Ed’s Rum, Coca Cola",
      en: "Ed’s Rum, Coca Cola",
      es: "Ed’s Rum, Coca Cola",
    },
    prices: [{ priceChf: 12.0, displayPrice: "12.00" }],
  },
  {
    id: "senza-spumoni-nulla",
    category: "aperitivo",
    subCategory: "Senza alcool",
    name: "Spumoni nulla",
    description: {
      de: "San Bitter, Grapefruitsaft, Tonic Water (Alkoholfrei)",
      en: "San Bitter, grapefruit juice, tonic water (Alcohol-free)",
      es: "San Bitter, zumo de pomelo, agua tónica (Sin alcohol)",
    },
    prices: [{ priceChf: 9.0, displayPrice: "9.00" }],
  },
  {
    id: "senza-moretti-zero",
    category: "aperitivo",
    subCategory: "Senza alcool",
    name: "Moretti zero",
    description: {
      de: "Flasche, Lager, 0.05 %",
      en: "Bottle, Italian Lager, 0.05%",
      es: "Botella, Lager italiana, 0.05%",
    },
    prices: [{ size: "33 cl", priceChf: 4.5, displayPrice: "4.50" }],
  },
  {
    id: "senza-zipa",
    category: "aperitivo",
    subCategory: "Senza alcool",
    name: "ZIPA",
    description: {
      de: "Zeer, Dose, IPA, 0.3 %",
      en: "Zeer, Can, Non-alcoholic IPA, 0.3%",
      es: "Zeer, Lata, IPA sin alcohol, 0.3%",
    },
    prices: [{ size: "33 cl", priceChf: 5.5, displayPrice: "5.50" }],
  },
  {
    id: "senza-prenzlauer",
    category: "aperitivo",
    subCategory: "Senza alcool",
    name: "Prenzlauer 0",
    description: {
      de: "Põhjala, Himbeer-Sour, Dose, 0.5 %",
      en: "Põhjala, Raspberry Sour, Can, 0.5%",
      es: "Põhjala, Sour de frambuesa, Lata, 0.5%",
    },
    prices: [{ size: "33 cl", priceChf: 7.0, displayPrice: "7.00" }],
  },
  {
    id: "senza-san-bitter",
    category: "aperitivo",
    subCategory: "Senza alcool",
    name: "San Bitter",
    description: {
      de: "San Pellegrino · 10 cl",
      en: "San Pellegrino · 10 cl",
      es: "San Pellegrino · 10 cl",
    },
    prices: [{ size: "10 cl", priceChf: 4.0, displayPrice: "4.00" }],
  },

  // ── BIRRA, VINO & BOLLICINE ────────────────────────────────────────────────
  {
    id: "birra-moretti-offen",
    category: "birra_vino",
    subCategory: "Birra",
    name: "Moretti l’autentica (Offen)",
    description: {
      de: "offen, Lager, 4.6 %",
      en: "Draft, Italian Lager, 4.6%",
      es: "De barril, Lager italiana, 4.6%",
    },
    prices: [{ size: "30 cl", priceChf: 4.0, displayPrice: "4.00" }],
  },
  {
    id: "birra-moretti-flasche",
    category: "birra_vino",
    subCategory: "Birra",
    name: "Moretti l’autentica (Flasche)",
    description: {
      de: "Flasche, Lager, 4.6 %",
      en: "Bottle, Italian Lager, 4.6%",
      es: "Botella, Lager italiana, 4.6%",
    },
    prices: [{ size: "33 cl", priceChf: 5.0, displayPrice: "5.00" }],
  },
  {
    id: "birra-ichnusa-non-filtrata",
    category: "birra_vino",
    subCategory: "Birra",
    name: "Ichnusa non filtrata",
    description: {
      de: "Flasche, unfiltriert, 5 %",
      en: "Bottle, Unfiltered Sardinian Lager, 5%",
      es: "Botella, Lager sarda sin filtrar, 5%",
    },
    prices: [{ size: "50 cl", priceChf: 7.5, displayPrice: "7.50" }],
  },
  {
    id: "birra-ichnusa-limone",
    category: "birra_vino",
    subCategory: "Birra",
    name: "Ichnusa limone",
    description: {
      de: "Flasche, Radler, 2.0 %",
      en: "Bottle, Lemon Radler, 2.0%",
      es: "Botella, Radler con limón, 2.0%",
    },
    prices: [{ size: "33 cl", priceChf: 5.0, displayPrice: "5.00" }],
  },
  {
    id: "birra-jever",
    category: "birra_vino",
    subCategory: "Birra",
    name: "Jever Pilsener",
    description: {
      de: "Flasche, Pils, 4.9 %",
      en: "Bottle, Crisp Pilsner, 4.9%",
      es: "Botella, Pilsener, 4.9%",
    },
    prices: [{ size: "33 cl", priceChf: 5.5, displayPrice: "5.50" }],
  },
  {
    id: "birra-mundaka",
    category: "birra_vino",
    subCategory: "Birra",
    name: "Mundaka",
    description: {
      de: "CRAK Brewery, Session IPA, Dose, 4.6 %",
      en: "CRAK Brewery, Session IPA, Can, 4.6%",
      es: "CRAK Brewery, Session IPA, Lata, 4.6%",
    },
    prices: [{ size: "33 cl", priceChf: 6.5, displayPrice: "6.50" }],
  },
  {
    id: "birra-orange-gose",
    category: "birra_vino",
    subCategory: "Birra",
    name: "Orange Gose",
    description: {
      de: "Põhjala, Gose, Dose, 5.5 %",
      en: "Põhjala, Citrus Gose, Can, 5.5%",
      es: "Põhjala, Orange Gose, Lata, 5.5%",
    },
    prices: [{ size: "33 cl", priceChf: 8.0, displayPrice: "8.00" }],
  },
  {
    id: "birra-memento-vivi",
    category: "birra_vino",
    subCategory: "Birra",
    name: "Memento vivi",
    description: {
      de: "White Frontier, Himbeer-Sour, Dose, 5.5 %",
      en: "White Frontier, Raspberry Sour, Can, 5.5%",
      es: "White Frontier, Sour de frambuesa, Lata, 5.5%",
    },
    prices: [{ size: "33 cl", priceChf: 8.0, displayPrice: "8.00" }],
  },
  {
    id: "vino-della-casa",
    category: "birra_vino",
    subCategory: "Vino e Bollicine",
    name: "Vino della casa — rosso | bianco",
    description: {
      de: "Barbera d’Asti, 14 % | Arneis, Cascine del Frate (10 cl 5.00 · 25 cl 12.00 · 50 cl 23.00 · 1 L 44.00)",
      en: "Barbera d’Asti, 14% | Arneis, Cascine del Frate (10 cl 5.00 · 25 cl 12.00 · 50 cl 23.00 · 1 L 44.00)",
      es: "Barbera d’Asti, 14% | Arneis, Cascine del Frate (10 cl 5.00 · 25 cl 12.00 · 50 cl 23.00 · 1 L 44.00)",
    },
    prices: [
      { size: "10 cl", priceChf: 5.0, displayPrice: "5.00" },
      { size: "25 cl", priceChf: 12.0, displayPrice: "12.00" },
      { size: "50 cl", priceChf: 23.0, displayPrice: "23.00" },
      { size: "1 litro", priceChf: 44.0, displayPrice: "44.00" },
    ],
  },
  {
    id: "vino-prosecco-rose",
    category: "birra_vino",
    subCategory: "Vino e Bollicine",
    name: "Prosecco rosé brut",
    description: {
      de: "Carpenè Malvolti, 12 % (10 cl 6.00 · 75 cl 36.00)",
      en: "Carpenè Malvolti, 12% (10 cl 6.00 · 75 cl 36.00)",
      es: "Carpenè Malvolti, 12% (10 cl 6.00 · 75 cl 36.00)",
    },
    prices: [
      { size: "10 cl", priceChf: 6.0, displayPrice: "6.00" },
      { size: "75 cl", priceChf: 36.0, displayPrice: "36.00" },
    ],
  },
  {
    id: "vino-lambrusco",
    category: "birra_vino",
    subCategory: "Vino e Bollicine",
    name: "Lambrusco",
    description: {
      de: "Corte Manzini, 11 % (10 cl 7.00 · 75 cl 42.00)",
      en: "Corte Manzini, 11% (10 cl 7.00 · 75 cl 42.00)",
      es: "Corte Manzini, 11% (10 cl 7.00 · 75 cl 42.00)",
    },
    prices: [
      { size: "10 cl", priceChf: 7.0, displayPrice: "7.00" },
      { size: "75 cl", priceChf: 42.0, displayPrice: "42.00" },
    ],
  },
  {
    id: "vino-cidre",
    category: "birra_vino",
    subCategory: "Vino e Bollicine",
    name: "Cidre",
    description: {
      de: "Heftig, 5.5 %",
      en: "Heftig Swiss craft cider, 5.5%",
      es: "Sidra artesanal suiza Heftig, 5.5%",
    },
    prices: [{ size: "75 cl", priceChf: 34.0, displayPrice: "34.00" }],
  },

  // ── BIBITE, DIGESTIVI & CAFFÈ ──────────────────────────────────────────────
  {
    id: "bibite-supereistee",
    category: "bibite_caffe",
    subCategory: "Bibite",
    name: "Supereistee",
    description: {
      de: "daNino Haus-Eistee",
      en: "daNino signature house iced tea",
      es: "Té helado casero daNino",
    },
    prices: [{ size: "33 cl", priceChf: 4.5, displayPrice: "4.50" }],
  },
  {
    id: "bibite-yuzu-limo",
    category: "bibite_caffe",
    subCategory: "Bibite",
    name: "Yuzu Limo",
    description: {
      de: "Urban Lemonade",
      en: "Urban Lemonade · Yuzu citrus",
      es: "Urban Lemonade · Cítrico Yuzu",
    },
    prices: [{ size: "33 cl", priceChf: 5.5, displayPrice: "5.50" }],
  },
  {
    id: "bibite-calamansi-limo",
    category: "bibite_caffe",
    subCategory: "Bibite",
    name: "Calamansi Limo",
    description: {
      de: "Urban Lemonade",
      en: "Urban Lemonade · Calamansi lime",
      es: "Urban Lemonade · Lima Calamansi",
    },
    prices: [{ size: "33 cl", priceChf: 5.5, displayPrice: "5.50" }],
  },
  {
    id: "bibite-limonata",
    category: "bibite_caffe",
    subCategory: "Bibite",
    name: "Limonata",
    description: {
      de: "San Pellegrino",
      en: "San Pellegrino Italian lemon soda",
      es: "San Pellegrino Limonata",
    },
    prices: [{ size: "33 cl", priceChf: 4.0, displayPrice: "4.00" }],
  },
  {
    id: "bibite-aranciata",
    category: "bibite_caffe",
    subCategory: "Bibite",
    name: "Aranciata",
    description: {
      de: "San Pellegrino",
      en: "San Pellegrino Italian orange soda",
      es: "San Pellegrino Aranciata",
    },
    prices: [{ size: "33 cl", priceChf: 4.0, displayPrice: "4.00" }],
  },
  {
    id: "bibite-chinotto",
    category: "bibite_caffe",
    subCategory: "Bibite",
    name: "Chinotto",
    description: {
      de: "San Pellegrino",
      en: "San Pellegrino bitter citrus soda",
      es: "San Pellegrino Chinotto",
    },
    prices: [{ size: "33 cl", priceChf: 4.0, displayPrice: "4.00" }],
  },
  {
    id: "bibite-apfelschorle",
    category: "bibite_caffe",
    subCategory: "Bibite",
    name: "Apfelschorle",
    description: {
      de: "Ramseier",
      en: "Ramseier sparkling Swiss apple juice",
      es: "Ramseier zumo de manzana suizo con gas",
    },
    prices: [{ size: "33 cl", priceChf: 5.0, displayPrice: "5.00" }],
  },
  {
    id: "bibite-cola",
    category: "bibite_caffe",
    subCategory: "Bibite",
    name: "Cola | Cola Zero",
    description: {
      de: "Coca Cola",
      en: "Coca Cola / Zero",
      es: "Coca Cola / Zero",
    },
    prices: [{ size: "33 cl", priceChf: 4.0, displayPrice: "4.00" }],
  },
  {
    id: "bibite-lola-cola",
    category: "bibite_caffe",
    subCategory: "Bibite",
    name: "Lola Cola",
    description: {
      de: "Lola · Berner Craft-Cola",
      en: "Lola · Bernese craft cola",
      es: "Lola · Cola artesanal de Berna",
    },
    prices: [{ size: "33 cl", priceChf: 5.0, displayPrice: "5.00" }],
  },
  {
    id: "bibite-mate",
    category: "bibite_caffe",
    subCategory: "Bibite",
    name: "Mate",
    description: {
      de: "Lori’s Mate (Bern)",
      en: "Lori’s sparkling yerba mate (Bern)",
      es: "Lori’s Mate artesanal de Berna",
    },
    prices: [{ size: "33 cl", priceChf: 5.0, displayPrice: "5.00" }],
  },
  {
    id: "bibite-kombucha",
    category: "bibite_caffe",
    subCategory: "Bibite",
    name: "Kombucha Passionsfrucht",
    description: {
      de: "Urban Kombucha",
      en: "Urban Kombucha · Passionfruit",
      es: "Urban Kombucha · Maracuyá",
    },
    prices: [{ size: "33 cl", priceChf: 5.5, displayPrice: "5.50" }],
  },
  {
    id: "bibite-mineral-mit",
    category: "bibite_caffe",
    subCategory: "Bibite",
    name: "Mineral mit",
    description: {
      de: "San Pellegrino",
      en: "San Pellegrino sparkling water",
      es: "Agua con gas San Pellegrino",
    },
    prices: [{ size: "33 cl", priceChf: 3.5, displayPrice: "3.50" }],
  },
  {
    id: "bibite-mineral-ohne",
    category: "bibite_caffe",
    subCategory: "Bibite",
    name: "Mineral ohne",
    description: {
      de: "Acqua Panna",
      en: "Acqua Panna still water",
      es: "Agua sin gas Acqua Panna",
    },
    prices: [{ size: "50 cl", priceChf: 3.5, displayPrice: "3.50" }],
  },
  {
    id: "digestivi-limoncello",
    category: "bibite_caffe",
    subCategory: "Digestivi & Cafe",
    name: "Limoncello",
    description: {
      de: "della casa",
      en: "della casa · House-made limoncello",
      es: "della casa · Limoncello casero",
    },
    prices: [{ size: "4 cl", priceChf: 5.0, displayPrice: "5.00" }],
  },
  {
    id: "digestivi-aluna-coconut",
    category: "bibite_caffe",
    subCategory: "Digestivi & Cafe",
    name: "Aluna Coconut",
    description: {
      de: "Kaffeelikör",
      en: "Coconut & coffee liqueur",
      es: "Licor de café y coco",
    },
    prices: [{ size: "4 cl", priceChf: 6.0, displayPrice: "6.00" }],
  },
  {
    id: "digestivi-grappa",
    category: "bibite_caffe",
    subCategory: "Digestivi & Cafe",
    name: "Gualco Grappa",
    description: {
      de: "Barolo / Cortese",
      en: "Barolo / Cortese Piedmontese Grappa",
      es: "Grappa piamontesa Barolo / Cortese",
    },
    prices: [{ size: "2 cl", priceChf: 6.0, displayPrice: "6.00" }],
  },
  {
    id: "cafe-espresso",
    category: "bibite_caffe",
    subCategory: "Digestivi & Cafe",
    name: "Espresso",
    description: {
      de: "Klassischer italienischer Espresso",
      en: "Classic Italian espresso",
      es: "Espresso italiano clásico",
    },
    prices: [{ priceChf: 3.5, displayPrice: "3.50" }],
  },
];
