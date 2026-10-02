# Lise’s Mormor’s Recipes / Lises mormors opskrifter

**English** — Handwritten recipes from **Lise’s mormor** (grandmother), transcribed in Markdown. Each language has its own tree; the static site shows the typed recipe beside a scan of the original page when available.

**Source:** Lise’s mormor

**Dansk** — Håndskrevne opskrifter fra **Lises mormor**, gengivet i Markdown. Hvert sprog har sin egen mappe; sitet viser den indtastede opskrift ved siden af scanningen, når den findes.

**Kilde:** Lises mormor

## Folder layout

```
recipes/
  en/                          da/                          ar/
    salads/                      salater/
    cakes/                       kager/
    soups/                       supper/
    fish/                        fisk/
    sauces/                      saucer/
    cold-starters/               kolde-forretter/
    preserves/                     sylt/
    archive/                       historie/
    desserts/                      desserter/
      fromage/                     fromage/
      pudding/                     budding/
      creme/                       creme/
      is/                          is/
originals/          # scans (see originals/WIRE.md)
site/               # static preview + generated content/
```

| English (`recipes/en/`) | Danish (`recipes/da/`) |
|-------------------------|-------------------------|
| `salads/` | `salater/` |
| `cakes/` | `kager/` |
| `soups/` | `supper/` |
| `fish/` | `fisk/` |
| `sauces/` | `saucer/` |
| `cold-starters/` | `kolde-forretter/` |
| `preserves/` | `sylt/` |
| `archive/` | `historie/` |
| `desserts/fromage/` | `desserter/fromage/` |
| `desserts/pudding/` | `desserter/budding/` |
| `desserts/creme/` | `desserter/creme/` |
| `desserts/is/` | `desserter/is/` |

Cross-language links use stable `recipeId` values in `scripts/recipe-ids.mjs`. Scan paths follow `originals/WIRE.md`.

## Local preview site

After **`git pull`**, from the repo root:

1. **`npm install`**
2. **`npm run build`**
3. **`npx serve site`** — serve the **`site/`** folder, not the repo root. Do not open pages via **`file://`**.

Use `?lang=da`, `?lang=en`, or `?lang=ar` (or the header toggle). In-app links use extensionless paths such as `recipe?lang=da&id=<recipeId>` and `/?lang=da` for home (not `*.html?…`, because `npx serve site` enables cleanUrls and its `.html` → clean URL redirect drops the query string; `/index?…` also redirects to `/` without the query).

Arabic (`ar`) uses the same notebook UI with RTL chrome. Recipe bodies without an Arabic translation show an Editor fallback notice and the Danish original (not English).

### Standalone vs Bona mount

- **Standalone** (repo root or custom host): `npm run build` — `BASE_PATH` is empty; assets and links resolve from the site root.
- **Bona** (`/opskrifter`): `BASE_PATH=/opskrifter npm run build` — writes `site/assets/config.js` so nav, recipes, and `?lang=` links stay under `/opskrifter`.

Regenerate after editing Markdown or scans:

```bash
npm run build
# Bona export:
BASE_PATH=/opskrifter npm run build
```

## License

MIT — see [LICENSE](LICENSE).
