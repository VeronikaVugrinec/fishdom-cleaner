/* Fishdom Cleaner — nadomestna grafika rib.
   OWNER: Au (dokler ne oddaš pravih PNG datotek).

   KAKO TO DELUJE: dokler v assets/fish/ ni prave slike, aplikacija
   nariše ribo iz nekaj številk — telo, rep, plavut, oko. Vse ribe so
   zato med sabo usklajene in igra je igrljiva, še preden je grafika
   narejena.

   KO ODDAŠ PRAVO SLIKO: shrani jo kot assets/fish/<id>.png
   (na primer assets/fish/sparus-aurata.png) in aplikacija jo bo
   samodejno uporabila namesto risbe. Nič ni treba spreminjati v kodi.
*/

window.Fish = (function () {

  // Oblike po redkosti: bolj redke vrste so bolj podolgovate.
  const SHAPE = {
    "common": { len: 1.00, height: 0.52, tail: 0.30 },
    "rare":   { len: 1.08, height: 0.44, tail: 0.34 },
    "epic":   { len: 1.18, height: 0.38, tail: 0.40 }
  };

  function svg(sp) {
    const s = SHAPE[sp.tier] || SHAPE["common"];
    const W = 300, H = 200;
    const cx = W * 0.52, cy = H * 0.5;
    const bw = W * 0.36 * s.len;      // pol dolžine telesa
    const bh = H * 0.5 * s.height;    // pol višine telesa

    const noseX = cx + bw;
    const tailX = cx - bw;
    const tw = bw * s.tail;

    return `
<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${sp.slName}">
  <defs>
    <linearGradient id="g-${sp.id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"  stop-color="${sp.color}"/>
      <stop offset="62%" stop-color="${sp.color}"/>
      <stop offset="100%" stop-color="${shade(sp.color, -26)}"/>
    </linearGradient>
  </defs>

  <!-- zgornja plavut -->
  <path d="M ${cx - bw*0.32} ${cy - bh*0.92}
           Q ${cx - bw*0.05} ${cy - bh*1.72} ${cx + bw*0.30} ${cy - bh*0.80} Z"
        fill="${sp.accent}"/>
  <!-- spodnja plavut -->
  <path d="M ${cx - bw*0.10} ${cy + bh*0.86}
           Q ${cx + bw*0.10} ${cy + bh*1.46} ${cx + bw*0.36} ${cy + bh*0.70} Z"
        fill="${sp.accent}"/>
  <!-- rep -->
  <path d="M ${tailX + tw*0.30} ${cy}
           L ${tailX - tw*1.35} ${cy - bh*1.02}
           Q ${tailX - tw*0.55} ${cy} ${tailX - tw*1.35} ${cy + bh*1.02} Z"
        fill="${sp.accent}"/>
  <!-- telo -->
  <path d="M ${noseX} ${cy}
           Q ${cx + bw*0.20} ${cy - bh} ${tailX + tw*0.22} ${cy}
           Q ${cx + bw*0.20} ${cy + bh} ${noseX} ${cy} Z"
        fill="url(#g-${sp.id})"
        stroke="${shade(sp.color, 46)}" stroke-width="1.6" stroke-opacity=".45"/>
  <!-- škrga -->
  <path d="M ${cx + bw*0.44} ${cy - bh*0.60}
           Q ${cx + bw*0.30} ${cy} ${cx + bw*0.44} ${cy + bh*0.60}"
        fill="none" stroke="${shade(sp.color, -34)}" stroke-width="2.5" stroke-linecap="round" opacity=".75"/>
  <!-- oko -->
  <circle cx="${cx + bw*0.70}" cy="${cy - bh*0.22}" r="${Math.max(5, bh*0.19)}" fill="#0b1f27"/>
  <circle cx="${cx + bw*0.73}" cy="${cy - bh*0.30}" r="${Math.max(1.8, bh*0.07)}" fill="#ffffff" opacity=".9"/>
</svg>`;
  }

  // Vrne <img> s pravo sliko, če obstaja, sicer narisano ribo.
  function render(el, sp) {
    el.innerHTML = svg(sp);
    const img = new Image();
    img.onload = function () {
      el.innerHTML = "";
      img.alt = sp.slName;
      img.style.width = "100%";
      img.style.height = "auto";
      img.style.display = "block";
      el.appendChild(img);
    };
    img.onerror = function () { /* nič — narisana riba ostane */ };
    img.src = "assets/fish/" + sp.id + ".png";
  }

  // Preprosta dekoracija, dokler ni prave slike.
  function decoSvg(id) {
    const shapes = {
      alge:   '<path d="M50 100 Q34 66 50 34 Q62 60 50 100Z" fill="#3f8f76"/><path d="M64 100 Q80 70 70 44 Q58 70 64 100Z" fill="#357a64"/>',
      skala:  '<path d="M8 100 Q20 52 50 44 Q82 52 92 100Z" fill="#5c6870"/><path d="M28 100 Q38 70 54 66 Q70 74 74 100Z" fill="#6d7a82" opacity=".7"/>',
      trava:  '<path d="M22 100 Q26 56 34 24" stroke="#4c9c62" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M46 100 Q48 50 44 18" stroke="#57ab6d" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M70 100 Q74 60 82 30" stroke="#4c9c62" stroke-width="7" fill="none" stroke-linecap="round"/>',
      korala: '<path d="M50 100 V62" stroke="#e0714f" stroke-width="9" stroke-linecap="round"/><path d="M50 70 Q32 58 26 32" stroke="#e0714f" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M50 70 Q68 56 76 30" stroke="#ef8b6b" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="26" cy="30" r="7" fill="#ef8b6b"/><circle cx="76" cy="28" r="7" fill="#e0714f"/>'
    };
    return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
           (shapes[id] || shapes.skala) + '</svg>';
  }

  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
      .map(v => Math.max(0, Math.min(255, v + amt)));
    return "#" + c.map(v => v.toString(16).padStart(2, "0")).join("");
  }

  return { svg, render, decoSvg };
})();
