/** Editor-approved UI strings — do not paraphrase. */
export const STRINGS = {
  da: {
    siteTitle: "Lises mormors opskrifter",
    tagline: "Håndskrevne opskrifter fra Lises mormor",
    sourceLine: "Kilde: Lises mormor",
    navRecipes: "Opskrifter",
    navHome: "Forside",
    navAbout: "Om",
    navAria: "Hovedmenu",
    langDa: "Dansk",
    langEn: "Engelsk",
    langSwitchAria: "Skift sprog",
    categoryDesserts: "Desserter",
    categoryFromage: "Fromage",
    categoryPudding: "Budding",
    categoryCreme: "Crème",
    categoryIs: "Is",
    categorySalads: "Salater",
    categoryCakes: "Kager",
    categorySoups: "Supper",
    categoryFish: "Fisk",
    categorySauces: "Saucer",
    categoryColdStarters: "Kolde forretter",
    categoryPreserves: "Syltetøj",
    categoryArchive: "Historie",
    scanHeading: "Håndskrift",
    scanDisclosure: "Se håndskrift",
    scanPlaceholder: "Scan kommer",
    aboutTitle: "Om opskrifterne",
    aboutMetaDescription:
      "Historien bag Lises mormors håndskrevne opskrifter — notesbog, udklip og den skrevne side ved siden af den indtastede.",
    aboutBody:
      "Lises mormor skrev opskrifter i hånden: i en notesbog, på løse sedler og i udklip fra aviser og blade. Noget er tydeligt, andet er rettet til undervejs — præcis som man gør i et køkken.\n\nHer ligger den indtastede opskrift ved siden af det originale. Ikke for at erstatte hendes håndskrift, men for at den stadig kan ses, mens I laver maden. Det er hendes ord og hendes måde at huske på — vi har bare gjort dem nemmere at læse.",
    ingredientsHeading: "Ingredienser",
    methodHeading: "Fremgangsmåde",
    notesHeading: "Noter",
    transcriptionNoteHeading: "Transkriptionsnote",
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
    navAbout: "About",
    navAria: "Main",
    langDa: "Danish",
    langEn: "English",
    langSwitchAria: "Change language",
    categoryDesserts: "Desserts",
    categoryFromage: "Fromage",
    categoryPudding: "Pudding",
    categoryCreme: "Crème",
    categoryIs: "Ice",
    categorySalads: "Salads",
    categoryCakes: "Cakes",
    categorySoups: "Soups",
    categoryFish: "Fish",
    categorySauces: "Sauces",
    categoryColdStarters: "Cold starters",
    categoryPreserves: "Preserves",
    categoryArchive: "History",
    scanHeading: "Handwriting",
    scanDisclosure: "See handwriting",
    scanPlaceholder: "Scan coming",
    aboutTitle: "About the recipes",
    aboutMetaDescription:
      "The story behind Lise’s mormor’s handwritten recipes — notebook, clippings, and her writing shown next to the typed page.",
    aboutBody:
      "Lise’s mormor wrote recipes by hand: in a notebook, on loose slips, and in clippings from papers and magazines. Some lines are clear; others were corrected as she went — the way a kitchen notebook grows over the years.\n\nHere the typed recipe sits beside the original page. Not to replace her handwriting, but so you can still see it while you cook. These are her words and her way of remembering — we’ve only made them easier to read at the counter.",
    ingredientsHeading: "Ingredients",
    methodHeading: "Method",
    notesHeading: "Notes",
    transcriptionNoteHeading: "Transcription note",
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
  return "da";
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
