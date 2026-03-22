 router.post("/enroll", authMiddleware, (req, res) => {
  const userId = req.user.id;
  const { courseId, name, phone, email, message } = req.body;

  if (!courseId || !name || !phone) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql = `
    INSERT INTO enrollments
    (user_id, course_id, name, phone, email, message)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [userId, courseId, name, phone, email || null, message || null],
    (err) => {
      if (err) {
        console.error("ENROLL DB ERROR:", err);
        return res.status(500).json({ message: "Database error" });
      }

      res.json({ message: "Enrolled successfully" });
    }
  );
});
