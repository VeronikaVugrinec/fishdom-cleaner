# Au — tvoje delo (grafika + deck)
Posodobljeno 15.09.2026. **Najprej preberi `KAKO-DELUJE-APLIKACIJA.md`** — 10 minut. Brez tega ne boš vedela, kje v aplikaciji se tvoje slike sploh pojavijo.

## Kaj je tvoja vloga v celoti
Ti ne pišeš nobene kode. Ampak tisto, kar sodnik vidi v treh sekundah, preden sploh sliši prvi stavek pitcha, je **tvoje delo**. Igra, ki izgleda kot prototip, izgleda kot ideja. Igra, ki izgleda dodelano, izgleda kot podjetje.

Tvoje slike gredo na tri mesta v aplikaciji:
1. **Reveal** — trenutek, ko uporabnik po fotografiranju smeti izve, katero ribo je dobil. Riba je velika sredi zaslona, ob njej kartica s podatki. To je najbolj gledana slika v celi aplikaciji.
2. **Aquarium** — visok akvarij, ki ga uporabnik drsa od gladine do dna. Tu iste ribe plavajo levo-desno, med algami, skalami in koralo, ki jih kupi s krediti. **Zato vse ribe gledajo v levo** — aplikacija jih obrne sama, ko plavajo v desno. Če ena gleda v desno, bo v akvariju obrnjena narobe.
3. **Ikona** — kar uporabnik vidi na domačem zaslonu telefona, ko si aplikacijo doda. Trenutno imamo začasno ikono.

Če slike za neko ribo ni, jo aplikacija **nariše sama** v istih barvah. Zato nič ne blokira in nič ni nujno — zato pa lahko delaš mirno, po vrsti, in ne na silo.

## Rok
- **Danes zvečer:** stil potrjen + 6 rib narejenih.
- **Jutri do 18:00:** ikona, 2 dekoraciji, deck. Potem je koda zamrznjena — kar ni oddano, ne gre notri.

## Orodja (vsa zastonj, brez kartice)
- **Gemini** (gemini.google.com) — generiranje slik. Tu delaš ribe in dekoracije.
- **remove.bg** — če slika ni prozorna, tu odstraniš ozadje.
- **squoosh.app** — stiskanje. Vsaka slika mora biti **pod 40 KB**, ker demo teče na konferenčnem wifiju.
- **Canva (free)** — SAMO deck in poster. **Nikoli za ribe ali dekoracije** — Canva licenca prepoveduje uporabo njihove grafike kot samostojne datoteke v aplikaciji, in ravno tako spletna igra svoje slike servira.

---

## KORAK 1 — stil (10 min, naredi prvo in ne preskoči)
V Gemini prilepi ta prompt in generiraj eno testno ribo:

> Flat vector illustration of a gilt-head bream fish, side view, facing left, simple clean shapes, no outline, limited palette of 8 colors, soft teal and sand tones, transparent background, children's educational app style, no text, no shadow, centered, PNG

Ko ti je ta riba všeč, **tega prompta ne spreminjaj več** — samo zamenjaš ime ribe. Enoten stil dvanajstih povprečnih rib izgleda bolje kot šest čudovitih in šest drugačnih. To je najpogostejša napaka pri grafiki pod časovnim pritiskom.

Prvo ribo pokaži V, preden delaš naprej. Če stil ni pravi, je bolje to izvedeti po eni ribi kot po šestih.

## KORAK 2 — 6 rib (samo teh 6, ne vseh 12)
To so vrste, ki se pojavijo v demo poti na odru. Ostale aplikacija nariše sama.
Shrani **točno s tem imenom**, sicer jih aplikacija ne najde:

| datoteka | riba za prompt | zakaj je v demu |
|---|---|---|
| `sparus-aurata.png` | gilt-head bream | najpogostejša nagrada, prva, ki jo kdo dobi |
| `dicentrarchus-labrax.png` | European seabass | druga začetna vrsta |
| `hippocampus-guttulatus.png` | long-snouted seahorse | nagrada za ribiško opremo — vizualno najbolj všečna |
| `caretta-caretta.png` | loggerhead sea turtle | nagrada za plastično vrečko, najmočnejša zgodba |
| `squatina-squatina.png` | angelshark (flat, ray-like shark) | kritično ogrožena, vrhunec zbirke |
| `anguilla-anguilla.png` | European eel | kritično ogrožena, povezuje morje in celinske vode |

Vse gledajo **v levo**, prozorno ozadje, vsaka **pod 40 KB**.

Če ti ostane čas, nadaljuj po tem vrstnem redu: `sardina-pilchardus.png` (European sardine), `engraulis-encrasicolus.png` (European anchovy), `sciaena-umbra.png` (brown meagre, dark bronze fish), `epinephelus-marginatus.png` (dusky grouper), `thunnus-thynnus.png` (Atlantic bluefin tuna), `mola-mola.png` (ocean sunfish).

## KORAK 3 — ikona aplikacije
Ena kvadratna slika **512×512**, ime `icon-512.png`. Preprosta riba ali školjka v isti paleti, **polno teal ozadje, ne prozorno** (prozorna ikona je na iPhonu črna). Brez besedila — ikona je majhna in besedilo se ne vidi.

## KORAK 4 — 2 dekoraciji
Isti stil, prozorno ozadje, imena točno taka: `alge.png` (algae clump), `korala.png` (coral).
Če ostane čas še: `skala.png` (rock), `trava.png` (seagrass patch).
Te uporabnik kupuje s krediti in jih postavlja v akvarij, zato naj bodo pokončne in ne prevelike.

## KORAK 5 — kam oddaš
Google Drive mapa `grafika`, v njej podmapi `fish` in `deco`. Naložiš vse in javiš V — ona jih vloži in objavi. **Datotek nikoli ne daješ v kodo sama.**
Ne pošiljaj vsake slike posebej. Objavljanje vzame V ~10 minut, zato zberi paket in pošlji naenkrat.

## KORAK 6 — deck (Canva free)
V ti da vsebino v alinejah. Ti narediš **10 slidov** v istih barvah kot aplikacija (teal + pesek):
- največ 6 vrstic na slide, brez odstavkov,
- na vsakem slidu ena slika ali en graf, ne oboje,
- posnetki zaslona aplikacije naj bodo v okvirju telefona — tako je očitno, da gre za pravo aplikacijo, ne za sliko.

## Ko se zatakneš
V napiši **tri stvari**: kaj si poskusila / kaj se je zgodilo / kaj si pričakovala. Nič drugega, ne razlagaj.

---

## Prompt za tvojega Gemini pomočnika (prilepi v nov pogovor)
---
Si moj pomočnik za grafiko na 48-urnem hackathonu INNOVABLUE v Šibeniku (15.–17.09.2026). Odgovarjaj v slovenščini, kratko, po korakih. Datumi dd.mm.yyyy. Nikoli mi ne predlagaj orodij, ki zahtevajo plačilo ali kartico.

KAJ GRADIMO
"Fishdom Cleaner" — mobilna spletna igra za čiščenje obal. Uporabnik na plaži, obali ali v marini pobere kos smeti in ga fotografira v aplikaciji. Aplikacija prepozna vrsto odpadka, zabeleži kraj in čas ter uporabniku podeli jadransko morsko vrsto — na primer sklata, jeguljo ali morskega konjička. Vsaka vrsta prinese kartico s podatki: ime, stopnja ogroženosti po IUCN, prehrana, tipično okolje, velikost. Vrste se zbirajo v osebni zbirki in naseljujejo podvodni akvarij, ki ga uporabnik ureja s krediti, prisluženimi z nadaljnjim pobiranjem smeti.

ZAKAJ — tega ne pozabi
Igra je samo način, kako pridobimo uporabnike. Pravi produkt so podatki: vsako skeniranje ustvari zapis o odpadku s krajem, časom in vrsto materiala, kar občinam in marinam da sliko o tem, kaj se na njihovi obali dejansko nabira. Zato je to rešitev za Temo 1 hackathona ("Smart Monitoring and Digital Tools for Blue Environments"), ne igrica.

EKIPA IN MOJA VLOGA
Smo tri. V je vodja, dela pitch in je edina, ki objavlja aplikacijo. Ai ureja podatke o vrstah in testira. Jaz delam VSO grafiko: 6 rib, ikono aplikacije, 2 dekoraciji in deck v Canvi. Kode ne pišem in je ne razumem. Slike oddam v Google Drive, V jih vloži v aplikacijo.

KJE SE MOJE SLIKE POJAVIJO
1. Reveal — velika riba sredi zaslona v trenutku, ko uporabnik izve, kaj je dobil. Najbolj gledana slika v aplikaciji.
2. Akvarij — visok pokončen akvarij, ki ga uporabnik drsa od gladine do dna; tam iste ribe plavajo med algami in koralo. ZATO VSE RIBE GLEDAJO V LEVO — aplikacija jih obrne sama, ko plavajo v desno.
3. Ikona na domačem zaslonu telefona.

PRAVILA, KI JIH MORAŠ SPOŠTOVATI
- Stil je flat vector, 8 barv, mehki teal in peščeni toni, prozorno ozadje, riba gleda v levo, brez obrobe, besedila in senc. Ko enkrat določiva stil prompta, ga NE spreminjaj — samo zamenjava imena ribe. Enoten stil je pomembnejši od lepote posamezne slike; to je najpogostejša napaka pri grafiki pod časovnim pritiskom.
- Vsaka datoteka mora biti pod 40 KB, ker demo teče na konferenčnem wifiju. Če je prevelika, mi povej, kako jo stisnem na squoosh.app.
- Canva je SAMO za deck in poster, nikoli za ribe ali dekoracije — njihova licenca prepoveduje uporabo grafike kot samostojne datoteke v aplikaciji.
- Ikona mora imeti polno ozadje, ne prozornega, sicer je na iPhonu črna.
- Roki: nocoj stil in 6 rib, jutri 18:00 je vse oddano, 17.09 je pitch.
- Ne predlagaj mi novih funkcionalnosti aplikacije. Nove ideje gredo na roadmap slide.

Začni tako, da me vprašaš, katero ribo delam, in mi vrneš prompt za generiranje slike.
---
