import { expressjwt } from "express-jwt";
import { authConfig } from "../config/auth.js";

const authenticate = expressjwt({
  secret: authConfig.jwtSecret,
  algorithms: ["HS256"],
  credentialsRequired: true,
});

export default authenticate;
