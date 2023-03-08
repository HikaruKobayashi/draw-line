// create HTML elements
const createElement = () => {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <div class="draw-line-container">
        <ul>
          <li class="draw-line-header">
            <h1 class="draw-line-title">draw line</h1>
            <button class="draw-line-close-button"></button>
          </li>
          <li>
            <p class="draw-line-change-straight-line-button is-active">直線</p>
            <p class="draw-line-change-square-button">四角</p>
            <p class="draw-line-change-circle-button">丸</p>
          </li>
          <li class="draw-line-color-picker-wrapper">
            <input type="color" class="draw-line-color-picker">
          </li>
          <li class="draw-line-footer">
            <button class="draw-line-back-button">戻す</button>
            <button class="draw-line-reset-button">リセット</button>
          </li>
        </ul>
      </div>
    `
  );
};

// add draw line styles
const addDrawLineStyle = () => {
  const styleElement = document.createElement("link");
  styleElement.href = `${chrome.runtime.getURL("assets/css/index.css")}`;
  styleElement.rel = "stylesheet";
  document
    .getElementsByTagName("head")[0]
    .insertAdjacentElement("beforeend", styleElement);
};

export const createItem = () => {
  createElement();
  addDrawLineStyle();
};
