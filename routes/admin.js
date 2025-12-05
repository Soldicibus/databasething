import express from "express";
import { db } from "../initDB.js";

const router = express.Router();

router.get("/all", async (_req, res) => {
  try {
    const admins = await db.getAdminsOnly();
    res.json(admins);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch admins", details: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const admin = await db.getAdminById(req.params.id);
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    res.json(admin);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching admin", details: err.message });
  }
});

export const adminRoutes = router;
