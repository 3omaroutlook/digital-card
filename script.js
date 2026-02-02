fetch("data.json")
.then(res => res.json())
.then(data => {

    document.getElementById("name").innerText = data.name;

    document.getElementById("phone").innerText = data.phone;

    document.getElementById("mail").href =
        "mailto:" + data.email;

    document.getElementById("instagram").href =
        "https://instagram.com/" + data.instagram;

    document.getElementById("whatsapp").href =
        "https://wa.me/2" + data.phone;

    document.getElementById("profileImage").src =
        data.image;
});

function addContact() {

    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:Omar Kamal Sayed Othman
TEL;TYPE=CELL:01065890653
EMAIL:omarkamal.othman@outlook.com
URL:https://instagram.com/omar_kamal_8898
END:VCARD
`;

    const blob = new Blob([vCardData], { type: 'text/vcard' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'Omar_Kamal.vcf';
    a.click();

    URL.revokeObjectURL(url);
}