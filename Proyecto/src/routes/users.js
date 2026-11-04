import { Router } from "express";
import authenticate from "../middlewares/auth.js";
import { deleteUser, findUserById, getUsers } from "../data/users.js";

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Usuarios]
 *     summary: Listar usuarios
 *     responses:
 *       '200':
 *         description: Lista de usuarios sin contraseñas ni hashes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get("/", (req, res) => {
  res.json(getUsers());
});

/**
 * @swagger
 * /api/users/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *         minimum: 1
 *       description: ID del usuario.
 *   get:
 *     tags: [Usuarios]
 *     summary: Consultar un usuario
 *     responses:
 *       '200':
 *         description: Usuario sin contraseña ni hash.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 */
router.get("/:id", (req, res) => {
  const user = findUserById(Number(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags: [Usuarios]
 *     summary: Eliminar un usuario
 *     responses:
 *       '200':
 *         description: Usuario eliminado, sin contraseña ni hash.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 */
router.delete("/:id", (req, res) => {
  const deletedUser = deleteUser(Number(req.params.id));
  if (!deletedUser) return res.status(404).json({ error: "User not found" });

  res.json(deletedUser);
});

export default router;
