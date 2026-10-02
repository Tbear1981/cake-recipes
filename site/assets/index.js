import {
  aiBylineChipHtml,
  applyChrome,
  setDocumentMeta,
  categoryLabel,
  t,
  withLang,
} from "./site.js";

const CONTRIBUTE_MAIL = "tbj@bona.city";

async function main() {
  const lang = applyChrome("home");
  setDocumentMeta({
    title: t(lang, "siteTitle"),
    description: t(lang, "metaHomeDescription"),
  });
  renderContributeStrip(lang);

  const container = document.getElementById("recipe-groups");
  if (!container) return;

  let index;
  try {
    const res = await fetch("recipes-index.json");
    if (!res.ok) throw new Error("index fetch failed");
    index = await res.json();
  } catch {
    container.innerHTML = emptyBlock(lang);
    return;
  }

  const tree = index[lang];
  if (!tree?.groups?.length) {
    container.innerHTML = emptyBlock(lang);
    return;
  }

  const parts = [];
  for (const group of tree.groups) {
    if (!group.recipes?.length) continue;
    const heading = categoryLabel(lang, group.categoryKey);
    const items = group.recipes
      .map((r) => renderRecipeCard(lang, index, r))
      .join("");
    parts.push(
      `<section class="recipe-group" id="group-${escapeHtml(group.id)}"><h2>${escapeHtml(heading)}</h2><ul class="recipe-list">${items}</ul></section>`
    );
  }

  if (!parts.length) {
    container.innerHTML = emptyBlock(lang);
    return;
  }

  container.innerHTML = parts.join("");
}

function renderContributeStrip(lang) {
  const strip = document.getElementById("contribute-strip");
  if (!strip) return;

  const inviteEl = strip.querySelector("[data-contribute-invite]");
  const mailEl = strip.querySelector("[data-contribute-mail]");
  if (inviteEl) inviteEl.textContent = t(lang, "contributeInvite");
  if (mailEl) {
    mailEl.textContent = t(lang, "contributeMailLabel");
    const subject = encodeURIComponent(t(lang, "contributeMailSubject"));
    mailEl.href = `mailto:${CONTRIBUTE_MAIL}?subject=${subject}`;
  }
}

function siblingCountOnScan(index, lang, scan, recipeId) {
  if (!scan) return 0;
  let n = 0;
  for (const g of index[lang]?.groups ?? []) {
    for (const r of g.recipes ?? []) {
      if (r.scan === scan && r.recipeId !== recipeId) n += 1;
    }
  }
  return n;
}

function renderRecipeCard(lang, index, r) {
  const href = withLang(
    `/recipe?id=${encodeURIComponent(r.recipeId)}`,
    lang
  );
  const title = escapeHtml(r.title);
  const lede = escapeHtml(r.metaDescription ?? "");
  const shared =
    siblingCountOnScan(index, lang, r.scan, r.recipeId) > 0
      ? `<span class="recipe-card__shared">${escapeHtml(t(lang, "homeSamePageHint"))}</span>`
      : "";

  let thumbInner;
  if (r.scan) {
    const src = escapeHtml(r.scan);
    thumbInner = `<img class="recipe-card__thumb" src="${src}" alt="" width="120" height="160" loading="lazy" decoding="async" />`;
  } else {
    thumbInner = `<span class="recipe-card__thumb-placeholder" aria-hidden="true">${escapeHtml(t(lang, "scanPlaceholder"))}</span>`;
  }

  return `<li class="recipe-card">
    <a class="recipe-card__link" href="${escapeHtml(href)}">
      <span class="recipe-card__thumb-wrap">${thumbInner}</span>
      <span class="recipe-card__body">
        <span class="recipe-card__title">${title}</span>
        <span class="recipe-card__ai" role="note">${aiBylineChipHtml(lang, { short: true, inline: true })}</span>
        ${lede ? `<span class="recipe-card__lede">${lede}</span>` : ""}
        ${shared}
      </span>
    </a>
  </li>`;
}

function emptyBlock(lang) {
  return `<div class="empty-state"><h2>${escapeHtml(t(lang, "emptyTitle"))}</h2><p>${escapeHtml(t(lang, "emptyBody"))}</p></div>`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

main();
