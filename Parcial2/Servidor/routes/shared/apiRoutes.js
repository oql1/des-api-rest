import { Router } from "express";
import userRoutes from "./userRoutes.js";
import uploadRoutes from "./uploadRoutes.js";

const router = Router();

router.use(userRoutes);
router.use(uploadRoutes);

export default router;
