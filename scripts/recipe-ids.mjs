/** Stable cross-language recipe ids (see originals/WIRE.md for scans). */
export const RECIPE_PAIRS = [
  { id: "buttermilk-fromage", en: "desserts/fromage/buttermilk-fromage.md", da: "desserter/fromage/kaernemaelks-fromage.md" },
  { id: "alexandra-pudding", en: "desserts/pudding/alexandra-pudding.md", da: "desserter/budding/alexandra-budding.md" },
  { id: "italian-salad-without-oil", en: "salads/italian-salad-without-oil.md", da: "salater/italiensk-salat-uden-olie.md" },
  { id: "herring-salad", en: "salads/herring-salad.md", da: "salater/sildesalat.md" },
  { id: "small-egg-white-cookies", en: "cakes/small-egg-white-cookies.md", da: "kager/smaa-aeggehvidekager.md" },
  { id: "layer-cake", en: "cakes/layer-cake.md", da: "kager/lagkage.md" },
  { id: "marzipan-cake", en: "cakes/marzipan-cake.md", da: "kager/marcipankage.md" },
  { id: "lemon-soup", en: "soups/lemon-soup.md", da: "supper/citron-suppe.md" },
  { id: "lemon-cream", en: "desserts/creme/lemon-cream.md", da: "desserter/creme/citroncreme.md" },
  { id: "fish-terrine", en: "fish/fish-terrine.md", da: "fisk/fisketerrine.md" },
  { id: "mushroom-sauce", en: "sauces/mushroom-sauce.md", da: "saucer/champignonsauce.md" },
  { id: "black-caviar-ring", en: "cold-starters/black-caviar-ring.md", da: "kolde-forretter/sort-kaviar-rand.md" },
  { id: "avocado-mousse-with-caviar-sauce", en: "cold-starters/avocado-mousse-with-caviar-sauce.md", da: "kolde-forretter/avocadomousse-med-kaviarsovs.md" },
  { id: "juice-pudding", en: "desserts/pudding/juice-pudding.md", da: "desserter/budding/saft-budding.md" },
  { id: "apple-raisin-chutney", en: "preserves/apple-raisin-chutney.md", da: "sylt/aeble-rosin-chutney.md" },
  { id: "mormors-cake", en: "cakes/mormors-cake.md", da: "kager/mormors-kage.md" },
  { id: "parfait", en: "desserts/is/parfait.md", da: "desserter/is/parfait-is.md" },
  { id: "green-gooseberries", en: "preserves/green-gooseberries.md", da: "sylt/groenne-stikkelsbaer.md" },
  { id: "soda-cake", en: "cakes/soda-cake.md", da: "kager/sodakage.md" },
  { id: "syrup-layer-cake", en: "cakes/syrup-layer-cake.md", da: "kager/sirups-lagkage.md" },
  { id: "cocoa-cake", en: "cakes/cocoa-cake.md", da: "kager/cacaokage.md" },
  { id: "luksus-appelsin-kage", en: "cakes/luksus-appelsin-kage.md", da: "kager/luksus-appelsin-kage.md" },
  { id: "chokoladekage", en: "cakes/chokoladekage.md", da: "kager/chokoladekage.md" },
];

/** @type {Record<string, string>} repo-root paths under originals/ */
export const SCAN_BY_ID = {
  "buttermilk-fromage": "originals/fromage-alexandra-budding.jpg",
  "alexandra-pudding": "originals/fromage-alexandra-budding.jpg",
  "italian-salad-without-oil": "originals/italiensk-salat-sildesalat.jpg",
  "herring-salad": "originals/italiensk-salat-sildesalat.jpg",
  "small-egg-white-cookies": "originals/aeggehvidekager-lagkage-marcipankage.jpg",
  "layer-cake": "originals/aeggehvidekager-lagkage-marcipankage.jpg",
  "marzipan-cake": "originals/aeggehvidekager-lagkage-marcipankage.jpg",
  "lemon-soup": "originals/citron-suppe.jpg",
  "lemon-cream": "originals/citroncreme.jpg",
  "fish-terrine": "originals/fisketerrine.jpg",
  "mushroom-sauce": "originals/champignonsauce.jpg",
  "black-caviar-ring": "originals/sort-kaviar-rand.jpg",
  "avocado-mousse-with-caviar-sauce": "originals/avocadomousse-kaviarsovs.jpg",
  "juice-pudding": "originals/saft-budding.jpg",
  "apple-raisin-chutney": "originals/aeble-rosin-chutney.jpg",
  "mormors-cake": "originals/mormors-kage.jpg",
  parfait: "originals/parfait-is.jpg",
  "green-gooseberries": "originals/groenne-stikkelsbaer.jpg",
  "soda-cake": "originals/sodakage-sirups-cacaokage.jpg",
  "syrup-layer-cake": "originals/sodakage-sirups-cacaokage.jpg",
  "cocoa-cake": "originals/sodakage-sirups-cacaokage.jpg",
  "luksus-appelsin-kage": "originals/luksus-appelsin-kage.jpg",
  chokoladekage: "originals/chokoladekage-ugens-lille-laekkeri.jpg",
};

/** Notebook archive shown on About — not in recipe index. */
export const ABOUT_ARCHIVE_SCAN = "originals/drikkepenge-nov-feb.jpg";

/** @type {Record<string, { en: string; da: string }>} */
export function buildRecipePairs() {
  const pairs = {};
  for (const { id, en, da } of RECIPE_PAIRS) {
    pairs[id] = {
      en: en.replace(/\.md$/, ""),
      da: da.replace(/\.md$/, ""),
    };
  }
  return pairs;
}

/** @type {Record<string, Record<string, string>>} */
export function buildFileToId() {
  const map = {};
  for (const { id, en, da } of RECIPE_PAIRS) {
    map[`en/${en}`] = id;
    map[`da/${da}`] = id;
  }
  return map;
}
