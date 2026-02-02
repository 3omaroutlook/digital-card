const form = document.getElementById("userForm");
const output = document.getElementById("output");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const payload = {
        username: document.getElementById("userKey").value.trim(),
        name: document.getElementById("name").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        email: document.getElementById("email").value.trim(),
        instagram: document.getElementById("instagram").value.trim(),
        whatsapp: document.getElementById("whatsapp").value.trim(),
        image: document.getElementById("image").value.trim()
    };

    // عرض JSON احتياطي في Textarea
    let currentData;
    try { currentData = JSON.parse(output.value || '{}'); }
    catch { currentData = {}; }

    currentData[payload.username] = payload;
    output.value = JSON.stringify(currentData, null, 2);

    // إرسال البيانات للـ API مباشرة للقاعدة
    const res = await fetch('/.netlify/functions/add-user', {
        method: 'POST',
        body: JSON.stringify(payload)
    });

    const data = await res.json();
    alert(data.message);
});