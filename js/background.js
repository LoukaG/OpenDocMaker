chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.type === "screenshot") {
      chrome.windows.getCurrent().then(function (win) {
        chrome.tabs.captureVisibleTab(win.id, {
          "format": "png"
        }).then(function (dataURI) {
          let guides = request.guides;
          guides.push({ message: request.message, image: dataURI, clickX: request.clickX, clickY: request.clickY})
          
          chrome.storage.local.set({"guides": guides}, function () {
            sendResponse({ statut: "test" });
          });
        });
      });
    }
  }
);
