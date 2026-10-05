import { Router } from "express";
import { createUser, deleteUser, findUserById, getUsers } from "../../data/users.js";

const router = Router();

router.get("/users", (req, res) => {
  res.json(getUsers());
});

router.get("/users/:id", (req, res) => {
  const user = findUserById(Number(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
});

router.post("/users", (req, res) => {
  const { name } = req.body ?? {};
  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }

  res.status(201).json(createUser(name.trim()));
});

router.delete("/users/:id", (req, res) => {
  const deletedUser = deleteUser(Number(req.params.id));
  if (!deletedUser) return res.status(404).json({ error: "User not found" });

  res.json(deletedUser);
});

export default router;
