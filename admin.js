const form = document.getElementById("userForm");

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

  const res = await fetch('/.netlify/functions/add-user', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  alert(data.message);
  form.reset();
});