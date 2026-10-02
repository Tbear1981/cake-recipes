# Lise’s Mormor’s Recipes / Lises mormors opskrifter

**English** — Handwritten recipes from **Lise’s mormor** (grandmother), transcribed in Markdown. Each language has its own tree; the static site shows the typed recipe beside a scan of the original page when available.

**Source:** Lise’s mormor

**Dansk** — Håndskrevne opskrifter fra **Lises mormor**, gengivet i Markdown. Hvert sprog har sin egen mappe; sitet viser den indtastede opskrift ved siden af scanningen, når den findes.

**Kilde:** Lises mormor

## Folder layout

```
recipes/
  en/                          da/
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

```bash
npm install
npm run build
npx serve site
```

Use `?lang=da` or `?lang=en` (or the header toggle). Recipe URLs use `recipe.html?lang=da&id=<recipeId>`.

Regenerate after editing Markdown or scans:

```bash
npm run build
```

## License

MIT — see [LICENSE](LICENSE).
