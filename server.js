require("@babel/register")({
  presets: ["@babel/preset-react", "@babel/preset-env"],
  extensions: [".js", ".jsx"],
});

const express = require("express");
const React = require("react");
const { renderToString } = require("react-dom/server");
const { StaticRouter } = require("react-router-dom");

const App = require("./src/App.jsx").default;
const APIRouter = require("./src/router.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(APIRouter);

app.get("*", (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`SUCCESS: Server running on http://localhost:${PORT}`);
});
