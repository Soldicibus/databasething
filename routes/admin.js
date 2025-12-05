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

/*router.get("/", async (req, res) => {
  const admins = await db.getAdminsOnly() || [];
  console.log(db.admins);
  const search = req.query.search;
  if (search) {
    admins = admins.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  const appHTML = renderToString(React.createElement(Users, { data: admins }));

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SuperAdmin Database</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div id="root">${appHTML}</div>
      </body>
    </html>
  `);
});*/

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
