import { Router } from "express";
import { authenticateUser, createUser } from "../data/users.js";
import { loginSchema } from "../schemas/auth.js";
import { userSchema } from "../schemas/users.js";
import { signAccessToken } from "../utils/tokens.js";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Autenticación]
 *     summary: Registrar una cuenta
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *           example:
 *             name: Carla
 *             email: carla@example.com
 *             password: Carla123!
 *             age: 24
 *     responses:
 *       '201':
 *         description: Usuario registrado, sin contraseña ni hash.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Datos de registro inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       '409':
 *         description: Correo ya registrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/register", async (req, res) => {
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

  const user = await createUser(result.data);
  if (!user) return res.status(409).json({ error: "Email already registered" });

  return res.status(201).json(user);
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Autenticación]
 *     summary: Iniciar sesión y obtener un JWT
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *           example:
 *             email: alice@example.com
 *             password: Alice123!
 *     responses:
 *       '200':
 *         description: JWT válido durante una hora.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccessToken'
 *       '401':
 *         description: Correo o contraseña inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/login", async (req, res) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const { email, password } = result.data;
  const user = await authenticateUser(email, password);
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  return res.json({ accessToken: signAccessToken(user) });
});

export default router;
