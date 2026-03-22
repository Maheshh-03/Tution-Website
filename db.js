const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",        // XAMPP default = empty
  database: "tuition_db",
  port: 3306
});

module.exports = db;
