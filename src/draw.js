import { config } from "./config.js";
import { createItem } from "./item.js";

export const drawLine = () => {
  // avoid duplication
  if (document.querySelector(".line-draw")) {
    return;
  }

  // create canvas element
  const targetCanvas = document.createElement("canvas");
  targetCanvas.className = "line-draw";
  document.body.appendChild(targetCanvas);

  // create other element and styles
  createItem();

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
  let movePointX = 0;
  let movePointY = 0;

  // line positions
  let storedLines = [];

  // canvas setting
  targetCanvas.width = window.innerWidth;
  targetCanvas.height = window.innerHeight;
  const context = targetCanvas.getContext("2d");

  // mouse move flg
  let isMove = false;

  // toggle isMove flg
  const toggleIsMove = () => {
    isMove = !isMove;
  };

  // get starting point
  document.addEventListener("mousedown", (event) => {
    startPointX = event.clientX;
    startPointY = event.clientY;
    toggleIsMove();
  });

  // get moving point and draw line
  document.addEventListener("mousemove", (event) => {
    if (!isMove) {
      return;
    }
    resetAndDraw();
    movePointX = event.clientX;
    movePointY = event.clientY;
    drawLine(startPointX, startPointY, movePointX, movePointY);
  });

  // get ending point
  document.addEventListener("mouseup", (event) => {
    toggleIsMove();
    endPointX = event.clientX;
    endPointY = event.clientY;
    // store lines position
    storedLines.push({
      startPointX: startPointX,
      startPointY: startPointY,
      endPointX: endPointX,
      endPointY: endPointY,
    });
  });

  // draw a line
  const drawLine = (startPointX, startPointY, endPointX, endPointY) => {
    context.beginPath();
    context.lineWidth = config.lineWidth; // line width
    context.strokeStyle = lineColor; // line color
    context.moveTo(startPointX, startPointY); // starting point
    context.lineTo(endPointX, endPointY); // ending point
    context.stroke(); // draw a line
  };

  const resetAndDraw = () => {
    // reset line
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    if (storedLines.length === 0) {
      return;
    }
    for (let i = 0; i < storedLines.length; i++) {
      drawLine(
        storedLines[i].startPointX,
        storedLines[i].startPointY,
        storedLines[i].endPointX,
        storedLines[i].endPointY
      );
    }
  };

  // reset all lines
  const resetButton = document.querySelector(".line-draw-reset-button");
  resetButton.addEventListener("click", () => {
    resetLineDraw();
  });
  const resetLineDraw = () => {
    storedLines = [];
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  };

  // close this extension
  const closeButton = document.querySelector(".line-draw-close-button");
  closeButton.addEventListener("click", () => {
    closeExtenstion();
  });
  const closeExtenstion = () => {
    const wrapper = document.querySelector(".line-draw-wrapper");
    let targetCanvas = document.querySelector(".line-draw");
    if (targetCanvas !== null) {
      document.body.removeChild(targetCanvas);
      document.body.removeChild(wrapper);
    }
    storedLines = [];
    targetCanvas = "";
  };
};
