document.addEventListener("DOMContentLoaded", () => {
  const loginBox = document.getElementById("loginBox");
  const signupBox = document.getElementById("signupBox");

  document.querySelectorAll("[data-auth]").forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.getAttribute("data-auth");

      if (type === "login") {
        loginBox.classList.remove("d-none");
        signupBox.classList.add("d-none");
      } else {
        signupBox.classList.remove("d-none");
        loginBox.classList.add("d-none");
      }
    });
  });
});
