# Fishdom Cleaner — kako aplikacija deluje (preberita obe, 10 minut)
Stanje 15.09.2026. Ta dokument je skupen. Vajini nalogi sta v ločenih datotekah.

## 1. Kaj gradimo in zakaj
Mobilna spletna igra za čiščenje obal. Uporabnik na plaži, obali ali v marini pobere kos smeti, ga fotografira v aplikaciji, aplikacija prepozna vrsto odpadka, zabeleži kraj in čas — in mu za nagrado podeli **jadransko morsko vrsto** v zbirko.

**Igra je način, kako pridobimo uporabnike. Pravi produkt so podatki.**
Vsako skeniranje poleg nagrade ustvari zapis: kraj, čas, vrsta materiala. Občina, marina ali upravljavec plaže dobi sliko o tem, kaj se na njegovi obali dejansko nabira. Danes to merijo strokovnjaki nekajkrat na leto; prostovoljno pobiranje smeti pa ni nikjer zabeleženo. Ti dve stvari povezujemo.

To je razlog, zakaj smo v Temi 1 hackathona ("Smart Monitoring and Digital Tools for Blue Environments") in ne v kategoriji "še ena igrica". Če kdo od naju v pitchu ali v delu zdrsne nazaj v "to je igrica", smo izgubili.

## 2. Kaj uporabnik vidi — pet zaslonov
Vse je **pokončno** (portrait), ker je to telefon.

1. **Scan** — velik gumb, odpre kamero. Fotografiraš smet, ki si jo pobral.
2. **Reveal** — nekaj sekund napetosti, nato se pokaže riba, ki si jo dobil, s kartico: ime, latinsko ime, IUCN status ogroženosti, prehrana, tipično okolje, največja velikost, in en stavek, ki pove, kako prav ta odpadek prizadene prav to vrsto.
3. **Collection** — tvoja zbirka vrst, ena za drugo, listaš vstran.
4. **Aquarium** — visok akvarij, ki ga drsaš od gladine do dna. Tu plavajo ribe, ki si jih dobil. S krediti kupuješ alge, skale, morsko travo in koralo.
5. **Impact** — občinski zaslon. Koliko kosov, katerih materialov, kje in kdaj. To je zaslon, ki prodaja.

## 3. Kaj se zgodi ob enem skeniranju — korak za korakom
1. Uporabnik pritisne gumb → odpre se kamera telefona.
2. Fotografija se **pomanjša na 384 px** in pošlje na naš strežnik (Netlify funkcija `scan.js`).
3. Ta jo pošlje **Gemini** modelu z vprašanjem: je na sliki odpadek, za kateri material gre, je to zunaj.
4. Hkrati telefon prebere **GPS** lokacijo.
5. Aplikacija preveri **štiri stvari** (`js/verify.js`):
   - je na sliki res odpadek,
   - je fotografija nastala zunaj,
   - je GPS znotraj registrirane cone čiščenja (`data/zones.js`),
   - ni to ista fotografija kot že prej (primerja "prstni odtis" slike).
6. Vrsta materiala določi **bazen vrst**, iz katerega se podeli riba (`data/litter-map.js` → `pool`). Nikoli ni čisto naključno — ribiška vrvica da morskega konjička ali želvo, plastenka da sardelo. To je vsebinska povezava in sodniki jo bodo opazili.
7. Uporabnik dobi ribo, kredite in točke (xp). Točke dvigujejo level, višji level odklene redkejše vrste.
8. Zapis o odpadku gre v bazo za občinski zaslon.

**Če katerikoli od štirih preverkov pade, ribo vseeno dobi** — samo kreditov je manj in zapis je označen kot nepreverjen. To je namerno: varujemo podatke, ne igre.

**Če internet pade ali Gemini ne odgovori**, se odpre ročni izbirnik materiala. Demo ne sme nikoli umreti zaradi omrežja.

## 4. Kako je sestavljena koda — kdo se česa dotika
```
index.html            zaslon in ogrodje          → Claude (prek V)
style.css             izgled                     → Claude (prek V)
js/app.js             glavna logika              → Claude (prek V)
js/fish.js            plavanje rib               → Claude (prek V)
js/verify.js          štirje preverki            → Claude (prek V)
netlify/functions/    pogovor z Gemini           → Claude (prek V)

data/species.js       12 vrst + kartice          → Ai
data/litter-map.js    material → vrsta + viri    → Ai
data/zones.js         GPS cone čiščenja          → Ai

assets/fish/*.png     slike rib                  → Au
assets/deco/*.png     dekoracije                 → Au
assets/icon-512.png   ikona aplikacije           → Au
```
Datoteke v `data/` so **navadna besedila s seznami** — ne programi. Urejaš jih tako, da zamenjaš besedilo med narekovaji. Ne brišeš vejic, oklepajev in narekovajev.

Če slike za ribo ni, jo aplikacija nariše sama. Zato nič ne blokira: grafika lahko pride kadarkoli.

## 5. Kako pride delo v aplikacijo
**V je edina, ki objavlja.** Ona povleče mapo na Netlify in v nekaj sekundah je nova različica na `fishdom-cleaner.netlify.app`.

- **Ai** shrani spremenjeno datoteko iz `data/` in jo pošlje V (Drive ali direktno na njen računalnik).
- **Au** naloži slike v Drive mapo `grafika/fish` in `grafika/deco` in javi V.
- V ju vloži in objavi. Objavljanje traja ~10 minut, zato ne pošiljata vsake spremembe posebej — zberita jih in pošljita v paketu.

**Ali bi uporabile Git?** Ne danes. Git bi res pomenil, da Ai objavlja sama, brez V — ampak postavitev repozitorija, povezava z Netlify in učenje ukazov je pol dneva, ki ga nimamo, konflikti med tremi ljudmi pa so ravno tista napaka, ki nam lahko ubije demo. Če pride do tega, da Ai popravlja `data/` več kot petkrat na dan in V zaradi tega ne uspe delati pitcha, se vrnemo k temu — takrat naredimo GitHub repo in Ai ureja datoteke kar v brskalniku, brez ukazov. Odločitev 15.09.2026: brez Gita.

## 6. Trije roki
- **danes zvečer** — IUCN vseh 12 vrst preverjen, GPS cone prave, stil grafike potrjen.
- **jutri 18:00** — koda zamrznjena. Kar ni oddano do takrat, ne gre notri.
- **17.09** — pitch.

## 7. Ena pot, ki ne sme nikoli pasti
**Fotografiraš smet → dobiš ribo s kartico → riba je v zbirki → riba plava v akvariju.**
Vse ostalo je drugotno. Če katerakoli od teh štirih stvari ne dela, je to najvišja prioriteta cele ekipe in se javi takoj.

## 8. Rezervna pot za oder
Če na odru pade wifi: aplikacija se odpre z `?demo=1` na koncu naslova in deluje brez interneta, vsi preverki so označeni kot uspešni. To preizkusimo pred vsako vajo.

## 9. Kaj nikoli
- Gemini ključ nikoli ne gre v datoteko, v sporočilo ali kamorkoli drugam. Živi samo v Netlify nastavitvah.
- Canva grafika nikoli ne gre v aplikacijo kot slika ribe — njihova licenca to prepoveduje. Canva je samo za deck in poster.
- Nobena vrsta z `verify: true` ne sme v pitch.
- Nobena trditev o odpadkih brez vira.
- Nove ideje gredo na slide "roadmap", ne v kodo.
