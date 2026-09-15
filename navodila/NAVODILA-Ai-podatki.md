# Ai — tvoje delo (podatki + testiranje)
Posodobljeno 15.09.2026. **Najprej preberi `KAKO-DELUJE-APLIKACIJA.md`** — 10 minut, brez tega ti spodnje naloge ne bodo dale smisla.

## Kaj je tvoja vloga v celoti
Ti si lastnica **vsebine, na kateri stoji verodostojnost projekta**. Koda je moja in V-jina skrb. Ampak če je IUCN status napačen, če je trditev o odpadku izmišljena ali če GPS cona ne obstaja, pade cel pitch — in tega z lepo kodo ne moreš popraviti.

Urejaš **samo tri datoteke**, vse v mapi `data/`:

| datoteka | kaj je v njej | zakaj je pomembna |
|---|---|---|
| `species.js` | 12 jadranskih vrst: latinsko ime, IUCN status, prehrana, okolje, velikost, besedilo kartice | To je edina vsebina, ki jo sodnik lahko preveri s telefonom v roki, medtem ko govorimo |
| `litter-map.js` | za vsak material: katere vrste podeli, en stavek o učinku, vir, koliko kreditov in točk | To je vsebinska povezava med smetjo in ribo — brez nje je nagrada naključna |
| `zones.js` | GPS cone čiščenja: kraj, koordinate, polmer | To je preverjanje. Brez pravih con ne moremo reči, da so podatki zanesljivi |

Kode (`js/`, `index.html`, `style.css`) se ne dotikaš. Tam delam jaz prek V.

## Kako se te datoteke urejajo
Odpri jih v navadnem urejevalniku besedila (TextEdit v načinu navadnega besedila, Notepad, VS Code). To niso programi — so seznami.

Vsaka vrsta izgleda takole:
```
  {
    id: "sparus-aurata",
    sciName: "Sparus aurata",
    iucn: "LC", verify: true,
    ...
  },
```
Ti zamenjuješ **samo besedilo med narekovaji** in `true` / `false`.
**Nikoli ne brišeš vejic, oklepajev, zavitih oklepajev in narekovajev.** Če eden manjka, aplikacija ne dela in tega ne boš videla — videla bo V, ko objavi.

Ko datoteko shraniš, jo pošlji V. Ne pošiljaj vsake spremembe posebej — zberi jih in pošlji v paketu.

## Vrstni red — drži se ga
1. **Danes:** IUCN preverjanje vseh 12 vrst (NALOGA 1). To mora biti nocoj gotovo.
2. **Danes, ko greš ven:** prave GPS cone (NALOGA 3) — edina naloga, ki je jutri iz hotela ne moreš narediti.
3. **Jutri dopoldne:** viri v litter-map (NALOGA 2) + test na telefonu (NALOGA 4).
4. **Jutri popoldne:** demo skripta za oder (NALOGA 5).

## Orodje
**Gemini** (gemini.google.com, zastonj). Na dnu je prompt, ki ga prilepiš v nov pogovor — potem te vodi skozi vse naloge.
IUCN status pa **vedno preveri na iucnredlist.org, nikoli pri Geminiju.** AI si status izmisli in zveni prepričano. Stran si ga ne izmisli.

---

## NALOGA 1 — IUCN preverjanje (~60 min, največja prioriteta)
V `species.js` ima vsaka vrsta `verify: true`. To pomeni "tega še nihče ni preveril".

Za vsako od 12 vrst:
1. Odpri **iucnredlist.org**, išči po latinskem imenu (npr. *Squatina squatina*).
2. Poglej **Global** status: LC (least concern) / NT / VU (vulnerable) / EN (endangered) / CR (critically endangered) / DD (data deficient).
3. Ujema se z `iucn:` v datoteki → spremeni `verify: true` v `verify: false`. Končano.
4. Ne ujema se → popravi `iucn:` na pravega in **šele nato** `verify: false`.
5. Vrste ni ali status ni jasen → pusti `verify: true` in javi V.

Dve stvari, ki ju je vredno vedeti, ker ju bo sodnik morda vprašal:
- Regionalni sredozemski status se pogosto razlikuje od globalnega. Mi uporabljamo **globalnega** in to v pitchu povemo.
- Modroplavuti tun (*Thunnus thynnus*) je bil leta 2021 znižan na LC, ker so kvote delovale. To je dobra zgodba, ne napaka — ampak globalni status ni isto kot zdravje jadranskega staleža. Če v kartici piše kaj drugega, popravi.

> Napačen naravovarstveni status je edina vsebinska napaka, ki nas na odru stane največ. Nobena vrsta z `verify: true` ne sme v pitch.

## NALOGA 2 — viri v litter-map.js
Vsak material ima stavek `effect:` — kako prav ta odpadek prizadene prav te vrste — in vrstico `source: "PREVERI IN VPIŠI VIR"`.

Za vsak `effect` najdi vir: UNEP, EEA (European Environment Agency), NOAA, JRC ali znanstveni članek. Vpiši **ime + letnico + povezavo**, npr.:
```
source: "UNEP, Marine Litter: A Global Challenge (2009), https://...",
```
**Če vira ne najdeš, ne izmišljuj — izbriši ta `effect` stavek in javi V.** Manjkajoča trditev je boljša od napačne. Sodnik, ki ujame eno izmišljeno številko, ne verjame več ničemur drugemu.

Hkrati poglej `pool:` pri vsakem materialu — to so vrste, ki jih ta material lahko podeli. Če se ti katera zdi vsebinsko nelogična (npr. ribiška vrvica, ki da sardelo), jo zamenjaj in povej zakaj. Ta povezava je tisto, kar loči nas od naključne loterije.

## NALOGA 3 — prave GPS cone
V `zones.js` so koordinate približne in `window.ZONES_UNVERIFIED = true;`.
1. Najbolje: bodi na kraju in odčitaj koordinati na telefonu. Druga možnost: Google Maps → desni klik na točko → klikni koordinati, da se kopirata.
2. Prilepi: prva številka je `lat`, druga `lon`.
3. `radiusM` je polmer v metrih: plaža 300, marina 400, daljši odsek obale 800.
4. Ko so vse štiri cone prave, spremeni `true` v `false`.

Dokler je `true`, aplikacija to sama pove na glas — kar je bolje kot tiho lagati, a v pitchu ne sme ostati.

## NALOGA 4 — test na pravem telefonu
Odpri `fishdom-cleaner.netlify.app` na svojem telefonu **in na iPhonu, če ga kdo ima**. Po vrsti:
1. Pritisneš gumb za skeniranje → se odpre kamera?
2. Fotografiraš smet → dobiš ribo s kartico?
3. Je riba v zbirki?
4. Plava v akvariju?
5. Ali se aplikacija da dodati na domači zaslon in se odpre z ikono?

To so tiste štiri stvari, ki ne smejo pasti. Če katerakoli pade, javi V **takoj**, ne čakaj na konec testa.

## NALOGA 5 — demo skripta za oder
Napiši po korakih, kaj V naredi na odru v 90 sekundah: katero smet pokaže, kam klikne, kaj se mora prikazati, kaj pove medtem. Preizkusi to sama na telefonu, preden napišeš.
Vključi rezervno pot: `fishdom-cleaner.netlify.app/?demo=1` deluje brez interneta. To preizkusi tudi.

---

## Ko se zatakneš
V napiši **tri stvari**: kaj si poskusila / kaj se je zgodilo / kaj si pričakovala. Nič drugega, ne razlagaj. To je vse, kar rabim, da ti odgovorim.

## Prompt za tvojega Gemini pomočnika (prilepi v nov pogovor)
---
Si moj pomočnik na 48-urnem hackathonu INNOVABLUE v Šibeniku (15.–17.09.2026). Odgovarjaj v slovenščini, kratko, po korakih. Datumi dd.mm.yyyy. Nikoli mi ne predlagaj orodij, ki zahtevajo plačilo ali kartico.

KAJ GRADIMO
"Fishdom Cleaner" — mobilna spletna igra za čiščenje obal. Uporabnik na plaži, obali ali v marini pobere kos smeti in ga fotografira v aplikaciji. Aplikacija s pomočjo umetne inteligence prepozna vrsto odpadka, zabeleži kraj in čas ter uporabniku podeli jadransko morsko vrsto — na primer sklata, jeguljo ali morskega konjička. Vsaka vrsta prinese kartico s podatki: ime, latinsko ime, stopnja ogroženosti po IUCN, prehrana, tipično okolje, velikost, in en stavek o tem, kako prav ta odpadek prizadene prav to vrsto. Vrste se zbirajo v osebni zbirki in naseljujejo podvodni akvarij, ki ga uporabnik ureja s krediti. S točkami napreduje po petih nivojih, ki odklepajo redkejše vrste.

ZAKAJ — to je bistveno in tega ne smeš pozabiti
Igra je samo način, kako pridobimo uporabnike. Pravi produkt so PODATKI. Vsako skeniranje poleg nagrade ustvari zapis o odpadku: kraj, čas, vrsta materiala. Občine, marine in upravljavci plaž s tem dobijo sliko o tem, kaj se na njihovi obali dejansko nabira. Danes to merijo strokovnjaki nekajkrat na leto, prostovoljno pobiranje smeti pa ni nikjer zabeleženo — mi ti dve stvari povezujemo. Zato je to rešitev za Temo 1 hackathona ("Smart Monitoring and Digital Tools for Blue Environments"), ne igrica. Če me kdaj vodiš v smer "naredimo igro bolj zabavno", me ustavi in spomni na to.

KAKO DELUJE ENO SKENIRANJE
Fotografija se pomanjša na 384 px in gre prek našega strežnika do modela Gemini, ki pove, ali je na sliki odpadek, za kateri material gre in ali je slika nastala zunaj. Hkrati telefon prebere GPS. Aplikacija preveri štiri stvari: je res odpadek, je zunaj, je znotraj registrirane cone čiščenja, ni to ista fotografija kot že prej. Vrsta materiala določi bazen vrst, iz katerega se podeli riba — nikoli ni čisto naključno. Če kateri preverek pade, uporabnik ribo vseeno dobi, samo kreditov je manj in zapis je označen kot nepreverjen: varujemo podatke, ne igre. Če internet pade, se odpre ročni izbirnik materiala.

EKIPA IN MOJA VLOGA
Smo tri. V je vodja, dela pitch in poslovni model in je edina, ki objavlja aplikacijo. Au dela vso grafiko in deck. Jaz sem lastnica vsebine in urejam SAMO tri datoteke s podatki: species.js (12 vrst), litter-map.js (kateri material podeli katero vrsto, učinek odpadka, vir) in zones.js (GPS cone čiščenja). Kode ne pišem in je ne razumem — te datoteke so navadni seznami, kjer zamenjujem besedilo med narekovaji in nikoli ne brišem vejic ali oklepajev. Testiram tudi aplikacijo na pravih telefonih in pišem demo skripto za oder.

MOJE ŠTIRI NALOGE PO VRSTI
1. Preveriti IUCN status vseh 12 vrst na iucnredlist.org in v datoteki nastaviti verify: false.
2. Odčitati prave GPS koordinate con čiščenja v Šibeniku.
3. Najti vir za vsako trditev o učinku odpadkov.
4. Testirati na telefonu in napisati demo skripto.

PRAVILA, KI JIH MORAŠ SPOŠTOVATI
- Nikoli mi ne povej IUCN statusa po spominu. Vedno me pošlji na iucnredlist.org in me vprašaj, kaj tam piše. Napačen naravovarstveni status je napaka, ki nas na odru stane največ.
- Za vsako trditev o odpadkih rabim ime organizacije, letnico in povezavo. Če vira ni, mi to povej naravnost — trditev bova izbrisali, ne ugibali. Manjkajoča trditev je boljša od napačne.
- Roki: nocoj IUCN in cone, jutri 18:00 je koda zamrznjena, 17.09 je pitch. Če me vidiš, da delam nekaj, kar ni na seznamu, me opozori.
- Ne predlagaj mi novih funkcionalnosti aplikacije. Nove ideje gredo na roadmap slide, ne v kodo.

Začni tako, da me vprašaš, pri kateri od štirih nalog sem.
---
