const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./mydb.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to the database.");

    db.run(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `,
      (err) => {
        if (err) {
          console.error("Error creating users table:", err.message);
        } else {
          console.log("Users table ready.");
        }
      }
    );
  }
});

module.exports = db;
