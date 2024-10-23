import express from "express";
const app = express();
const port = 3001;
app.use(express.json());
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.get("/users", (_, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);
});
app.post("/users", (req, res) => {
  const newUser = req.body;
  res.status(201).json({ message: "New user has been created", user: newUser });
});
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  res.json({
    message: `Người dùng có ID ${userId} đã được cập nhật`,
    updatedData,
  });
});
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.json({ message: `Người dùng có ID ${userId} đã bị xóa` });
});
