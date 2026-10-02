import { applyChrome, setDocumentMeta, t } from "./site.js";

/** Drop `originals/bog-forside.jpg` here when the scan is ready (see scripts/recipe-ids.mjs). */
const ABOUT_COVER_SCAN = "originals/bog-forside.jpg";
const ABOUT_LEDGER_SCAN = "originals/drikkepenge-nov-feb.jpg";

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
    bodyEl.innerHTML = paragraphsHtml(lang, "aboutBody");
  }

  const archiveEl = document.getElementById("about-archive");
  if (archiveEl) {
    archiveEl.replaceChildren(
      buildArchiveSection(lang, {
        headingKey: "aboutCoverHeading",
        bodyKey: "aboutCoverBody",
        scanSrc: ABOUT_COVER_SCAN,
        altKey: "aboutCoverScanAlt",
      }),
      buildArchiveSection(lang, {
        headingKey: "aboutArchiveHeading",
        bodyKey: "aboutArchiveBody",
        scanSrc: ABOUT_LEDGER_SCAN,
        altKey: "aboutArchiveScanAlt",
      })
    );
  }
}

function buildArchiveSection(lang, { headingKey, bodyKey, scanSrc, altKey }) {
  const section = document.createElement("section");
  section.className = "about-archive";
  section.innerHTML = `
    <h2>${escapeHtml(t(lang, headingKey))}</h2>
    ${paragraphsHtml(lang, bodyKey)}
    <div class="about-archive__scan"></div>
  `;
  const slot = section.querySelector(".about-archive__scan");
  if (slot) mountScan(slot, lang, scanSrc, altKey);
  return section;
}

function mountScan(slot, lang, src, altKey) {
  const placeholder = () => {
    const label = escapeHtml(t(lang, "scanPlaceholder"));
    slot.innerHTML = `<div class="recipe-scan__placeholder" role="img" aria-label="${label}"><p>${label}</p></div>`;
  };

  const img = new Image();
  img.onload = () => {
    const alt = escapeHtml(t(lang, altKey));
    const safeSrc = escapeHtml(src);
    slot.innerHTML = `<figure class="recipe-scan__figure"><img src="${safeSrc}" alt="${alt}" loading="lazy" width="800" height="1067" decoding="async" /></figure>`;
  };
  img.onerror = placeholder;
  img.src = src;
}

function paragraphsHtml(lang, key) {
  return t(lang, key)
    .split("\n\n")
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("");
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

main();
