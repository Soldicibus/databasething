const express = require("express");
const router = express.Router();
const db = require("../initDB");

router.get("/all", async (_req, res) => {
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

router.post("/", async (req, res) => {
  const { name, email } = req.body;
  try {
    const saved = await db.createUser({
      name,
      email,
      role: "SuperAdmin",
    });
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await db.updateUser(req.params.id, {
      ...req.body,
      role: "SuperAdmin",
    });
    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update superadmin", details: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await db.deleteUser(req.params.id);
    res.json(deleted);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete superadmin", details: err.message });
  }
});

module.exports = router;
