const versions = [
  "0.69",
  "2.9",
  "3.1",
  "3.5",
  "4o",
  "4.20",
  "4.7",
  "5.2",
  "6-ish",
  "R2",
  "R34",
  "X3",
  "0613",
  "2026-09-XL",
];

const sizes = [
  "6.9B",
  "7B",
  "13B",
  "32B",
  "69B",
  "70B",
  "420B",
  "405B",
  "8x22B",
  "TooManyB",
];

const loudEditions = [
  "Absolute Unit",
  "After Dark",
  "Balls-to-the-Wall",
  "Beef Supreme",
  "Big Context Energy",
  "Certified Thicc",
  "Daddy Edition",
  "Deeply Unsure",
  "Double-Stuffed",
  "Extra Large",
  "Fully Loaded",
  "Full Monty",
  "Hard Thinking",
  "Heavy Duty",
  "Huge If True",
  "Just the Tip Preview",
  "Long Context",
  "Magnum",
  "Massive",
  "Maximum Length",
  "Morning Release",
  "No Pants Mode",
  "Performance Issues",
  "Premature Preview",
  "Pro Max Ultra Plus",
  "Raw & Unaligned",
  "Size Matters Edition",
  "Suspiciously Girthy",
  "Token Tease",
  "Uncut",
  "Unreasonably Large",
  "XL Pleasure Context",
];

const fastEditions = [
  "Blink and Miss It",
  "Fast & Flirtatious",
  "Flashbang",
  "Greased Lightning",
  "Instant Regret",
  "Instant-ish",
  "Little Quickie",
  "Mini but Mighty",
  "Mini Turbo",
  "Premature Inference",
  "Quicker Picker",
  "Speedrun Preview",
  "Too Fast Too Curious",
  "Zero Patience Edition",
];

const poeticEditions = [
  "Big Ballad",
  "Dirty Limerick",
  "Epic Ballad",
  "Haiku After Dark",
  "Haiku XL",
  "Horny Haiku",
  "Limerick Magnum",
  "Moaning Monologue",
  "Naughty Novella",
  "Opus Maximus",
  "Romantic Fanfic",
  "Suggestive Sonnet",
  "Thirsty Verse",
  "Unsolicited Poetry",
];

const corporateEditions = [
  "Boardroom Banger",
  "Business Casual",
  "Enterprise-ish",
  "Executive Package",
  "Fiscal Daddy",
  "Growth Hacking Edition",
  "Meeting That Could Be an Email",
  "Premium Premium",
  "Shareholder Value Max",
  "Synergy Pro",
  "Unlimited Limited Preview",
  "Venture-Backed Delusion",
];

const frenchEditions = [
  "Baguette Quantique",
  "Beaucoup Trop Grand",
  "C'est Énorme",
  "Croissant Turbo",
  "Édition Beau Gosse",
  "Grande Rafale",
  "Gros Débit",
  "La Totale",
  "Le Magnifique",
  "Maxi Cochon",
  "Petit Mais Costaud",
  "Réflexion Baguette",
  "Sans Filtre",
  "Très Très Lourd",
  "Vent Arrière",
];

const releaseTags = [
  "",
  "",
  "",
  " (Definitely Final)",
  " [REDACTED]",
  " — Research Preview",
  " — Now With More B",
  " — Please Clap",
  " — Safety Optional",
  " — The Reckoning",
];

function pick(items, random) {
  return items[Math.floor(random() * items.length)];
}

function model(bases, editions, random, scale = versions) {
  return `${pick(bases, random)} ${pick(scale, random)} ${pick(editions, random)}${pick(releaseTags, random)}`;
}

const families = [
  (random) =>
    model(
      ["BigCat", "CatGPT", "ChatGPP", "FatGPT", "Kitty-o", "OpenAyy"],
      loudEditions,
      random,
    ),
  (random) =>
    model(
      ["Clawd", "Clawdacious", "Uncle Clawd", "Claudezilla"],
      poeticEditions,
      random,
    ),
  (random) =>
    model(
      ["Gemino", "Geminaughty", "Gemini Cricket", "Googley Eyes"],
      fastEditions,
      random,
    ),
  (random) =>
    model(
      ["Gronk", "Gronk Hard", "Grok & Roll", "Elon's Little Helper"],
      loudEditions,
      random,
    ),
  (random) =>
    model(
      ["Llama Drama", "Llama Del Rey", "Llamazon Prime", "No Probllama"],
      loudEditions,
      random,
      sizes,
    ),
  (random) =>
    model(
      ["DeepPeek", "DeeperSeek", "DeepFreak", "DeepCheeks"],
      loudEditions,
      random,
    ),
  (random) =>
    model(
      ["Qwentyn", "Qwenjamin", "Qwen Diesel", "Qwen Stefani"],
      corporateEditions,
      random,
      sizes,
    ),
  (random) =>
    model(
      ["Co-Pirate", "Copilout", "GitHub Boyfriend", "Autocomplete Daddy"],
      corporateEditions,
      random,
    ),
  (random) =>
    model(
      ["Failcon", "Stable Diffusionary", "Midjourneyman", "Perplexed AI"],
      corporateEditions,
      random,
      sizes,
    ),
  (random) =>
    model(
      ["Mixtrouille", "Jean-Mistral", "Le Gros Modèle", "Mistral Gagnant"],
      frenchEditions,
      random,
      sizes,
    ),
  (random) =>
    model(
      ["Le Mistral", "La Bourrasque", "Le Petit Vent", "Gros Courant d'Air"],
      frenchEditions,
      random,
    ),
];

export function generateName(random = Math.random) {
  return pick(families, random)(random);
}
