(async () => {
  await import(chrome.runtime.getURL("dist/content.js"));
})();
