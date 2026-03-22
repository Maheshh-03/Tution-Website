 require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const app = express();

// ================= GLOBAL MIDDLEWARE =================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= STATIC FRONTEND =================
app.use(express.static(path.join(__dirname, "../public")));

// ================= ROUTES =================
app.use("/api/auth", require("authRoutes.js"));
app.use("/api/contact", require("contactRoutes.js"));
app.use("/api/admin", require("adminRoutes.js"));
app.use("/api", require("studentRoutes.js"));

// ================= SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://cdn.jsdelivr.net"
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://cdn.jsdelivr.net",
          "https://fonts.googleapis.com"
        ],
        imgSrc: [
          "'self'",
          "data:",
          "https://randomuser.me"
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com"
        ],
        connectSrc: [
          "'self'"
        ]
      }
    }
  })
);

