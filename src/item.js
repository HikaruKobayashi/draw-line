import { config } from "./config.js";
import { extensionStyles } from "./styles.js";

export const createItem = () => {
  // create wrapper element
  const wrapper = document.createElement("div");
  wrapper.className = "line-draw-wrapper";
  document.body.appendChild(wrapper);

  // create color picker
  const colorPicker = document.createElement("input");
  colorPicker.type = "color";
  colorPicker.className = "line-draw-color-picker";
  wrapper.appendChild(colorPicker);

  // create reset button element
  const resetButton = document.createElement("button");
  resetButton.innerHTML = config.resetButtonText;
  resetButton.className = "line-draw-reset-button";
  wrapper.appendChild(resetButton);

  // create close button element
  const closeButton = document.createElement("button");
  closeButton.className = "line-draw-close-button";
  wrapper.appendChild(closeButton);

  // create style
  const styleElement = document.createElement("style");
  styleElement.innerText = extensionStyles;
  document
    .getElementsByTagName("head")[0]
    .insertAdjacentElement("beforeend", styleElement);
};
