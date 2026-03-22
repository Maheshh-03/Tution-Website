router.get("/my-enrollments", authMiddleware, (req, res) => {
  const sql = `
    SELECT course, created_at
    FROM enrollments
    WHERE user_id = ?
  `;

  db.query(sql, [req.user.id], (err, rows) => {
    if (err) return res.status(500).json([]);
    res.json(rows);
  });
});


