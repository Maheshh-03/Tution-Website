 document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert("❌ " + (data.message || "Login failed"));
        return;
      }

      // 🔐 Store ONE token for entire app
      localStorage.setItem("token", data.token);

      // 🔁 Redirect based on role
      if (data.role === "admin") {
        window.location.href = "/admin-dashboard.html";
      } else {
        window.location.href = "/index.html";
      }

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

