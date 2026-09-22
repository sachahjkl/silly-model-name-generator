import { generateName } from "./names.js";

const nameElement = document.querySelector("#model-name");
const generateButton = document.querySelector("#generate-button");
const copyButton = document.querySelector("#copy-button");
const copyLabel = copyButton.querySelector("span");

const recentNames = [];

function showNewName() {
  let nextName = generateName();
  let attempts = 0;

  while (recentNames.includes(nextName) && attempts < 20) {
    nextName = generateName();
    attempts += 1;
  }

  recentNames.push(nextName);

  if (recentNames.length > 50) {
    recentNames.shift();
  }

  nameElement.classList.remove("refreshing");
  void nameElement.offsetWidth;
  nameElement.textContent = nextName;
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
