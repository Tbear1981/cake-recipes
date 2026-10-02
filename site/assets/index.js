import { applyChrome, setDocumentMeta, categoryLabel, t } from "./site.js";

async function main() {
  const lang = applyChrome("home");
  setDocumentMeta({
    title: t(lang, "siteTitle"),
    description: t(lang, "metaHomeDescription"),
  });

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
      .map((r) => {
        const href = `recipe.html?lang=${encodeURIComponent(lang)}&id=${encodeURIComponent(r.recipeId)}`;
        return `<li><a href="${href}">${escapeHtml(r.title)}</a></li>`;
      })
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
