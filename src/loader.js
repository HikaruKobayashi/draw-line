(async() => {
  const src = chrome.runtime.getURL("src/draw.js");
  const contentMain = await import(src);
})();
