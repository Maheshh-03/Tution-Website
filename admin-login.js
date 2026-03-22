 document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("adminLoginForm");

  if (!form) {
    console.error("adminLoginForm not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/auth/login", {   // 🔥 USE SAME LOGIN API
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!res.ok) {
        document.getElementById("error").innerText =
          result.message || "Login failed";
        return;
      }

      // 🔐 STORE SAME AUTH DATA AS EVERYWHERE ELSE
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      // 🚫 EXTRA SAFETY
      if (result.user.role !== "admin") {
        document.getElementById("error").innerText =
          "You are not authorized as admin";
        localStorage.clear();
        return;
      }

      // ✅ ADMIN REDIRECT
      window.location.replace("/admin-dashboard.html");

    } catch (err) {
      console.error(err);
      document.getElementById("error").innerText = "Server error";
    }
  });
});
