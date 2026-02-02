async function loadUser() {
    const params = new URLSearchParams(window.location.search);
    const user = params.get("user") || "omar";

    const response = await fetch(`/.netlify/functions/get-user?user=${user}`);
    const data = await response.json();

    if (!data || data.error) return alert("User not found");

    document.getElementById("name").innerText = data.name;
    document.getElementById("phone").innerText = data.phone;
    document.getElementById("profileImage").src = data.image;

    document.getElementById("whatsapp").href = "https://wa.me/" + data.whatsapp;
    document.getElementById("email").href = "mailto:" + data.email;
    document.getElementById("instagram").href = "https://instagram.com/" + data.instagram;

    window.currentUser = data;
}

function addContact() {
    const u = window.currentUser;

    const vcard =
`BEGIN:VCARD
VERSION:3.0
FN:${u.name}
TEL:${u.phone}
EMAIL:${u.email}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = u.name + ".vcf";
    a.click();

    URL.revokeObjectURL(url);
}

loadUser();