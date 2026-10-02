import { applyChrome, setDocumentMeta, categoryLabel, t, withLang } from "./site.js";

const HEADING_MAP = {
  en: {
    Ingredients: "ingredientsHeading",
    Method: "methodHeading",
  },
  da: {
    Ingredienser: "ingredientsHeading",
    Fremgangsmåde: "methodHeading",
  },
};

async function main() {
  const lang = applyChrome("recipes");
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  const back = document.querySelector("[data-back]");
  if (back) {
    back.textContent = t(lang, "backToList");
    back.href = withLang("/index.html#recipes", lang);
  }

  const article = document.getElementById("recipe-content");
  if (!slug || !article) {
    showNotFound(lang, article);
    return;
  }

  let index;
  try {
    const res = await fetch("recipes-index.json");
    index = await res.json();
  } catch {
    showNotFound(lang, article);
    return;
  }

  const tree = index[lang];
  let entry = null;
  for (const g of tree?.groups ?? []) {
    entry = g.recipes?.find((r) => r.slug === slug);
    if (entry) break;
  }

  if (!entry) {
    showNotFound(lang, article);
    return;
  }

  let data;
  try {
    const res = await fetch(entry.contentPath);
    if (!res.ok) throw new Error("content missing");
    data = await res.json();
  } catch {
    showNotFound(lang, article);
    return;
  }

  const catLabel = categoryLabel(lang, data.categoryKey);
  setDocumentMeta({
    title: `${data.title}${t(lang, "metaRecipeSuffix")}`,
    description: data.metaDescription || t(lang, "tagline"),
  });

  article.innerHTML = `
    <article class="recipe-article">
      <h1>${escapeHtml(data.title)}</h1>
      <p class="recipe-meta">${escapeHtml(catLabel)}</p>
      <div class="recipe-body">${localizeHeadings(data.html, lang)}</div>
    </article>
  `;
}

function localizeHeadings(html, lang) {
  const map = HEADING_MAP[lang] ?? HEADING_MAP.en;
  return html.replace(/<h2>([^<]+)<\/h2>/gi, (_, text) => {
    const key = map[text.trim()];
    const label = key ? t(lang, key) : text.trim();
    return `<h2>${escapeHtml(label)}</h2>`;
  });
}

function showNotFound(lang, article) {
  setDocumentMeta({
    title: `${t(lang, "notFoundTitle")}${t(lang, "metaRecipeSuffix")}`,
    description: t(lang, "notFoundBody"),
  });
  if (article) {
    article.innerHTML = `<div class="not-found"><h2>${escapeHtml(t(lang, "notFoundTitle"))}</h2><p>${escapeHtml(t(lang, "notFoundBody"))}</p></div>`;
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

main();
