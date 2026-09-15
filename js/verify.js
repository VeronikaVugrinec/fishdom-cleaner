/* Fishdom Cleaner — preverjanje skeniranja.
   OWNER: V (prek Clauda).

   Štiri preverbe, vse poceni in vse zagovorljive pred žirijo:

   1. isLitter      — ali je na sliki sploh odpadek (pove Gemini)
   2. outdoors      — ali je bila slika posneta OB VODI: plaza, marina, obala.
                      Navadno "zunaj" (ulica, dvorisce) ne zadosca. (pove Gemini)
   3. inZone        — ali je GPS znotraj registrirane cone čiščenja
   4. notDuplicate  — ali ista smet ni bila fotografirana že prej

   Nobena od teh ni neprebojna in tega ne trdimo. Litterati in Clean Swell
   ne preverjata niti tega. Ključni argument ostane: redka riba ni denar,
   ni prenosljiva in nima preprodajne vrednosti — zato goljufanje ne
   prinese ničesar, kar bi kdo hotel.
*/

window.Verify = (function () {

  /* --- 1. razdalja med dvema točkama na Zemlji, v metrih --- */
  function distanceM(lat1, lon1, lat2, lon2) {
    var R = 6371000;
    var toRad = function (d) { return d * Math.PI / 180; };
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function findZone(pos) {
    if (!pos || !window.ZONES) return null;
    var best = null;
    window.ZONES.forEach(function (z) {
      var d = distanceM(pos.lat, pos.lon, z.lat, z.lon);
      if (d <= z.radiusM && (!best || d < best.distanceM)) {
        best = { id: z.id, name: z.name, distanceM: Math.round(d) };
      }
    });
    return best;
  }

  /* --- 2. prstni odtis slike ---
     Sliko zmanjšamo na 8x8 sivin in vsak piksel primerjamo s povprečjem.
     Rezultat je 64-bitni niz. Dve fotografiji istega predmeta imata skoraj
     enak niz, tudi če sta posneti pod malo drugačnim kotom. */
  function fingerprint(img) {
    var c = document.createElement("canvas");
    c.width = 8; c.height = 8;
    var ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0, 8, 8);
    var d = ctx.getImageData(0, 0, 8, 8).data;
    var grey = [], sum = 0;
    for (var i = 0; i < 64; i++) {
      var g = 0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2];
      grey.push(g); sum += g;
    }
    var avg = sum / 64;
    return grey.map(function (g) { return g > avg ? "1" : "0"; }).join("");
  }

  // Koliko bitov se razlikuje. Manj kot 8 od 64 pomeni "ista stvar".
  function hamming(a, b) {
    if (!a || !b || a.length !== b.length) return 64;
    var n = 0;
    for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) n++;
    return n;
  }

  function isDuplicate(fp, previousScans) {
    if (!fp) return null;
    for (var i = 0; i < previousScans.length; i++) {
      var p = previousScans[i];
      if (!p.fp) continue;
      if (hamming(fp, p.fp) < 8) {
        return { matchedAt: p.t, distance: hamming(fp, p.fp) };
      }
    }
    return null;
  }

  /* --- 3. skupna ocena --- */
  function assess(result, pos, fp, previousScans) {
    var zone = findZone(pos);
    var dup = isDuplicate(fp, previousScans || []);

    var checks = {
      isLitter:     result.isLitter !== false,
      outdoors:     result.setting ? ["beach", "marina", "waterside"].indexOf(result.setting) > -1 : null,
      inZone:       pos ? !!zone : null,
      notDuplicate: fp ? !dup : null
    };

    // null pomeni "nismo mogli preveriti" in ne šteje kot padec.
    var failed = Object.keys(checks).filter(function (k) { return checks[k] === false; });

    return {
      checks: checks,
      failed: failed,
      verified: failed.length === 0,
      zone: zone,
      duplicateOf: dup ? dup.matchedAt : null,
      fp: fp
    };
  }

  var LABEL = {
    isLitter:     "Looks like litter",
    outdoors:     "Taken outdoors",
    inZone:       "Inside a cleanup zone",
    notDuplicate: "Not a repeat photo"
  };

  return {
    assess: assess, fingerprint: fingerprint,
    findZone: findZone, distanceM: distanceM, LABEL: LABEL
  };
})();
