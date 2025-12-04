import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./src/App.js";
import router from "./src/router.js";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(router);

/*app.get("*", (req, res) => {
  const context = {};

  const markup = renderToString(
    React.createElement(StaticRouter, {
      location: req.url,
      children: App,
      context,
    }),
  );

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head><title>React SSR</title></head>
      <body>
        <div id="root">${markup}</div>
        <script src="/client.bundle.js"></script>
      </body>
    </html>
  `);
});*/

app.listen(PORT, () => {
  console.log(`SUCCESS: Server running on http://localhost:${PORT}`);
});

export default app;