document.addEventListener('click', async (event) => {
    let eventMsg = "Click here";
    chrome.runtime.sendMessage({type:"screenshot",message: eventMsg});

    alert("Saved")
});