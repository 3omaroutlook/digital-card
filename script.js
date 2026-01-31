function hideSplash() {
    document.getElementById("splash").style.display = "none";
    document.getElementById("content").classList.remove("hidden");
}

fetch("data.json")
.then(res => res.json())
.then(data => {

    document.getElementById("name").innerText = data.name;

    document.getElementById("phone").href = "tel:" + data.phone;

    document.getElementById("whatsapp").href =
        "https://wa.me/" + data.whatsapp;

    document.getElementById("email").href =
        "mailto:" + data.email;

    document.getElementById("instagram").href =
        "https://instagram.com/" + data.instagram;

    document.getElementById("saveContact").addEventListener("click", function() {
        downloadVCard(data);
    });

    setTimeout(hideSplash, 1000);

})
.catch(err => {
    console.log("Error loading data", err);
});


function downloadVCard(data) {

    let vcard =
`BEGIN:VCARD
VERSION:3.0
FN:${data.name}
TEL:${data.phone}
EMAIL:${data.email}
URL:https://instagram.com/${data.instagram}
END:VCARD`;

    let blob = new Blob([vcard], { type: "text/vcard" });
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = data.name + ".vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}