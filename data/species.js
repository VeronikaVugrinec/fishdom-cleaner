/* Fishdom Cleaner — species list.
   LASTNICI / OWNERS: V (cardText) + Ai (vsi ostali stolpci).

   OPOMBA ZA EKIPO: vsa besedila, ki jih vidi uporabnik, so v angleščini,
   ker je pitch v angleščini. Slovensko ime ostane v polju slName za
   morebitno kasnejšo slovensko različico, a se zaenkrat nikjer ne prikaže.

   iucn:   ena od "LC", "NT", "VU", "EN", "CR", "DD"
   verify: true  = tega še nihče ni preveril na iucnredlist.org.
           Ko preveriš, nastavi na false.
           Napačen naravovarstveni status je edina vsebinska napaka,
           ki na odru stane največ — preveri prav vsakega.
   tier:   "common" | "rare" | "epic"
   Slika:  assets/fish/<id>.png. Če je ni, aplikacija ribo nariše sama,
           tako da grafiko lahko dodaš kasneje in nič ne blokira.
*/

window.SPECIES = [
  {
    id: "sparus-aurata",
    sciName: "Sparus aurata",
    slName: "Orada",
    enName: "Gilt-head bream",
    iucn: "LC", verify: true,
    tier: "common",
    habitat: "Sand and seagrass beds to 30 m, often in brackish water",
    diet: "Shellfish, crustaceans, small fish",
    maxSize: "70 cm",
    color: "#C9B98A", accent: "#7E9BB5",
    cardText: "The gilt-head bream crushes shellfish with teeth shaped like millstones. That is exactly why it is among the first species to accumulate microplastic in its gut — along with the shell fragments it picks up everything lying between them."
  },
  {
    id: "dicentrarchus-labrax",
    sciName: "Dicentrarchus labrax",
    slName: "Brancin",
    enName: "European seabass",
    iucn: "LC", verify: true,
    tier: "common",
    habitat: "Coastal waters, river mouths, lagoons",
    diet: "Small fish, crustaceans, cephalopods",
    maxSize: "103 cm",
    color: "#A9B6BE", accent: "#4F6B7A",
    cardText: "The seabass moves between sea and fresh water, so it is found kilometres upriver. That makes it a good indicator of how far inland coastal pollution actually travels."
  },
  {
    id: "sardina-pilchardus",
    sciName: "Sardina pilchardus",
    slName: "Sardela",
    enName: "European pilchard",
    iucn: "LC", verify: true,
    tier: "common",
    habitat: "Open water, schools near the surface",
    diet: "Planktonic crustaceans, larvae",
    maxSize: "27 cm",
    color: "#9FB8C4", accent: "#3F5A66",
    cardText: "The pilchard feeds by swimming with its mouth open and filtering plankton. Microplastic drifts at exactly the same size as its food, so it cannot separate the two — and because almost every larger species eats pilchards, the plastic spreads from here through the whole food web."
  },
  {
    id: "engraulis-encrasicolus",
    sciName: "Engraulis encrasicolus",
    slName: "Sardon",
    enName: "European anchovy",
    iucn: "LC", verify: true,
    tier: "common",
    habitat: "Open and coastal water, large schools",
    diet: "Zooplankton",
    maxSize: "20 cm",
    color: "#B7C6CC", accent: "#2F4A57",
    cardText: "The anchovy finds prey by smell. Research suggests that plastic colonised by algae gives off compounds similar to plankton — so the fish is not fooled by how it looks, but by how it smells."
  },

  {
    id: "sciaena-umbra",
    sciName: "Sciaena umbra",
    slName: "Kavala",
    enName: "Brown meagre",
    iucn: "NT", verify: true,
    tier: "rare",
    habitat: "Rocky bottoms and crevices, 5–50 m",
    diet: "Crustaceans, small fish",
    maxSize: "70 cm",
    color: "#8E7F6D", accent: "#C9A227",
    cardText: "The brown meagre communicates by drumming, using muscles against its swim bladder. It stays in small groups in the same crevice for years, so local pollution hits the entire group at once."
  },
  {
    id: "hippocampus-guttulatus",
    sciName: "Hippocampus guttulatus",
    slName: "Morski konjiček",
    enName: "Long-snouted seahorse",
    iucn: "DD", verify: true,
    tier: "rare",
    habitat: "Seagrass meadows and algae in shallow water",
    diet: "Tiny crustaceans",
    maxSize: "18 cm",
    color: "#C08A3E", accent: "#5E7A42",
    cardText: "The seahorse grips a plant with its tail and stays there. When it grips a discarded fishing line instead of a stem, it stays tethered to it — entanglement in lost gear kills more of them than predators do."
  },
  {
    id: "epinephelus-marginatus",
    sciName: "Epinephelus marginatus",
    slName: "Kirnja",
    enName: "Dusky grouper",
    iucn: "VU", verify: true,
    tier: "rare",
    habitat: "Rock walls and caves, 10–50 m",
    diet: "Octopus, crustaceans, fish",
    maxSize: "150 cm",
    color: "#7A6E5F", accent: "#A8985F",
    cardText: "Every dusky grouper hatches female and only becomes male at around ten years old. Because fishing removes the largest individuals first, it removes precisely the males — a population can collapse before the number of fish visibly drops."
  },
  {
    id: "thunnus-thynnus",
    sciName: "Thunnus thynnus",
    slName: "Modroplavuti tun",
    enName: "Atlantic bluefin tuna",
    iucn: "LC", verify: true,
    tier: "rare",
    habitat: "Open sea, seasonal migrations into the Mediterranean",
    diet: "Fish, cephalopods",
    maxSize: "330 cm",
    color: "#3E5D73", accent: "#D0D8DC",
    cardText: "The bluefin is the one recovery story on this list: in 2021 the IUCN moved it from Endangered to Least Concern because the quotas worked. Global status is still not the same thing as the health of any single population."
  },
  {
    id: "mola-mola",
    sciName: "Mola mola",
    slName: "Luna riba",
    enName: "Ocean sunfish",
    iucn: "VU", verify: true,
    tier: "rare",
    habitat: "Open sea, often at the surface",
    diet: "Jellyfish, salps",
    maxSize: "330 cm",
    color: "#93A3AD", accent: "#E2E8EA",
    cardText: "The sunfish feeds almost entirely on jellyfish. A plastic bag in water has the same translucency and the same motion, which makes it practically indistinguishable from food."
  },

  {
    id: "squatina-squatina",
    sciName: "Squatina squatina",
    slName: "Sklat",
    enName: "Angelshark",
    iucn: "CR", verify: true,
    tier: "epic",
    habitat: "Sand and mud bottoms, buried up to the eyes",
    diet: "Bottom-dwelling fish, crustaceans",
    maxSize: "240 cm",
    color: "#9A9280", accent: "#4A4740",
    cardText: "The angelshark is a shark that ambushes prey while buried in sand. Because it lies on the bottom, it is caught by almost any net dragged along it — across much of the Adriatic it is considered functionally extinct."
  },
  {
    id: "anguilla-anguilla",
    sciName: "Anguilla anguilla",
    slName: "Jegulja",
    enName: "European eel",
    iucn: "CR", verify: true,
    tier: "epic",
    habitat: "Rivers, estuaries and sea — all three in one lifetime",
    diet: "Invertebrates, fish",
    maxSize: "133 cm",
    color: "#6A7057", accent: "#C6B77A",
    cardText: "The eel hatches in the Sargasso Sea, swims into Adriatic rivers, grows there, and crosses the entire Atlantic again to spawn. Every barrier and every pollutant along that route counts — which is why it links the sea and inland waters like no other species."
  },
  {
    id: "caretta-caretta",
    sciName: "Caretta caretta",
    slName: "Glavata kareta",
    enName: "Loggerhead turtle",
    iucn: "VU", verify: true,
    tier: "epic",
    habitat: "Open sea and shallows, nests on sandy beaches",
    diet: "Shellfish, crustaceans, jellyfish",
    maxSize: "110 cm shell",
    color: "#A07C49", accent: "#4C6B4A",
    cardText: "The loggerhead feeds in the Adriatic and spends most of the year here. Once it swallows a plastic bag it cannot bring it back up — its throat is lined with backward-facing spines that let food move in one direction only."
  }
];
