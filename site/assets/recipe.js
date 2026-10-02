import {
  applyChrome,
  setDocumentMeta,
  categoryLabel,
  getLang,
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
  ar: {
    المكونات: "ingredientsHeading",
    الطريقة: "methodHeading",
    ملاحظات: "notesHeading",
  },
};

const ABOUT_LEDGER_RECIPE_ID = "drikkepenge-nov-feb";

async function main() {
  const params = new URLSearchParams(window.location.search);

  const recipeIdParam = params.get("id");
  const slugParam = params.get("slug");
  if (
    recipeIdParam === ABOUT_LEDGER_RECIPE_ID ||
    slugParam === ABOUT_LEDGER_RECIPE_ID ||
    (slugParam && slugParam.includes("drikkepenge"))
  ) {
    const lang = getLang();
    window.location.replace(`${withLang("/about", lang)}#drikkepenge`);
    return;
  }

  let index;
  try {
    const res = await fetch("recipes-index.json");
    if (!res.ok) throw new Error("index fetch failed");
    index = await res.json();
  } catch {
    const lang = applyChrome("recipes");
    showNotFound(lang, document.getElementById("recipe-content"), "index");
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
    back.href = withLang("/#recipes", lang);
  }

  const article = document.getElementById("recipe-content");
  const recipeId = recipeIdParam;

  const entry = findEntry(index, lang, recipeId, slugParam);
  if (!entry) {
    const missing = !recipeId && !slugParam;
    showNotFound(lang, article, missing ? "missing" : "unknown");
    return;
  }

  setLangSwitchContext({
    recipeId: entry.recipeId,
    recipePairs: index.recipePairs,
    slugAliases: index.slugAliases,
  });
  applyChrome("recipes");

  let showArFallback = false;
  let contentPath = entry.contentPath;

  if (lang === "ar" && !entry.contentPath?.startsWith("content/ar/")) {
    showArFallback = true;
    const daEntry = findEntry(index, "da", entry.recipeId, null);
    if (daEntry?.contentPath) contentPath = daEntry.contentPath;
  }

  let data;
  try {
    const res = await fetch(contentPath);
    if (!res.ok) throw new Error("content missing");
    data = await res.json();
  } catch {
    if (lang === "ar" && !showArFallback) {
      showArFallback = true;
      const daEntry = findEntry(index, "da", entry.recipeId, null);
      if (daEntry?.contentPath) {
        try {
          const res = await fetch(daEntry.contentPath);
          if (!res.ok) throw new Error("content missing");
          data = await res.json();
        } catch {
          showNotFound(lang, article);
          return;
        }
      } else {
        showNotFound(lang, article);
        return;
      }
    } else {
      showNotFound(lang, article);
      return;
    }
  }

  if (lang === "ar" && contentPath.startsWith("content/da/")) {
    showArFallback = true;
  }

  const bodyLang = showArFallback ? "da" : lang;
  const scanLang = showArFallback ? "da" : lang;

  const catLabel = categoryLabel(lang, data.categoryKey);
  setDocumentMeta({
    title: `${data.title}${t(lang, "metaRecipeSuffix")}`,
    description: data.metaDescription || t(lang, "tagline"),
  });

  const scanBlock = renderScanBlock(
    scanLang,
    index,
    data.scan,
    data.recipeId,
    data.title
  );

  const fallbackBlock = showArFallback
    ? `<aside class="ar-fallback" role="note">
        <p class="ar-fallback__label">${escapeHtml(t(lang, "arFallbackLabel"))}</p>
        <p class="ar-fallback__notice">${escapeHtml(t(lang, "arFallbackNotice"))}</p>
      </aside>`
    : "";

  const titleAttrs = showArFallback
    ? ' class="recipe-title-ltr" dir="ltr"'
    : lang === "ar"
      ? ' dir="rtl"'
      : "";

  article.innerHTML = `
    <article class="recipe-article">
      <h1${titleAttrs}>${escapeHtml(data.title)}</h1>
      <p class="recipe-meta">${escapeHtml(catLabel)}</p>
      ${fallbackBlock}
      <div class="recipe-layout">
        <div class="recipe-body" dir="${showArFallback ? "ltr" : "auto"}">${localizeHeadings(data.html, lang, bodyLang)}</div>
        <aside class="recipe-scan" aria-labelledby="scan-heading">
          <h2 id="scan-heading" class="recipe-scan__title">${escapeHtml(t(lang, "scanHeading"))}</h2>
          ${scanBlock}
        </aside>
      </div>
    </article>
  `;

  const disclosure = article.querySelector(".recipe-scan__disclosure");
  if (disclosure && window.matchMedia("(min-width: 768px)").matches) {
    disclosure.open = true;
  }
}

function findEntry(index, lang, recipeId, slugParam) {
  const tree = index[lang];
  if (!tree?.groups) return null;

  const aliases = index.slugAliases?.[lang] ?? {};

  if (recipeId) {
    for (const g of tree.groups) {
      const hit = g.recipes?.find((r) => r.recipeId === recipeId);
      if (hit) return hit;
    }
    const byIdAsSlug = findByFullSlug(tree, aliases[recipeId] ?? recipeId);
    if (byIdAsSlug) return byIdAsSlug;
  }

  if (slugParam) {
    const fullSlug = aliases[slugParam] ?? slugParam;
    return findByFullSlug(tree, fullSlug);
  }

  return null;
}

function findByFullSlug(tree, fullSlug) {
  for (const g of tree.groups) {
    const hit = g.recipes?.find((r) => r.slug === fullSlug);
    if (hit) return hit;
  }
  return null;
}

function siblingTitlesOnScan(index, lang, scan, recipeId) {
  if (!scan) return [];
  const titles = [];
  for (const g of index[lang]?.groups ?? []) {
    for (const r of g.recipes ?? []) {
      if (r.scan === scan && r.recipeId !== recipeId) {
        titles.push(r.title);
      }
    }
  }
  return titles.sort((a, b) => a.localeCompare(b));
}

function formatSharedCaption(lang, names) {
  if (!names.length) return "";
  const copy = [...names];
  if (lang === "da") {
    if (copy.length === 1) return `Samme notesbogsside som ${copy[0]}.`;
    if (copy.length === 2) return `Samme notesbogsside som ${copy[0]} og ${copy[1]}.`;
    const last = copy.pop();
    return `Samme notesbogsside som ${copy.join(", ")} og ${last}.`;
  }
  if (copy.length === 1) return `Same notebook page as ${copy[0]}.`;
  if (copy.length === 2) return `Same notebook page as ${copy[0]} and ${copy[1]}.`;
  const last = copy.pop();
  return `Same notebook page as ${copy.join(", ")} and ${last}.`;
}

function buildScanAlt(lang, title, siblingTitles) {
  const base =
    lang === "da"
      ? `Håndskrevet side: ${title}`
      : lang === "ar"
        ? `صفحة مكتوبة بخط اليد: ${title}`
        : `Handwritten page: ${title}`;
  if (!siblingTitles.length) return base;
  const also =
    lang === "da"
      ? ` — notesiden viser også ${siblingTitles.join(", ")}`
      : lang === "ar"
        ? ` — الصفحة تُظهر أيضًا ${siblingTitles.join("، ")}`
        : ` — page also shows ${siblingTitles.join(", ")}`;
  return base + also;
}

function renderScanBlock(lang, index, scan, recipeId, title) {
  if (!scan) {
    return `<div class="recipe-scan__placeholder" role="img" aria-label="${escapeHtml(t(lang, "scanPlaceholder"))}"><p>${escapeHtml(t(lang, "scanPlaceholder"))}</p></div>`;
  }

  const src = escapeHtml(scan);
  const siblings = siblingTitlesOnScan(index, lang, scan, recipeId);
  const alt = escapeHtml(buildScanAlt(lang, title, siblings));
  const caption = siblings.length
    ? `<p class="recipe-scan__shared">${escapeHtml(formatSharedCaption(lang, siblings))}</p>`
    : "";

  return `
    <details class="recipe-scan__disclosure">
      <summary class="recipe-scan__summary">
        <img class="recipe-scan__thumb" src="${src}" alt="" width="120" height="160" loading="lazy" decoding="async" />
        <span class="recipe-scan__summary-label">${escapeHtml(t(lang, "scanDisclosure"))}</span>
      </summary>
      <div class="recipe-scan__panel">
        ${caption}
        <figure class="recipe-scan__figure">
          <img src="${src}" alt="${alt}" loading="lazy" width="800" height="1067" decoding="async" />
        </figure>
      </div>
    </details>
  `;
}

function localizeHeadings(html, displayLang, bodyLang = displayLang) {
  const map = HEADING_MAP[bodyLang] ?? HEADING_MAP.da;
  return html.replace(/<h2>([^<]+)<\/h2>/gi, (_, text) => {
    const key = map[text.trim()];
    const label = key ? t(displayLang, key) : text.trim();
    return `<h2>${escapeHtml(label)}</h2>`;
  });
}

function showNotFound(lang, article, reason = "unknown") {
  const bodyKey =
    reason === "missing"
      ? "notFoundMissingBody"
      : reason === "index"
        ? "notFoundIndexBody"
        : "notFoundBody";
  const body = t(lang, bodyKey);
  setDocumentMeta({
    title: `${t(lang, "notFoundTitle")}${t(lang, "metaRecipeSuffix")}`,
    description: body,
  });
  if (article) {
    article.innerHTML = `<div class="not-found"><h2>${escapeHtml(t(lang, "notFoundTitle"))}</h2><p>${escapeHtml(body)}</p></div>`;
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
