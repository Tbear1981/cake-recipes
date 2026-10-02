import { applyChrome, setDocumentMeta, t } from "./site.js";

function main() {
  const lang = applyChrome("about");
  setDocumentMeta({
    title: `${t(lang, "aboutTitle")}${t(lang, "metaRecipeSuffix")}`,
    description: t(lang, "aboutMetaDescription"),
  });

  const titleEl = document.getElementById("about-title");
  const bodyEl = document.getElementById("about-body");
  if (titleEl) titleEl.textContent = t(lang, "aboutTitle");
  if (bodyEl) {
    bodyEl.innerHTML = t(lang, "aboutBody")
      .split("\n\n")
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("");
  }

  const archiveEl = document.getElementById("about-archive");
  if (archiveEl) {
    const scan = "originals/drikkepenge-nov-feb.jpg";
    const alt = escapeHtml(t(lang, "aboutArchiveScanAlt"));
    const body = t(lang, "aboutArchiveBody")
      .split("\n\n")
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("");
    archiveEl.innerHTML = `
      <h2 id="about-archive-heading">${escapeHtml(t(lang, "aboutArchiveHeading"))}</h2>
      ${body}
      <figure class="recipe-scan__figure">
        <img src="${scan}" alt="${alt}" loading="lazy" width="800" height="1067" decoding="async" />
      </figure>
    `;
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
