const { Router } = require("express");
const adminRoutes = require("../routes/admin");
const userRoutes = require("../routes/user");
const superAdminRoutes = require("../routes/superadmin");

const router = Router();

router.use("/api/admin", adminRoutes);
router.use("/api/user", userRoutes);
router.use("/api/superadmin", superAdminRoutes);

module.exports = router;
