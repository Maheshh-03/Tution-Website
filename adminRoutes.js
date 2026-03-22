const express = require("express");
const router = express.Router();
const auth = require("authMiddleware.js");
const { login } = require("adminController.j");
const authMiddleware = require("authMiddleware.js");


router.post("/login", login);

router.get("/enquiries", auth, (req, res) => {
  const db = require("../config/db");
  db.query("SELECT * FROM enquiries ORDER BY created_at DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(rows);
  });
});


router.get("/enrollments", authMiddleware, (req, res) => {
  const sql = `
    SELECT 
      u.name AS student,
      c.title AS course,
      e.created_at
    FROM enrollments e
    JOIN users u ON e.user_id = u.id
    JOIN courses c ON e.course_id = c.id
    ORDER BY e.created_at DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json([]);
    res.json(rows);
  });
});

module.exports = router;
