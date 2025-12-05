import express from "express";
import { db } from "../initDB.js";

const router = express.Router();

router.get("/all", async (_req, res) => {
  try {
    const users = await db.getAllUsers();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch users", details: err.message });
  }
});

/*router.get("/", async (req, res) => {
  const users = await db.getUsersOnly() || [];
  console.log(db.allUsers);
  const search = req.query.search;
  if (search) {
    users = users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  const appHTML = renderToString(React.createElement(Users, { data: users }));

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>User Database</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div id="root">${appHTML}</div>
      </body>
    </html>
  `);
});*/

router.get("/:id", async (req, res) => {
  const user = await db.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

router.post("/", async (req, res) => {
  const { role, name, email, password } = req.body;
  try {
    const saved = await db.createUser({
      name: name,
      password: password,
      email: email,
      role: role,
    });
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id/pass", async (req, res) => {
  const updated = await db.resetPassword(req.body.id, req.body.newPassword);
  res.json(updated);
});

router.put("/:id", async (req, res) => {
  const updated = await db.updateUser(req.params.id, req.body);
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const deleted = await db.deleteUser(req.params.id);
  res.json(deleted);
});

export const userRoutes = router;

