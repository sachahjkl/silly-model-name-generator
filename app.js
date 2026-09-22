import { generateModel } from "./names.js";

const nameElement = document.querySelector("#model-name");
const generateButton = document.querySelector("#generate-button");
const copyButton = document.querySelector("#copy-button");
const copyLabel = copyButton.querySelector("span");

const recentParts = [];

function showNewName() {
  const excludedParts = new Set(recentParts.flat());
  const model = generateModel({ excludedParts });

  recentParts.push(model.parts);

  if (recentParts.length > 30) {
    recentParts.shift();
  }

  nameElement.classList.remove("refreshing");
  void nameElement.offsetWidth;
  nameElement.textContent = model.name;
  nameElement.classList.add("refreshing");
  copyLabel.textContent = "Copy name";
}

async function copyName() {
  await navigator.clipboard.writeText(nameElement.textContent);
  copyLabel.textContent = "Copied!";

  window.setTimeout(() => {
    copyLabel.textContent = "Copy name";
  }, 1600);
}

generateButton.addEventListener("click", showNewName);
copyButton.addEventListener("click", copyName);

showNewName();
