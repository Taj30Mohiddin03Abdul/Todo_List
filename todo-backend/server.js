const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",     // change if needed
  password: "admin", // change if needed
  database: "todo_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ Connected to MySQL database");
});

// Ensure tasks table exists
db.query(
  `CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false,
    time VARCHAR(100),
    priority VARCHAR(20) DEFAULT 'Medium'
  )`,
  (err) => {
    if (err) throw err;
    console.log("✅ Tasks table ready");
  }
);

// ================= API Routes =================

// Get all tasks
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add new task
app.post("/tasks", (req, res) => {
  const { text, time, priority } = req.body;
  db.query(
    "INSERT INTO tasks (text, time, priority) VALUES (?, ?, ?)",
    [text, time, priority || "Medium"],
    (err, result) => {
      if (err) throw err;
      res.json({ 
        id: result.insertId, 
        text, 
        completed: false, 
        time, 
        priority: priority || "Medium" 
      });
    }
  );
});

// Update task (toggle complete or edit text/priority)
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { text, completed, priority } = req.body;
  db.query(
    "UPDATE tasks SET text = ?, completed = ?, priority = ? WHERE id = ?",
    [text, completed, priority || "Medium", id],
    (err) => {
      if (err) throw err;
      res.json({ id, text, completed, priority: priority || "Medium" });
    }
  );
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Task deleted" });
  });
});

// Start server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
