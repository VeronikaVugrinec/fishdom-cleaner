# Fishdom Cleaner

Igra za čiščenje obal. Fotografiraš smet, dobiš jadransko morsko vrsto,
naseliš jo v akvarij. Vsako skeniranje ustvari tudi zapis o odpadku.

---

## Kaj je kje

| Datoteka | Kaj je notri | Kdo jo ureja |
|---|---|---|
| `index.html` | Struktura petih zaslonov | V |
| `style.css` | Vse barve in videz. Barve so na vrhu v `:root` | Au |
| `js/app.js` | Logika igre | V prek Clauda |
| `js/fish.js` | Nadomestna grafika rib, dokler ni pravih slik | Au |
| `data/species.js` | Seznam 12 vrst | V (besedila) + Ai (ostalo) |
| `data/litter-map.js` | Katera smet da katero vrsto + ekonomija | Ai |
| `netlify/functions/scan.js` | Klic na Gemini. Ključ ni v kodi | V |
| `assets/fish/` | Prave slike rib, ko bodo narejene | Au |

---

## Kako se objavi

1. Odpri `netlify.com`, prijavi se.
2. **Add new site → Deploy manually**.
3. Povleci celo mapo `fishdom-cleaner` v okno.
4. Netlify vrne naslov v obliki `nekaj.netlify.app`. **Ta naslov odpri na telefonu.**
5. Ime strani spremeniš v **Site configuration → Change site name**.

Vsakič, ko se kaj spremeni, mapo povlečeš znova.

---

## Gemini ključ

Ključ **nikoli** ne gre v kodo. Vpiše se v Netlify:

**Site configuration → Environment variables → Add a variable**
ime: `GEMINI_API_KEY`, vrednost: tvoj ključ.

Po vpisu stran še enkrat objavi, da se sprememba upošteva.

Če ključa ni ali klic ne uspe, aplikacija sama preklopi na naključen
rezultat in igra še naprej deluje. To je namerno.

---

## Demo način

Na konec naslova dodaj `?demo=1`:

```
https://tvoja-stran.netlify.app/?demo=1
```

V tem načinu aplikacija ne kliče ničesar. To je zavarovanje za oder —
če na hackatonu pade omrežje, demo teče naprej.

---

## Preizkušanje brez pobiranja smeti

Odpri stran, pritisni desni klik → Inspect → Console in napiši:

```
__game.give(15)     // simulira 15 skeniranj
__game.state        // pokaže trenutno stanje
__game.reset()      // pobriše vse in začne znova
```

`__game.give(15)` je hkrati test, ki ga je treba vedno opraviti pred
spremembo ekonomije: **po 15 skeniranjih mora biti mogoče kupiti vsaj
dve dekoraciji in doseči nivo 3.** Če ni, so številke v
`data/litter-map.js` napačne.

---

## Kaj mora vedno delati

fotografiraj smet → dobiš vrsto s kartico → vrsta je v zbirki → plava v akvariju

Če se karkoli drugega pokvari, se to popravi za tem. Če se pokvari to,
se ne dela nič drugega, dokler ne dela.

---

## Znane omejitve, ki so namerne

- Kamera je gumb za fotografijo, ne živa slika. `getUserMedia` ne deluje
  v okvirjih drugih strani in v brskalnikih znotraj aplikacij.
- Aplikacije **ne nameščaj** na domači zaslon iPhona — v tem načinu se
  kamera redno pokvari. Odpri jo v Safariju kot navadno stran.
- Lokacija se vzame iz brskalnika ob fotografiranju, nikoli iz podatkov
  v sliki. iPhone jih pri zajemu skozi spletno stran izbriše.
- Orientacije v Safariju ni mogoče zakleniti, zato akvarij pokaže napis
  "obrni telefon" namesto da bi zaslon obrnil sam.
