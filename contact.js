 document.addEventListener("DOMContentLoaded", () => {

  /* ================= ELEMENTS ================= */
  const enrollBtn = document.getElementById("enrollNowBtn");
  const contactForm = document.getElementById("contactForm");
  const authArea = document.getElementById("authArea");
  const authModalEl = document.getElementById("authModal");

  if (!authModalEl) return;

  const authModal = new bootstrap.Modal(authModalEl);

  /* ================= NAVBAR UPDATE ================= */
  function updateNavbar() {
  const authArea = document.getElementById("authArea");
  if (!authArea) return; // ✅ PREVENT CRASH ON PAGES WITHOUT NAVBAR AUTH

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (token && user) {
    authArea.innerHTML = `
      <div class="dropdown">
        <button class="btn btn-outline-primary dropdown-toggle"
          data-bs-toggle="dropdown">
          👤 ${user.name}
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" href="/student-profile.html">My Profile</a></li>
          <li><a class="dropdown-item" href="/student-dashboard.html">My Enrollments</a></li>
          <li><hr class="dropdown-divider"></li>
          <li>
            <button class="dropdown-item text-danger" id="logoutBtn">
              Logout
            </button>
          </li>
        </ul>
      </div>
    `;

    document.getElementById("logoutBtn")?.addEventListener("click", () => {
      localStorage.clear();
      location.reload();
    });
  } else {
    authArea.innerHTML = ""; // optional: reset state
  }
}


  updateNavbar();

  /* ================= ENROLL NOW BUTTON ================= */
  enrollBtn?.addEventListener("click", (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      authModal.show();
      return;
    }

    contactForm.scrollIntoView({ behavior: "smooth" });
  });

  /* ================= FORM SUBMIT ================= */
  contactForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("🔐 Login first to enroll");
      authModal.show();
      return;
    }

    const formData = Object.fromEntries(
      new FormData(contactForm).entries()
    );

    console.log("FORM DATA:", formData);

    // 🔥 backend ready (optional)
    // await fetch("/api/enroll", ...)

    alert("✅ Enquiry submitted successfully!");
    contactForm.reset();
  });

  /* ================= LOGIN ================= */
  document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;

    // dummy auth
    localStorage.setItem("token", "dummy-jwt-token");
    localStorage.setItem("user", JSON.stringify({
      name: email.split("@")[0],
      email
    }));

    authModal.hide();
    updateNavbar();
    alert("✅ Logged in successfully!");
  });

});
