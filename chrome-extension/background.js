chrome.browserAction.onClicked.addListener(function (request, sender, sendResponse) {
  chrome.tabs.update({url: chrome.extension.getURL('index.html')});
});
