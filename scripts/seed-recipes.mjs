import fs from "fs";
import path from "path";

const ROOT = path.join(import.meta.dirname, "..", "recipes");

/** @type {Array<{ en: [string, string]; da: [string, string] }>} */
const PAIRS = [
  {
    en: [
      "en/salads/italian-salad-without-oil.md",
      `# Italian salad without oil

A cooked-vegetable salad bound with a glossy, egg-thickened sauce — no oil in the dressing.

## Ingredients

- ½ cup cooked carrots, celery, and peas (diced)
- Sauce: 25 g flour, 2¼ dl milk, 1–2 egg yolks
- Vinegar, ½–¾ tsp mustard, salt, sugar, pepper
- Pickling vinegar (*asieeddike*) optional

## Method

1. Whisk the flour into the milk and bring to a boil, stirring, with the egg yolks until thick. Cool until glossy.
2. Season the sauce with vinegar, mustard, salt, sugar, and pepper (and pickling vinegar if using).
3. Fold in the diced cooked vegetables and serve cold.
`,
    ],
    da: [
      "da/salater/italiensk-salat-uden-olie.md",
      `# Italiensk Salat uden Olie

Kogte grøntsager i en glansende æggefortykket sauce — uden olie i dressingen.

## Ingredienser

- ½ kop kogte gulerødder, selleri og ærter (i tern)
- Sauce: 25 g mel, 2¼ dl mælk, 1–2 æggeblommer
- Eddike, ½–¾ tsk sennep, salt, sukker, peber
- Evt. asieeddike

## Fremgangsmåde

1. Pisk melet i mælken og kog op under omrøring med æggeblommerne, til det tykner. Køl af til en glansende sauce.
2. Smag saucen til med eddike, sennep, salt, sukker og peber (og evt. asieeddike).
3. Vend de kogte grøntsager i saucen og server kold.
`,
    ],
  },
  {
    en: [
      "en/salads/herring-salad.md",
      `# Herring salad

A hearty salad of potatoes, beetroot, and apple with a sweet-sour dressing; herring optional.

## Ingredients

- Cooked potatoes
- Cooked beetroot
- Apples
- Herring in fork-sized pieces, chopped, optional
- Beetroot vinegar, salt, sugar, mustard, pepper
- Without apples: cucumber or pickled gherkins (*asier*) instead

## Method

1. Dice potatoes, beetroot, and apples (or use cucumber/gherkins if omitting apple).
2. Add herring if using.
3. Dress with beetroot vinegar, salt, sugar, mustard, and pepper. Mix and chill before serving.
`,
    ],
    da: [
      "da/salater/sildesalat.md",
      `# Sildesalat

En mættende salat af kartofler, rødbeder og æbler med syrlig dressing; sild kan tilføjes.

## Ingredienser

- Kogte kartofler
- Kogte rødbeder
- Æbler
- Evt. sild i gaffelbidder, hakkes
- Rødbedeeddike, salt, sukker, sennep, peber
- Uden æbler: agurk eller asier i stedet

## Fremgangsmåde

1. Skær kartofler, rødbeder og æbler (eller brug agurk/asier uden æbler).
2. Tilsæt sild hvis den skal med.
3. Vend med rødbedeeddike, salt, sukker, sennep og peber. Rør rundt og server kold.
`,
    ],
  },
  {
    en: [
      "en/cakes/small-egg-white-cookies.md",
      `# Small egg-white cookies

Light, crisp meringue-style cookies baked in small spoonfuls.

## Ingredients

- 60 g butter or margarine
- 60 g icing sugar
- 80 g flour
- 2 egg whites, stiffly whipped
- Coriander seeds optional

## Method

1. Cream butter and icing sugar for about 10 minutes.
2. Work in the flour, then fold in the stiff egg whites.
3. Place teaspoon-sized dollops on a greased baking tray.
4. Bake until lightly golden, about 5 minutes.
5. Sprinkle with coriander seeds if desired.
`,
    ],
    da: [
      "da/kager/smaa-aeggehvidekager.md",
      `# Smaa Æggehvidekager

Lette, sprøde kager bagt i teskefulde.

## Ingredienser

- 60 g smør eller margarine
- 60 g melis
- 80 g mel
- 2 stivepiskede æggehvider
- Evt. korianderfrø

## Fremgangsmåde

1. Pisk smør og melis sammen ca. 10 minutter.
2. Ælt mel i; vend de stive æggehvider i.
3. Sæt teskefulde på en smurt bageplade.
4. Bag til de er let gule, ca. 5 minutter.
5. Drys evt. med korianderfrø.
`,
    ],
  },
  {
    en: [
      "en/cakes/layer-cake.md",
      `# Layer cake

A classic Danish sponge layer cake base (*lagkagebunde*).

*Note: In these notebooks, 1 pd (pund) ≈ 500 g.*

## Ingredients

- ½ pd butter
- ½ pd sugar
- 4 eggs, added one at a time
- ½ pd flour
- 1 tsp baking powder

## Method

1. Cream butter and sugar until light.
2. Beat in the eggs one at a time.
3. Sift flour with baking powder and fold in.
4. Bake in layer-cake tins until done (time not given in the original note).
`,
    ],
    da: [
      "da/kager/lagkage.md",
      `# Lagkage

Klassiske lagkagebunde.

*Bemærk: I notesbøgerne betyder 1 pd (pund) ≈ 500 g.*

## Ingredienser

- ½ pd smør
- ½ pd sukker
- 4 æg, ét ad gangen
- ½ pd mel
- 1 teske bagepulver

## Fremgangsmåde

1. Pisk smør og sukker lyse.
2. Pisk æggene i ét ad gangen.
3. Sigte mel og bagepulver sammen og vend i.
4. Bag i lagkageforme (tiden står ikke i den oprindelige note).
`,
    ],
  },
  {
    en: [
      "en/cakes/marzipan-cake.md",
      `# Marzipan cake

A rich almond cake with marzipan flavour.

*Note: In these notebooks, 1 pd (pund) ≈ 500 g.*

## Ingredients

- ½ pd butter
- 1 pd flour
- ½ pd sugar
- 4 eggs
- 1 tsp baking powder
- Almond essence

## Method

1. Cream butter and sugar; beat in the eggs.
2. Fold in flour, baking powder, and almond essence.
3. Bake until done (time and temperature not given in the original note).
`,
    ],
    da: [
      "da/kager/marcipankage.md",
      `# Marcipankage

En mandelfyldt kage med marcipansmag.

*Bemærk: I notesbøgerne betyder 1 pd (pund) ≈ 500 g.*

## Ingredienser

- ½ pd smør
- 1 pd mel
- ½ pd sukker
- 4 æg
- 1 teske bagepulver
- Mandelessens

## Fremgangsmåde

1. Pisk smør og sukker; pisk æggene i.
2. Vend mel, bagepulver og mandelessens i.
3. Bag færdig (tid og temperatur står ikke i den oprindelige note).
`,
    ],
  },
  {
    en: [
      "en/soups/lemon-soup.md",
      `# Lemon soup

A light lemon broth finished with egg yolks and sugar-browned bread cubes.

## Ingredients

- 1 l water
- Lemon peel
- 20 g potato starch (to thicken)
- 2 egg yolks
- 1–2 tbsp sugar
- Lemon juice
- Bread cubes, browned in sugar

## Method

1. Simmer water with lemon peel. Thicken with potato starch slurry.
2. Off the heat, finish with egg yolks beaten with sugar (liaison); add lemon juice to taste.
3. Serve with sugar-browned bread cubes.
`,
    ],
    da: [
      "da/supper/citron-suppe.md",
      `# Citron Suppe

En let citronsuppe afsluttet med æggeblommer og sukkerbrunede brødtern.

## Ingredienser

- 1 l vand
- Citronskal
- 20 g kartoffelmel (til at tykne)
- 2 æggeblommer
- 1–2 spsk sukker
- Citronsaft
- Brødtern, brunet i sukker

## Fremgangsmåde

1. Kog vand med citronskal. Tyk med kartoffelmel rørt ud i lidt koldt vand.
2. Tag fra varmen; rør æggeblommer pisket med sukker i (liaison); tilsæt citronsaft efter smag.
3. Server med sukkerbrunede brødtern.
`,
    ],
  },
  {
    en: [
      "en/desserts/creme/lemon-cream.md",
      `# Lemon cream

A set lemon cream with wine, gelatin, and whipped cream — half tinted pink for layering.

## Ingredients

- 4 egg yolks
- 200 g sugar
- ¼ l white or fruit wine
- Lemon zest and juice
- 10 gelatin sheets if unmolding; otherwise 5
- ½ l whipped cream

## Method

1. Whisk yolks with sugar; warm with wine over low heat to just before boiling. Cool, stirring.
2. Add lemon zest and juice. Soften gelatin; dissolve into the mixture.
3. Fold in whipped cream; tint half pink. Layer in a mold and chill overnight.
4. Turn out and garnish with fruit and raspberry sauce.
`,
    ],
    da: [
      "da/desserter/creme/citroncreme.md",
      `# Citroncrème

En stivnet citroncrème med vin, husblas og flødeskum — halvdelen farvet lyserød til lag.

## Ingredienser

- 4 æggeblommer
- 200 g sukker
- ¼ l hvidvin eller frugtvin
- Citronskal og saft
- 10 blade husblas hvis den skal vendes ud; ellers 5
- ½ l pisket fløde

## Fremgangsmåde

1. Pisk blommer og sukker; varm med vin over svag varme til lige før kogepunktet. Køl af under omrøring.
2. Tilsæt citronskal og saft. Blødgør husblas og opløs i blandingen.
3. Vend pisket fløde i; farv halvdelen lyserød. Lag i form og sæt på køl natten over.
4. Vend ud og pynt med frugt og hindbærsauce.
`,
    ],
  },
  {
    en: [
      "en/fish/fish-terrine.md",
      `# Fish terrine

A rich fish terrine with cream, broccoli, speck, and herbs.

## Ingredients

- 1½–2 kg fish (e.g. hake; half ling, half cod)
- 3 eggs
- 4 dl cream
- Salt and pepper
- 250 g broccoli
- 1 lemon
- 400 g speck, in flakes
- 2 tbsp chervil
- 1 sprig thyme
- 1 sprig marjoram
- ½ coriander (as noted)
- 1 dl white wine

## Method

[method missing]
`,
    ],
    da: [
      "da/fisk/fisketerrine.md",
      `# Fisketerrine

En fyldig fisketerrine med fløde, broccoli, speck og urter.

## Ingredienser

- 1½–2 kg fisk (lyssej; halvt ising, halvt torsk)
- 3 æg
- 4 dl fløde
- Salt og peber
- 250 g broccoli
- 1 citron
- 400 g speck i flager
- 2 spsk kørvel
- 1 timian
- 1 merian
- ½ koriander (som noteret)
- 1 dl hvidvin

## Fremgangsmåde

[fremgangsmåde mangler]
`,
    ],
  },
  {
    en: [
      "en/sauces/mushroom-sauce.md",
      `# Mushroom sauce

A quick sauce with mushrooms, red wine, and crème fraîche.

## Ingredients

- 250 g mushrooms
- 1 dl red wine
- ½ dl crème fraîche
- Salt and pepper
- 15 g butter

## Method

[method missing]
`,
    ],
    da: [
      "da/saucer/champignonsauce.md",
      `# Champignonsauce

En hurtig sauce med champignon, rødvin og crème fraîche.

## Ingredienser

- 250 g champignon
- 1 dl rødvin
- ½ dl crème fraîche
- Salt og peber
- 15 g smør

## Fremgangsmåde

[fremgangsmåde mangler]
`,
    ],
  },
  {
    en: [
      "en/cold-starters/black-caviar-ring.md",
      `# Black caviar ring

Serves 4. A molded ring of caviar, mayonnaise, and cream — prepared the day before.

## Ingredients

- 1 jar black caviar
- 100 g mayonnaise
- 1 dl whipped cream
- Juice of ½ lemon
- ½ tsp curry
- Salt
- Gelatin sheets (amount not listed in the original note)

## Method

1. Mix mayonnaise with lemon juice, curry, and salt.
2. Soak gelatin, melt, and cool; whisk into the mayonnaise.
3. Fold in caviar and whipped cream.
4. Rinse a ring mold with water; fill and chill overnight.
5. Unmold and serve with shrimp, halved eggs, tomatoes, and warm bread rolls (*flutes*).
`,
    ],
    da: [
      "da/kolde-forretter/sort-kaviar-rand.md",
      `# Sort Kaviar Rand

Til 4 personer. En randform med kaviar, mayonnaise og fløde — laves dagen før.

## Ingredienser

- 1 glas sort kaviar
- 100 g mayonnaise
- 1 dl pisket fløde
- Saft af ½ citron
- ½ teske karry
- Salt
- Husblas (mængde ikke angivet i den oprindelige note)

## Fremgangsmåde

1. Rør mayonnaise med citronsaft, karry og salt.
2. Læg husblas i vand, smelt og køl af; pisk i mayonnaiseen.
3. Vend kaviar og pisket fløde i.
4. Skyl en randform med vand; fyld og sæt på køl natten over.
5. Vend ud og server med rejer, halve æg, tomater og varme flutes.
`,
    ],
  },
  {
    en: [
      "en/cold-starters/avocado-mousse-with-caviar-sauce.md",
      `# Avocado mousse with caviar sauce

Serves 4. From a magazine clipping in the collection (as Maggio described).

## Ingredients

- 4 ripe avocados
- 1 dl cream
- 5 gelatin sheets
- Jelly: ¾ dl lemon juice, ¾ dl chicken stock, 3 gelatin sheets
- Sauce: 4 tbsp mayonnaise, 3 tbsp crème fraîche, 3–4 tbsp light or black caviar, lemon, mustard optional
- Shrimp to garnish

## Method

1. Prepare the lemon–stock jelly with gelatin; set aside to cool.
2. Blend avocados with cream; soften gelatin and fold in; chill the mousse in molds.
3. Mix sauce ingredients; serve mousse with caviar sauce and shrimp as described in the clipping.
`,
    ],
    da: [
      "da/kolde-forretter/avocadomousse-med-kaviarsovs.md",
      `# Avocadomousse med kaviarsovs

Til 4 personer. Fra et magasinklip i samlingen (som Maggio beskrev).

## Ingredienser

- 4 modne avocados
- 1 dl fløde
- 5 blade husblas
- Gelé: ¾ dl citronsaft, ¾ dl hønsekraft, 3 blade husblas
- Sauce: 4 spsk mayonnaise, 3 spsk crème fraîche, 3–4 spsk lys eller sort kaviar, citron, evt. sennep
- Rejer til pynt

## Fremgangsmåde

1. Lav citron–kraft-gelé med husblas; køl af.
2. Blend avocado med fløde; blødgør husblas og vend i; sæt moussen på køl i forme.
3. Rør saucen sammen; server moussen med kaviarsovs og rejer som i klippet.
`,
    ],
  },
  {
    en: [
      "en/desserts/pudding/juice-pudding.md",
      `# Juice pudding

A very sweet set pudding whisked for a long time.

## Ingredients

- 1½ cup juice
- 1½ cup water
- 2 egg whites
- 3 cups sugar
- 5–6 gelatin sheets

## Method

1. Soften gelatin in cold water.
2. Warm juice and water; dissolve gelatin.
3. Whisk with egg whites and sugar for about half an hour until light and thick.
4. Pour into a mold and chill until set.

## Notes

The handwritten page also mentions, without clear connection to the same recipe: Norwegian crispbread (*Norske tvebakker*), ½ kg icing sugar; and separately 4 whole eggs with 6 tsp baking powder — left unclear whether these belong to this pudding.
`,
    ],
    da: [
      "da/desserter/budding/saft-budding.md",
      `# Saft Budding

En meget sød budding, der piskes længe.

## Ingredienser

- 1½ kop saft
- 1½ kop vand
- 2 æggehvider
- 3 kopper sukker
- 5–6 blade husblas

## Fremgangsmåde

1. Læg husblas i koldt vand.
2. Varm saft og vand; opløs husblas.
3. Pisk med æggehvider og sukker ca. en halv time til den er let og tyk.
4. Hæld i form og sæt på køl til den er stivnet.

## Noter

På den håndskrevne side står også, uden klar sammenhæng med samme opskrift: Norske tvebakker, ½ kg flormelis; og for sig 4 hele æg med 6 teskeer bagepulver — uklart om det hører til denne budding.
`,
    ],
  },
  {
    en: [
      "en/preserves/apple-raisin-chutney.md",
      `# Apple–raisin chutney

A spiced preserve with apples, onion, and raisins.

## Ingredients

- 2 kg cooking apples
- 750 g onion
- 4 garlic cloves
- 1 kg dark brown sugar
- 1 tbsp pepper
- 2 tbsp salt
- ½–2 tsp cayenne
- 1 tbsp mustard powder
- 1 tbsp ground ginger
- ¾ l vinegar
- 250 g raisins

## Method

1. Peel, core, and chop the apples; chop onion and garlic.
2. Combine all ingredients and bring to a boil, then simmer on low until thick.
3. Stir in preservative off the heat.
4. Fill warm jars and seal.
`,
    ],
    da: [
      "da/sylt/aeble-rosin-chutney.md",
      `# Æble-rosin-chutney

Et krydret sylt med æbler, løg og rosiner.

## Ingredienser

- 2 kg æbler til madlavning
- 750 g løg
- 4 fed hvidløg
- 1 kg mørkt farin
- 1 spsk peber
- 2 spsk salt
- ½–2 teskeer cayenne
- 1 spsk senneppulver
- 1 spsk ingefærpulver
- ¾ l eddike
- 250 g rosiner

## Fremgangsmåde

1. Skræl, kerne og hak æbler; hak løg og hvidløg.
2. Bland alt og kog op; lad simre på svag varme til det er tykt.
3. Rør konserveringsmiddel i fra varmen.
4. Fyld varme glas og luk.
`,
    ],
  },
  {
    en: [
      "en/cakes/mormors-cake.md",
      `# Mormors kage

A layered cake with cocoa almond filling (title faint in the original notebook).

## Ingredients

**Base**

- 100 g butter
- 150 g flour
- 4 tbsp sugar
- 1 egg yolk

**Filling**

- 75 g butter
- 100 g sugar
- 100 g almonds
- 2 eggs
- 1½ tbsp cocoa

**Top**

- Icing sugar

## Method

1. Rub butter into flour with sugar; bind with yolk. Press into a tin and chill at least 1 hour.
2. Cream butter and sugar for the filling; beat in eggs one by one. Mix in coarsely chopped almonds and cocoa.
3. Spread filling on the base and bake (time and temperature not given in the original note). Dust with icing sugar to serve.
`,
    ],
    da: [
      "da/kager/mormors-kage.md",
      `# Mormors kage

En lagkage med kakao-mandelfyld (titlen er svag i den oprindelige notesbog).

## Ingredienser

**Bund**

- 100 g smør
- 150 g mel
- 4 spsk sukker
- 1 æggeblomme

**Fyld**

- 75 g smør
- 100 g sukker
- 100 g mandler
- 2 æg
- 1½ spsk kakao

**Top**

- Flormelis

## Fremgangsmåde

1. Bland smør i mel med sukker; bind med blomme. Tryk i form og sæt på køl mindst 1 time.
2. Pisk smør og sukker til fyld; pisk æg i ét ad gangen. Rør grofthakkede mandler og kakao i.
3. Fordel fyld på bunden og bag (tid og temperatur står ikke i den oprindelige note). Drys med flormelis til servering.
`,
    ],
  },
  {
    en: [
      "en/desserts/is/parfait.md",
      `# Parfait (ice)

A frozen parfait with nougat, chocolate, and liqueur.

## Ingredients

- 6 egg yolks
- 125 g icing sugar
- 1 l whipped cream
- Crushed nougat
- Grated chocolate
- Liqueur to taste

## Method

1. Whisk yolks with icing sugar until light.
2. Fold in whipped cream, nougat, chocolate, and liqueur.
3. Freeze until firm (timing not given in the original note).
`,
    ],
    da: [
      "da/desserter/is/parfait-is.md",
      `# Parfait (Is)

En frossen parfait med nougat, chokolade og likør.

## Ingredienser

- 6 æggeblommer
- 125 g melis
- 1 l pisket fløde
- Knust nougat
- Reven chokolade
- Likør efter smag

## Fremgangsmåde

1. Pisk blommer og melis lyse.
2. Vend pisket fløde, nougat, chokolade og likør i.
3. Frys til den er fast (tid står ikke i den oprindelige note).
`,
    ],
  },
  {
    en: [
      "en/preserves/green-gooseberries.md",
      `# Green gooseberries

Preserved gooseberries in acidified water.

## Ingredients

- Green gooseberries
- Boiling water
- Preservative
- 10 g citric acid per litre of covering liquid

## Method

1. Rinse gooseberries in cold water, then drain.
2. Cover with boiling water until the colour changes; pack into jars.
3. Cover with boiling water plus preservative and citric acid (10 g per litre).
4. Seal jars.

## Notes

Asparagus can be pickled sweet–sour in the same way as gherkins (*asier*), per the notebook margin.
`,
    ],
    da: [
      "da/sylt/groenne-stikkelsbaer.md",
      `# Grønne Stikkelsbær

Syltede stikkelsbær i syret vand.

## Ingredienser

- Grønne stikkelsbær
- Kogende vand
- Konserveringsmiddel
- 10 g citronsyre pr. liter dækkevæske

## Fremgangsmåde

1. Skyl stikkelsbær i koldt vand og dræn.
2. Hæld kogende vand over til farven skifter; kom i glas.
3. Dæk med kogende vand plus konserveringsmiddel og citronsyre (10 g pr. liter).
4. Luk glassene.

## Noter

Asparges kan syltes syrligt-sødt på samme måde som asier, står der i margen.
`,
    ],
  },
  {
    en: [
      "en/cakes/soda-cake.md",
      `# Soda cake

A sponge cake with potato starch and wheat flour.

## Ingredients

- 75 g butter
- 75 g sugar
- 150 g potato starch
- 150 g wheat flour
- Baking powder (quantity unclear in the original note)
- 1½ dl milk
- 3 eggs
- Spices to taste

## Method

1. Cream butter and sugar.
2. Mix flours with baking powder; beat in eggs.
3. Add milk last and spices.
4. Bake about 50 minutes (temperature not given in the original note).
`,
    ],
    da: [
      "da/kager/sodakage.md",
      `# Sodakage

En sodavandskage med kartoffelmel og hvedemel.

## Ingredienser

- 75 g smør
- 75 g sukker
- 150 g kartoffelmel
- 150 g hvedemel
- Bagepulver (mængde uklar i den oprindelige note)
- 1½ dl mælk
- 3 æg
- Krydderier efter smag

## Fremgangsmåde

1. Pisk smør og sukker.
2. Bland mel med bagepulver; pisk æg i.
3. Tilsæt mælk til sidst og krydderier.
4. Bag ca. 50 minutter (temperatur står ikke i den oprindelige note).
`,
    ],
  },
  {
    en: [
      "en/cakes/syrup-layer-cake.md",
      `# Syrup layer cake

A syrup-rich layer cake (*sirups lagkage*) from sparse notebook notes.

## Ingredients

- 2 cups syrup
- 2 cups sugar
- 2 eggs
- 6 cups wheat flour
- 2 cups cooled boiled water
- 1 tsp baking soda
- 1 tsp hartshorn salt

## Method

1. Combine syrup, sugar, and eggs; work in flour, water, baking soda, and hartshorn salt as for a layer cake batter (exact sequence not fully given in the original note).
2. Bake in layer tins (time and temperature not given).
`,
    ],
    da: [
      "da/kager/sirups-lagkage.md",
      `# Sirups Lagkage

En siruprig lagkage fra sparsomme notes.

## Ingredienser

- 2 kopper sirup
- 2 kopper sukker
- 2 æg
- 6 kopper hvedemel
- 2 kopper afkølet kogt vand
- 1 teske natron
- 1 teske hjortetakssalt

## Fremgangsmåde

1. Bland sirup, sukker og æg; ælt mel, vand, natron og hjortetakssalt som til lagkagedej (rækkefølgen er ikke fuldt angivet i den oprindelige note).
2. Bag i lagkageforme (tid og temperatur står ikke angivet).
`,
    ],
  },
  {
    en: [
      "en/cakes/cocoa-cake.md",
      `# Cocoa cake

A cold biscuit cake set with cocoa and melted shortening.

## Ingredients

- 2 eggs
- 4 tbsp caster sugar
- 4 tbsp cocoa
- 4 tbsp milk
- ½ pack melted Palmin (or similar hard fat)
- ½ pack biscuits

## Method

1. Beat eggs with sugar; stir in cocoa and milk, then the melted fat.
2. Line a tin with paper; layer biscuits with the cocoa mixture.
3. Chill until set (timing not given in the original note).
`,
    ],
    da: [
      "da/kager/cacaokage.md",
      `# Cacaokage

En kold biscuitkage med kakao og smeltet hårdt fedt.

## Ingredienser

- 2 æg
- 4 spsk sukker
- 4 spsk kakao
- 4 spsk mælk
- ½ pakke smeltet palmin
- ½ pakke biscuits

## Fremgangsmåde

1. Pisk æg med sukker; rør kakao og mælk i, derefter det smeltede fedt.
2. Beklæd form med papir; lag biscuits med kakaoblandingen.
3. Sæt på køl til den er stivnet (tid står ikke i den oprindelige note).
`,
    ],
  },
];

for (const pair of PAIRS) {
  for (const [rel, body] of [pair.en, pair.da]) {
    const full = path.join(ROOT, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, body);
  }
}

console.log(`Wrote ${PAIRS.length * 2} recipe files`);
