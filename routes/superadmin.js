const express = require("express");
const router = express.Router();
const db = require("../initDB");

router.get("/", async (_req, res) => {
  try {
    const superadmins = await db.getSuperAdminsOnly();
    res.json(superadmins);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch superadmins", details: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const superadmin = await db.getSuperAdminById(req.params.id);
    if (!superadmin)
      return res.status(404).json({ error: "Superadmin not found" });
    res.json(superadmin);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching superadmin", details: err.message });
  }
});

module.exports = router;
