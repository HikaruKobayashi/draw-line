export const createItem = () => {
  // create container element
  const container = document.createElement("div");
  container.className = "draw-line-container";
  document.body.appendChild(container);

  // create wrapper element
  const wrapper = document.createElement("ul");
  container.appendChild(wrapper);

  // create header element
  const header = document.createElement("li");
  header.className = "draw-line-header";
  wrapper.appendChild(header);

  // create title element
  const title = document.createElement("h1");
  title.innerHTML = "draw line";
  title.className = "draw-line-title";
  header.appendChild(title);

  // create close button element
  const closeButton = document.createElement("button");
  closeButton.className = "draw-line-close-button";
  header.appendChild(closeButton);

  // create line type wrapper element
  const changeLineTypeWrapper = document.createElement("li");
  wrapper.appendChild(changeLineTypeWrapper);

  // create change straight line button element
  const changeStraightLineButton = document.createElement("p");
  changeStraightLineButton.innerHTML = "直線";
  changeStraightLineButton.className =
    "draw-line-change-straight-line-button is-active";
  changeLineTypeWrapper.appendChild(changeStraightLineButton);

  // create change square button element
  const changeSquareButton = document.createElement("p");
  changeSquareButton.innerHTML = "四角";
  changeSquareButton.className = "draw-line-change-square-button";
  changeLineTypeWrapper.appendChild(changeSquareButton);

  // create change circle button element
  const changeCircleButton = document.createElement("p");
  changeCircleButton.innerHTML = "丸";
  changeCircleButton.className = "draw-line-change-circle-button";
  changeLineTypeWrapper.appendChild(changeCircleButton);

  // create color picker wrapper element
  const colorPickerWrapper = document.createElement("li");
  colorPickerWrapper.className = "draw-line-color-picker-wrapper";
  wrapper.appendChild(colorPickerWrapper);

  // create color picker
  const colorPicker = document.createElement("input");
  colorPicker.type = "color";
  colorPicker.className = "draw-line-color-picker";
  colorPickerWrapper.appendChild(colorPicker);

  // create footer element
  const footer = document.createElement("li");
  footer.className = "draw-line-footer";
  wrapper.appendChild(footer);

  // create reset button element
  const resetButton = document.createElement("button");
  resetButton.innerHTML = "リセット";
  resetButton.className = "draw-line-reset-button";
  footer.appendChild(resetButton);

  // create style
  const styleElement = document.createElement("link");
  styleElement.href = `${chrome.runtime.getURL("assets/css/index.css")}`;
  styleElement.rel = "stylesheet";
  document
    .getElementsByTagName("head")[0]
    .insertAdjacentElement("beforeend", styleElement);
};
