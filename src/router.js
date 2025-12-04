import express from "express";
import adminRoutes from "../routes/admin.js";
import userRoutes from "../routes/user.js";
import superAdminRoutes from "../routes/superadmin.js";

export const router = express.Router();

router.use("/api/admin", adminRoutes);
router.use("/api/user", userRoutes);
router.use("/api/superadmin", superAdminRoutes);