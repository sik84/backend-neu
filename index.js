import express from "express";
import cors from "cors";
const app = express();

const PORT = 5050;

// Middleware
app.use(cors());

const todos = [
  {id: 1, name: "Milch holen", userId: 1},
  {id: 2, name: "Brötchen holen", userId: 2},
  {id: 3, name: "Wasser tragen", userId: 3},
];

app.get("/", function (req, res) {
  res.send("Hello World");
});

// todos alle:
app.get("/todos/all", (req, res) => {
  res.json(todos);
});

// Nun todos mit ID:
app.get("/todos/byid", (req, res) => {
  // const query = req.query --> {"todoId": 1}
  const todoId = req.query.todoId;
  console.log("MY TODOID", typeof todoId);
  if (!todoId) res.send("No Todo Id provided");
  const todoIdNr = parseInt(todoId);
  const todo = todos.find((item) => item.id === todoIdNr);
  res.json(todo);
});

// Todos mit UserID:
app.get("/todos/byuserid", (req, res) => {
  const userId = req.query.userId;

  if (!userId) res.send("No User Id provided");
  const userIdNr = parseInt(userId);
  const userTodos = todos.filter((item) => item.userId === userIdNr);
  res.json(userTodos);
});

app.listen(PORT, () => {
  console.log(`Express App is running on http://localhost:${PORT}`);
});
