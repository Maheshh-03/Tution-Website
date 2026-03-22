 document.addEventListener("DOMContentLoaded", () => {
  const authArea = document.getElementById("authArea");

  const adminToken = localStorage.getItem("adminToken");
  const studentToken = localStorage.getItem("studentToken");

  if (adminToken) {
    authArea.innerHTML = `
      <li class="nav-item">
        <a class="btn btn-sm btn-outline-primary"
           href="admin-dashboard.html">
          Dashboard
        </a>
      </li>
      <li class="nav-item">
        <button class="btn btn-sm btn-danger" id="logoutBtn">
          Logout
        </button>
      </li>
    `;
  } else if (studentToken) {
    authArea.innerHTML = `
      <li class="nav-item">
        <a class="btn btn-sm btn-outline-primary"
           href="student-dashboard.html">
          My Dashboard
        </a>
      </li>
      <li class="nav-item">
        <button class="btn btn-sm btn-danger" id="logoutBtn">
          Logout
        </button>
      </li>
    `;
  } else {
    authArea.innerHTML = `
      <li class="nav-item">
        <a class="nav-link fw-medium" href="/login.html">Login</a>
      </li>
      <li class="nav-item">
        <a class="btn btn-sm btn-primary rounded-pill px-3"
           href="/signup.html">Sign Up</a>
      </li>
    `;
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("studentToken");
      window.location.href = "/";
    });
  }
});
document.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const navAuth = document.getElementById("authArea");
  if (!navAuth) return;

  const admin = localStorage.getItem("adminToken");
  const student = localStorage.getItem("studentToken");

  if (admin) {
    navAuth.innerHTML = `
      <a class="btn btn-outline-primary btn-sm"
         href="admin-dashboard.html">Dashboard</a>
    `;
  } else if (student) {
    navAuth.innerHTML = `
      <a class="btn btn-outline-primary btn-sm"
         href="student-dashboard.html">My Dashboard</a>
    `;
  }
});
