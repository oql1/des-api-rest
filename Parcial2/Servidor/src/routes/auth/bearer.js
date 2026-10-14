import { Router } from "express";
import bearerToken from "express-bearer-token";
import { authConfig } from "../../config/auth.js";
import apiRoutes from "../shared/apiRoutes.js";

const router = Router();

router.use(bearerToken(), (req, res, next) => {
  if (req.token !== authConfig.bearerToken) {
    return res.status(401).json({ error: "Invalid or missing bearer token" });
  }

  return next();
});

router.use(apiRoutes);

export default router;
