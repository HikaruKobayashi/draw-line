// create HTML elements
const createElement = () => {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <div class="draw-line-container">
        <ul>
          <li>
            <h1 class="draw-line-title">draw line</h1>
            <button class="draw-line-close-button"></button>
          </li>
          <li>
            <p class="draw-line-sub-title">screen lock</p>
            <label class="draw-line-screen-lock-toggle-button">
              <input type="checkbox" class="draw-line-lock-button" checked/>
              <span class="draw-line-screen-lock-toggle-button-content"></span>
              <span class="draw-line-screen-lock-toggle-button-circle"></span>
            </label>
          </li>
          <li>
            <p class="draw-line-sub-title">line style</p>
            <p class="draw-line-change-straight-line-button is-active">直線</p>
            <p class="draw-line-change-square-button">四角</p>
            <p class="draw-line-change-circle-button">丸</p>
          </li>
          <li>
            <p class="draw-line-sub-title">line size</p>
            <input type="range" min="1" max="20" step="1" value="2" class="draw-line-change-width"></input>
          </li>
          <li>
            <p class="draw-line-sub-title">line color</p>
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
