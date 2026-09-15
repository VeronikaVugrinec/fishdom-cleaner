/* Fishdom Cleaner — service worker.
   Shrani aplikacijo v telefon, da se odpre tudi brez interneta.
   To je hkrati zavarovanje za oder: če na hackatonu pade omrežje,
   se igra še vedno naloži, ker je že v telefonu.

   POMEMBNO: ob vsaki spremembi kode povečaj številko v CACHE.
   Če je ne povečaš, bo telefon še naprej kazal staro različico. */

const CACHE = "fishdom-2026-09-15-c";

const FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./js/app.js",
  "./js/fish.js",
  "./js/verify.js",
  "./data/species.js",
  "./data/litter-map.js",
  "./data/zones.js",
  "./manifest.webmanifest",
  "./assets/icon-180.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

self.addEventListener("install", function (e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      // Posamezna manjkajoca datoteka ne sme podreti namestitve.
      return Promise.all(FILES.map(function (f) {
        return c.add(f).catch(function () {});
      }));
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  const url = new URL(e.request.url);

  // Klic na Gemini nikoli ne gre iz predpomnilnika.
  if (url.pathname.indexOf("/.netlify/functions/") === 0) return;
  if (e.request.method !== "GET") return;
  if (url.origin !== location.origin) return;

  // Najprej mreza, nato predpomnilnik. Tako vidis novo razlicico takoj,
  // ko je na voljo, brez interneta pa se odpre shranjena.
  e.respondWith(
    fetch(e.request).then(function (res) {
      const copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      return res;
    }).catch(function () {
      return caches.match(e.request).then(function (hit) {
        return hit || caches.match("./index.html");
      });
    })
  );
});
