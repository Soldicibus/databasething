import express from "express";
import { db } from "../initDB.js";

const router = express.Router();

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

/*router.get("/", async (req, res) => {
  const superAdmins = await db.getSuperAdminsOnly() || [];
  console.log(db.superAdmins);
  const search = req.query.search;
  if (search) {
    superAdmins = superAdmins.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  const appHTML = renderToString(React.createElement(Users, { data: superAdmins }));

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

export const superAdminRoutes = router;

