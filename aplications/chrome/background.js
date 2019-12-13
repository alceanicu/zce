chrome.browserAction.onClicked.addListener((request, sender, sendResponse) => {
  chrome.tabs.update({url: chrome.extension.getURL('index.html')});
});
