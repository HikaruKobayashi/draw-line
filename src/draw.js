import { extensionStyles } from './styles.js';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request == "Action") {
    drawLine();
	}
});

const drawLine = () => {
  // create canvas element
  const targetCanvas = document.createElement('canvas');
  targetCanvas.className = 'line-draw';
  document.body.appendChild(targetCanvas);

  // create reset button element
  const resetButton = document.createElement('button');
  resetButton.innerHTML = 'reset';
  resetButton.className = 'reset-button';
  document.body.appendChild(resetButton);

  // create style
  const styleElement = document.createElement('style');
  styleElement.innerText = extensionStyles;
  document.getElementsByTagName('head')[0].insertAdjacentElement('beforeend', styleElement);

  // init coordinate setting
  let startPointX = 0;
  let startPointY = 0;
  let endPointX = 0;
  let endPointY = 0;

  // canvas setting
  targetCanvas.width = window.innerWidth;
  targetCanvas.height = window.innerHeight;
  const context = targetCanvas.getContext('2d');

  // get starting point
  document.addEventListener('mousedown', event => {
    startPointX = event.clientX;
    startPointY = event.clientY;
  });

  // get ending point
  document.addEventListener('mouseup', event => {
    endPointX= event.clientX;
    endPointY = event.clientY;
    drawLine();
  });

  // draw a line
  const drawLine = () => {
    context.beginPath();
    context.strokeStyle = '#ABDBEB'; // line color
    context.moveTo(startPointX, startPointY); // starting point
    context.lineTo(endPointX, endPointY); // ending point
    context.stroke(); // draw a line
  };

  // reset this extension
  resetButton.addEventListener('click', () => {
    resetLineDraw();
  });
  const resetLineDraw = () => {
    let targetCanvas = document.querySelector('.line-draw');
    if (targetCanvas !== null) {
      document.body.removeChild(targetCanvas);
      document.body.removeChild(resetButton);
    }
    targetCanvas = '';
  };
};