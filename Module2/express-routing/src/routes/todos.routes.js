const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dbPath = path.join(__dirname, "../db.json");

const readDB = () => JSON.parse(fs.readFileSync(dbPath, "utf-8"));
const writeDB = (data) =>
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

router.post("/add", (req, res) => {
  const db = readDB();
  const newTodo = { id: Date.now().toString(), ...req.body };

  db.todos.push(newTodo);
  writeDB(db);

  res.status(201).json(newTodo);
});

router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.todos);
});

router.get("/:todoId", (req, res) => {
  const db = readDB();
  const todo = db.todos.find(t => t.id === req.params.todoId);

  if (!todo) return res.status(404).json({ message: "Todo not found" });

  res.json(todo);
});

router.put("/update/:todoId", (req, res) => {
  const db = readDB();
  const index = db.todos.findIndex(t => t.id === req.params.todoId);

  if (index === -1) return res.status(404).json({ message: "Todo not found" });

  db.todos[index] = { ...db.todos[index], ...req.body };
  writeDB(db);

  res.json(db.todos[index]);
});

router.delete("/delete/:todoId", (req, res) => {
  const db = readDB();
  const index = db.todos.findIndex(t => t.id === req.params.todoId);

  if (index === -1) return res.status(404).json({ message: "Todo not found" });

  const deletedTodo = db.todos.splice(index, 1);
  writeDB(db);

  res.json(deletedTodo[0]);
});

module.exports = router;
