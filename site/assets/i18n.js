/** Editor-approved UI strings — do not paraphrase. */
export const STRINGS = {
  da: {
    siteTitle: "Lises mormors opskrifter",
    tagline: "Håndskrevne opskrifter fra Lises mormor",
    sourceLine: "Kilde: Lises mormor",
    navRecipes: "Opskrifter",
    navHome: "Forside",
    langDa: "Dansk",
    langEn: "Engelsk",
    langSwitchAria: "Skift sprog",
    categoryDesserts: "Desserter",
    categoryFromage: "Fromage",
    categoryPudding: "Budding",
    ingredientsHeading: "Ingredienser",
    methodHeading: "Fremgangsmåde",
    backToList: "Tilbage til opskrifterne",
    emptyTitle: "Ingen opskrifter endnu",
    emptyBody: "Der kommer flere, når vi har skrevet dem ind.",
    notFoundTitle: "Opskriften findes ikke",
    notFoundBody: "Prøv forsiden, eller vælg en anden opskrift.",
    footerNote: "Fra Lises mormors håndskrevne notesbøger.",
    metaHomeDescription:
      "Håndskrevne opskrifter fra Lises mormor — desserter og mere.",
    metaRecipeSuffix: " — Lises mormors opskrifter",
  },
  en: {
    siteTitle: "Lise’s mormor’s recipes",
    tagline: "Handwritten recipes from Lise’s mormor",
    sourceLine: "Source: Lise’s mormor",
    navRecipes: "Recipes",
    navHome: "Home",
    langDa: "Danish",
    langEn: "English",
    langSwitchAria: "Change language",
    categoryDesserts: "Desserts",
    categoryFromage: "Fromage",
    categoryPudding: "Pudding",
    ingredientsHeading: "Ingredients",
    methodHeading: "Method",
    backToList: "Back to recipes",
    emptyTitle: "No recipes yet",
    emptyBody: "More will show up as we add them.",
    notFoundTitle: "Recipe not found",
    notFoundBody: "Try the home page, or pick another recipe.",
    footerNote: "From Lise’s mormor’s handwritten notebooks.",
    metaHomeDescription:
      "Handwritten recipes from Lise’s mormor — desserts and more.",
    metaRecipeSuffix: " — Lise’s mormor’s recipes",
  },
};

export const LANGS = ["da", "en"];

export function t(lang, key) {
  const L = STRINGS[lang] ?? STRINGS.en;
  return L[key] ?? key;
}

export function getLang() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("lang");
  if (q === "da" || q === "en") return q;
  const stored = localStorage.getItem("recipe-lang");
  if (stored === "da" || stored === "en") return stored;
  return "en";
}

export function setLang(lang) {
  localStorage.setItem("recipe-lang", lang);
}

export function otherLang(lang) {
  return lang === "da" ? "en" : "da";
}

export function withLang(href, lang) {
  const url = new URL(href, window.location.origin);
  url.searchParams.set("lang", lang);
  return url.pathname + url.search;
}
