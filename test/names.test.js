import assert from "node:assert/strict";
import test from "node:test";

import { generateName } from "../names.js";

test("generates a complete name", () => {
  const name = generateName(() => 0);

  assert.equal(name, "BigCat-2.9 Big Context Energy");
});

test("supports the upper random boundary", () => {
  const name = generateName(() => 0.999999);

  assert.equal(name, "Le Mistral X3 Sans Filtre");
});
