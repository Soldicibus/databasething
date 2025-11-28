const { app } = require("./src/router");
const React = require("react");
const App = require("./client/src/App.js");
const db = require("./initDB");
const { renderToString } = require("react-dom/server");
require("dotenv").config();

const PORT = process.env.PORT ?? 5000;

app.get("*", (req, res) => {
  const html = renderToString(<App />);
  res.send(html);
});

app.listen(PORT, () => {
  if (db == null) {
    console.error(
      "FATAL ERROR: Database is not initialized. Server may not function correctly.",
    );
  }
  console.log(`SUCCSESS: Server running on http://localhost:${PORT}`);
  console.log("Press CTRL+C to stop the server");
});

module.exports = db;

