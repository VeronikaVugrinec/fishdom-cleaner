/* Fishdom Cleaner — registrirane cone čiščenja.
   LASTNICA / OWNER: Ai.

   Aplikacija prizna skeniranje kot preverjeno samo, če je bilo narejeno
   znotraj ene od teh con. Zunaj cone se zapis vseeno shrani, a je označen
   kot nepreverjen in prinese manj kreditov.

   KAKO DODAŠ CONO:
   1. Google Maps → desni klik na kraj → klikni koordinati, da se kopirata.
   2. Prilepi sem kot lat in lon. Prva številka je lat, druga lon.
   3. radiusM je polmer v metrih — koliko naokoli še šteje kot ta kraj.
      Za plažo 300, za marino 400, za daljši odsek obale 800.

   SPODNJE KOORDINATE SO PRIBLIŽNE IN JIH JE TREBA ZAMENJATI S PRAVIMI,
   ki jih odčitaš na kraju samem. Dokler tega ne narediš, pusti
   window.ZONES_UNVERIFIED = true — aplikacija bo takrat to povedala na glas.
*/

window.ZONES_UNVERIFIED = true;

window.ZONES = [
  { id: "sibenik-banj",    name: "Banj Beach, Šibenik",    lat: 43.7290, lon: 15.8890, radiusM: 400 },
  { id: "sibenik-riva",    name: "Šibenik waterfront",     lat: 43.7350, lon: 15.8880, radiusM: 500 },
  { id: "sibenik-marina",  name: "Marina Mandalina",       lat: 43.7220, lon: 15.8960, radiusM: 400 },
  { id: "sibenik-jadrija", name: "Jadrija Beach",          lat: 43.7180, lon: 15.8500, radiusM: 400 }
];

/* Koliko se nagrada zniža, če skeniranje ni preverjeno.
   Ribo igralec dobi vedno — varujemo podatke, ne igre. */
window.UNVERIFIED_MULTIPLIER = 0.4;
