 document.addEventListener("DOMContentLoaded", () => {

  /* ================= AUTH TOKEN (SINGLE SOURCE) ================= */
  const token = sessionStorage.getItem("token");

  if (!token) {
    window.location.replace("index.html");
    return;
  }

  /* ================= USER ================= */
  const user = JSON.parse(sessionStorage.getItem("user"));

  const studentNameEl = document.getElementById("studentName");
  if (studentNameEl && user?.name) {
    studentNameEl.textContent = user.name;
  }

  /* ================= FETCH ENROLLMENTS ================= */
  fetch("/api/my-enrollments", {
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("enrollmentList");
      const enrolledCountEl = document.getElementById("enrolledCourses");

      if (!tbody || !enrolledCountEl) return;

      tbody.innerHTML = "";

      if (!Array.isArray(data) || data.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="3" class="text-center text-muted">
              No courses enrolled yet
            </td>
          </tr>
        `;
        enrolledCountEl.textContent = "0";
        return;
      }

      enrolledCountEl.textContent = data.length;

      data.forEach(e => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${e.course}</td>
          <td>—</td>
          <td>—</td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error("Enrollment fetch error:", err);
    });

  /* ================= DASHBOARD STATS ================= */
  fetch("/api/dashboard-stats", {
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(res => res.json())
    .then(stats => {
      const enrolledCoursesEl = document.getElementById("enrolledCourses");
      const progressEl = document.getElementById("progressCard");

      if (enrolledCoursesEl) {
        enrolledCoursesEl.textContent = stats.totalCourses || 0;
      }

      if (progressEl) {
        progressEl.textContent = (stats.avgProgress || 0) + "%";
      }
    })
    .catch(err => {
      console.error("Dashboard stats error:", err);
    });

  /* ================= LOGOUT ================= */
 const btn = document.getElementById("dashboardLogoutBtn");

btn?.addEventListener("click", () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");

  console.log("Dashboard logout");
  console.log("localStorage token =", localStorage.getItem("token")); // MUST EXIST

  window.location.replace("index.html");
});



});


