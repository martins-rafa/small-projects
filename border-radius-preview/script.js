"use strict";

const root = document.querySelector(":root");

const topLeft = document.getElementById("top-left");
const topRight = document.getElementById("top-right");
const bottomLeft = document.getElementById("bottom-left");
const bottomRight = document.getElementById("bottom-right");

const cssProperties = document.querySelector(".css-properties");

let topLeftValue = "0px";
let topRightValue = "0px";
let bottomLeftValue = "0px";
let bottomRightValue = "0px";

let markup = "";

function setMarkup() {
  if (
    topLeftValue === topRightValue &&
    topLeftValue === bottomLeftValue &&
    topLeftValue === bottomRightValue
  ) {
    markup = `
            <p>
                &nbsp;border-radius: ${topLeftValue};<br>
            </p>
        `;
  } else if (
    topLeftValue === bottomRightValue &&
    topLeftValue !== topRightValue &&
    bottomLeftValue === topRightValue
  ) {
    markup = `
            <p>
                &nbsp;border-radius: ${topLeftValue} ${bottomLeftValue};<br>
            </p>
        `;
  } else {
    markup = `
            <p>
                &nbsp;border-radius: ${topLeftValue} ${topRightValue} ${bottomRightValue} ${bottomLeftValue};<br>
            </p>
        `;
  }

  cssProperties.innerHTML = markup;
}

setMarkup();

function setCssVariableValue(inputField, inputValue) {
  root.style.setProperty(inputField, inputValue);
}

topLeft.addEventListener("input", () => {
  topLeftValue = `${topLeft.value > 0 ? topLeft.value : "0"}px`;
  const inputField = `--${topLeft.id}`;

  setCssVariableValue(inputField, topLeftValue);

  setMarkup();
});

topRight.addEventListener("input", () => {
  topRightValue = `${topRight.value > 0 ? topRight.value : "0"}px`;
  const inputField = `--${topRight.id}`;

  setCssVariableValue(inputField, topRightValue);
  setMarkup();
});

bottomLeft.addEventListener("input", () => {
  bottomLeftValue = `${bottomLeft.value > 0 ? bottomLeft.value : "0"}px`;
  const inputField = `--${bottomLeft.id}`;

  setCssVariableValue(inputField, bottomLeftValue);
  setMarkup();
});

bottomRight.addEventListener("input", () => {
  bottomRightValue = `${bottomRight.value > 0 ? bottomRight.value : "0"}px`;
  const inputField = `--${bottomRight.id}`;

  setCssVariableValue(inputField, bottomRightValue);
  setMarkup();
});
