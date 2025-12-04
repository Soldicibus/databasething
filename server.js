require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});
const React = require("react");
const express = require("express");
const db = require("./initDB");
const Users = require("./views/Users.jsx");
const APIRouter = require("./src/router.js");
const { renderToString } = require("react-dom/server");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT ?? 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(APIRouter);

<<<<<<< Updated upstream
app.get("/", async (req, res) => {
  let users = db.allUsers || [];
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
});
=======
>>>>>>> Stashed changes
app.listen(PORT, () => {
  if (db == null) {
    console.error(
      "FATAL ERROR: Database is not initialized. Server may not function correctly.",
    );
  }
  console.log(`SUCCSESS: Server running on http://localhost:${PORT}`);
  console.log("Press CTRL+C to stop the server");
});
