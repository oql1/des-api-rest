import jwt from "jsonwebtoken";
import { authConfig } from "../config/auth.js";

export function signAccessToken(user) {
  return jwt.sign({ sub: String(user.id) }, authConfig.jwtSecret, {
    algorithm: "HS256",
    expiresIn: 60 * 60,
  });
}
