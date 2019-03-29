browser.browserAction.onClicked.addListener(function() {
  browser.tabs.create({"url": "index.html"});
});
