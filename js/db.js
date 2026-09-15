/* Fishdom Cleaner — pošiljanje zapisov v Supabase.
   LASTNICA / OWNER: Ai.  Nihče drug te datoteke ne ureja.

   ZAKAJ OBSTAJA
   Vsako skeniranje ustvari zapis o odpadku: kraj, čas, vrsta materiala.
   Ti zapisi so PRAVI PRODUKT projekta — občina, marina in upravljavec plaže
   iz njih vidijo, kaj se na njihovi obali dejansko nabira. Igra je samo
   način, kako pridemo do teh zapisov.

   KAKO SE POVEŽE
   js/app.js ob vsakem skeniranju pokliče window.DB.saveScan(zapis), če obstaja.
   js/impact.js ob odpiranju občinskega zaslona pokliče window.DB.loadScans().
   Če te datoteke ni ali funkciji vrneta napako, aplikacija dela naprej
   z lokalnimi podatki. TO PRAVILO SE NE SME PODRETI — demo ne sme
   nikoli umreti zaradi omrežja.

   KLJUČI
   Nikoli v to datoteko. V vnese SUPABASE_URL in SUPABASE_ANON_KEY v
   Netlify Environment variables, od koder prideta v window spremenljivki.

   OBLIKA ZAPISA, ki ga dobiš iz app.js:
   { t: 1757942400000,      // čas v milisekundah
     material: "plastic_bag",
     label: "Plastic bag or film",
     speciesId: "caretta-caretta",
     lat: 43.729, lon: 15.889,   // lahko sta null
     zone: "Banj Beach, Šibenik", // lahko null
     verified: true,
     failed: ["inZone"] }        // kateri preverki so padli

   TABELA v Supabase (predlog):
   scans: id, created_at, material, species_id, lat, lon, zone_id, verified, device_id
*/

window.DB = {
  ready: false,

  // TODO Ai: pošlji zapis v Supabase. Ob napaki ga shrani v čakalno vrsto.
  saveScan: function (zapis) {
    return Promise.resolve(null);
  },

  // TODO Ai: preberi zadnje zapise iz Supabase. Ob napaki vrni prazen seznam.
  loadScans: function () {
    return Promise.resolve([]);
  }
};
