function takeScreenshot() {
    chrome.tabs.captureVisibleTab(function (screenshotDataUrl) {
        const screenshotImage = new Image();
        screenshotImage.src = screenshotDataUrl;
        document.getElementById("content").src = screenshotDataUrl;
    });
}


document.getElementById("save").onclick = function () {
    chrome.storage.local.get(['image', 'message'], function (items) {
        alert("Image saved: " + items.image + " with message: " + items.message);
        document.getElementById("message").innerText = items.message;
        document.getElementById("content").src = items.image;
    });
}

