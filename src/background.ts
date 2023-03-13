chrome.action.onClicked.addListener((tab: chrome.tabs.Tab) => {
  chrome.tabs.sendMessage(tab.id as number, "Action");
});
