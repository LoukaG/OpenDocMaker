chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.type === "screenshot") {
      chrome.windows.getCurrent().then(function (win) {
        chrome.tabs.captureVisibleTab(win.id, {
          "format": "png"
        }).then(function (dataURI) {
          chrome.storage.local.set({"image": dataURI, "message": request.message }, function () {
            sendResponse({ statut: "test" });
          });
        });
      });
    }
  }
);
