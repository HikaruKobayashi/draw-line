import { constants } from "./constants.js";
import { createItem } from "./item.js";
import type { Line } from "../types/line";

export const drawLine = () => {
  // avoid duplication
  if (document.querySelector(".draw-line")) {
    return;
  }

  // create canvas element
  const targetCanvas = document.createElement("canvas");
  targetCanvas.className = "draw-line";
  document.body.appendChild(targetCanvas);

  // create other element and styles
  createItem();

  // change line color
  let lineColor = constants.lineColor;
  let colorBox: HTMLInputElement = <HTMLInputElement>(
    document.querySelector(".draw-line-color-picker")!
  );
  if (colorBox === null) {
    return;
  }
  colorBox.addEventListener("change", (event: Event) => {
    const { target } = event;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    lineColor = target.value;
  });

  // init coordinate setting
  let startPointX = 0;
  let startPointY = 0;
  let endPointX = 0;
  let endPointY = 0;
  let movePointX = 0;
  let movePointY = 0;

  // line positions
  let storedLines: Line[] = [];

  // line width
  let lineWidth = constants.lineWidth;

  // canvas setting
  targetCanvas.width = window.innerWidth;
  targetCanvas.height = window.innerHeight;
  const context = targetCanvas.getContext("2d")!;

  // change line type
  let lineType = constants.straightLine; // default setting
  const changeStraightLineButton = document.querySelector(
    ".draw-line-change-straight-line-button"
  );
  const changeSquareButton = document.querySelector(
    ".draw-line-change-square-button"
  );
  const changeCircleButton = document.querySelector(
    ".draw-line-change-circle-button"
  );
  if (
    changeStraightLineButton === null ||
    changeSquareButton === null ||
    changeCircleButton === null
  ) {
    return;
  }
  changeStraightLineButton.addEventListener("click", function () {
    changeActiveLineType(changeStraightLineButton, constants.straightLine);
  });
  changeSquareButton.addEventListener("click", function () {
    changeActiveLineType(changeSquareButton, constants.square);
  });
  changeCircleButton.addEventListener("click", function () {
    changeActiveLineType(changeCircleButton, constants.circle);
  });

  // change active line type
  const changeActiveLineType = (item: Element, type: number) => {
    document.querySelector(".is-active")!.classList.remove("is-active");
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
  targetCanvas.addEventListener("mousedown", (event) => {
    startPointX = event.clientX;
    startPointY = event.clientY;
    toggleIsMove();
  });

  // get moving point and draw line
  targetCanvas.addEventListener("mousemove", (event) => {
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
      lineColor,
      lineWidth
    );
  });

  // get ending point
  targetCanvas.addEventListener("mouseup", (event) => {
    toggleIsMove();
    endPointX = event.clientX;
    endPointY = event.clientY;
    // store lines position
    if (startPointX === endPointX && startPointY === endPointY) return;
    storedLines.push({
      startPointX: startPointX,
      startPointY: startPointY,
      endPointX: endPointX,
      endPointY: endPointY,
      lineType: lineType,
      color: lineColor,
      size: lineWidth,
    });
  });

  // draw a line
  const drawLine = (
    startPointX: number,
    startPointY: number,
    endPointX: number,
    endPointY: number,
    lineType: number,
    color: string,
    size: number
  ) => {
    if (context === null) {
      return;
    }
    context.beginPath();
    context.lineWidth = size; // line width
    context.strokeStyle = color; // line color
    switch (true) {
      case lineType === constants.straightLine:
        context.moveTo(startPointX, startPointY);
        context.lineTo(endPointX, endPointY);
        break;
      case lineType === constants.square:
        context.rect(
          startPointX,
          startPointY,
          endPointX - startPointX,
          endPointY - startPointY
        );
        break;
      case lineType === constants.circle:
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
    if (context === null) {
      return;
    }

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
        storedLines[i].color,
        storedLines[i].size
      );
    }
  };

  // back to previous states
  const backButton = document.querySelector(".draw-line-back-button");
  if (backButton === null) {
    return;
  }
  backButton.addEventListener("click", () => {
    storedLines.pop();
    resetAndDraw();
  });

  // reset all lines
  const resetButton = document.querySelector(".draw-line-reset-button");
  if (resetButton === null) {
    return;
  }
  resetButton.addEventListener("click", () => {
    resetDrawLine();
  });
  const resetDrawLine = () => {
    storedLines = [];
    lineType = constants.straightLine;
    lineColor = constants.lineColor;
    colorBox.value = constants.lineColor;
    lineWidth = constants.lineWidth;
    changeWidthButton.value = String(constants.lineWidth);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    document.querySelector(".is-active")!.classList.remove("is-active");
    changeStraightLineButton.classList.add("is-active");
  };

  // close this extension
  const closeButton = document.querySelector(".draw-line-close-button");
  if (closeButton === null) {
    return;
  }
  closeButton.addEventListener("click", () => {
    closeExtenstion();
  });
  const closeExtenstion = () => {
    const container = document.querySelector(".draw-line-container");
    let targetCanvas = document.querySelector(".draw-line");
    if (container === null || targetCanvas === null) {
      return;
    }
    if (targetCanvas !== null) {
      document.body.removeChild(targetCanvas);
      document.body.removeChild(container);
    }
    storedLines = [];
    targetCanvas = null;
  };

  // toggle browser control
  const lockButton = document.querySelector(".draw-line-lock-button");
  if (lockButton === null) {
    return;
  }
  lockButton.addEventListener("change", () => {
    if (targetCanvas.classList.contains("draw-line-unlocked")) {
      targetCanvas.classList.remove("draw-line-unlocked");
    } else {
      targetCanvas.classList.add("draw-line-unlocked");
    }
  });

  // change line width
  const changeWidthButton: HTMLInputElement = <HTMLInputElement>(
    document.querySelector(".draw-line-change-width")!
  );
  if (changeWidthButton === null) {
    return;
  }
  changeWidthButton.addEventListener(
    "change",
    function (this: HTMLInputElement) {
      lineWidth = Number(this.value);
    }
  );

  // move draw line menu
  const moveButton = document.querySelector(".draw-line-move-area");
  if (moveButton === null) {
    return;
  }
  moveButton.addEventListener("mousedown", (event: Event | MouseEvent) => {
    const drawLineMenu: HTMLElement = <HTMLElement>(
      document.querySelector(".draw-line-container")!
    );

    if (drawLineMenu === null) {
      return;
    }
    document.body.style.overflow = "hidden";

    if (event instanceof MouseEvent) {
      const shiftX = event.clientX - drawLineMenu.getBoundingClientRect().left;
      const shiftY = event.clientY - drawLineMenu.getBoundingClientRect().top;
      drawLineMenu.classList.add("draw-line-is-move");
      moveAt(event.pageX, event.pageY);

      function moveAt(pageX: number, pageY: number) {
        drawLineMenu.style.left = `${pageX - shiftX}px`;
        drawLineMenu.style.top = `${pageY - shiftY}px`;
      }

      function onMouseMove(event: MouseEvent) {
        moveAt(event.pageX, event.pageY);
      }

      document.addEventListener("mousemove", onMouseMove);

      drawLineMenu.onmouseup = function (event: MouseEvent) {
        document.removeEventListener("mousemove", onMouseMove);
        drawLineMenu.onmouseup = null;
        document.body.style.overflow = "auto";
        drawLineMenu.style.top = `${event.clientY}px`;
        drawLineMenu.classList.remove("draw-line-is-move");
      };
    }
  });
};
