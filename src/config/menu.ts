import type { DietaryTag } from "@/components/icons/DaNinoBrandIcons";
import type { Locale } from "@/lib/i18n";

export type MenuCategoryId =
  | "pizze"
  | "antipasti_dolci"
  | "aperitivo"
  | "birra_vino"
  | "bibite_caffe";

export type MenuSubCategoryId =
  | "pizza_special"
  | "pizze"
  | "antipasti"
  | "dolci"
  | "aperitivo"
  | "senza_alcool"
  | "birra"
  | "vino_bollicine"
  | "bibite"
  | "digestivi_caffe";

export type SizeKey = "slice" | "whole" | "liter1" | "10 cl" | "25 cl" | "30 cl" | "33 cl" | "50 cl" | "75 cl" | "4 cl" | "2 cl";

export interface MenuPriceOption {
  size?: SizeKey;
  priceChf: number;
  displayPrice: string;
}

export interface DaNinoMenuItem {
  id: string;
  category: MenuCategoryId;
  subCategory: MenuSubCategoryId;
  name: string | Record<Locale, string>;
  dietary?: DietaryTag;
  isSpecial?: boolean;
  description: Record<Locale, string>;
  prices: MenuPriceOption[];
}

export function resolveItemName(item: DaNinoMenuItem, locale: Locale): string {
  return typeof item.name === "string" ? item.name : item.name[locale];
}

export const DANINO_SPECIAL_ITEM: DaNinoMenuItem = {
  id: "special-numero-dodici",
  category: "pizze",
  subCategory: "pizza_special",
  name: "Numero Dodici",
  dietary: "vegetarian",
  isSpecial: true,
  description: {
    de: "Kürbiscreme | Shiitake-Pilze | Gebackener Kürbis | Karamellisierte Zwiebeln | Kürbiskerne | Sbrinz AOP",
    it: "Crema di zucca | Funghi shiitake | Zucca al forno | Cipolle caramellate | Semi di zucca | Sbrinz AOP",
    fr: "Crème de courge | Champignons shiitake | Courge rôtie | Oignons caramélisés | Graines de courge | Sbrinz AOP",
    en: "Pumpkin cream | Shiitake mushrooms | Roasted pumpkin | Caramelized onions | Pumpkin seeds | Sbrinz AOP",
  },
  prices: [{ priceChf: 19.0, displayPrice: "19.00" }],
};

export const DANINO_FULL_MENU: DaNinoMenuItem[] = [
  DANINO_SPECIAL_ITEM,

  // ── PIZZE ──────────────────────────────────────────────────────────────────
  {
    id: "pizza-margherita",
    category: "pizze",
    subCategory: "pizze",
    name: "Margherita",
    dietary: "vegetarian",
    description: {
      de: "Tomatensauce Pelati | Mozzarella Fior di Latte | Frisches Basilikum | Natives Olivenöl extra",
      it: "Pomodori pelati | Mozzarella fior di latte | Basilico fresco | Olio extravergine d’oliva",
      fr: "Sauce tomate pelati | Mozzarella fior di latte | Basilic frais | Huile d’olive vierge extra",
      en: "Pelati tomatoes | Fior di latte mozzarella | Fresh basil | Extra-virgin olive oil",
    },
    prices: [{ priceChf: 13.0, displayPrice: "13.00" }],
  },
  {
    id: "pizza-marinara",
    category: "pizze",
    subCategory: "pizze",
    name: "Marinara",
    dietary: "vegan",
    description: {
      de: "Gelbe Tomaten | Frisches Basilikum | Datterino-Tomaten | Kräuter-Salmoriglio | Oregano | Olivenöl",
      it: "Pelati gialli | Basilico fresco | Pomodorini datterini | Salmoriglio | Origano | Olio d’oliva",
      fr: "Tomates jaunes | Basilic frais | Tomates datterini | Salmoriglio aux herbes | Origan | Huile d’olive",
      en: "Yellow tomatoes | Fresh basil | Datterino tomatoes | Herb salmoriglio | Oregano | Olive oil",
    },
    prices: [{ priceChf: 13.0, displayPrice: "13.00" }],
  },
  {
    id: "pizza-bufalina",
    category: "pizze",
    subCategory: "pizze",
    name: "Bufalina",
    dietary: "vegetarian",
    description: {
      de: "Tomatensauce Pelati | Frisches Basilikum | Büffelmozzarella | Natives Olivenöl extra",
      it: "Pomodori pelati | Basilico fresco | Mozzarella di bufala | Olio extravergine d’oliva",
      fr: "Tomates pelati | Basilic frais | Mozzarella di bufala | Huile d’olive vierge extra",
      en: "Pelati tomatoes | Fresh basil | Buffalo mozzarella | Extra-virgin olive oil",
    },
    prices: [{ priceChf: 15.0, displayPrice: "15.00" }],
  },
  {
    id: "pizza-diavola",
    category: "pizze",
    subCategory: "pizze",
    name: "Diavola",
    dietary: "pork",
    description: {
      de: "Tomatensauce Pelati | Mozzarella Fior di Latte | Scharfe Salami | Rote Zwiebeln | Salmoriglio",
      it: "Pomodori pelati | Mozzarella fior di latte | Salame piccante | Cipolla rossa | Salmoriglio",
      fr: "Tomates pelati | Mozzarella fior di latte | Salami piquant | Oignons rouges | Salmoriglio",
      en: "Pelati tomatoes | Fior di latte mozzarella | Spicy salami | Red onions | Salmoriglio",
    },
    prices: [{ priceChf: 17.0, displayPrice: "17.00" }],
  },
  {
    id: "pizza-napoli",
    category: "pizze",
    subCategory: "pizze",
    name: "Napoli",
    dietary: "fish",
    description: {
      de: "Tomatensauce Pelati | Basilikum | Büffelmozzarella | Fior di Latte | Sardellen | Oliven | Oregano | Olivenöl",
      it: "Pomodori pelati | Basilico | Mozzarella di bufala | Fior di latte | Acciughe | Olive | Origano | Olio d’oliva",
      fr: "Tomates pelati | Basilic | Mozzarella di bufala | Fior di latte | Anchois | Olives | Origan | Huile d’olive",
      en: "Pelati tomatoes | Basil | Buffalo mozzarella | Fior di latte | Anchovies | Olives | Oregano | Olive oil",
    },
    prices: [{ priceChf: 17.0, displayPrice: "17.00" }],
  },
  {
    id: "pizza-prosciutto",
    category: "pizze",
    subCategory: "pizze",
    name: "Prosciutto",
    dietary: "pork",
    description: {
      de: "Tomatensauce Pelati | Basilikum | Mozzarella Fior di Latte | Hinterschinken | Mascarpone | Olivenöl",
      it: "Pomodori pelati | Basilico | Mozzarella fior di latte | Prosciutto cotto | Mascarpone | Olio d’oliva",
      fr: "Tomates pelati | Basilic | Mozzarella fior di latte | Jambon | Mascarpone | Huile d’olive",
      en: "Pelati tomatoes | Basil | Fior di latte mozzarella | Cooked ham | Mascarpone | Olive oil",
    },
    prices: [{ priceChf: 17.0, displayPrice: "17.00" }],
  },
  {
    id: "pizza-white-funghi",
    category: "pizze",
    subCategory: "pizze",
    name: "White Funghi",
    dietary: "vegetarian",
    description: {
      de: "Pilzrahmsauce | Mozzarella Fior di Latte | Zitrone | Champignons | Jungspinat | Olivenöl",
      it: "Crema di funghi | Mozzarella fior di latte | Limone | Funghi | Spinaci freschi | Olio d’oliva",
      fr: "Sauce crémeuse aux champignons | Fior di latte | Citron | Champignons | Jeunes épinards | Huile d’olive",
      en: "Mushroom cream sauce | Fior di latte | Lemon zest | Mushrooms | Baby spinach | Olive oil",
    },
    prices: [{ priceChf: 17.0, displayPrice: "17.00" }],
  },
  {
    id: "pizza-trentasette",
    category: "pizze",
    subCategory: "pizze",
    name: "Trentasette",
    dietary: "cow",
    description: {
      de: "Tomatensauce Pelati | Büffelmozzarella | Scharfe Rindersalami",
      it: "Pomodori pelati | Mozzarella di bufala | Salame piccante di manzo",
      fr: "Tomates pelati | Mozzarella di bufala | Salami de bœuf piquant",
      en: "Pelati tomatoes | Buffalo mozzarella | Spicy beef salami",
    },
    prices: [{ priceChf: 18.0, displayPrice: "18.00" }],
  },
  {
    id: "pizza-filosofa",
    category: "pizze",
    subCategory: "pizze",
    name: "Filosofa",
    dietary: "pork",
    description: {
      de: "Tomatensauce Pelati | Mozzarella Fior di Latte | Scharfe Salami | Gorgonzola | Oliven",
      it: "Pomodori pelati | Mozzarella fior di latte | Salame piccante | Gorgonzola | Olive",
      fr: "Tomates pelati | Mozzarella fior di latte | Salami piquant | Gorgonzola | Olives",
      en: "Pelati tomatoes | Fior di latte mozzarella | Spicy salami | Gorgonzola | Olives",
    },
    prices: [{ priceChf: 18.0, displayPrice: "18.00" }],
  },
  {
    id: "pizza-basilico",
    category: "pizze",
    subCategory: "pizze",
    name: "Basilico",
    dietary: "vegetarian",
    description: {
      de: "Tomatensauce Pelati | Basilikum | Stracciatella di Burrata | Geröstete Pistazien | Basilikumpesto",
      it: "Pomodori pelati | Basilico | Stracciatella di burrata | Pistacchi tostati | Pesto di basilico",
      fr: "Tomates pelati | Basilic | Stracciatella di burrata | Pistaches grillées | Pesto de basilic",
      en: "Pelati tomatoes | Basil | Stracciatella di burrata | Roasted pistachios | Basil pesto",
    },
    prices: [{ priceChf: 18.0, displayPrice: "18.00" }],
  },
  {
    id: "pizza-basilico-vegetale",
    category: "pizze",
    subCategory: "pizze",
    name: {
      de: "Basilico (vegan)",
      it: "Basilico vegetale",
      fr: "Basilico végétale",
      en: "Basilico (plant-based)",
    },
    dietary: "vegan",
    description: {
      de: "Tomatensauce Pelati | Basilikum | Hausgemachte pflanzliche Stracciatella | Pistazien | Basilikumpesto",
      it: "Pomodori pelati | Basilico | Stracciatella vegetale della casa | Pistacchi | Pesto di basilico",
      fr: "Tomates pelati | Basilic | Stracciatella végétale maison | Pistaches | Pesto de basilic",
      en: "Pelati tomatoes | Basil | House plant-based Stracciatella | Pistachios | Basil pesto",
    },
    prices: [{ priceChf: 18.0, displayPrice: "18.00" }],
  },
  {
    id: "pizza-siciliana",
    category: "pizze",
    subCategory: "pizze",
    name: "Siciliana",
    dietary: "vegetarian",
    description: {
      de: "Tomatensauce Pelati | Basilikum | Auberginen-Caponata | Stracciatella di Burrata | Petersilie | Rote Zwiebelcreme | Mandeln | Olivenöl",
      it: "Pomodori pelati | Basilico | Caponata di melanzane | Stracciatella di burrata | Prezzemolo | Crema di cipolla rossa | Mandorle | Olio d’oliva",
      fr: "Tomates pelati | Basilic | Caponata d’aubergines | Stracciatella di burrata | Persil | Crème d’oignons rouges | Amandes | Huile d’olive",
      en: "Pelati tomatoes | Basil | Eggplant caponata | Stracciatella di burrata | Parsley | Red onion cream | Almonds | Olive oil",
    },
    prices: [{ priceChf: 18.0, displayPrice: "18.00" }],
  },
  {
    id: "pizza-siciliana-vegetale",
    category: "pizze",
    subCategory: "pizze",
    name: {
      de: "Siciliana (vegan)",
      it: "Siciliana vegetale",
      fr: "Siciliana végétale",
      en: "Siciliana (plant-based)",
    },
    dietary: "vegan",
    description: {
      de: "Tomatensauce Pelati | Basilikum | Caponata | Hausgemachte pflanzliche Stracciatella | Petersilie | Rote Zwiebelcreme | Mandeln | Olivenöl",
      it: "Pomodori pelati | Basilico | Caponata | Stracciatella vegetale della casa | Prezzemolo | Crema di cipolla rossa | Mandorle | Olio d’oliva",
      fr: "Tomates pelati | Basilic | Caponata | Stracciatella végétale maison | Persil | Crème d’oignons rouges | Amandes | Huile d’olive",
      en: "Pelati tomatoes | Basil | Caponata | House plant-based Stracciatella | Parsley | Red onion cream | Almonds | Olive oil",
    },
    prices: [{ priceChf: 18.0, displayPrice: "18.00" }],
  },
  {
    id: "pizza-prosciutto-funghi",
    category: "pizze",
    subCategory: "pizze",
    name: "Prosciutto e funghi",
    dietary: "pork",
    description: {
      de: "Tomatensauce Pelati | Basilikum | Mozzarella Fior di Latte | Schinken | Champignons | Olivenöl",
      it: "Pomodori pelati | Basilico | Mozzarella fior di latte | Prosciutto cotto | Funghi | Olio d’oliva",
      fr: "Tomates pelati | Basilic | Mozzarella fior di latte | Jambon | Champignons | Huile d’olive",
      en: "Pelati tomatoes | Basil | Fior di latte mozzarella | Ham | Mushrooms | Olive oil",
    },
    prices: [{ priceChf: 18.0, displayPrice: "18.00" }],
  },
  {
    id: "pizza-bolo",
    category: "pizze",
    subCategory: "pizze",
    name: "Bolo",
    dietary: "cow",
    description: {
      de: "Tomatensauce Pelati | Basilikum | Hausgemachte Rinds-Bolognese | Mozzarella Fior di Latte | Petersilie | Schwarzer Pfeffer | Olivenöl",
      it: "Pomodori pelati | Basilico | Ragù bolognese di manzo | Mozzarella fior di latte | Prezzemolo | Pepe nero | Olio d’oliva",
      fr: "Tomates pelati | Basilic | Bolognaise de bœuf mijotée | Mozzarella fior di latte | Persil | Poivre noir | Huile d’olive",
      en: "Pelati tomatoes | Basil | Slow-cooked beef Bolognese | Fior di latte | Parsley | Black pepper | Olive oil",
    },
    prices: [{ priceChf: 19.0, displayPrice: "19.00" }],
  },
  {
    id: "pizza-4-stagioni",
    category: "pizze",
    subCategory: "pizze",
    name: "4 Stagioni",
    dietary: "pork",
    description: {
      de: "Tomatensauce Pelati | Basilikum | Mozzarella Fior di Latte | Salami | Pilze | Schwarze Oliven | Artischocken",
      it: "Pomodori pelati | Basilico | Mozzarella fior di latte | Salame | Funghi | Olive nere | Carciofi",
      fr: "Tomates pelati | Basilic | Mozzarella fior di latte | Salami | Champignons | Olives noires | Artichauts",
      en: "Pelati tomatoes | Fresh basil | Fior di latte mozzarella | Salami | Mushrooms | Black olives | Artichokes",
    },
    prices: [{ priceChf: 20.0, displayPrice: "20.00" }],
  },
  {
    id: "pizza-4-stagioni-vegetale",
    category: "pizze",
    subCategory: "pizze",
    name: {
      de: "4 Stagioni (vegan)",
      it: "4 Stagioni vegetale",
      fr: "4 Stagioni végétale",
      en: "4 Stagioni (plant-based)",
    },
    dietary: "vegan",
    description: {
      de: "Gelbe Tomaten | Basilikum | Hausgemachte pflanzliche Stracciatella | Auberginen | Pilze | Oliven-Crumble | Artischocken",
      it: "Pelati gialli | Basilico | Stracciatella vegetale della casa | Melanzane | Funghi | Crumble di olive | Carciofi",
      fr: "Tomates jaunes | Basilic | Stracciatella végétale maison | Aubergines | Champignons | Crumble d’olives | Artichauts",
      en: "Yellow tomatoes | Basil | House plant-based Stracciatella | Eggplant | Mushrooms | Olive crumble | Artichokes",
    },
    prices: [{ priceChf: 19.0, displayPrice: "19.00" }],
  },
  {
    id: "pizza-4-stagioni-gialla",
    category: "pizze",
    subCategory: "pizze",
    name: "4 Stagioni gialla",
    dietary: "pork",
    description: {
      de: "Gelbe Tomaten | Basilikum | Stracciatella di Burrata | Schinken | Pilze | Oliven-Crumble | Artischocken",
      it: "Pelati gialli | Basilico | Stracciatella di burrata | Prosciutto | Funghi | Crumble di olive | Carciofi",
      fr: "Tomates jaunes | Basilic | Stracciatella di burrata | Jambon | Champignons | Crumble d’olives | Artichauts",
      en: "Yellow tomatoes | Basil | Stracciatella di burrata | Ham | Mushrooms | Olive crumble | Artichokes",
    },
    prices: [{ priceChf: 20.0, displayPrice: "20.00" }],
  },
  {
    id: "pizza-nino",
    category: "pizze",
    subCategory: "pizze",
    name: "Nino",
    dietary: "pork",
    description: {
      de: "Tomatensauce Pelati | Mozzarella Fior di Latte | Wilder Rucola | Artischocken | Coppa | Olivenöl",
      it: "Pomodori pelati | Mozzarella fior di latte | Rucola selvatica | Carciofi | Coppa | Olio d’oliva",
      fr: "Tomates pelati | Mozzarella fior di latte | Roquette sauvage | Artichauts | Coppa | Huile d’olive",
      en: "Pelati tomatoes | Fior di latte mozzarella | Wild arugula | Artichokes | Coppa | Olive oil",
    },
    prices: [{ priceChf: 21.0, displayPrice: "21.00" }],
  },
  {
    id: "pizza-eigerplatz-item",
    category: "pizze",
    subCategory: "pizze",
    name: "Eigerplatz",
    dietary: "pork",
    description: {
      de: "Tomatensauce Pelati | Steinpilzcreme | Rohschinken | Stracciatella di Burrata | Coppa | Natives Olivenöl extra",
      it: "Pomodori pelati | Crema di funghi porcini | Prosciutto | Stracciatella di burrata | Coppa | Olio extravergine d’oliva",
      fr: "Tomates pelati | Crème de cèpes | Prosciutto | Stracciatella di burrata | Coppa | Huile d’olive vierge extra",
      en: "Pelati tomatoes | Porcini mushroom cream | Prosciutto | Stracciatella di burrata | Coppa | Extra-virgin olive oil",
    },
    prices: [{ priceChf: 22.0, displayPrice: "22.00" }],
  },

  // ── ANTIPASTI & DOLCI ──────────────────────────────────────────────────────
  {
    id: "antipasti-olive-verdi",
    category: "antipasti_dolci",
    subCategory: "antipasti",
    name: {
      de: "Grüne Oliven",
      it: "Olive verdi",
      fr: "Olives vertes",
      en: "Green Olives",
    },
    dietary: "vegan",
    description: {
      de: "Marinierte grüne Oliven aus Italien",
      it: "Olive verdi italiane marinate alle erbe",
      fr: "Olives vertes italiennes marinées aux herbes",
      en: "Marinated green Italian olives",
    },
    prices: [{ priceChf: 5.0, displayPrice: "5.00" }],
  },
  {
    id: "antipasti-insalata",
    category: "antipasti_dolci",
    subCategory: "antipasti",
    name: {
      de: "Gemischter Blattsalat",
      it: "Insalata",
      fr: "Salade verte",
      en: "Seasonal Salad",
    },
    dietary: "vegan",
    description: {
      de: "Frischer Saisonsalat mit Hausdressing",
      it: "Insalata fresca di stagione con condimento della casa",
      fr: "Salade fraîche de saison avec vinaigrette maison",
      en: "Fresh seasonal green salad with house dressing",
    },
    prices: [{ priceChf: 7.0, displayPrice: "7.00" }],
  },
  {
    id: "dolci-panna-cotta",
    category: "antipasti_dolci",
    subCategory: "dolci",
    name: "Panna Cotta",
    dietary: "vegetarian",
    description: {
      de: "Hausgemachte Panna Cotta mit feinem Karamell",
      it: "Panna cotta artigianale della casa al caramello",
      fr: "Panna cotta maison nappée de caramel",
      en: "House-made panna cotta with caramel",
    },
    prices: [{ priceChf: 7.0, displayPrice: "7.00" }],
  },
  {
    id: "dolci-tiramisu",
    category: "antipasti_dolci",
    subCategory: "dolci",
    name: "Tiramisù",
    dietary: "vegetarian",
    description: {
      de: "Klassisches hausgemachtes Tiramisù nach Familienrezept",
      it: "Classico tiramisù artigianale della casa",
      fr: "Tiramisù traditionnel fait maison",
      en: "Classic house-made tiramisù",
    },
    prices: [{ priceChf: 7.0, displayPrice: "7.00" }],
  },
  {
    id: "dolci-pizza-nutella-slice",
    category: "antipasti_dolci",
    subCategory: "dolci",
    name: "Pizza alla Nutella",
    dietary: "vegan",
    description: {
      de: "Pflanzliche Nutella & geröstete Pistazien (Stück CHF 5.00 | Ganz CHF 20.00)",
      it: "Nutella vegetale & pistacchi tostati (Fetta CHF 5.00 | Intera CHF 20.00)",
      fr: "Nutella végétale & pistaches grillées (Part CHF 5.00 | Entière CHF 20.00)",
      en: "Plant-based Nutella & roasted pistachios (Slice CHF 5.00 | Whole CHF 20.00)",
    },
    prices: [
      { size: "slice", priceChf: 5.0, displayPrice: "5.00" },
      { size: "whole", priceChf: 20.0, displayPrice: "20.00" },
    ],
  },
  {
    id: "dolci-glace",
    category: "antipasti_dolci",
    subCategory: "dolci",
    name: {
      de: "Glace am Stiel",
      it: "Gelato su stecco",
      fr: "Glace sur bâtonnet",
      en: "Artisan Ice Cream Bar",
    },
    description: {
      de: "Wechselnde handwerkliche Sorten (frag unser Team)",
      it: "Gelati artigianali in gusti assortiti",
      fr: "Bâtonnets glacés artisanaux aux parfums variés",
      en: "Assorted artisan ice cream flavours",
    },
    prices: [{ priceChf: 5.0, displayPrice: "5.00" }],
  },

  // ── APERITIVO & SENZA ALCOOL ───────────────────────────────────────────────
  {
    id: "aperitivo-spumoni",
    category: "aperitivo",
    subCategory: "aperitivo",
    name: "Spumoni",
    description: {
      de: "Campari, frischer Grapefruitsaft, Tonic Water",
      it: "Campari, succo di pompelmo fresco, acqua tonica",
      fr: "Campari, jus de pamplemousse frais, eau tonique",
      en: "Campari, fresh grapefruit juice, tonic water",
    },
    prices: [{ priceChf: 12.0, displayPrice: "12.00" }],
  },
  {
    id: "aperitivo-veronese",
    category: "aperitivo",
    subCategory: "aperitivo",
    name: "Veronese",
    description: {
      de: "Amaro Montenegro, Tonic Water, frische Limette",
      it: "Amaro Montenegro, acqua tonica, lime fresco",
      fr: "Amaro Montenegro, eau tonique, citron vert frais",
      en: "Amaro Montenegro, tonic water, fresh lime",
    },
    prices: [{ priceChf: 9.0, displayPrice: "9.00" }],
  },
  {
    id: "aperitivo-spritz-piccolino",
    category: "aperitivo",
    subCategory: "aperitivo",
    name: "Aperol Spritz piccolino",
    description: {
      de: "Aperol, Prosecco, grüne Olive",
      it: "Aperol, Prosecco, oliva verde",
      fr: "Aperol, Prosecco, olive verte",
      en: "Aperol, Prosecco, green olive",
    },
    prices: [{ priceChf: 9.0, displayPrice: "9.00" }],
  },
  {
    id: "aperitivo-negroni",
    category: "aperitivo",
    subCategory: "aperitivo",
    name: "Negroni",
    description: {
      de: "Gin, italienischer Bitter, roter Wermut",
      it: "Gin, bitter italiano, vermouth rosso",
      fr: "Gin, bitter italien, vermouth rouge",
      en: "Gin, Italian bitter, sweet red vermouth",
    },
    prices: [{ priceChf: 12.0, displayPrice: "12.00" }],
  },
  {
    id: "aperitivo-garibaldi",
    category: "aperitivo",
    subCategory: "aperitivo",
    name: "Garibaldi",
    description: {
      de: "Campari, aufgeschäumter Orangensaft",
      it: "Campari, spremuta d’arancia fresca",
      fr: "Campari, jus d’orange fraîchement pressé",
      en: "Campari, freshly aerated orange juice",
    },
    prices: [{ priceChf: 10.0, displayPrice: "10.00" }],
  },
  {
    id: "aperitivo-vermouth-bianco",
    category: "aperitivo",
    subCategory: "aperitivo",
    name: {
      de: "Weisser Wermut",
      it: "Vermouth bianco",
      fr: "Vermouth blanc",
      en: "White Vermouth",
    },
    description: {
      de: "10 cl · Gekühlt auf Eis mit Zitronenzeste",
      it: "10 cl · Servito freddo con ghiaccio e scorza di limone",
      fr: "10 cl · Servi frais sur glace avec zeste de citron",
      en: "10 cl · Served chilled over ice with lemon zest",
    },
    prices: [{ size: "10 cl", priceChf: 9.0, displayPrice: "9.00" }],
  },
  {
    id: "aperitivo-campari-soda",
    category: "aperitivo",
    subCategory: "aperitivo",
    name: "Campari Soda",
    description: {
      de: "Der italienische Aperitivo-Klassiker",
      it: "Il grande classico dell’aperitivo italiano",
      fr: "Le grand classique de l’apéritif italien",
      en: "The classic Italian aperitivo",
    },
    prices: [{ priceChf: 8.0, displayPrice: "8.00" }],
  },
  {
    id: "aperitivo-pastis",
    category: "aperitivo",
    subCategory: "aperitivo",
    name: "Pastis",
    description: {
      de: "Mit gekühltem Wasser serviert",
      it: "Servito con acqua fresca",
      fr: "Servi avec de l’eau fraîche",
      en: "Served with chilled water",
    },
    prices: [{ priceChf: 7.0, displayPrice: "7.00" }],
  },
  {
    id: "aperitivo-eds-rum-coke",
    category: "aperitivo",
    subCategory: "aperitivo",
    name: "Ed’s Rum & Coke",
    description: {
      de: "Ed’s Rum & Coca-Cola auf Eis",
      it: "Ed’s Rum & Coca-Cola con ghiaccio",
      fr: "Ed’s Rum & Coca-Cola sur glace",
      en: "Ed’s Rum & Coca-Cola over ice",
    },
    prices: [{ priceChf: 12.0, displayPrice: "12.00" }],
  },
  {
    id: "senza-spumoni-nulla",
    category: "aperitivo",
    subCategory: "senza_alcool",
    name: "Spumoni Nulla",
    description: {
      de: "San Bitter, Grapefruitsaft, Tonic Water (alkoholfrei)",
      it: "San Bitter, succo di pompelmo, acqua tonica (analcolico)",
      fr: "San Bitter, jus de pamplemousse, eau tonique (sans alcool)",
      en: "San Bitter, grapefruit juice, tonic water (alcohol-free)",
    },
    prices: [{ priceChf: 9.0, displayPrice: "9.00" }],
  },
  {
    id: "senza-moretti-zero",
    category: "aperitivo",
    subCategory: "senza_alcool",
    name: "Moretti Zero",
    description: {
      de: "Flasche, italienisches Lagerbier, 0.05 %",
      it: "Bottiglia, Lager italiana analcolica, 0.05%",
      fr: "Bouteille, Lager italienne sans alcool, 0.05 %",
      en: "Bottle, non-alcoholic Italian lager, 0.05%",
    },
    prices: [{ size: "33 cl", priceChf: 4.5, displayPrice: "4.50" }],
  },
  {
    id: "senza-zipa",
    category: "aperitivo",
    subCategory: "senza_alcool",
    name: "ZIPA",
    description: {
      de: "Zeer, Dose, alkoholfreies IPA, 0.3 %",
      it: "Zeer, lattina, IPA analcolica, 0.3%",
      fr: "Zeer, canette, IPA sans alcool, 0.3 %",
      en: "Zeer, can, non-alcoholic IPA, 0.3%",
    },
    prices: [{ size: "33 cl", priceChf: 5.5, displayPrice: "5.50" }],
  },
  {
    id: "senza-prenzlauer",
    category: "aperitivo",
    subCategory: "senza_alcool",
    name: "Prenzlauer 0",
    description: {
      de: "Põhjala, Himbeer-Sour, Dose, 0.5 %",
      it: "Põhjala, Sour al lampone, lattina, 0.5%",
      fr: "Põhjala, Sour à la framboise, canette, 0.5 %",
      en: "Põhjala, Raspberry Sour, can, 0.5%",
    },
    prices: [{ size: "33 cl", priceChf: 7.0, displayPrice: "7.00" }],
  },
  {
    id: "senza-san-bitter",
    category: "aperitivo",
    subCategory: "senza_alcool",
    name: "San Bitter",
    description: {
      de: "San Pellegrino alkoholfreier Aperitif · 10 cl",
      it: "Aperitivo analcolico San Pellegrino · 10 cl",
      fr: "Apéritif sans alcool San Pellegrino · 10 cl",
      en: "San Pellegrino non-alcoholic aperitif · 10 cl",
    },
    prices: [{ size: "10 cl", priceChf: 4.0, displayPrice: "4.00" }],
  },

  // ── BIRRA, VINO & BOLLICINE ────────────────────────────────────────────────
  {
    id: "birra-moretti-offen",
    category: "birra_vino",
    subCategory: "birra",
    name: {
      de: "Moretti l’Autentica (Offen)",
      it: "Moretti l’Autentica (Alla spina)",
      fr: "Moretti l’Autentica (Pression)",
      en: "Moretti l’Autentica (Draft)",
    },
    description: {
      de: "Frisch gezapftes italienisches Lager, 4.6 %",
      it: "Alla spina, Lager italiana, 4.6%",
      fr: "Bière blonde italienne pression, 4.6 %",
      en: "Draft Italian lager, 4.6%",
    },
    prices: [{ size: "30 cl", priceChf: 4.0, displayPrice: "4.00" }],
  },
  {
    id: "birra-moretti-flasche",
    category: "birra_vino",
    subCategory: "birra",
    name: {
      de: "Moretti l’Autentica (Flasche)",
      it: "Moretti l’Autentica (Bottiglia)",
      fr: "Moretti l’Autentica (Bouteille)",
      en: "Moretti l’Autentica (Bottle)",
    },
    description: {
      de: "Flasche, italienisches Lager, 4.6 %",
      it: "Bottiglia, Lager italiana, 4.6%",
      fr: "Bouteille, Lager italienne, 4.6 %",
      en: "Bottle, Italian lager, 4.6%",
    },
    prices: [{ size: "33 cl", priceChf: 5.0, displayPrice: "5.00" }],
  },
  {
    id: "birra-ichnusa-non-filtrata",
    category: "birra_vino",
    subCategory: "birra",
    name: "Ichnusa Non Filtrata",
    description: {
      de: "Flasche, naturtrübes sardisches Lager, 5 %",
      it: "Bottiglia, Lager sarda non filtrata, 5%",
      fr: "Bouteille, Lager sarde non filtrée, 5 %",
      en: "Bottle, unfiltered Sardinian lager, 5%",
    },
    prices: [{ size: "50 cl", priceChf: 7.5, displayPrice: "7.50" }],
  },
  {
    id: "birra-ichnusa-limone",
    category: "birra_vino",
    subCategory: "birra",
    name: "Ichnusa Limone",
    description: {
      de: "Flasche, sardisches Zitronen-Radler, 2.0 %",
      it: "Bottiglia, Radler sarda al limone, 2.0%",
      fr: "Bouteille, Radler sarde au citron, 2.0 %",
      en: "Bottle, Sardinian lemon radler, 2.0%",
    },
    prices: [{ size: "33 cl", priceChf: 5.0, displayPrice: "5.00" }],
  },
  {
    id: "birra-jever",
    category: "birra_vino",
    subCategory: "birra",
    name: "Jever Pilsener",
    description: {
      de: "Flasche, herbes Pilsener, 4.9 %",
      it: "Bottiglia, Pilsner secca, 4.9%",
      fr: "Bouteille, Pilsner sèche, 4.9 %",
      en: "Bottle, crisp dry pilsner, 4.9%",
    },
    prices: [{ size: "33 cl", priceChf: 5.5, displayPrice: "5.50" }],
  },
  {
    id: "birra-mundaka",
    category: "birra_vino",
    subCategory: "birra",
    name: "Mundaka",
    description: {
      de: "CRAK Brewery, Session IPA, Dose, 4.6 %",
      it: "CRAK Brewery, Session IPA, lattina, 4.6%",
      fr: "CRAK Brewery, Session IPA, canette, 4.6 %",
      en: "CRAK Brewery, Session IPA, can, 4.6%",
    },
    prices: [{ size: "33 cl", priceChf: 6.5, displayPrice: "6.50" }],
  },
  {
    id: "birra-orange-gose",
    category: "birra_vino",
    subCategory: "birra",
    name: "Orange Gose",
    description: {
      de: "Põhjala, Zitrus-Gose, Dose, 5.5 %",
      it: "Põhjala, Gose agli agrumi, lattina, 5.5%",
      fr: "Põhjala, Gose aux agrumes, canette, 5.5 %",
      en: "Põhjala, Citrus Gose, can, 5.5%",
    },
    prices: [{ size: "33 cl", priceChf: 8.0, displayPrice: "8.00" }],
  },
  {
    id: "birra-memento-vivi",
    category: "birra_vino",
    subCategory: "birra",
    name: "Memento Vivi",
    description: {
      de: "White Frontier, Himbeer-Sour, Dose, 5.5 %",
      it: "White Frontier, Sour al lampone, lattina, 5.5%",
      fr: "White Frontier, Sour à la framboise, canette, 5.5 %",
      en: "White Frontier, Raspberry Sour, can, 5.5%",
    },
    prices: [{ size: "33 cl", priceChf: 8.0, displayPrice: "8.00" }],
  },
  {
    id: "vino-della-casa",
    category: "birra_vino",
    subCategory: "vino_bollicine",
    name: {
      de: "Hauswein — Rot | Weiss",
      it: "Vino della casa — rosso | bianco",
      fr: "Vin maison — rouge | blanc",
      en: "House Wine — Red | White",
    },
    description: {
      de: "Barbera d’Asti, 14 % | Arneis, Cascine del Frate",
      it: "Barbera d’Asti, 14% | Arneis, Cascine del Frate",
      fr: "Barbera d’Asti, 14 % | Arneis, Cascine del Frate",
      en: "Barbera d’Asti, 14% | Arneis, Cascine del Frate",
    },
    prices: [
      { size: "10 cl", priceChf: 5.0, displayPrice: "5.00" },
      { size: "25 cl", priceChf: 12.0, displayPrice: "12.00" },
      { size: "50 cl", priceChf: 23.0, displayPrice: "23.00" },
      { size: "liter1", priceChf: 44.0, displayPrice: "44.00" },
    ],
  },
  {
    id: "vino-prosecco-rose",
    category: "birra_vino",
    subCategory: "vino_bollicine",
    name: "Prosecco Rosé Brut",
    description: {
      de: "Carpenè Malvolti, 12 %",
      it: "Carpenè Malvolti, 12%",
      fr: "Carpenè Malvolti, 12 %",
      en: "Carpenè Malvolti, 12%",
    },
    prices: [
      { size: "10 cl", priceChf: 6.0, displayPrice: "6.00" },
      { size: "75 cl", priceChf: 36.0, displayPrice: "36.00" },
    ],
  },
  {
    id: "vino-lambrusco",
    category: "birra_vino",
    subCategory: "vino_bollicine",
    name: "Lambrusco",
    description: {
      de: "Corte Manzini, 11 %",
      it: "Corte Manzini, 11%",
      fr: "Corte Manzini, 11 %",
      en: "Corte Manzini, 11%",
    },
    prices: [
      { size: "10 cl", priceChf: 7.0, displayPrice: "7.00" },
      { size: "75 cl", priceChf: 42.0, displayPrice: "42.00" },
    ],
  },
  {
    id: "vino-cidre",
    category: "birra_vino",
    subCategory: "vino_bollicine",
    name: "Cidre",
    description: {
      de: "Heftig Schweizer Craft-Cidre, 5.5 %",
      it: "Sidro artigianale svizzero Heftig, 5.5%",
      fr: "Cidre artisanal suisse Heftig, 5.5 %",
      en: "Heftig Swiss craft cider, 5.5%",
    },
    prices: [{ size: "75 cl", priceChf: 34.0, displayPrice: "34.00" }],
  },

  // ── BIBITE, DIGESTIVI & CAFFÈ ──────────────────────────────────────────────
  {
    id: "bibite-supereistee",
    category: "bibite_caffe",
    subCategory: "bibite",
    name: {
      de: "Supereistee",
      it: "Tè freddo della casa",
      fr: "Thé froid maison",
      en: "House Iced Tea",
    },
    description: {
      de: "Hausgemachter da Nino Eistee",
      it: "Tè freddo artigianale fatto in casa da Nino",
      fr: "Thé froid artisanal préparé maison par da Nino",
      en: "da Nino signature house-made iced tea",
    },
    prices: [{ size: "33 cl", priceChf: 4.5, displayPrice: "4.50" }],
  },
  {
    id: "bibite-yuzu-limo",
    category: "bibite_caffe",
    subCategory: "bibite",
    name: "Yuzu Limo",
    description: {
      de: "Urban Lemonade · Yuzu-Zitruslimonade",
      it: "Urban Lemonade · Limonata allo Yuzu",
      fr: "Urban Lemonade · Limonade au Yuzu",
      en: "Urban Lemonade · Yuzu citrus soda",
    },
    prices: [{ size: "33 cl", priceChf: 5.5, displayPrice: "5.50" }],
  },
  {
    id: "bibite-calamansi-limo",
    category: "bibite_caffe",
    subCategory: "bibite",
    name: "Calamansi Limo",
    description: {
      de: "Urban Lemonade · Calamansi-Limette",
      it: "Urban Lemonade · Limonata al Calamansi",
      fr: "Urban Lemonade · Limonade au Calamansi",
      en: "Urban Lemonade · Calamansi lime soda",
    },
    prices: [{ size: "33 cl", priceChf: 5.5, displayPrice: "5.50" }],
  },
  {
    id: "bibite-limonata",
    category: "bibite_caffe",
    subCategory: "bibite",
    name: "Limonata",
    description: {
      de: "San Pellegrino italienische Zitronenlimonade",
      it: "Limonata classica San Pellegrino",
      fr: "Limonade italienne au citron San Pellegrino",
      en: "San Pellegrino Italian lemon soda",
    },
    prices: [{ size: "33 cl", priceChf: 4.0, displayPrice: "4.00" }],
  },
  {
    id: "bibite-aranciata",
    category: "bibite_caffe",
    subCategory: "bibite",
    name: "Aranciata",
    description: {
      de: "San Pellegrino italienische Orangenlimonade",
      it: "Aranciata classica San Pellegrino",
      fr: "Soda italien à l’orange San Pellegrino",
      en: "San Pellegrino Italian orange soda",
    },
    prices: [{ size: "33 cl", priceChf: 4.0, displayPrice: "4.00" }],
  },
  {
    id: "bibite-chinotto",
    category: "bibite_caffe",
    subCategory: "bibite",
    name: "Chinotto",
    description: {
      de: "San Pellegrino herbe Bitterorangen-Limonade",
      it: "Chinotto classico San Pellegrino",
      fr: "Soda italien à l’orange amère San Pellegrino",
      en: "San Pellegrino bitter citrus soda",
    },
    prices: [{ size: "33 cl", priceChf: 4.0, displayPrice: "4.00" }],
  },
  {
    id: "bibite-apfelschorle",
    category: "bibite_caffe",
    subCategory: "bibite",
    name: {
      de: "Apfelschorle",
      it: "Succo di mela frizzante",
      fr: "Jus de pomme pétillant",
      en: "Sparkling Apple Juice",
    },
    description: {
      de: "Ramseier Schweizer Apfelschorle",
      it: "Succo di mela frizzante svizzero Ramseier",
      fr: "Jus de pomme pétillant suisse Ramseier",
      en: "Ramseier sparkling Swiss apple juice",
    },
    prices: [{ size: "33 cl", priceChf: 5.0, displayPrice: "5.00" }],
  },
  {
    id: "bibite-cola",
    category: "bibite_caffe",
    subCategory: "bibite",
    name: "Cola | Cola Zero",
    description: {
      de: "Coca-Cola Klassik oder Zero",
      it: "Coca-Cola classica o Zero",
      fr: "Coca-Cola classique ou Zero",
      en: "Coca-Cola Classic or Zero",
    },
    prices: [{ size: "33 cl", priceChf: 4.0, displayPrice: "4.00" }],
  },
  {
    id: "bibite-lola-cola",
    category: "bibite_caffe",
    subCategory: "bibite",
    name: "Lola Cola",
    description: {
      de: "Lola · Berner Craft-Cola",
      it: "Lola · Cola artigianale di Berna",
      fr: "Lola · Cola artisanal bernois",
      en: "Lola · Bernese craft cola",
    },
    prices: [{ size: "33 cl", priceChf: 5.0, displayPrice: "5.00" }],
  },
  {
    id: "bibite-mate",
    category: "bibite_caffe",
    subCategory: "bibite",
    name: "Mate",
    description: {
      de: "Lori’s Mate aus Bern",
      it: "Lori’s Mate artigianale di Berna",
      fr: "Lori’s Mate pétillant de Berne",
      en: "Lori’s sparkling yerba mate from Bern",
    },
    prices: [{ size: "33 cl", priceChf: 5.0, displayPrice: "5.00" }],
  },
  {
    id: "bibite-kombucha",
    category: "bibite_caffe",
    subCategory: "bibite",
    name: {
      de: "Kombucha Passionsfrucht",
      it: "Kombucha al frutto della passione",
      fr: "Kombucha fruit de la passion",
      en: "Passionfruit Kombucha",
    },
    description: {
      de: "Urban Kombucha · Bio-Passionsfrucht",
      it: "Urban Kombucha · Frutto della passione bio",
      fr: "Urban Kombucha · Fruit de la passion bio",
      en: "Urban Kombucha · Organic passionfruit",
    },
    prices: [{ size: "33 cl", priceChf: 5.5, displayPrice: "5.50" }],
  },
  {
    id: "bibite-mineral-mit",
    category: "bibite_caffe",
    subCategory: "bibite",
    name: {
      de: "Mineralwasser mit Kohlensäure",
      it: "Acqua minerale frizzante",
      fr: "Eau minérale gazeuse",
      en: "Sparkling Mineral Water",
    },
    description: {
      de: "San Pellegrino",
      it: "San Pellegrino",
      fr: "San Pellegrino",
      en: "San Pellegrino",
    },
    prices: [{ size: "33 cl", priceChf: 3.5, displayPrice: "3.50" }],
  },
  {
    id: "bibite-mineral-ohne",
    category: "bibite_caffe",
    subCategory: "bibite",
    name: {
      de: "Mineralwasser ohne Kohlensäure",
      it: "Acqua minerale naturale",
      fr: "Eau minérale plate",
      en: "Still Mineral Water",
    },
    description: {
      de: "Acqua Panna",
      it: "Acqua Panna",
      fr: "Acqua Panna",
      en: "Acqua Panna",
    },
    prices: [{ size: "50 cl", priceChf: 3.5, displayPrice: "3.50" }],
  },
  {
    id: "digestivi-limoncello",
    category: "bibite_caffe",
    subCategory: "digestivi_caffe",
    name: "Limoncello",
    description: {
      de: "Hausgemachter Zitronenlikör nach Hausrezept",
      it: "Limoncello artigianale della casa",
      fr: "Limoncello artisanal fait maison",
      en: "House-made Italian lemon liqueur",
    },
    prices: [{ size: "4 cl", priceChf: 5.0, displayPrice: "5.00" }],
  },
  {
    id: "digestivi-aluna-coconut",
    category: "bibite_caffe",
    subCategory: "digestivi_caffe",
    name: "Aluna Coconut",
    description: {
      de: "Feiner Kokos- & Kaffeelikör",
      it: "Liquore al cocco e caffè",
      fr: "Liqueur de noix de coco et café",
      en: "Coconut & coffee liqueur",
    },
    prices: [{ size: "4 cl", priceChf: 6.0, displayPrice: "6.00" }],
  },
  {
    id: "digestivi-grappa",
    category: "bibite_caffe",
    subCategory: "digestivi_caffe",
    name: "Gualco Grappa",
    description: {
      de: "Piemontesischer Grappa (Barolo / Cortese)",
      it: "Grappa piemontese (Barolo / Cortese)",
      fr: "Grappa piémontaise (Barolo / Cortese)",
      en: "Piedmontese Grappa (Barolo / Cortese)",
    },
    prices: [{ size: "2 cl", priceChf: 6.0, displayPrice: "6.00" }],
  },
  {
    id: "cafe-espresso",
    category: "bibite_caffe",
    subCategory: "digestivi_caffe",
    name: "Espresso",
    description: {
      de: "Klassischer italienischer Espresso",
      it: "Classico espresso italiano",
      fr: "Espresso italien classique",
      en: "Classic Italian espresso",
    },
    prices: [{ priceChf: 3.5, displayPrice: "3.50" }],
  },
];
