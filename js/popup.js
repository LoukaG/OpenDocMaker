document.getElementById("save").onclick = function () {
    chrome.storage.local.get(['recording'], function (items) {
        let recording = !items.recording;
        if (!recording) {
            chrome.tabs.create({ url: chrome.runtime.getURL("../pages/guide.html") });
        }else{
            chrome.storage.local.set({ "guides": [] });
        }

        chrome.storage.local.set({ "recording": recording}, function () {
            document.getElementById("save").innerText = recording ? "Stop" : "Start";
        });
    });
}

