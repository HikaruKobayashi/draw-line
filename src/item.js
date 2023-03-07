export const createItem = () => {
  // create container element
  const container = document.createElement("div");
  container.className = "line-draw-container";
  document.body.appendChild(container);

  // create wrapper element
  const wrapper = document.createElement("ul");
  container.appendChild(wrapper);

  // create header element
  const header = document.createElement("li");
  header.className = "line-draw-header";
  wrapper.appendChild(header);

  // create title element
  const title = document.createElement("h1");
  title.innerHTML = "line draw";
  title.className = "line-draw-title";
  header.appendChild(title);

  // create close button element
  const closeButton = document.createElement("button");
  closeButton.className = "line-draw-close-button";
  header.appendChild(closeButton);

  // create line type wrapper element
  const changeLineTypeWrapper = document.createElement("li");
  wrapper.appendChild(changeLineTypeWrapper);

  // create change straight line button element
  const changeStraightLineButton = document.createElement("p");
  changeStraightLineButton.innerHTML = "直線";
  changeStraightLineButton.className =
    "line-draw-change-straight-line-button is-active";
  changeLineTypeWrapper.appendChild(changeStraightLineButton);

  // create change square button element
  const changeSquareButton = document.createElement("p");
  changeSquareButton.innerHTML = "四角";
  changeSquareButton.className = "line-draw-change-square-button";
  changeLineTypeWrapper.appendChild(changeSquareButton);

  // create change circle button element
  const changeCircleButton = document.createElement("p");
  changeCircleButton.innerHTML = "丸";
  changeCircleButton.className = "line-draw-change-circle-button";
  changeLineTypeWrapper.appendChild(changeCircleButton);

  // create color picker wrapper element
  const colorPickerWrapper = document.createElement("li");
  colorPickerWrapper.className = "line-draw-color-picker-wrapper";
  wrapper.appendChild(colorPickerWrapper);

  // create color picker
  const colorPicker = document.createElement("input");
  colorPicker.type = "color";
  colorPicker.className = "line-draw-color-picker";
  colorPickerWrapper.appendChild(colorPicker);

  // create footer element
  const footer = document.createElement("li");
  footer.className = "line-draw-footer";
  wrapper.appendChild(footer);

  // create reset button element
  const resetButton = document.createElement("button");
  resetButton.innerHTML = "リセット";
  resetButton.className = "line-draw-reset-button";
  footer.appendChild(resetButton);

  // create style
  const styleElement = document.createElement("link");
  styleElement.href = `${chrome.runtime.getURL("assets/css/index.css")}`;
  styleElement.rel = "stylesheet";
  document
    .getElementsByTagName("head")[0]
    .insertAdjacentElement("beforeend", styleElement);
};
