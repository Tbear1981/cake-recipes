import { applyChrome, setDocumentMeta, t, withLang } from "./site.js";

const ABOUT_COVER_SCAN = "originals/bog-forside.jpg";
const ABOUT_LEDGER_SCAN = "originals/drikkepenge-nov-feb.jpg";

const DESKTOP_SCAN_MQ = "(min-width: 768px)";

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

  const coverMount = document.getElementById("about-cover-mount");
  if (coverMount) {
    probeScan(ABOUT_COVER_SCAN, () => {
      coverMount.hidden = false;
      coverMount.replaceChildren(
        buildCoverBlock(lang, ABOUT_COVER_SCAN)
      );
      openScanOnDesktop(coverMount);
    });
  }

  const ledgerEl = document.getElementById("about-ledger");
  if (ledgerEl) {
    ledgerEl.replaceChildren(buildLedgerSection(lang, ABOUT_LEDGER_SCAN));
    openScanOnDesktop(ledgerEl);
  }

  const back = document.getElementById("about-back");
  if (back) {
    back.textContent = t(lang, "aboutBackToRecipes");
    back.href = withLang("/#recipes", lang);
  }
}

function buildCoverBlock(lang, src) {
  const wrap = document.createElement("div");
  wrap.className = "about-cover-block";
  wrap.appendChild(
    buildScanDisclosure(lang, {
      src,
      disclosureKey: "aboutBookDisclosure",
      captionKey: "aboutCoverCaption",
      altKey: "aboutCoverScanAlt",
    })
  );
  return wrap;
}

function buildLedgerSection(lang, src) {
  const section = document.createElement("div");
  section.className = "about-ledger__inner";
  section.innerHTML = `
    <h2 id="about-ledger-heading">${escapeHtml(t(lang, "aboutLedgerTitle"))}</h2>
    <p class="about-ledger__bridge">${escapeHtml(t(lang, "aboutLedgerBridge"))}</p>
  `;
  section.appendChild(
    buildScanDisclosure(lang, {
      src,
      disclosureKey: "aboutLedgerDisclosure",
      captionKey: "aboutLedgerCaption",
      altKey: "aboutLedgerScanAlt",
    })
  );
  return section;
}

function buildScanDisclosure(lang, { src, disclosureKey, captionKey, altKey }) {
  const safeSrc = escapeHtml(src);
  const alt = escapeHtml(t(lang, altKey));
  const caption = escapeHtml(t(lang, captionKey));
  const label = escapeHtml(t(lang, disclosureKey));

  const details = document.createElement("details");
  details.className = "recipe-scan__disclosure about-scan__disclosure";
  details.innerHTML = `
    <summary class="recipe-scan__summary">
      <img class="recipe-scan__thumb" src="${safeSrc}" alt="" width="120" height="160" loading="lazy" decoding="async" />
      <span class="recipe-scan__summary-label">${label}</span>
    </summary>
    <div class="recipe-scan__panel">
      <figure class="recipe-scan__figure">
        <img src="${safeSrc}" alt="${alt}" loading="lazy" width="800" height="1067" decoding="async" />
        <figcaption class="recipe-scan__caption about-scan__caption">${caption}</figcaption>
      </figure>
    </div>
  `;
  return details;
}

function probeScan(src, onReady) {
  const img = new Image();
  img.onload = () => onReady();
  img.onerror = () => {};
  img.src = src;
}

function openScanOnDesktop(root) {
  if (!window.matchMedia(DESKTOP_SCAN_MQ).matches) return;
  for (const el of root.querySelectorAll(".recipe-scan__disclosure")) {
    el.open = true;
  }
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
