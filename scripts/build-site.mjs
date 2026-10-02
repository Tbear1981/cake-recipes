import fs from "fs";
import path from "path";
import { marked } from "marked";
import {
  buildFileToId,
  buildRecipePairs,
  SCAN_BY_ID,
} from "./recipe-ids.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const RECIPES = path.join(ROOT, "recipes");
const SITE = path.join(ROOT, "site");
const CONTENT = path.join(SITE, "content");
const ORIGINALS_SRC = path.join(ROOT, "originals");
const ORIGINALS_DST = path.join(SITE, "originals");

const FILE_TO_ID = buildFileToId();

/** Markdown kept in repo but excluded from the recipe site (see About page). */
const NON_RECIPE_MD = new Set([
  "en/archive/drikkepenge-nov-feb.md",
  "da/historie/drikkepenge-nov-feb.md",
]);

/** @type {Record<string, string>} */
const DISPLAY_TITLES = {
  "da/desserter/fromage/kaernemaelks-fromage.md": "Kærnemælksfromage",
  "en/desserts/fromage/buttermilk-fromage.md": "Buttermilk fromage",
  "da/desserter/budding/alexandra-budding.md": "Alexandra budding",
  "en/desserts/pudding/alexandra-pudding.md": "Alexandra pudding",
};

/** @type {Record<string, { id: string; categoryKey: string }>} */
const TOP_CATEGORY = {
  en: {
    salads: { id: "salads", categoryKey: "categorySalads" },
    cakes: { id: "cakes", categoryKey: "categoryCakes" },
    soups: { id: "soups", categoryKey: "categorySoups" },
    fish: { id: "fish", categoryKey: "categoryFish" },
    sauces: { id: "sauces", categoryKey: "categorySauces" },
    "cold-starters": { id: "cold-starters", categoryKey: "categoryColdStarters" },
    preserves: { id: "preserves", categoryKey: "categoryPreserves" },
    archive: { id: "archive", categoryKey: "categoryArchive" },
  },
  da: {
    salater: { id: "salads", categoryKey: "categorySalads" },
    kager: { id: "cakes", categoryKey: "categoryCakes" },
    supper: { id: "soups", categoryKey: "categorySoups" },
    fisk: { id: "fish", categoryKey: "categoryFish" },
    saucer: { id: "sauces", categoryKey: "categorySauces" },
    "kolde-forretter": { id: "cold-starters", categoryKey: "categoryColdStarters" },
    sylt: { id: "preserves", categoryKey: "categoryPreserves" },
    historie: { id: "archive", categoryKey: "categoryArchive" },
  },
};

/** @type {Record<string, Record<string, { id: string; categoryKey: string }>>} */
const DESSERT_SUB = {
  en: {
    fromage: { id: "fromage", categoryKey: "categoryFromage" },
    pudding: { id: "pudding", categoryKey: "categoryPudding" },
    creme: { id: "creme", categoryKey: "categoryCreme" },
    is: { id: "is", categoryKey: "categoryIs" },
  },
  da: {
    fromage: { id: "fromage", categoryKey: "categoryFromage" },
    budding: { id: "pudding", categoryKey: "categoryPudding" },
    creme: { id: "creme", categoryKey: "categoryCreme" },
    is: { id: "is", categoryKey: "categoryIs" },
  },
};

function resolveCategory(lang, categoryPath) {
  const parts = categoryPath.split("/");
  if (parts.length === 2) {
    const [top, sub] = parts;
    if ((top === "desserts" || top === "desserter") && DESSERT_SUB[lang]?.[sub]) {
      return DESSERT_SUB[lang][sub];
    }
  }
  if (parts.length === 1) {
    return TOP_CATEGORY[lang]?.[parts[0]] ?? null;
  }
  return null;
}

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

function scanForSite(recipeId) {
  const repoPath = SCAN_BY_ID[recipeId];
  if (!repoPath) return null;
  return repoPath.replace(/^originals\//, "originals/");
}

function copyOriginals() {
  fs.mkdirSync(ORIGINALS_DST, { recursive: true });
  if (!fs.existsSync(ORIGINALS_SRC)) return;
  for (const name of fs.readdirSync(ORIGINALS_SRC)) {
    if (!name.toLowerCase().endsWith(".jpg")) continue;
    fs.copyFileSync(path.join(ORIGINALS_SRC, name), path.join(ORIGINALS_DST, name));
  }
}

function buildSlugAliases() {
  /** @type {Record<string, Record<string, string>>} */
  const aliases = { en: {}, da: {} };
  const pairs = buildRecipePairs();
  for (const [recipeId, slugs] of Object.entries(pairs)) {
    aliases.en[recipeId] = slugs.en;
    aliases.da[recipeId] = slugs.da;
    const enBase = slugs.en.split("/").pop();
    const daBase = slugs.da.split("/").pop();
    if (enBase) aliases.en[enBase] = slugs.en;
    if (daBase) aliases.da[daBase] = slugs.da;
  }
  return aliases;
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
    const recipeId = FILE_TO_ID[key];
    if (!recipeId) {
      if (!NON_RECIPE_MD.has(key)) {
        console.warn(`Skip unmapped file (add to recipe-ids.mjs): ${key}`);
      }
      continue;
    }
    const displayTitle = DISPLAY_TITLES[key] ?? parseTitleFromMd(md);
    const parts = relFile.split("/");
    const categoryPath = parts.slice(0, -1).join("/");
    const cat = resolveCategory(lang, categoryPath);
    if (!cat) {
      console.warn(`Skip unknown category path: ${lang}/${categoryPath}`);
      continue;
    }
    const slug = relFile.replace(/\.md$/, "");
    const scan = scanForSite(recipeId);
    const htmlBody = stripLeadingH1(marked.parse(md));
    const outRel = path.join(lang, slug + ".json");
    const outPath = path.join(CONTENT, outRel);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(
      outPath,
      JSON.stringify(
        {
          recipeId,
          slug,
          title: displayTitle,
          categoryId: cat.id,
          categoryKey: cat.categoryKey,
          scan,
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
      recipeId,
      slug,
      title: displayTitle,
      scan,
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
copyOriginals();

const daBuilt = buildLang("da");

const index = {
  recipePairs: buildRecipePairs(),
  slugAliases: buildSlugAliases(),
  en: buildLang("en"),
  da: daBuilt,
  ar: daBuilt,
};

fs.writeFileSync(
  path.join(SITE, "recipes-index.json"),
  JSON.stringify(index, null, 2)
);

function normalizeBasePath(bp) {
  if (!bp || bp === "/") return "";
  let s = String(bp).trim();
  if (!s.startsWith("/")) s = `/${s}`;
  return s.replace(/\/$/, "");
}

const basePath = normalizeBasePath(process.env.BASE_PATH ?? "");
fs.writeFileSync(
  path.join(SITE, "assets", "config.js"),
  `/** Generated by npm run build — do not edit. */\nexport const BASE_PATH = ${JSON.stringify(basePath)};\n`
);

console.log(
  `Wrote site/recipes-index.json, content/*.json, site/assets/config.js (BASE_PATH=${JSON.stringify(basePath)}), and site/originals/*.jpg`
);
