# Kako si narediš svojega AI pomočnika (10 minut, zastonj)
Naredi to PRVO, preden se lotiš svojih nalog. Potem ti ni treba V spraševati ničesar razen tistega, kar res lahko odloči samo ona.

Uporabljava **Gemini Gem** — to je pogovor s trajnim spominom: enkrat mu poveš, kdo je in kaj gradimo, naložiš mu naša navodila, in to velja za vedno. Ni ti treba vsakič znova razlagati projekta. Zastonj, brez kartice.

## Korak 1 — datoteki na svoj računalnik
Od V dobiš dve datoteki (Drive ali WhatsApp):
- `KAKO-DELUJE-APLIKACIJA.md` — dobita jo obe
- svojo: `NAVODILA-Ai-podatki.md` **ali** `NAVODILA-Au-grafika.md`

Shrani ju kamorkoli, kjer ju boš našla.

## Korak 2 — naredi Gem
1. Odpri **gemini.google.com**, prijavi se z Google računom.
2. V levem meniju klikni **Gems** → **New Gem** (ali "Ustvari Gem").
3. **Ime:** `Fishdom pomočnik`.
4. V polje **Instructions / Navodila** prilepi prompt, ki je na dnu tvoje datoteke z navodili (razdelek "Prompt za tvojega Gemini pomočnika"). Prilepi vse med črtama.
5. Klikni **Add files / Knowledge** in naloži **obe** datoteki iz koraka 1.
6. Shrani (**Save**).

Zdaj imaš pomočnika, ki pozna cel projekt in tvoja navodila. Odpreš ga kadarkoli iz seznama Gems in nadaljuješ, kjer si ostala.

## Korak 3 — preveri, da res dela
Vprašaj ga tri stvari. Če na vse tri odgovori pravilno, je nastavljen prav:
1. *"Na kratko: zakaj to ni samo igrica?"* → mora povedati, da so pravi produkt podatki za občine in marine, igra pa način, kako pridobimo uporabnike.
2. *"Katera je moja prva naloga in do kdaj?"* → mora našteti tvojo nalogo iz tvojih navodil, ne splošnosti.
3. *"Kam oddam, ko končam?"* → Ai: shranjena datoteka gre V. Au: Google Drive mapa `grafika`, potem javiš V.

Če na katerokoli odgovori napačno, mu napiši: *"To ni pravilno, preveri v naloženih datotekah."* Če še vedno ne gre, javi V.

## Kaj ga lahko vprašaš in kaj ne

**Vprašaj njega:**
- kaj točno naj naredim zdaj in zakaj
- kako se ta datoteka ureja, kaj smem spremeniti in česa ne
- kje najdem IUCN status / vir / koordinate
- kako stisnem sliko pod 40 KB
- kam to potem oddam
- razloži mi, kako deluje ta del aplikacije

**Vprašaj V (samo to):**
- nekaj na demo poti ne dela (kamera, riba, zbirka, akvarij)
- nečesa ni v navodilih in ne vem, kdo odloča
- rabim potrditev vsebine, ki jo bo ona govorila na odru

Ko pišeš V, napiši **tri stvari**: kaj si poskusila / kaj se je zgodilo / kaj si pričakovala. Nič drugega.

## Dve pasti
- **Gem si stvari izmisli, če ne ve.** Zato IUCN status vedno preveriš na iucnredlist.org in vir vedno odpreš, preden ga vpišeš. Če ti da povezavo, ki se ne odpre, vira ni.
- **Nova ideja ni tvoja naloga.** Če ti Gem predlaga novo funkcionalnost aplikacije, jo napiši v sporočilo V z oznako "roadmap" in delaj naprej po seznamu. V kodo danes ne gre nič novega.
