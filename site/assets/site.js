import {
  STRINGS,
  t,
  getLang,
  setLang,
  otherLang,
  withLang,
} from "./i18n.js";

export function applyChrome(activeNav) {
  const lang = getLang();
  setLang(lang);
  document.documentElement.lang = lang === "da" ? "da" : "en";

  const titleEl = document.querySelector("[data-site-title]");
  const taglineEl = document.querySelector("[data-tagline]");
  const sourceEl = document.querySelector("[data-source]");
  const footerNoteEl = document.querySelector("[data-footer-note]");
  const navHome = document.querySelector("[data-nav-home]");
  const navRecipes = document.querySelector("[data-nav-recipes]");
  const langDa = document.querySelector("[data-lang-da]");
  const langEn = document.querySelector("[data-lang-en]");
  const langSwitch = document.querySelector(".lang-switch");

  if (titleEl) titleEl.textContent = t(lang, "siteTitle");
  if (taglineEl) taglineEl.textContent = t(lang, "tagline");
  if (sourceEl) sourceEl.textContent = t(lang, "sourceLine");
  if (footerNoteEl) footerNoteEl.textContent = t(lang, "footerNote");

  const brandLink = document.querySelector(".brand__title a");
  if (brandLink) brandLink.href = withLang("/index.html", lang);

  if (navHome) {
    navHome.textContent = t(lang, "navHome");
    navHome.href = withLang("/index.html", lang);
    navHome.setAttribute("aria-current", activeNav === "home" ? "page" : "false");
  }
  if (navRecipes) {
    navRecipes.textContent = t(lang, "navRecipes");
    navRecipes.href = withLang("/index.html#recipes", lang);
    navRecipes.setAttribute(
      "aria-current",
      activeNav === "recipes" ? "page" : "false"
    );
  }

  if (langDa) {
    langDa.textContent = t(lang, "langDa");
    langDa.href = switchLangHref("da");
    langDa.setAttribute("aria-current", lang === "da" ? "true" : "false");
  }
  if (langEn) {
    langEn.textContent = t(lang, "langEn");
    langEn.href = switchLangHref("en");
    langEn.setAttribute("aria-current", lang === "en" ? "true" : "false");
  }
  if (langSwitch) {
    langSwitch.setAttribute("aria-label", t(lang, "langSwitchAria"));
  }

  return lang;
}

function switchLangHref(targetLang) {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", targetLang);
  return url.pathname + url.search + url.hash;
}

export function setDocumentMeta({ title, description }) {
  document.title = title;
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);
  }
  meta.content = description;
}

export function categoryLabel(lang, categoryKey) {
  return t(lang, categoryKey);
}

export { t, getLang, withLang, STRINGS };
