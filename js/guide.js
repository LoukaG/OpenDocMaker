
let mdCode = []
chrome.storage.local.get(['guides'], async function (items) {
    let count = 0;
    for (let guide of items.guides) {
        let image = new Image();
        mdCode = ["# Guide\n"]

        image.onload = function () {
            count++;
            let canvas = document.createElement("canvas");
            canvas.width = this.width / 2;
            canvas.height = this.height / 2;

            let offsetX = guide.clickX - (this.width / 4);
            let offsetY = guide.clickY - (this.height / 4);
            offsetX = offsetX < 0 ? 0 : offsetX;
            offsetX = offsetX > this.width / 2 ? this.width / 2 : offsetX;
            offsetY = offsetY < 0 ? 0 : offsetY;
            offsetY = offsetY > this.height / 2 ? this.height / 2 : offsetY;

            let ctx = canvas.getContext("2d");
            ctx.drawImage(this, -offsetX, -offsetY);

            ctx.beginPath();
            ctx.arc(guide.clickX - offsetX, guide.clickY - offsetY, 25, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
            ctx.fill();

            // Affiche l'image agrandie dans la page
            document.getElementById("steps").innerHTML += "<section><h2><span class='step-title-number'>" + count + "</span>" + guide.message + "</h2><img src='" + canvas.toDataURL('image/jpeg') + "'></section>";
            mdCode.push("\n\n## " + count + ". " + guide.message + "\n");
            mdCode.push("<img src='" + canvas.toDataURL('image/jpeg') + "'>");
        };

        image.src = guide.image;

    }
});

// Click event on downloadMd
document.getElementById("downloadMd").onclick = downloadMarkdown;

function downloadMarkdown() {
    console.log(mdCode)
    let blob = new Blob(mdCode, {
        type: "text/plain;charset=utf-8",
    });

    let url = URL.createObjectURL(blob);

    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    a.href = url;
    a.download = "guide.md";
    a.click();
    window.URL.revokeObjectURL(url);
}