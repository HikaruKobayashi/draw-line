(async () => {
  const src = chrome.runtime.getURL("src/content.js");
  const contentMain = await import(src);
})();
