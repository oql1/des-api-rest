import { Router } from "express";
import expressBasicAuth from "express-basic-auth";
import { authConfig } from "../../config/auth.js";
import apiRoutes from "../shared/apiRoutes.js";

const router = Router();

router.use(expressBasicAuth({
  users: { [authConfig.basicUsername]: authConfig.basicPassword },
}));

router.use(apiRoutes);

export default router;
