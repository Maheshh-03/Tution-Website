const db = require("../config/db");
exports.submitContact = (req, res) => {
  console.log("REQUEST BODY:", req.body); // 🔥 DEBUG LINE

  const { name, phone, email, course, message } = req.body;

  if (!name || !phone || !course) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  const sql =
    "INSERT INTO enquiries (name, phone, email, course, message) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [name, phone, email, course, message], (err, result) => {
    if (err) {
      console.error("DB ERROR:", err); // 🔥 DEBUG LINE
      return res.status(500).json({ error: "Database error" });
    }

    res.status(201).json({ success: "Enquiry submitted successfully" });
  });
};
