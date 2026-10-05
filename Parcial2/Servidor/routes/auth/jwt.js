import { Router } from "express";
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import { authConfig } from "../../config/auth.js";
import apiRoutes from "../shared/apiRoutes.js";

const router = Router();

function signAccessToken(username) {
  return jwt.sign({ sub: username }, authConfig.jwtSecret, {
    algorithm: "HS256",
    expiresIn: 60 * 60,
  });
}

router.post("/login", (req, res) => {
  const { username, password } = req.body ?? {};
  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username !== authConfig.username ||
    password !== authConfig.password
  ) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  return res.json({ accessToken: signAccessToken(username) });
});

router.use(
  expressjwt({
    secret: authConfig.jwtSecret,
    algorithms: ["HS256"],
    credentialsRequired: true,
  }),
);

router.use(apiRoutes);

export default router;
