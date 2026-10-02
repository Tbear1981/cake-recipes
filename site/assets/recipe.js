import {
  applyChrome,
  setDocumentMeta,
  categoryLabel,
  setLangSwitchContext,
  t,
  withLang,
} from "./site.js";

const HEADING_MAP = {
  en: {
    Ingredients: "ingredientsHeading",
    Method: "methodHeading",
    Notes: "notesHeading",
    "Transcription note": "transcriptionNoteHeading",
  },
  da: {
    Ingredienser: "ingredientsHeading",
    Fremgangsmåde: "methodHeading",
    Noter: "notesHeading",
    Transkriptionsnote: "transcriptionNoteHeading",
  },
};

async function main() {
  const params = new URLSearchParams(window.location.search);

  let index;
  try {
    const res = await fetch("recipes-index.json");
    if (!res.ok) throw new Error("index fetch failed");
    index = await res.json();
  } catch {
    const lang = applyChrome("recipes");
    showNotFound(lang, document.getElementById("recipe-content"));
    return;
  }

  setLangSwitchContext({
    recipePairs: index.recipePairs,
    slugAliases: index.slugAliases,
  });

  let lang = applyChrome("recipes");

  const back = document.querySelector("[data-back]");
  if (back) {
    back.textContent = t(lang, "backToList");
    back.href = withLang("/index.html#recipes", lang);
  }

  const article = document.getElementById("recipe-content");
  const recipeId = params.get("id");
  const slugParam = params.get("slug");

  const entry = findEntry(index, lang, recipeId, slugParam);
  if (!entry) {
    showNotFound(lang, article);
    return;
  }

  setLangSwitchContext({
    recipeId: entry.recipeId,
    recipePairs: index.recipePairs,
    slugAliases: index.slugAliases,
  });
  applyChrome("recipes");

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

  const scanBlock = renderScan(lang, data.scan);

  article.innerHTML = `
    <article class="recipe-article">
      <h1>${escapeHtml(data.title)}</h1>
      <p class="recipe-meta">${escapeHtml(catLabel)}</p>
      <div class="recipe-layout">
        <aside class="recipe-scan" aria-labelledby="scan-heading">
          <h2 id="scan-heading" class="recipe-scan__title">${escapeHtml(t(lang, "scanHeading"))}</h2>
          ${scanBlock}
        </aside>
        <div class="recipe-body">${localizeHeadings(data.html, lang)}</div>
      </div>
    </article>
  `;
}

function findEntry(index, lang, recipeId, slugParam) {
  const tree = index[lang];
  if (!tree?.groups) return null;

  if (recipeId) {
    for (const g of tree.groups) {
      const hit = g.recipes?.find((r) => r.recipeId === recipeId);
      if (hit) return hit;
    }
  }

  if (slugParam) {
    const aliases = index.slugAliases?.[lang] ?? {};
    const fullSlug = aliases[slugParam] ?? slugParam;
    for (const g of tree.groups) {
      const hit = g.recipes?.find((r) => r.slug === fullSlug);
      if (hit) return hit;
    }
  }

  return null;
}

function renderScan(lang, scan) {
  if (scan) {
    const src = escapeHtml(scan);
    return `<figure class="recipe-scan__figure"><img src="${src}" alt="" loading="lazy" width="800" height="1067" /></figure>`;
  }
  return `<div class="recipe-scan__placeholder" role="img" aria-label="${escapeHtml(t(lang, "scanPlaceholder"))}"><p>${escapeHtml(t(lang, "scanPlaceholder"))}</p></div>`;
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
