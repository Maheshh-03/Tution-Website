 document.addEventListener("DOMContentLoaded", () => {

  /* ================= ELEMENTS ================= */
  const loginNav   = document.getElementById("loginNav");
  const signupNav  = document.getElementById("signupNav");
  const profileNav = document.getElementById("profileMenu");
  const logoutBtn  = document.getElementById("logoutBtn");

  const authModal  = document.getElementById("authModal");
  const loginBox   = document.getElementById("loginBox");
  const signupBox  = document.getElementById("signupBox");

  const loginForm  = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  
  console.log("auth-ui.js loaded");

  /* ================= NAVBAR SYNC ================= */
  function syncNavbar() {
    const token = sessionStorage.getItem("token");
    const user  = JSON.parse(sessionStorage.getItem("user"));
    

    if (token && user) {
      loginNav?.classList.add("d-none");
      signupNav?.classList.add("d-none");
      profileNav?.classList.remove("d-none");

      const btn = profileNav?.querySelector("button");
      if (btn) btn.innerHTML = `👤 ${user.name}`;
    } else {
      loginNav?.classList.remove("d-none");
      signupNav?.classList.remove("d-none");
      profileNav?.classList.add("d-none");
    }
  }

  syncNavbar();

  /* ================= MODAL SWITCH ================= */
  document.querySelectorAll("[data-auth]").forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.getAttribute("data-auth");

      if (type === "signup") {
        loginBox?.classList.add("d-none");
        signupBox?.classList.remove("d-none");
      } else {
        signupBox?.classList.add("d-none");
        loginBox?.classList.remove("d-none");
      }
    });
  });

  /* ================= LOGIN ================= */
  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");

    if (!emailInput || !passwordInput) {
      alert("Login form error. Please refresh.");
      return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // 🔐 STORE PER TAB (IMPORTANT)
     
      // permanent login
localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));

// ALSO copy to session for dashboard use
sessionStorage.setItem("token", data.token);
sessionStorage.setItem("user", JSON.stringify(data.user));

      bootstrap.Modal.getInstance(authModal)?.hide();
      syncNavbar();

    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert("Server error");
    }
  });

  /* ================= SIGNUP ================= */
  signupForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signupName.value,
          email: signupEmail.value,
          password: signupPassword.value
        })
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Signup successful. Please login.");
      signupBox?.classList.add("d-none");
      loginBox?.classList.remove("d-none");

    } catch (err) {
      console.error("SIGNUP ERROR:", err);
      alert("Server error");
    }
  });

  /* ================= LOGOUT (THIS TAB ONLY) ================= */
 

logoutBtn?.addEventListener("click", () => {
  if (!confirm("Logout from website?")) return;

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.clear(); // optional

  window.location.replace("index.html");
});


  

});
