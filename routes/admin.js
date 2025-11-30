const express = require("express");
const router = express.Router();
const db = require("../initDB");

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

router.post("/", async (req, res) => {
  const { name, email } = req.body;
  try {
    const saved = await db.createUser({
      name,
      email,
      role: "Admin",
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
      role: "Admin",
    });
    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update admin", details: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await db.deleteUser(req.params.id);
    res.json(deleted);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete admin", details: err.message });
  }
});

module.exports = router;
