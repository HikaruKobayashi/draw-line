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

  // change line type
  let lineType = config.straightLine; // default setting
  const changeStraightLineButton = document.querySelector(
    ".line-draw-change-straight-line-button"
  );
  changeStraightLineButton.addEventListener("click", function () {
    changeActiveLineType(this, config.straightLine);
  });
  const changeSquareButton = document.querySelector(
    ".line-draw-change-square-button"
  );
  changeSquareButton.addEventListener("click", function () {
    changeActiveLineType(this, config.square);
  });
  const changeCircleButton = document.querySelector(
    ".line-draw-change-circle-button"
  );
  changeCircleButton.addEventListener("click", function () {
    changeActiveLineType(this, config.circle);
  });

  // change active line type
  const changeActiveLineType = (item, type) => {
    document.querySelector(".is-active").classList.remove("is-active");
    item.classList.add("is-active");
    lineType = type;
  };

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
    drawLine(
      startPointX,
      startPointY,
      movePointX,
      movePointY,
      lineType,
      lineColor
    );
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
      lineType: lineType,
      color: lineColor,
    });
  });

  // draw a line
  const drawLine = (
    startPointX,
    startPointY,
    endPointX,
    endPointY,
    lineType,
    color
  ) => {
    context.beginPath();
    context.lineWidth = config.lineWidth; // line width
    context.strokeStyle = color; // line color
    switch (true) {
      case lineType === config.straightLine:
        context.moveTo(startPointX, startPointY);
        context.lineTo(endPointX, endPointY);
        break;
      case lineType === config.square:
        context.rect(
          startPointX,
          startPointY,
          endPointX - startPointX,
          endPointY - startPointY
        );
        break;
      case lineType === config.circle:
        context.arc(
          endPointX - (endPointX - startPointX) / 2,
          endPointY - (endPointY - startPointY) / 2,
          endPointX - startPointX >= 0
            ? (endPointX - startPointX) / 2
            : (startPointX - endPointX) / 2,
          0,
          Math.PI * 2
        );
        break;
      default:
        break;
    }
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
        storedLines[i].endPointY,
        storedLines[i].lineType,
        storedLines[i].color
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
    lineType = config.straightLine;
    lineColor = config.lineColor;
    colorBox.value = config.lineColor;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    document.querySelector(".is-active").classList.remove("is-active");
    changeStraightLineButton.classList.add("is-active");
  };

  // close this extension
  const closeButton = document.querySelector(".line-draw-close-button");
  closeButton.addEventListener("click", () => {
    closeExtenstion();
  });
  const closeExtenstion = () => {
    const container = document.querySelector(".line-draw-container");
    let targetCanvas = document.querySelector(".line-draw");
    if (targetCanvas !== null) {
      document.body.removeChild(targetCanvas);
      document.body.removeChild(container);
    }
    storedLines = [];
    targetCanvas = "";
  };
};
