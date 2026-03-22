const express = require("express");
const router = express.Router();
const rateLimiter = require("../middleware/rateLimiter");
const { submitContact } = require("contactController.js");

router.post("/", rateLimiter, submitContact);


router.post("/", (req, res) => {
  const { name, phone, email, course, message } = req.body;

  if (!name || !phone || !course) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  res.json({ message: "Enquiry submitted successfully" });
});

module.exports = router;

