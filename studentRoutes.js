 const express = require("express");
const router = express.Router();
const db = require("db.js");
const authMiddleware = require("authMiddleware.js");

/* ================= MY ENROLLMENTS =================
   URL: GET /api/my-enrollments
   Auth: REQUIRED
=================================================== */
router.get("/my-enrollments", authMiddleware, (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      c.title AS course,
      e.created_at
    FROM enrollments e
    JOIN courses c ON e.course_id = c.id
    WHERE e.user_id = ?
    ORDER BY e.created_at DESC
  `;

  db.query(sql, [userId], (err, rows) => {
    if (err) {
      console.error("🔥 MY-ENROLLMENTS ERROR:", err);
      return res.status(500).json([]);
    }
    res.json(rows);
  });
});


/* ================= STUDENT PROFILE =================
   URL: GET /api/student/profile
   Auth: REQUIRED
=================================================== */
 router.get("/my-enrollments", authMiddleware, (req, res) => {
  const sql = `
    SELECT 
      c.title AS course,
      e.created_at
    FROM enrollments e
    JOIN courses c ON e.course_id = c.id
    WHERE e.user_id = ?
    ORDER BY e.created_at DESC
  `;

  db.query(sql, [req.user.id], (err, rows) => {
    if (err) {
      console.error("MY ENROLLMENTS ERROR:", err);
      return res.status(500).json([]);
    }
    res.json(rows);
  });
});


router.get("/dashboard-stats", authMiddleware, (req, res) => {
  const sql = `
    SELECT 
      COUNT(*) AS totalCourses,
      ROUND(AVG(progress)) AS avgProgress
    FROM enrollments
    WHERE user_id = ?
  `;

  db.query(sql, [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({});
    res.json(rows[0]);
  });
});
module.exports = router;
