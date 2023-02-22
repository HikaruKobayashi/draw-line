import { extensionStyles } from "./styles.js";
import { config } from "./config.js";

export const drawLine = () => {
  // avoid duplication
  if (document.querySelector(".line-draw")) {
    return;
  }

  // create canvas element
  const targetCanvas = document.createElement("canvas");
  targetCanvas.className = "line-draw";
  document.body.appendChild(targetCanvas);

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

  // create style
  const styleElement = document.createElement("style");
  styleElement.innerText = extensionStyles;
  document
    .getElementsByTagName("head")[0]
    .insertAdjacentElement("beforeend", styleElement);

  // change line color
  let lineColor = config.lineColor;
  let colorBox = document.querySelector(".line-draw-color-picker");
  colorBox.addEventListener("change", (event) => {
    lineColor = event.target.value;
  });

  // init coordinate setting
  let startPointX = 0;
  let startPointY = 0;
  let endPointX = 0;
  let endPointY = 0;

  // canvas setting
  targetCanvas.width = window.innerWidth;
  targetCanvas.height = window.innerHeight;
  const context = targetCanvas.getContext("2d");

  // get starting point
  document.addEventListener("mousedown", (event) => {
    startPointX = event.clientX;
    startPointY = event.clientY;
  });

  // get ending point
  document.addEventListener("mouseup", (event) => {
    endPointX = event.clientX;
    endPointY = event.clientY;
    drawLine();
  });

  // draw a line
  const drawLine = () => {
    context.beginPath();
    context.lineWidth = config.lineWidth; // line width
    context.strokeStyle = lineColor; // line color
    context.moveTo(startPointX, startPointY); // starting point
    context.lineTo(endPointX, endPointY); // ending point
    context.stroke(); // draw a line
  };

  // reset this extension
  resetButton.addEventListener("click", () => {
    resetLineDraw();
  });
  const resetLineDraw = () => {
    let targetCanvas = document.querySelector(".line-draw");
    if (targetCanvas !== null) {
      document.body.removeChild(targetCanvas);
      document.body.removeChild(wrapper);
    }
    targetCanvas = "";
  };
};
