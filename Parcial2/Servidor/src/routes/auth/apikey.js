import { Router } from "express";
import { authConfig } from "../../config/auth.js";
import apiRoutes from "../shared/apiRoutes.js";

const router = Router();

router.use((req, res, next) => {
  if (req.get("x-api-key") !== authConfig.apiKey) {
    return res.status(401).json({ error: "Invalid API key" });
  }

  return next();
});

router.use(apiRoutes);

export default router;
