function addContact() {

    const vcard =
`BEGIN:VCARD
VERSION:3.0
FN:Omar Kamal Sayed Othman
TEL:01065890653
EMAIL:omarkamal.othman@outlook.com
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Omar_Kamal.vcf";
    a.click();

    URL.revokeObjectURL(url);
}