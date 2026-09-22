import assert from "node:assert/strict";
import test from "node:test";

import { generateModel, generateName } from "../names.js";

test("generates a complete name", () => {
  const name = generateName(() => 0);

  assert.equal(name, "BigCat 0.69 Absolute Unit");
});

test("supports the upper random boundary", () => {
  const name = generateName(() => 0.999999);

  assert.equal(name, "BaguetteLM ∞B Zéro Gêne");
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

  assert.ok(names.size > 700);
});

test("does not reuse parts from the previous 30 generations", () => {
  const history = [];
  let state = 42;
  const random = () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };

  for (let index = 0; index < 100; index += 1) {
    const excludedParts = new Set(history.flat());
    const model = generateModel({ random, excludedParts });

    assert.ok(model.parts.every((part) => !excludedParts.has(part)));
    history.push(model.parts);

    if (history.length > 30) {
      history.shift();
    }
  }
});
