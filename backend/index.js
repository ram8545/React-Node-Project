const express = require("express");
const multer = require("multer");
const cors = require("cors");
const db = require("./db");
const app = express();
const port = 8000;

// Middleware to parse JSON
const upload = multer();

// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173", // Or '*' for all origins (development)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.get("/", (req, res) => {
  res.send("hello Ram!");
});

app.post("/login", upload.none(), (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  const params = [email, password];

  db.get(sql, params, (err, user) => {
    if (err) {
      console.error("Error querying user:", err.message);
      return res.status(500).json({ message: "Internal server error." });
    }

    if (user) {
      return res.status(200).json(true);
    } else {
      return res.status(401).json(false);
    }
  });
});

app.post("/signup", upload.none(), (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  const params = [name, email, password];

  db.run(sql, params, function (err) {
    if (err) {
      console.error("Error inserting user:", err.message);
      return res.status(500).json({ message: "Failed to create user." });
    }
    res.status(201).json(true);
  });
});

app.listen(port, () => {
  console.log(`Server is running on this ${port}`);
});
