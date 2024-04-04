document.addEventListener('click', async (event) => {
    chrome.storage.local.get(['recording', 'guides'], function (items) {
        if (items.recording) {
            let eventMsg = "Click here";

            if (event.target.tagName === "BUTTON") {
                eventMsg = "Click on \""+event.target.innerText+"\" button";
            } else if (event.target.tagName === "A") {
                eventMsg = "Click on \""+event.target.innerText+"\" link";
            }
            
            chrome.runtime.sendMessage({ type: "screenshot", message: eventMsg, guides: items.guides, clickX: event.clientX, clickY: event.clientY });
        }
    });
});