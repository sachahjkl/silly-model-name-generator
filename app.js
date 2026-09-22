import { generateName } from "./names.js";

const nameElement = document.querySelector("#model-name");
const generateButton = document.querySelector("#generate-button");
const copyButton = document.querySelector("#copy-button");
const copyLabel = copyButton.querySelector("span");

let currentName = "";

function showNewName() {
  let nextName = generateName();

  while (nextName === currentName) {
    nextName = generateName();
  }

  currentName = nextName;
  nameElement.classList.remove("refreshing");
  void nameElement.offsetWidth;
  nameElement.textContent = currentName;
  nameElement.classList.add("refreshing");
  copyLabel.textContent = "Copy name";
}

async function copyName() {
  await navigator.clipboard.writeText(currentName);
  copyLabel.textContent = "Copied!";

  window.setTimeout(() => {
    copyLabel.textContent = "Copy name";
  }, 1600);
}

generateButton.addEventListener("click", showNewName);
copyButton.addEventListener("click", copyName);

showNewName();
