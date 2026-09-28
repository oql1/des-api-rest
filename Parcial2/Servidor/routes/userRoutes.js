import { Router } from "express";
import expressBasicAuth from "express-basic-auth";

const router = Router();

router.use(expressBasicAuth({
    users: { 'admin': 'supersecret' }
}))

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

let nextId = 3;

// Vista de usuarios
router.get("/", (req, res) => {
  res.render("index", { users });
});

// GET all users
router.get("/api/users", (req, res) => {
  res.json(users);
});

// GET single user
router.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

// POST a user
router.post("/api/users", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const user = {
    id: nextId++,
    name,
  };

  users.push(user);

  res.status(201).json(user);
});

// DELETE a user
router.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const [deletedUser] = users.splice(index, 1);

  res.json(deletedUser);
});

export default router;
