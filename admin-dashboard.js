 document.addEventListener("DOMContentLoaded", () => {

  /* ================= AUTH PROTECT ================= */
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");

  if (!token || !userStr || userStr === "undefined") {
    window.location.replace("index.html");
    return;
  }

  let user;
  try {
    user = JSON.parse(userStr);
  } catch {
    window.location.replace("index.html");
    return;
  }

  // 🚫 Students are NOT allowed here
  if (user.role !== "admin") {
    window.location.replace("dashboard.html");
    return;
  }

  /* ================= LOAD ENQUIRIES ================= */
  fetch("/api/admin/enquiries", {
    headers: { Authorization: "Bearer " + token }
  })
    .then(res => res.json())
    .then(data => {
      const countEl = document.getElementById("totalEnquiries");
      if (countEl) countEl.innerText = data.length;
    })
    .catch(err => console.error(err));

  /* ================= OFFCANVAS MENU ================= */
  const menuEl = document.getElementById("adminMenu");
  const menuBtn = document.getElementById("menuBtn");

  if (menuEl && menuBtn) {
    const offcanvas = new bootstrap.Offcanvas(menuEl);
    menuBtn.addEventListener("click", () => offcanvas.show());
  }

  /* ================= LOGOUT (MOBILE + DESKTOP) ================= */
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace("index.html");
  }

  document.getElementById("logoutBtn")?.addEventListener("click", logout);
  document.getElementById("logoutDesktop")?.addEventListener("click", logout);

});

fetch("/api/admin/enrollments", {
  headers: {
    Authorization: "Bearer " + sessionStorage.getItem("token")
  }
})
.then(res => res.json())
.then(data => {
  const tbody = document.getElementById("adminEnrollments");
  tbody.innerHTML = "";

  data.forEach(e => {
    tbody.innerHTML += `
      <tr>
        <td>${e.student}</td>
        <td>${e.course}</td>
        <td>${new Date(e.created_at).toDateString()}</td>
      </tr>
    `;
  });
});
