import { drawLine } from "./draw.js";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === "Action") {
    drawLine();
  }
});
