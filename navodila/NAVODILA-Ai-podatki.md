# Ai — tvoje delo (preverjanje, občinski zaslon, Supabase, podatki)
Posodobljeno 15.09.2026. **Najprej preberi `KAKO-DELUJE-APLIKACIJA.md` in `GIT-KAKO-DELIMO-KODO.md`.**

## Tvoja vloga
Ti si "možgani" operacije in dobiš tisti del, zaradi katerega to ni igrica, ampak rešitev za Temo 1 hackathona: **podatkovni sloj**. Igra je vaba za uporabnike, podatki so produkt. Občina, marina ali upravljavec plaže mora iz naše aplikacije dobiti sliko o tem, kaj se na njegovi obali dejansko nabira.

Če kdaj nisi prepričana, kaj je pomembnejše — lepša igra ali bolj verodostojni podatki — je odgovor vedno podatki.

## Tvoje datoteke (nobene druge se ne dotikaj)
| datoteka | kaj je |
|---|---|
| `js/verify.js` | štirje preverki, ki odločijo, ali je skeniranje verodostojno |
| `js/impact.js` | **nova** — občinski zaslon: kaj, kje, kdaj se nabira |
| `js/db.js` | **nova** — pošiljanje zapisov v Supabase in branje nazaj |
| `data/species.js` | 12 jadranskih vrst + kartice |
| `data/litter-map.js` | kateri material podeli katero vrsto, učinek odpadka, vir |
| `data/zones.js` | GPS cone čiščenja |

Vse ostalo (`index.html`, `js/app.js`, `js/fish.js`, `style.css`, `netlify/`, `assets/`) ni tvoje. Če rabiš tam spremembo, napiši V.

## Orodja (vsa zastonj)
- **VS Code + GitHub Copilot, brezplačni paket** — vgrajen v VS Code, dopolnjuje kodo in zna razložiti, kaj katera vrstica dela. V VS Code: ikona Copilot → Sign in with GitHub. Brezplačni paket ima mesečno omejitev, za en hackathon je več kot dovolj. Ker si študentka, lahko prek **GitHub Student Developer Pack** dobiš Copilot Pro zastonj — vloga traja nekaj dni, zato danes uporabi brezplačni paket.
- **Gemini Gem** (gemini.google.com) — tvoj pomočnik za razlago in načrtovanje. Prompt je na dnu tega dokumenta.
- **iucnredlist.org** — edini vir za naravovarstveni status. Nikoli AI.

## Vrstni red — drži se ga

### DANES
**1. IUCN preverjanje vseh 12 vrst (~60 min).** V `data/species.js` ima vsaka vrsta `verify: true` = nihče še ni preveril. Za vsako: odpri iucnredlist.org, išči po latinskem imenu, poglej **Global** status (LC/NT/VU/EN/CR/DD). Se ujema → nastavi `verify: false`. Se ne ujema → popravi `iucn:` in šele nato `verify: false`. Ni je ali ni jasno → pusti `true` in javi V.
> Napačen naravovarstveni status je edina vsebinska napaka, ki nas na odru stane največ.

Dve stvari, ki ju bo sodnik morda vprašal: regionalni sredozemski status se pogosto razlikuje od globalnega (mi uporabljamo globalnega in to povemo), in modroplavuti tun je bil 2021 znižan na LC, ker so kvote delovale — to je dobra zgodba, ne napaka.

**2. Prave GPS cone.** V `data/zones.js` so koordinate približne. Ko si na kraju, odčitaj koordinati na telefonu (ali Google Maps → desni klik → klikni koordinati). Prva številka `lat`, druga `lon`. `radiusM`: plaža 300, marina 400, daljša obala 800. Ko so vse štiri prave, `window.ZONES_UNVERIFIED = true` → `false`.
To je edina naloga, ki je jutri iz hotela ne moreš narediti.

### JUTRI DOPOLDNE
**3. Supabase — pravi zapisi (`js/db.js`).** To je najpomembnejši del tvojega dela.

V ti da URL in anon ključ. **Ključa ne daš v nobeno datoteko** — V ju vnese v Netlify Environment variables, ti pa jih v kodi bereš iz `window.SUPABASE_URL` in `window.SUPABASE_ANON_KEY`.

Tabela `scans` naj ima: `id`, `created_at`, `material` (besedilo), `species_id` (besedilo), `lat`, `lon` (števili), `zone_id` (besedilo), `verified` (true/false), `device_id` (besedilo — naključna oznaka telefona, ne uporabnik).

Napiši dve funkciji: `saveScan(zapis)` in `loadScans()`. Ključno pravilo: **če Supabase ne odgovori, aplikacija ne sme pasti.** Zapis se shrani lokalno in se pošlje kasneje. Demo ne sme nikoli umreti zaradi omrežja.

**4. Občinski zaslon (`js/impact.js`).** Iz zapisov prikaži: skupno število kosov, razdelitev po materialih, po conah, in gibanje po dnevih. Vsaka številka mora povedati, ali je iz preverjenih ali vseh zapisov — to je razlika med nami in Litteratijem.
Ne delaj lepih grafov, dokler ne delajo številke. Sodnik gleda, ali podatki obstajajo, ne ali so v krogu.

### JUTRI POPOLDNE
**5. Viri v `litter-map.js`.** Vsak material ima `source: "PREVERI IN VPIŠI VIR"`. Najdi vir (UNEP, EEA, NOAA, JRC, znanstveni članek), vpiši ime + letnico + povezavo. **Če vira ne najdeš, izbriši ta `effect` stavek in javi V.** Manjkajoča trditev je boljša od napačne.

**6. Test na pravih telefonih + demo skripta.** Preveri po vrsti: kamera se odpre → dobiš ribo s kartico → riba je v zbirki → plava v akvariju → aplikacija se da dodati na domači zaslon. Če katerakoli pade, javi V **takoj**.
Potem napiši po korakih, kaj V naredi na odru v 90 sekundah, in preizkusi rezervno pot `?demo=1` (deluje brez interneta).

## Ko se zatakneš
Najprej vprašaj svojega Gema. Šele če ne gre, napiši V **tri stvari**: kaj si poskusila / kaj se je zgodilo / kaj si pričakovala.

---

## Prompt za tvojega Gemini pomočnika (Gems → New Gem → Instructions)

Si moj tehnični pomočnik na 48-urnem hackathonu INNOVABLUE v Šibeniku (15.–17.09.2026). Odgovarjaj v slovenščini, kratko, po korakih. Datumi dd.mm.yyyy. Nikoli mi ne predlagaj orodij, ki zahtevajo plačilo ali kartico.

KAJ GRADIMO
"Fishdom Cleaner" — mobilna spletna igra za čiščenje obal. Uporabnik na plaži, obali ali v marini pobere kos smeti in ga fotografira v aplikaciji. Fotografija se pomanjša na 384 px in gre prek Netlify funkcije do modela Gemini, ki pove, ali je na sliki odpadek, za kateri material gre in ali je slika nastala zunaj. Hkrati telefon prebere GPS. Uporabnik dobi jadransko morsko vrsto s kartico (ime, latinsko ime, IUCN status, prehrana, okolje, velikost) in en stavek o tem, kako prav ta odpadek prizadene prav to vrsto. Vrste se zbirajo v zbirki in naseljujejo pokončen podvodni akvarij, ki ga ureja s krediti. Pet nivojev odklepa redkejše vrste.

ZAKAJ — tega ne pozabi in me na to opozori, če zaidem
Igra je samo način, kako pridobimo uporabnike. Pravi produkt so PODATKI: vsako skeniranje ustvari zapis o odpadku s krajem, časom in vrsto materiala, kar občinam, marinam in upravljavcem plaž da sliko o tem, kaj se na njihovi obali dejansko nabira. Danes to merijo strokovnjaki nekajkrat na leto, prostovoljno pobiranje smeti pa ni nikjer zabeleženo. To je rešitev za Temo 1 ("Smart Monitoring and Digital Tools for Blue Environments"), ne igrica.

TEHNIČNO STANJE
Navaden HTML, CSS in JavaScript, brez ogrodij in brez build koraka. Podatki zaenkrat v localStorage, zdaj dodajamo Supabase. Objava: GitHub → Netlify, vsak commit se sam objavi. Delam v VS Code in terminalu.

MOJA VLOGA IN MOJE DATOTEKE
Sem ena od treh. V je vodja in dela pitch. Au dela videz in grafiko. Jaz delam podatkovni sloj in preverjanje. Urejam SAMO: js/verify.js (štirje preverki), js/impact.js (občinski zaslon), js/db.js (Supabase), data/species.js, data/litter-map.js, data/zones.js. Vseh drugih datotek se ne smem dotakniti — če predlagaš spremembo drugje, mi to povej, da jo naročim naprej.

ŠTIRJE PREVERKI, KI JIH VZDRŽUJEM
1. je na sliki res odpadek, 2. je slika nastala zunaj, 3. je GPS znotraj registrirane cone čiščenja, 4. ni to ista fotografija kot že prej (primerjava 8×8 prstnega odtisa slike). Če kateri pade, uporabnik ribo VSEENO dobi — samo kreditov je manj in zapis je označen kot nepreverjen. Varujemo podatke, ne igre. Odgovor sodniku, zakaj tega ni vredno goljufati: redka vrsta ni denar — ni prenosljiva in nima preprodajne vrednosti.

PRAVILA, KI JIH MORAŠ SPOŠTOVATI
- Nikoli mi ne povej IUCN statusa po spominu. Vedno me pošlji na iucnredlist.org.
- Za vsako trditev o odpadkih rabim ime organizacije, letnico in povezavo. Če vira ni, trditev izbriševa, ne ugibava.
- Noben ključ (Gemini, Supabase) ne sme v nobeno datoteko ali v git. Živijo v Netlify nastavitvah in jih berem iz window spremenljivk. Če mi kdaj predlagaš, naj ključ napišem v kodo, me ustavi.
- Aplikacija ne sme pasti, če Supabase ali internet ne odgovorita. Vedno rabim rezervno pot.
- Roki: nocoj IUCN in GPS cone, jutri dopoldne Supabase in občinski zaslon, jutri 18:00 koda zamrznjena, 17.09 pitch.
- Ne predlagaj mi novih funkcionalnosti. Nove ideje gredo na roadmap slide.
- Ko mi daš kodo, mi povej tudi, kako preverim, da dela, in kaj naj vidim na zaslonu.

Začni tako, da me vprašaš, pri kateri nalogi sem.
