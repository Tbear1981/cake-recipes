# Lise’s Mormor’s Recipes / Lises mormors opskrifter

**English** — Handwritten recipes from **Lise’s mormor** (grandmother), transcribed in Markdown. Recipes are grouped by category; each language has its own tree with parallel folders.

**Source:** Lise’s mormor

**Dansk** — Håndskrevne opskrifter fra **Lises mormor**, gengivet i Markdown. Opskrifterne er grupperet efter kategori; hvert sprog har sin egen mappe med tilsvarende undermapper.

**Kilde:** Lises mormor

## Folder layout

Parallel language trees: top level is `en/` and `da/`, then category groups with English names under `en/` and Danish names under `da/`.

```
recipes/
  en/
    desserts/
      fromage/
      pudding/
  da/
    desserter/
      fromage/
      budding/
```

| English (`recipes/en/`) | Danish (`recipes/da/`) |
|-------------------------|-------------------------|
| `desserts/fromage/`     | `desserter/fromage/`    |
| `desserts/pudding/`     | `desserter/budding/`    |

## Recipes

| English | Danish |
|---------|--------|
| [Buttermilk fromage](recipes/en/desserts/fromage/buttermilk-fromage.md) | [Kærnemælks fromage](recipes/da/desserter/fromage/kaernemaelks-fromage.md) |
| [Alexandra pudding](recipes/en/desserts/pudding/alexandra-pudding.md) | [Alexandra budding](recipes/da/desserter/budding/alexandra-budding.md) |

## Local preview site

Static preview under `site/`. Recipe content is generated from the Markdown tree into `site/recipes-index.json` and `site/content/`.

From the repository root:

```bash
npm install
npm run build
npx serve site
```

Or with Python:

```bash
npm run build
python3 -m http.server 8080 --directory site
```

Open **http://127.0.0.1:3000** when using `npx serve site` (default port), or **http://127.0.0.1:8080** with the Python command above. Use `?lang=da` or `?lang=en` (or the header toggle) to switch language.

Regenerate after editing recipe Markdown:

```bash
npm run build
```

## License

MIT — see [LICENSE](LICENSE).
