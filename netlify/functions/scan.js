/* Fishdom Cleaner — prepoznavanje smeti.
   OWNER: V (prek Clauda).

   Ta datoteka se izvaja na Netlifyju, ne v brskalniku. Zato je Gemini
   ključ tukaj varen — v kodo aplikacije ga ne vpisujemo nikoli.

   KAM SE VPIŠE KLJUČ:
   Netlify → tvoja stran → Site configuration → Environment variables
   → Add a variable → ime: GEMINI_API_KEY, vrednost: tvoj ključ.
   Po vpisu je treba stran še enkrat objaviti, da se sprememba upošteva.

   Če ključa ni ali klic ne uspe, aplikacija sama preklopi v demo način.
*/

const MODEL = "gemini-flash-lite-latest";

const MATERIALS = [
  { id: "fishing_gear",   examples: "fishing line, net, lure, hook, float, nylon rope" },
  { id: "plastic_bag",    examples: "plastic bag, film, wrapper, clear plastic packaging" },
  { id: "bottle_plastic", examples: "plastic bottle, bottle cap, straw, plastic cup, hard plastic" },
  { id: "cigarette",      examples: "cigarette butt, filter" },
  { id: "metal_can",      examples: "drinks can, metal bottle cap, tin, wire" },
  { id: "glass",          examples: "glass bottle, glass shard, jar" },
  { id: "polystyrene",    examples: "polystyrene, styrofoam, white foam, foam fish crate" },
  { id: "river_mouth",    examples: "mixed debris washed up at a river mouth" },
  { id: "other",          examples: "any other piece of waste" }
];

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "use POST" });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return json(503, { error: "GEMINI_API_KEY is not set in Netlify Environment variables" });
  }

  let image;
  try {
    image = JSON.parse(event.body || "{}").image;
  } catch (e) {
    return json(400, { error: "request body is not valid JSON" });
  }
  if (!image) return json(400, { error: "missing field: image" });

  const list = MATERIALS.map(m => `- ${m.id}: ${m.examples}`).join("\n");

  const prompt =
`The photo shows an object someone has just picked up on a shoreline or in a marina.
Classify it into exactly one of these categories:
${list}

Also judge where the photo was taken, from the visible surroundings
(sand, pebbles, sea, rocks, a quay, a boat) versus an indoor or street setting.

Reply with a JSON object ONLY, no explanation and no code fences:
{"materialId":"<id from the list>","item":"<name of the object in English, 1-3 words>","isLitter":true|false,"setting":"beach"|"marina"|"waterside"|"outdoor"|"urban"|"indoor"|"unclear","confidence":<0.0-1.0>}

If there is no piece of waste in the photo, use materialId "other" and isLitter false.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inline_data: { mime_type: "image/jpeg", data: image } }
          ]
        }],
        generationConfig: { temperature: 0, responseMimeType: "application/json" }
      })
    });

    if (!res.ok) {
      const detail = await res.text();
      return json(502, { error: "Gemini returned " + res.status, detail: detail.slice(0, 400) });
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const parsed = JSON.parse(text.replace(/^```json\s*|\s*```$/g, "").trim());

    const known = MATERIALS.some(m => m.id === parsed.materialId);
    return json(200, {
      materialId: known ? parsed.materialId : "other",
      item: parsed.item || "waste",
      isLitter: parsed.isLitter !== false,
      setting: parsed.setting || "unclear",
      confidence: typeof parsed.confidence === "number" ? parsed.confidence : 0.5
    });

  } catch (err) {
    return json(502, { error: "request failed", detail: String(err).slice(0, 300) });
  }
};

function json(status, body) {
  return {
    statusCode: status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body)
  };
}
