import { Router } from "express";
import { z } from "zod";
import { createUser, deleteUser, findUserById, getUsers } from "../../data/users.js";

const router = Router();

const userSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().toLowerCase(),
  age: z.number().int().min(0).max(120),
  phone: z.string().trim().regex(/^\+?[0-9]{7,15}$/).optional(),
}).strict();

router.get("/users", (req, res) => {
  res.json(getUsers());
});

router.get("/users/:id", (req, res) => {
  const user = findUserById(Number(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
});

router.post("/users", (req, res) => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid user data",
      details: result.error.issues.map((issue) => ({
        field: issue.path.join(".") || "body",
        message: issue.message,
      })),
    });
  }

  res.status(201).json(createUser(result.data));
});

router.delete("/users/:id", (req, res) => {
  const deletedUser = deleteUser(Number(req.params.id));
  if (!deletedUser) return res.status(404).json({ error: "User not found" });

  res.json(deletedUser);
});

export default router;
