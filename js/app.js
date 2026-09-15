/* Fishdom Cleaner — logika igre.
   OWNER: V (prek Clauda). Ai spreminja samo podatke v data/.

   Stanje je v brskalniku (localStorage). Ni računov, ni prijave,
   ni osebnih podatkov.

   DEMO NAČIN: ?demo=1 na koncu naslova. Aplikacija ne kliče ničesar in
   vse preverbe veljajo za opravljene. To je zavarovanje za oder.
*/

(function () {
  "use strict";

  var KEY = "fishdom.v2";
  var params = new URLSearchParams(location.search);
  var FORCE_DEMO = params.get("demo") === "1";

  var state = load();

  /* ---------- stanje ---------- */

  function blank() {
    return { credits: 0, xp: 0, fish: [], decorations: [], scans: [] };
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY) || localStorage.getItem("fishdom.v1");
      if (!raw) return blank();
      return Object.assign(blank(), JSON.parse(raw));
    } catch (e) { return blank(); }
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
    if (window.__game) window.__game.state = state;
  }

  function level() {
    var L = window.ECONOMY.levels, n = 1;
    for (var i = 0; i < L.length; i++) if (state.xp >= L[i]) n = i + 1;
    return n;
  }
  function nextLevelXp() {
    var L = window.ECONOMY.levels, l = level();
    return l >= L.length ? L[L.length - 1] : L[l];
  }
  function speciesById(id) {
    return window.SPECIES.filter(function (s) { return s.id === id; })[0];
  }
  function el(id) { return document.getElementById(id); }

  /* ---------- zasloni ---------- */

  var screens = {};
  ["scan", "reveal", "collection", "aquarium", "impact"].forEach(function (n) {
    screens[n] = el("screen-" + n);
  });

  function go(name) {
    Object.keys(screens).forEach(function (n) { screens[n].hidden = (n !== name); });
    Array.prototype.forEach.call(document.querySelectorAll(".nav button"), function (b) {
      b.classList.toggle("active", b.dataset.go === name);
    });
    if (name === "collection") renderCollection();
    if (name === "aquarium") renderAquarium(); else stopTank();
    if (name === "impact") renderImpact();
    if (window.__game) window.__game.screen = name;
  }

  Array.prototype.forEach.call(document.querySelectorAll(".nav button"), function (b) {
    b.addEventListener("click", function () { go(b.dataset.go); });
  });

  function renderHud() {
    el("hud-credits").textContent = state.credits;
    el("hud-level").textContent = level();
    var L = window.ECONOMY.levels;
    var base = L[level() - 1] || 0, top = nextLevelXp();
    var pct = top > base ? Math.min(100, ((state.xp - base) / (top - base)) * 100) : 100;
    el("xpbar-fill").style.width = pct + "%";
    el("xpbar-label").textContent = state.xp + " / " + top + " XP";
    el("demo-badge").hidden = !FORCE_DEMO;
  }

  /* ---------- skeniranje ---------- */

  el("file-input").addEventListener("change", function (ev) {
    var file = ev.target.files && ev.target.files[0];
    ev.target.value = "";
    if (file) startScan(file);
  });

  function startScan(file) {
    var overlay = el("overlay-scanning");
    var status = el("scan-status");
    var preview = el("scan-preview");
    overlay.hidden = false;
    status.textContent = "Identifying …";

    var started = Date.now();
    var pendingPos = null, pendingFp = null;
    locate().then(function (p) { pendingPos = p; });

    downscale(file, 384).then(function (out) {
      preview.src = out.dataUrl;
      pendingFp = out.fp;
      return Promise.all([classify(out.base64), locate()]);
    }).then(function (res) {
      var result = res[0], pos = res[1] || pendingPos;
      var wait = Math.max(0, 1800 - (Date.now() - started));
      setTimeout(function () {
        overlay.hidden = true;
        award(result, pos, pendingFp);
      }, wait);
    }).catch(function (err) {
      console.error("[scan]", err);
      status.textContent = "No connection — pick the material yourself";
      setTimeout(function () {
        overlay.hidden = true;
        askManual(pendingPos, pendingFp);
      }, 900);
    });
  }

  // Pomanjšanje na 384 px + prstni odtis slike za zaznavanje podvojitev.
  function downscale(file, max) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      var url = URL.createObjectURL(file);
      img.onload = function () {
        var r = Math.min(max / img.width, max / img.height, 1);
        var c = document.createElement("canvas");
        c.width = Math.round(img.width * r);
        c.height = Math.round(img.height * r);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        var fp = null;
        try { fp = window.Verify.fingerprint(img); } catch (e) {}
        URL.revokeObjectURL(url);
        var dataUrl = c.toDataURL("image/jpeg", 0.82);
        resolve({ dataUrl: dataUrl, base64: dataUrl.split(",")[1], fp: fp });
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error("image unreadable")); };
      img.src = url;
    });
  }

  function classify(base64) {
    if (FORCE_DEMO) return Promise.resolve(fakeResult());
    return fetch("/.netlify/functions/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64 })
    }).then(function (r) {
      if (!r.ok) throw new Error("scan " + r.status);
      return r.json();
    }).then(function (j) {
      if (!j || !j.materialId) throw new Error("unexpected response");
      return j;
    });
  }

  // GPS iz brskalnika ob zajemu. NIKOLI iz EXIF — iPhone ga izbriše.
  function locate() {
    return new Promise(function (resolve) {
      if (!navigator.geolocation) return resolve(null);
      var done = false;
      var t = setTimeout(function () { if (!done) { done = true; resolve(null); } }, 5000);
      navigator.geolocation.getCurrentPosition(
        function (p) { if (!done) { done = true; clearTimeout(t); resolve({ lat: p.coords.latitude, lon: p.coords.longitude, acc: p.coords.accuracy }); } },
        function () { if (!done) { done = true; clearTimeout(t); resolve(null); } },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 30000 }
      );
    });
  }

  function fakeResult() {
    var pool = window.LITTER_MAP.filter(function (m) { return m.id !== "other"; });
    var m = pool[Math.floor(Math.random() * pool.length)];
    return { materialId: m.id, item: m.keywords[0], confidence: 0.94, setting: "beach", isLitter: true, demo: true };
  }

  /* ---------- ročna izbira ----------
     Ni zasilni izhod. Tudi Litterati v svojem FAQ pravi, da uporabnika
     še vedno potrebujejo, da označi predmet. */

  function askManual(pos, fp) {
    var ov = el("overlay-picker");
    var grid = el("picker-grid");
    grid.innerHTML = "";
    window.LITTER_MAP.forEach(function (m) {
      var b = document.createElement("button");
      b.className = "pick";
      b.innerHTML = '<span class="ico">' + (m.icon || "•") + "</span>" + m.label;
      b.addEventListener("click", function () {
        ov.hidden = true;
        award({ materialId: m.id, item: m.label, isLitter: true, setting: null, manual: true }, pos, fp);
      });
      grid.appendChild(b);
    });
    ov.hidden = false;
  }

  /* ---------- nagrada ---------- */

  function award(result, pos, fp) {
    var mat = window.LITTER_MAP.filter(function (m) { return m.id === result.materialId; })[0]
           || window.LITTER_MAP.filter(function (m) { return m.id === "other"; })[0];

    var v = FORCE_DEMO
      ? { checks: { isLitter: true, outdoors: true, inZone: true, notDuplicate: true },
          failed: [], verified: true,
          zone: (window.ZONES && window.ZONES[0]) ? { name: window.ZONES[0].name, distanceM: 42 } : null,
          duplicateOf: null, fp: fp }
      : window.Verify.assess(result, pos, fp, state.scans);

    var mult = v.verified ? 1 : (window.UNVERIFIED_MULTIPLIER || 0.4);
    var credits = Math.max(1, Math.round(mat.credits * mult));
    var xp = Math.max(1, Math.round(mat.xp * mult));

    var sp = pick(mat.pool);

    state.credits += credits;
    state.xp += xp;
    if (state.fish.indexOf(sp.id) === -1) state.fish.push(sp.id);
    state.scans.unshift({
      t: Date.now(),
      material: mat.id,
      label: mat.label,
      item: result.item || mat.label,
      lat: pos ? +pos.lat.toFixed(4) : null,
      lon: pos ? +pos.lon.toFixed(4) : null,
      zone: v.zone ? v.zone.name : null,
      verified: v.verified,
      failed: v.failed,
      fp: v.fp || null
    });
    if (state.scans.length > 200) state.scans.length = 200;
    save();

    renderHud();
    renderReveal(sp, mat, v, credits, xp);
    go("reveal");
  }

  function pick(pool) {
    var lv = level(), E = window.ECONOMY;
    var open = pool.map(speciesById).filter(function (s) {
      return s && lv >= (E.tierUnlockLevel[s.tier] || 1);
    });
    if (!open.length) open = window.SPECIES.filter(function (s) { return s.tier === "common"; });
    var weighted = [];
    open.forEach(function (s) {
      var w = Math.round((E.tierChance[s.tier] || 0.3) * 100);
      for (var i = 0; i < w; i++) weighted.push(s);
    });
    return weighted[Math.floor(Math.random() * weighted.length)];
  }

  function renderReveal(sp, mat, v, credits, xp) {
    el("reveal-kicker").textContent = mat.label;
    window.Fish.render(el("reveal-fish"), sp);
    el("card-sl").textContent = sp.enName;
    el("card-sci").textContent = sp.sciName;
    var badge = el("card-iucn");
    badge.textContent = sp.iucn;
    badge.dataset.s = sp.iucn;
    badge.title = iucnLabel(sp.iucn) + (sp.verify ? " — status not verified yet" : "");
    el("card-habitat").textContent = sp.habitat;
    el("card-diet").textContent = sp.diet;
    el("card-size").textContent = sp.maxSize;
    el("card-tier").textContent = sp.tier;
    el("card-text").textContent = sp.cardText;
    el("card-effect").textContent = mat.effect;
    el("reward-credits").textContent = "+" + credits + " cr";
    el("reward-xp").textContent = "+" + xp + " XP";

    // preverjanje
    var vb = el("verify-badge");
    vb.textContent = v.verified ? "Verified record" : "Logged, not verified";
    vb.dataset.v = v.verified ? "yes" : "no";
    el("verify-zone").textContent = v.zone
      ? v.zone.name + " · " + v.zone.distanceM + " m"
      : (v.checks.inZone === null ? "No location available" : "Outside any cleanup zone");

    var list = el("verify-list");
    list.innerHTML = "";
    ["isLitter", "outdoors", "inZone", "notDuplicate"].forEach(function (k) {
      var val = v.checks[k];
      var li = document.createElement("li");
      li.dataset.s = val === true ? "ok" : val === false ? "bad" : "skip";
      li.innerHTML = '<span class="m">' + (val === true ? "✓" : val === false ? "✗" : "–") +
                     "</span>" + window.Verify.LABEL[k] +
                     (val === null ? " <span style=\"opacity:.7\">(not checked)</span>" : "");
      list.appendChild(li);
    });
  }

  function iucnLabel(s) {
    return ({ LC: "Least Concern", NT: "Near Threatened", VU: "Vulnerable",
              EN: "Endangered", CR: "Critically Endangered", DD: "Data Deficient" })[s] || s;
  }

  el("btn-reveal-done").addEventListener("click", function () { go("collection"); });

  /* ---------- zbirka ---------- */

  function renderCollection() {
    var wrap = el("collection-slider");
    wrap.innerHTML = "";
    el("coll-count").textContent = state.fish.length;
    var owned = window.SPECIES.filter(function (s) { return state.fish.indexOf(s.id) > -1; });
    var rest  = window.SPECIES.filter(function (s) { return state.fish.indexOf(s.id) === -1; });

    owned.concat(rest).forEach(function (sp) {
      var has = state.fish.indexOf(sp.id) > -1;
      var d = document.createElement("div");
      d.className = "slot" + (has ? "" : " locked");
      d.innerHTML = '<div class="slot-art"></div>' +
        "<h3>" + (has ? sp.enName : "Unknown species") + "</h3>" +
        '<p class="slot-sci">' + (has ? sp.sciName : "—") + "</p>" +
        '<p class="slot-tier">' + sp.tier + (has ? " · " + sp.iucn : "") + "</p>";
      wrap.appendChild(d);
      var art = d.querySelector(".slot-art");
      if (has) window.Fish.render(art, sp);
      else art.innerHTML = window.Fish.svg(Object.assign({}, sp, { color: "#3b4c55", accent: "#2c3a42" }));
    });
  }

  /* ---------- akvarij (pokončno) ---------- */

  var swimmers = [], rafId = null;

  function stopTank() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }

  function renderAquarium() {
    var layer = el("layer-fish");
    layer.innerHTML = "";
    swimmers = [];

    var owned = window.SPECIES.filter(function (s) { return state.fish.indexOf(s.id) > -1; });

    // Globina po vrsti: površinske zgoraj, pridnene spodaj.
    var BAND = {
      "thunnus-thynnus": 0.10, "mola-mola": 0.12, "sardina-pilchardus": 0.18,
      "engraulis-encrasicolus": 0.22, "caretta-caretta": 0.28,
      "dicentrarchus-labrax": 0.38, "sparus-aurata": 0.46,
      "hippocampus-guttulatus": 0.58, "sciaena-umbra": 0.64,
      "anguilla-anguilla": 0.74, "epinephelus-marginatus": 0.80,
      "squatina-squatina": 0.90
    };

    owned.forEach(function (sp) {
      var d = document.createElement("div");
      d.className = "fish";
      layer.appendChild(d);
      window.Fish.render(d, sp);
      var depth = 0.6 + Math.random() * 0.4;                 // bližje = večje in hitrejše
      var base = sp.tier === "epic" ? 1.35 : sp.tier === "rare" ? 1.08 : 0.86;
      d.style.opacity = (0.6 + depth * 0.4).toFixed(2);
      var band = (BAND[sp.id] != null ? BAND[sp.id] : 0.5) * 100 + (Math.random() * 6 - 3);
      d.style.top = band + "%";                              // globina se ne animira
      swimmers.push({
        el: d,
        x: 6 + Math.random() * 70,
        speed: (0.018 + Math.random() * 0.030) * depth,
        dir: Math.random() < 0.5 ? 1 : -1,
        amp: 1.2 + Math.random() * 2.2,
        phase: Math.random() * Math.PI * 2,
        scale: base * depth
      });
    });

    renderBubbles();
    renderDecorations();
    renderShop();
    stopTank();
    tick();
  }

  function tick() {
    var t = Date.now() / 1000;
    for (var i = 0; i < swimmers.length; i++) {
      var f = swimmers[i];
      f.x += f.speed * f.dir;
      if (f.x > 82) { f.x = 82; f.dir = -1; }
      if (f.x < 2)  { f.x = 2;  f.dir = 1; }
      var dy = Math.sin(t * 0.8 + f.phase) * f.amp * 4;   // nihanje v slikovnih tockah
      var flip = f.dir === 1 ? -1 : 1;   // risba gleda v levo
      f.el.style.transform =
        "translate(" + f.x + "vw," + dy + "px) scaleX(" + (flip * f.scale) + ") scaleY(" + f.scale + ")";
    }
    rafId = requestAnimationFrame(tick);
  }

  function renderBubbles() {
    var layer = el("layer-bubbles");
    if (!layer || layer.childElementCount) return;    // enkrat je dovolj
    for (var i = 0; i < 12; i++) {
      var b = document.createElement("div");
      b.className = "bubble";
      var size = 3 + Math.random() * 7;
      b.style.width = size + "px";
      b.style.height = size + "px";
      b.style.left = (4 + Math.random() * 90) + "%";
      b.style.top = (30 + Math.random() * 68) + "%";
      b.style.animationDuration = (7 + Math.random() * 9) + "s";
      b.style.animationDelay = (-Math.random() * 12) + "s";
      layer.appendChild(b);
    }
  }

  // Dekoracije razporedimo po praznih mestih ob dnu, da se ne prekrivajo.
  function placeDecoration(id) {
    var slots = [8, 26, 44, 62, 80];
    var used = state.decorations.map(function (d) { return d.slot; });
    var free = slots.filter(function (s) { return used.indexOf(s) === -1; });
    var slot = free.length ? free[Math.floor(Math.random() * free.length)]
                           : slots[Math.floor(Math.random() * slots.length)];
    return { id: id, slot: slot, x: slot + (Math.random() * 4 - 2), y: 84 + Math.random() * 5 };
  }

  function renderDecorations() {
    var layer = el("layer-deco");
    layer.innerHTML = "";
    state.decorations.forEach(function (d, i) {
      var def = window.ECONOMY.decorations.filter(function (x) { return x.id === d.id; })[0];
      if (!def) return;
      var n = document.createElement("div");
      n.className = "deco";
      n.style.left = (d.x != null ? d.x : (8 + (i * 19) % 76)) + "%";
      n.style.top  = (d.y != null ? d.y : (80 + (i % 3) * 4)) + "%";
      n.innerHTML = window.Fish.decoSvg(def.id);
      // prava slika, če jo je Au že oddala
      var img = new Image();
      img.onload = function () { n.innerHTML = ""; n.appendChild(img); };
      img.onerror = function () {};
      img.src = "assets/deco/" + def.id + ".png";
      layer.appendChild(n);
    });
  }

  function renderShop() {
    el("shop-credits").textContent = state.credits;
    var wrap = el("shop-items");
    wrap.innerHTML = "";
    window.ECONOMY.decorations.forEach(function (d) {
      var owned = state.decorations.filter(function (x) { return x.id === d.id; }).length;
      var b = document.createElement("button");
      b.className = "buy";
      b.disabled = state.credits < d.price;
      b.innerHTML = d.name + (owned ? " ×" + owned : "") + ' <span class="price">' + d.price + " cr</span>";
      b.addEventListener("click", function () {
        if (state.credits < d.price) return;
        state.credits -= d.price;
        state.decorations.push(placeDecoration(d.id));
        save(); renderHud(); renderDecorations(); renderShop();
      });
      wrap.appendChild(b);
    });
  }

  /* ---------- vpliv ---------- */

  function renderImpact() {
    el("impact-count").textContent = state.scans.length;

    var ok = state.scans.filter(function (s) { return s.verified; }).length;
    var flagged = state.scans.length - ok;
    el("verify-summary").innerHTML =
      '<div class="vs" data-k="ok"><div class="n">' + ok + '</div><div class="l">Verified records</div></div>' +
      '<div class="vs" data-k="flag"><div class="n">' + flagged + '</div><div class="l">Logged, needs review</div></div>';

    var counts = {};
    state.scans.forEach(function (s) { counts[s.label] = (counts[s.label] || 0) + 1; });
    var max = Math.max.apply(null, [1].concat(Object.keys(counts).map(function (k) { return counts[k]; })));

    var grid = el("impact-materials");
    grid.innerHTML = "";
    if (!Object.keys(counts).length) {
      grid.innerHTML = '<p class="empty">No records yet. Scan your first piece of litter.</p>';
    }
    Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a]; }).forEach(function (k) {
      var d = document.createElement("div");
      d.className = "mat";
      d.innerHTML = '<div class="n">' + counts[k] + '</div><div class="l">' + k + "</div>" +
                    '<div class="bar" style="width:' + Math.round(counts[k] / max * 100) + '%"></div>';
      grid.appendChild(d);
    });

    var tb = el("impact-rows");
    tb.innerHTML = "";
    state.scans.slice(0, 12).forEach(function (s) {
      var d = new Date(s.t);
      var time = String(d.getDate()).padStart(2, "0") + "." + String(d.getMonth() + 1).padStart(2, "0") +
                 " " + String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
      var zone = s.zone || (s.lat != null ? s.lat + ", " + s.lon : "no location");
      var pill = '<span class="pill" data-v="' + (s.verified ? "yes" : "no") + '">' +
                 (s.verified ? "verified" : (s.failed && s.failed.length ? s.failed[0] : "review")) + "</span>";
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + time + "</td><td>" + s.label + "</td><td>" + zone + "</td><td>" + pill + "</td>";
      tb.appendChild(tr);
    });
    if (!state.scans.length) tb.innerHTML = '<tr><td colspan="4" class="empty">No records.</td></tr>';

    el("impact-note").innerHTML = window.ZONES_UNVERIFIED
      ? '<span class="zone-warn">Cleanup-zone coordinates are placeholders and still have to be measured on site.</span>'
      : "Records live on this device. Once Supabase is connected they are sent there as well.";
  }

  /* ---------- zagon ---------- */

  window.__game = {
    state: state, screen: "scan", build: window.__BUILD__,
    reset: function () { state = blank(); save(); renderHud(); go("scan"); },
    give: function (n) {                       // __game.give(15) simulira 15 skeniranj
      for (var i = 0; i < (n || 1); i++) award(fakeResult(), null, null);
    }
  };

  renderHud();
  go("scan");
})();
