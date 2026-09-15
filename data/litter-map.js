/* Fishdom Cleaner — which litter gives which species.
   LASTNICA / OWNER: Ai.

   OPOMBA ZA EKIPO: vsa besedila, ki jih vidi uporabnik, so v angleščini,
   ker je pitch v angleščini. Komentarji so v slovenščini.

   Vsak vnos potrebuje `source`. Če vira za `effect` ne najdeš, stavka
   ne napiši. Napačna trditev pred žirijo je slabša od manjkajoče.

   `keywords` je seznam, ki ga vidi Gemini kot možne odgovore, in hkrati
   besedilo na gumbu, če uporabnik izbere ročno.
   `pool` so id-ji vrst, ki jih ta material lahko podeli.
*/

window.LITTER_MAP = [
  {
    id: "fishing_gear",
    label: "Fishing gear",
    icon: "🪝",
    keywords: ["fishing line", "net", "lure", "hook", "float", "nylon rope"],
    pool: ["hippocampus-guttulatus", "caretta-caretta", "mola-mola"],
    effect: "Lost fishing gear keeps catching for years after someone loses it. Species that anchor themselves to plants or swim slowly are the first to become entangled.",
    source: "PREVERI IN VPIŠI VIR",
    credits: 12, xp: 15
  },
  {
    id: "plastic_bag",
    label: "Plastic bag or film",
    icon: "🛍️",
    keywords: ["plastic bag", "film", "wrapper", "clear plastic", "packaging"],
    pool: ["caretta-caretta", "mola-mola"],
    effect: "Underwater a plastic bag has the same translucency and the same drifting motion as a jellyfish. Species that feed on jellyfish cannot tell it apart from food.",
    source: "PREVERI IN VPIŠI VIR",
    credits: 10, xp: 12
  },
  {
    id: "bottle_plastic",
    label: "Bottle or cap",
    icon: "🧴",
    keywords: ["plastic bottle", "bottle cap", "hard plastic", "straw", "cup"],
    pool: ["sardina-pilchardus", "engraulis-encrasicolus", "sparus-aurata"],
    effect: "Hard plastic breaks down at sea into fragments the size of plankton. Filter feeders swallow them along with their food, and from there they travel up the entire chain.",
    source: "PREVERI IN VPIŠI VIR",
    credits: 6, xp: 8
  },
  {
    id: "cigarette",
    label: "Cigarette butt",
    icon: "🚬",
    keywords: ["cigarette butt", "filter", "cigarette end"],
    pool: ["sciaena-umbra", "sparus-aurata", "dicentrarchus-labrax"],
    effect: "The filter traps toxic compounds from the smoke and releases them back into the water. Shallow-water species are exposed first, because butts collect exactly where people gather.",
    source: "PREVERI IN VPIŠI VIR",
    credits: 5, xp: 6
  },
  {
    id: "metal_can",
    label: "Can or metal",
    icon: "🥫",
    keywords: ["drinks can", "metal", "bottle cap", "tin", "wire"],
    pool: ["epinephelus-marginatus", "squatina-squatina"],
    effect: "Metal sinks and stays on the bottom. It affects species that live right at the seafloor or bury themselves in it.",
    source: "PREVERI IN VPIŠI VIR",
    credits: 8, xp: 10
  },
  {
    id: "glass",
    label: "Glass",
    icon: "🍾",
    keywords: ["glass bottle", "glass", "shard", "jar"],
    pool: ["sciaena-umbra", "epinephelus-marginatus"],
    effect: "Glass does not decompose, it shatters. Sharp pieces stay among the rocks and in crevices, which is exactly where reef-dwelling species shelter.",
    source: "PREVERI IN VPIŠI VIR",
    credits: 7, xp: 9
  },
  {
    id: "polystyrene",
    label: "Polystyrene",
    icon: "📦",
    keywords: ["polystyrene", "styrofoam", "white foam", "fish crate"],
    pool: ["thunnus-thynnus", "mola-mola"],
    effect: "Polystyrene floats and crumbles into small white beads. Surface predators mistake them for prey.",
    source: "PREVERI IN VPIŠI VIR",
    credits: 9, xp: 11
  },
  {
    id: "river_mouth",
    label: "River mouth debris",
    icon: "🌊",
    keywords: ["river debris", "washed-up waste", "mixed river litter"],
    pool: ["anguilla-anguilla", "caretta-caretta"],
    effect: "Most marine litter reaches the sea through rivers. Migratory species that travel between river and sea pass through this zone twice in their lives.",
    source: "PREVERI IN VPIŠI VIR",
    credits: 14, xp: 18
  },
  {
    id: "other",
    label: "Something else",
    icon: "❓",
    keywords: ["unidentified waste", "other"],
    pool: ["sparus-aurata", "dicentrarchus-labrax", "sardina-pilchardus"],
    effect: "Logged waste we could not classify. It still counts — the quantity is a data point in itself.",
    source: "—",
    credits: 4, xp: 5
  }
];

/* Ekonomija igre. LASTNICA: Ai.
   Pred vsako spremembo preveri eno stvar s kalkulatorjem:
   po 15 skeniranjih — ali si igralec lahko privošči vsaj dve dekoraciji
   in ali doseže nivo 3? Če ne, so te številke napačne. */
window.ECONOMY = {
  levels: [0, 40, 100, 190, 320],      // XP za nivoje 1..5
  tierUnlockLevel: { "common": 1, "rare": 3, "epic": 5 },
  tierChance:      { "common": 0.60, "rare": 0.32, "epic": 0.08 },
  decorations: [
    { id: "alge",   name: "Algae",    price: 30, art: "algae.png"   },
    { id: "skala",  name: "Rock",     price: 45, art: "rock.png"    },
    { id: "trava",  name: "Seagrass", price: 60, art: "seagrass.png"},
    { id: "korala", name: "Coral",    price: 90, art: "coral.png"   }
  ]
};
