# Au — tvoje delo (videz aplikacije + grafika + deck)
Posodobljeno 15.09.2026. **Najprej preberi `KAKO-DELUJE-APLIKACIJA.md` in `GIT-KAKO-DELIMO-KODO.md`.**

## Tvoja vloga
Tisto, kar sodnik vidi v treh sekundah, preden sliši prvi stavek pitcha, je tvoje delo. Igra, ki izgleda kot prototip, izgleda kot ideja. Igra, ki izgleda dodelano, izgleda kot podjetje.

Od zdaj ne delaš samo slik — **imaš ves videz aplikacije**. Barve, tipografija, razmiki, gumbi, kako izgleda kartica z ribo, kako izgleda akvarij. To je `style.css` in je v celoti tvoj.

## Tvoje datoteke (nobene druge se ne dotikaj)
| datoteka | kaj je |
|---|---|
| `style.css` | ves videz aplikacije |
| `assets/fish/*.png` | ribe |
| `assets/deco/*.png` | dekoracije |
| `assets/icon-512.png` | ikona na domačem zaslonu |

`index.html` **ni** tvoj — če rabiš nov element ali drugo strukturo, napiši V in Claude to naredi v nekaj minutah. Ti pa ga potem poljubno oblikuješ.

## Orodja (vsa zastonj)
- **VS Code + GitHub Copilot, brezplačni paket** — v VS Code klikni ikono Copilot → Sign in with GitHub. Pri CSS je izjemno uporaben: napišeš v komentar, kaj hočeš, in ti predlaga kodo. Kot študentka lahko prek **GitHub Student Developer Pack** dobiš Copilot Pro zastonj, a vloga traja nekaj dni — danes uporabi brezplačni paket.
- **Gemini Gem** (gemini.google.com) — generiranje slik in razlaga CSS. Prompt je na dnu.
- **remove.bg** — odstranjevanje ozadja.
- **squoosh.app** — stiskanje. Vsaka slika **pod 40 KB**.
- **Canva (free)** — SAMO deck in poster. **Nikoli za ribe ali dekoracije** — njihova licenca prepoveduje uporabo grafike kot samostojne datoteke v aplikaciji, in ravno tako spletna igra svoje slike servira.

## Vrstni red

### DANES
**1. Stil grafike (10 min, prvo).** V Gemini prilepi:

> Flat vector illustration of a gilt-head bream fish, side view, facing left, simple clean shapes, no outline, limited palette of 8 colors, soft teal and sand tones, transparent background, children's educational app style, no text, no shadow, centered, PNG

Ko ti je ta riba všeč, **prompta ne spreminjaj več** — samo zamenjaš ime ribe. Enoten stil 12 povprečnih rib izgleda bolje kot 6 čudovitih in 6 drugačnih. Prvo ribo pokaži V, preden delaš naprej.

**2. Šest rib.** Imena morajo biti točno taka, sicer jih aplikacija ne najde:

| datoteka | riba za prompt | zakaj je v demu |
|---|---|---|
| `sparus-aurata.png` | gilt-head bream | prva nagrada, ki jo kdo dobi |
| `dicentrarchus-labrax.png` | European seabass | druga začetna vrsta |
| `hippocampus-guttulatus.png` | long-snouted seahorse | nagrada za ribiško opremo |
| `caretta-caretta.png` | loggerhead sea turtle | nagrada za plastično vrečko, najmočnejša zgodba |
| `squatina-squatina.png` | angelshark (flat, ray-like shark) | kritično ogrožena, vrhunec zbirke |
| `anguilla-anguilla.png` | European eel | povezuje morje in celinske vode |

Vse gledajo **v levo** (aplikacija jih obrne sama, ko plavajo v desno), prozorno ozadje, pod 40 KB.

Če ostane čas: `sardina-pilchardus`, `engraulis-encrasicolus`, `sciaena-umbra`, `epinephelus-marginatus`, `thunnus-thynnus`, `mola-mola`. Ribe brez slike aplikacija nariše sama — nič ne blokira.

**3. Ikona.** `assets/icon-512.png`, 512×512, **polno teal ozadje, ne prozorno** (prozorna ikona je na iPhonu črna), brez besedila.

### JUTRI
**4. Videz aplikacije (`style.css`) — to je tvoj največji kos.**
Po vrsti, od najbolj do najmanj vidnega:
- **Reveal** — trenutek, ko se pokaže riba. Velika riba sredi zaslona, pod njo kartica. To je najbolj gledani zaslon; naj bo svečan, ne informativen.
- **Akvarij** — pokončen, drsa se od gladine do dna. Barva vode naj se s globino temni.
- **Zbirka** — kartice ena za drugo, listaš vstran.
- **Občinski zaslon** — tu je pravilo obratno: resno, pregledno, brez okraskov. Ta zaslon mora izgledati kot orodje, ne kot igra. Če izgleda igrivo, sodnik ne verjame, da je produkt.
- Vse mora delati **na telefonu pokončno**. Preveri na pravem telefonu, ne v brskalniku na računalniku.

**5. Dekoracije.** `assets/deco/alge.png`, `korala.png`, po možnosti še `skala.png`, `trava.png`. Prozorno ozadje, isti stil.

**6. Deck v Canvi.** V ti da vsebino v alinejah. 10 slidov, iste barve kot aplikacija, največ 6 vrstic na slide, brez odstavkov, ena slika na slide. Posnetke aplikacije daj v okvir telefona.

## Ko se zatakneš
Najprej vprašaj svojega Gema. Šele če ne gre, napiši V **tri stvari**: kaj si poskusila / kaj se je zgodilo / kaj si pričakovala.

---

## Prompt za tvojega Gemini pomočnika (Gems → New Gem → Instructions)

Si moj pomočnik za videz in grafiko na 48-urnem hackathonu INNOVABLUE v Šibeniku (15.–17.09.2026). Odgovarjaj v slovenščini, kratko, po korakih. Datumi dd.mm.yyyy. Nikoli mi ne predlagaj orodij, ki zahtevajo plačilo ali kartico.

KAJ GRADIMO
"Fishdom Cleaner" — mobilna spletna igra za čiščenje obal. Uporabnik na plaži, obali ali v marini pobere kos smeti in ga fotografira v aplikaciji. Aplikacija prepozna vrsto odpadka, zabeleži kraj in čas ter mu podeli jadransko morsko vrsto — sklata, jeguljo, morskega konjička. Vsaka vrsta prinese kartico s podatki: ime, IUCN status ogroženosti, prehrana, tipično okolje, velikost. Vrste se zbirajo v zbirki in naseljujejo pokončen podvodni akvarij, ki ga uporabnik ureja s krediti. Pet nivojev odklepa redkejše vrste.

ZAKAJ
Igra je samo način, kako pridobimo uporabnike. Pravi produkt so podatki: vsako skeniranje ustvari zapis o odpadku s krajem, časom in vrsto materiala, kar občinam in marinam da sliko o tem, kaj se na njihovi obali nabira. Zato je to rešitev za Temo 1 hackathona ("Smart Monitoring and Digital Tools for Blue Environments"), ne igrica.

PET ZASLONOV, KI JIH OBLIKUJEM
1. Scan — velik gumb, odpre kamero telefona.
2. Reveal — velika riba sredi zaslona in kartica s podatki. Najbolj gledan zaslon v aplikaciji, naj bo svečan.
3. Zbirka — kartice, listaš vstran.
4. Akvarij — POKONČEN, drsa se od gladine do dna, ribe plavajo med algami in koralo. Zato vse ribe gledajo v levo; aplikacija jih obrne sama.
5. Občinski zaslon — resen, pregleden, brez okraskov. Mora izgledati kot orodje, ne kot igra.
Vse je pokončno, ker je to telefon.

MOJA VLOGA IN MOJE DATOTEKE
Sem ena od treh. V je vodja in dela pitch. Ai dela podatke in preverjanje. Jaz imam ves videz. Urejam SAMO: style.css in mape assets (ribe, dekoracije, ikona). index.html ni moj — če rabim nov element v strukturi, to naročim naprej. Delam v VS Code in terminalu, spremembe pushnem na GitHub in se same objavijo.

PRAVILA, KI JIH MORAŠ SPOŠTOVATI
- Stil grafike je flat vector, 8 barv, mehki teal in peščeni toni, prozorno ozadje, riba gleda v levo, brez obrobe, besedila in senc. Ko določiva prompt, ga NE spreminjaj — samo zamenjava imena ribe. Enoten stil je pomembnejši od lepote posamezne slike.
- Vsaka slika pod 40 KB (demo teče na konferenčnem wifiju). Če je prevelika, mi povej, kako jo stisnem na squoosh.app.
- Ikona mora imeti polno ozadje, ne prozornega, sicer je na iPhonu črna.
- Canva je samo za deck in poster, nikoli za ribe ali dekoracije — licenca prepoveduje uporabo njihove grafike kot samostojne datoteke v aplikaciji.
- Pri CSS mi vedno povej, kako preverim na telefonu, ne samo na računalniku.
- Roki: nocoj stil, 6 rib in ikona; jutri videz aplikacije in deck; jutri 18:00 koda zamrznjena; 17.09 pitch.
- Ne predlagaj mi novih funkcionalnosti aplikacije. Nove ideje gredo na roadmap slide.

Začni tako, da me vprašaš, ali delam grafiko ali videz aplikacije.
