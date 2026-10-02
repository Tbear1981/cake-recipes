import { BASE_PATH } from "./config.js";
import {
  STRINGS,
  t as tBase,
  getLang,
  setLang,
} from "./i18n.js";

/** @type {{ recipeId?: string; recipePairs?: Record<string, { en: string; da: string }> } | null} */
let langSwitchContext = null;

const SITE_ROOT = normalizeBasePath(BASE_PATH);

function normalizeBasePath(bp) {
  if (!bp || bp === "/") return "";
  let s = String(bp).trim();
  if (!s.startsWith("/")) s = `/${s}`;
  return s.replace(/\/$/, "");
}

/** Prefix absolute site paths with BASE_PATH (standalone: unchanged). */
export function sitePath(href) {
  if (/^https?:\/\//i.test(href)) return href;

  const hashIdx = href.indexOf("#");
  const hash = hashIdx >= 0 ? href.slice(hashIdx) : "";
  let rest = hashIdx >= 0 ? href.slice(0, hashIdx) : href;
  const qIdx = rest.indexOf("?");
  const query = qIdx >= 0 ? rest.slice(qIdx) : "";
  let pathname = qIdx >= 0 ? rest.slice(0, qIdx) : rest;

  if (pathname.startsWith("/")) {
    pathname = SITE_ROOT + pathname;
  }

  return pathname + query + hash;
}

export function withLang(href, lang) {
  const url = new URL(sitePath(href), window.location.origin);
  url.searchParams.set("lang", lang);
  return url.pathname + url.search + url.hash;
}

export function t(lang, key) {
  return tBase(lang, key);
}

export function setLangSwitchContext(ctx) {
  langSwitchContext = ctx;
}

export function applyChrome(activeNav) {
  const lang = getLang();
  setLang(lang);
  document.documentElement.lang = lang;
  if (lang === "ar") {
    document.documentElement.setAttribute("dir", "rtl");
  } else {
    document.documentElement.removeAttribute("dir");
  }

  const titleEl = document.querySelector("[data-site-title]");
  const taglineEl = document.querySelector("[data-tagline]");
  const footerNoteEl = document.querySelector("[data-footer-note]");
  const navHome = document.querySelector("[data-nav-home]");
  const navRecipes = document.querySelector("[data-nav-recipes]");
  const navAbout = document.querySelector("[data-nav-about]");
  const mainNav = document.querySelector(".site-header nav");
  const recipesHeading = document.getElementById("recipes-heading");
  const langDa = document.querySelector("[data-lang-da]");
  const langEn = document.querySelector("[data-lang-en]");
  const langAr = document.querySelector("[data-lang-ar]");
  const langSwitch = document.querySelector(".lang-switch");

  if (titleEl) titleEl.textContent = t(lang, "siteTitle");
  if (taglineEl) taglineEl.textContent = t(lang, "tagline");
  if (footerNoteEl) footerNoteEl.textContent = t(lang, "footerNote");

  const brandLink = document.querySelector(".brand__title a");
  if (brandLink) brandLink.href = withLang("/", lang);

  if (navHome) {
    navHome.textContent = t(lang, "navHome");
    navHome.href = withLang("/", lang);
    navHome.setAttribute("aria-current", activeNav === "home" ? "page" : "false");
  }
  if (navRecipes) {
    navRecipes.textContent = t(lang, "navRecipes");
    navRecipes.href = withLang("/#recipes", lang);
    navRecipes.setAttribute(
      "aria-current",
      activeNav === "recipes" ? "page" : "false"
    );
  }
  if (navAbout) {
    navAbout.textContent = t(lang, "navAbout");
    navAbout.href = withLang("/about", lang);
    navAbout.setAttribute(
      "aria-current",
      activeNav === "about" ? "page" : "false"
    );
  }
  if (mainNav) {
    mainNav.setAttribute("aria-label", t(lang, "navAria"));
  }
  if (recipesHeading) {
    recipesHeading.textContent = t(lang, "navRecipes");
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
  if (langAr) {
    langAr.textContent = t(lang, "langAr");
    langAr.href = switchLangHref("ar");
    langAr.setAttribute("aria-current", lang === "ar" ? "true" : "false");
  }
  if (langSwitch) {
    langSwitch.setAttribute("aria-label", t(lang, "langSwitchAria"));
  }

  return lang;
}

function switchLangHref(targetLang) {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", targetLang);

  const recipeId =
    url.searchParams.get("id") ||
    langSwitchContext?.recipeId ||
    resolveSlugToRecipeId(url.searchParams.get("slug"), getLang());

  if (recipeId && langSwitchContext?.recipePairs?.[recipeId]) {
    url.searchParams.set("id", recipeId);
    url.searchParams.delete("slug");
    return url.pathname + url.search + url.hash;
  }

  return url.pathname + url.search + url.hash;
}

function resolveSlugToRecipeId(slug, lang) {
  if (!slug || !langSwitchContext?.slugAliases) return null;
  const aliases = langSwitchContext.slugAliases[lang];
  if (!aliases) return null;
  const full = aliases[slug] ?? slug;
  for (const [id, paths] of Object.entries(langSwitchContext.recipePairs ?? {})) {
    if (paths[lang] === full) return id;
  }
  return null;
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

export { getLang, STRINGS, SITE_ROOT };
