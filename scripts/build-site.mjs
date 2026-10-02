import fs from "fs";
import path from "path";
import { marked } from "marked";

const ROOT = path.resolve(import.meta.dirname, "..");
const RECIPES = path.join(ROOT, "recipes");
const SITE = path.join(ROOT, "site");
const CONTENT = path.join(SITE, "content");

/** @type {Record<string, string>} */
const DISPLAY_TITLES = {
  "da/desserter/fromage/kaernemaelks-fromage.md": "Kærnemælksfromage",
  "en/desserts/fromage/buttermilk-fromage.md": "Buttermilk fromage",
  "da/desserter/budding/alexandra-budding.md": "Alexandra budding",
  "en/desserts/pudding/alexandra-pudding.md": "Alexandra pudding",
};

/** @type {Record<string, { id: string; categoryKey: string }>} */
const CATEGORY_MAP = {
  "desserts/fromage": { id: "fromage", categoryKey: "categoryFromage" },
  "desserts/pudding": { id: "pudding", categoryKey: "categoryPudding" },
  "desserter/fromage": { id: "fromage", categoryKey: "categoryFromage" },
  "desserter/budding": { id: "budding", categoryKey: "categoryPudding" },
};

function walkMd(dir, base = "") {
  /** @type {string[]} */
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const rel = base ? `${base}/${name}` : name;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      out.push(...walkMd(full, rel));
    } else if (name.endsWith(".md")) {
      out.push(rel);
    }
  }
  return out;
}

function parseTitleFromMd(md) {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : "Recipe";
}

function excerptFromMd(md) {
  const lines = md.split("\n");
  for (const line of lines) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    return t.replace(/\*([^*]+)\*/g, "$1");
  }
  return "";
}

function stripLeadingH1(html) {
  return html.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, "");
}

function buildLang(lang) {
  const langDir = path.join(RECIPES, lang);
  const files = walkMd(langDir);
  /** @type {Map<string, { categoryKey: string; recipes: object[] }>} */
  const groups = new Map();

  for (const relFile of files.sort()) {
    const fullPath = path.join(langDir, relFile);
    const md = fs.readFileSync(fullPath, "utf8");
    const key = `${lang}/${relFile}`;
    const displayTitle = DISPLAY_TITLES[key] ?? parseTitleFromMd(md);
    const parts = relFile.split("/");
    const categoryPath = parts.slice(0, -1).join("/");
    const cat = CATEGORY_MAP[categoryPath];
    if (!cat) {
      console.warn(`Skip unknown category path: ${lang}/${categoryPath}`);
      continue;
    }
    const slug = relFile.replace(/\.md$/, "");
    const htmlBody = stripLeadingH1(marked.parse(md));
    const outRel = path.join(lang, slug + ".json");
    const outPath = path.join(CONTENT, outRel);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(
      outPath,
      JSON.stringify(
        {
          slug,
          title: displayTitle,
          categoryId: cat.id,
          categoryKey: cat.categoryKey,
          html: htmlBody,
          metaDescription: excerptFromMd(md),
        },
        null,
        2
      )
    );

    if (!groups.has(cat.id)) {
      groups.set(cat.id, { categoryKey: cat.categoryKey, recipes: [] });
    }
    groups.get(cat.id).recipes.push({
      slug,
      title: displayTitle,
      contentPath: `content/${outRel.replace(/\\/g, "/")}`,
    });
  }

  const groupList = [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, g]) => ({
      id,
      categoryKey: g.categoryKey,
      recipes: g.recipes.sort((a, b) => a.title.localeCompare(b.title)),
    }));

  return { lang, groups: groupList };
}

fs.mkdirSync(CONTENT, { recursive: true });
const index = {
  en: buildLang("en"),
  da: buildLang("da"),
};
fs.writeFileSync(
  path.join(SITE, "recipes-index.json"),
  JSON.stringify(index, null, 2)
);
console.log("Wrote site/recipes-index.json and content/*.json");
