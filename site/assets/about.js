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
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

main();
