# Git — kako si delimo kodo (postavitev 20 min, potem prihrani ure)
Odločitev 15.09.2026: uvajamo Git. Razlog: Ai popravlja `data/` večkrat na dan in Au oddaja slike, V pa zaradi ročnega objavljanja ne pride do pitcha. Z Gitom se aplikacija objavi sama.

**Nihče ne bo tipkal git ukazov.** Vse gre skozi brskalnik in eno namizno aplikacijo.

## Kaj se spremeni
Zdaj: Ai pošlje datoteko V → V jo vloži → V povleče mapo na Netlify → čez 10 minut je gor.
Potem: Ai shrani spremembo v brskalniku → čez 1 minuto je gor. V ni vmes.

---

# DEL 1 — V (naredi zdaj, 15 min, samo brskalnik)

GitHub Desktop ne rabiš. Vse gre skozi github.com.

## 1.1 Naredi repozitorij
1. Na **github.com** se prijavi (če računa nimaš, ga naredi — 2 minuti).
2. Zgoraj desno **+ → New repository**.
3. Ime: `fishdom-cleaner`. Izberi **Private**. **Ne** dodajaj README, .gitignore ne licence — pusti prazno.
4. **Create repository**.

## 1.2 Naloži projekt
Na strani praznega repozitorija klikni **uploading an existing file**.
V Finderju odpri `Documents/fishdom-cleaner`, označi **vse** (Cmd+A) in povleci v okno brskalnika. Mapa `Claude outputs` naj ostane zunaj — je ne rabimo in je velika.
Spodaj napiši `Fishdom Cleaner - stanje 15.09.2026` → **Commit changes**.

## 1.3 Povabi Ai in Au
Repozitorij → **Settings → Collaborators → Add people** → njuni GitHub uporabniški imeni. Obe sprejmeta povabilo po e-pošti.

## 1.4 Poveži Netlify (to je tisto, kar prihrani čas)
1. Netlify → tvoj site → **Site configuration → Build & deploy → Link repository** → GitHub → `fishdom-cleaner`.
2. Branch: `main`. Build command: **pusti prazno**. Publish directory: **pusti prazno ali `.`**. Functions directory: `netlify/functions`.
3. Deploy.

**Preveri takoj, da site še dela** — odpri `fishdom-cleaner.netlify.app` in fotografiraj smet. Gemini ključ v nastavitvah ostane, a to preveri, ne predpostavljaj.

Če karkoli pade: Netlify → **Deploys** → zadnji dobri deploy → **Publish deploy**. Site je takoj nazaj. Drag-and-drop ostane kot rezerva.

## 1.5 Kako odslej objaviš mojo kodo
Ko popravim kodo na tvojem računalniku, jo naložiš enako kot v koraku 1.2: v repozitoriju **Add file → Upload files**, povlečeš **samo tiste datoteke, ki so se spremenile** (povem ti katere — običajno `index.html`, `style.css`, `js/`, `sw.js`), napišeš eno vrstico in **Commit changes**.

**Pomembno: nikoli ne naloži cele mape naenkrat po tem, ko sta Ai in Au že začeli delati.** Tvoja mapa na računalniku ne vidi njunih sprememb, zato bi jih s tem povozila. Naloži samo datoteke, ki so moje.
Meja je čista: `data/` je Ai, `assets/` je Au, vse ostalo je moje in tvoje. Dokler se je držimo, se ne moremo povoziti.

Če se ti to zdi preveč ročno: **GitHub Desktop** (desktop.github.com, 2 min namestitve) naredi vse to z dvema klikoma in tudi potegne njune spremembe k tebi. Predlagam, da ga naložiš, ko boš imela pet mirnih minut — ne zdaj.

---

# DEL 2 — Ai (5 min, brez namestitve česarkoli)

Ti urejaš datoteke **kar v brskalniku**. Nič ne nalagaš, nič ne tipkaš v terminal.

1. Sprejmi povabilo na GitHub (e-pošta).
2. Odpri repozitorij → mapa `data` → klikni datoteko, npr. `species.js`.
3. Zgoraj desno klikni **svinčnik** (Edit this file).
4. Popravi besedilo. **Samo med narekovaji** — vejic, oklepajev in narekovajev ne brišeš.
5. Zgoraj desno **Commit changes** → v polje napiši kratko, kaj si naredila (npr. `IUCN preverjen za 6 vrst`) → **Commit directly to the main branch** → potrdi.

To je vse. Čez približno minuto je sprememba na `fishdom-cleaner.netlify.app`. V ti ni treba javiti ničesar.

**Preveri, da nisi česa zlomila:** odpri `fishdom-cleaner.netlify.app` na telefonu in poglej, ali še dobiš ribo. Če se aplikacija ne naloži, si najverjetneje pobrisala vejico ali narekovaj — vrni se v GitHub, klikni **History**, poišči svojo zadnjo spremembo in javi V. Nič ni izgubljeno, vsaka različica se hrani.

---

# DEL 3 — Au (5 min)

Ti nalagaš slike, ne urejaš besedila.

1. Sprejmi povabilo na GitHub.
2. Odpri repozitorij → mapa `assets` → `fish`.
3. Zgoraj **Add file → Upload files** → povleci svoje PNG-je notri.
4. Spodaj napiši kratko (npr. `6 rib, prva serija`) → **Commit changes**.
5. Dekoracije gredo v `assets/deco`, ikona `icon-512.png` gre v `assets`.

Imena datotek morajo biti **točno** taka, kot so v tvojih navodilih, sicer jih aplikacija ne najde.
Čez minuto se ribe pokažejo v aplikaciji. Odpri jo na telefonu in poglej, ali izgledajo prav.
Google Drive od zdaj ni več potreben.

---

## Tri pravila, ki preprečijo edino resno težavo

1. **Vsaka se dotika samo svojih datotek.** Ai: `data/`. Au: `assets/`. V in Claude: vse ostalo. Če se dve nikoli ne dotakneta iste datoteke, konflikta ne more biti.
2. **Commitaj majhno in pogosto.** Ena naloga, en commit. Če se kaj polomi, je jasno, kaj ga je.
3. **Nikoli ne commitaj ključev.** Gemini ključ živi samo v Netlify nastavitvah. Če ga kdaj vidiš v datoteki, ne commitaj in javi V takoj.

## Če gre karkoli narobe
Site pade → V v Netlify pod **Deploys** objavi zadnji dobri deploy. Deset sekund in smo nazaj.
Ni panike: vsaka različica vsake datoteke je shranjena in nič se ne more nepovratno izgubiti.
