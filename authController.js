 const db = require("db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* ================= SIGNUP (STUDENT ONLY) ================= */
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  console.log("SIGNUP BODY:", req.body);

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'student')",
      [name, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("SIGNUP DB ERROR:", err);
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ msg: "Email already exists" });
          }
          return res.status(500).json({ msg: "Database error" });
        }

        res.json({ msg: "Signup successful" });
      }
    );
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* ================= LOGIN (ADMIN + STUDENT) ================= */
exports.login = (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN BODY:", req.body);

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) {
        console.error("LOGIN DB ERROR:", err);
        return res.status(500).json({ msg: "Database error" });
      }

      if (result.length === 0) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }

      const user = result[0];

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        "SECRET_KEY",
        { expiresIn: "1d" }
      );

      res.json({
        token,
        role: user.role
      });
    }
  );
};
