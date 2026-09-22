import assert from "node:assert/strict";
import test from "node:test";

import { generateName } from "../names.js";

test("generates a complete name", () => {
  const name = generateName(() => 0);

  assert.equal(name, "BigCat 0.69 Absolute Unit");
});

test("supports the upper random boundary", () => {
  const name = generateName(() => 0.999999);

  assert.equal(
    name,
    "Gros Courant d'Air 2026-09-XL Vent Arrière — The Reckoning",
  );
});

test("has a large output space", () => {
  const names = new Set();

  for (let index = 0; index < 1000; index += 1) {
    let state = index + 1;
    const random = () => {
      state = (state * 16807) % 2147483647;
      return (state - 1) / 2147483646;
    };

    names.add(generateName(random));
  }

  assert.ok(names.size > 950);
});
