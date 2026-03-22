 document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("signupForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: "student"   // 🔒 force student role
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert("❌ " + (data.message || "Signup failed"));
        return;
      }

      alert("✅ Account created successfully. Please login.");
      window.location.href = "login.html";

    } catch (err) {
      console.error(err);
      alert("❌ Server error. Try again later.");
    }
  });

});
localStorage.setItem("token", data.token);

// close modal
const modal = bootstrap.Modal.getInstance(
  document.getElementById("authModal")
);
modal.hide();

// refresh navbar state
window.location.reload();
