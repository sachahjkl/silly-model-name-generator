const versions = ["2.9", "3.1", "4o", "4.7", "5.2", "R2", "X3"];
const sizes = ["7B", "32B", "69B", "405B", "8x22B"];

const loudEditions = [
  "Big Context Energy",
  "Extra Large",
  "Full Monty",
  "Heavy Duty",
  "Magnum",
  "Max Pro Plus",
  "Size Matters Edition",
  "Thinking Hard",
  "Uncut Preview",
];

const fastEditions = [
  "Flashbang",
  "Greased Lightning",
  "Instant-ish",
  "Mini Turbo",
  "Quicker Picker",
  "Speedrun Preview",
];

const poeticEditions = [
  "Dirty Limerick",
  "Epic Ballad",
  "Haiku XL",
  "Limerick Magnum",
  "Opus Maximus",
  "Suggestive Sonnet",
];

const frenchEditions = [
  "Croissant Turbo",
  "Grande Rafale",
  "Le Magnifique",
  "Petit Mais Costaud",
  "Réflexion Baguette",
  "Sans Filtre",
];

function pick(items, random) {
  return items[Math.floor(random() * items.length)];
}

const families = [
  (random) => `BigCat-${pick(versions, random)} ${pick(loudEditions, random)}`,
  (random) => `CatGPT-${pick(versions, random)} ${pick(fastEditions, random)}`,
  (random) => `Clawd ${pick(versions, random)} ${pick(poeticEditions, random)}`,
  (random) => `Gemino ${pick(versions, random)} ${pick(fastEditions, random)}`,
  (random) => `Gronk ${pick(versions, random)} ${pick(loudEditions, random)}`,
  (random) => `Llama Drama ${pick(versions, random)} ${pick(sizes, random)}`,
  (random) =>
    `DeepPeek ${pick(versions, random)} ${pick(loudEditions, random)}`,
  (random) =>
    `Qwentyn ${pick(versions, random)} ${pick(sizes, random)} Instruct-ish`,
  (random) =>
    `Mixtrouille ${pick(sizes, random)} ${pick(frenchEditions, random)}`,
  (random) =>
    `Le Mistral ${pick(versions, random)} ${pick(frenchEditions, random)}`,
];

export function generateName(random = Math.random) {
  return pick(families, random)(random);
}
