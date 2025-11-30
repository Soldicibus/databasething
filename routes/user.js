const express = require("express");
const router = express.Router();
const { UserFactory } = require("../src/users");
const db = require("../initDB");

router.get("/all", async (_req, res) => {
  try {
    const users = await db.getUsersOnly();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch users", details: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const user = await db.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

router.post("/", async (req, res) => {
  const { type, name, email, password } = req.body; // type = role
  try {
    const saved = await db.createUser({
      name: name,
      password: password,
      email: email,
      role: type,
    });
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const updated = await db.updateUser(req.params.id, req.body);
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const deleted = await db.deleteUser(req.params.id);
  res.json(deleted);
});

module.exports = router;
