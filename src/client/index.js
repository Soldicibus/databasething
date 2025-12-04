const React = require("react");
const { hydrateRoot } = require("react-dom/client");
const { BrowserRouter } = require("react-router-dom");
const App = require("../App.jsx");

hydrateRoot(
  document.getElementById("root"),
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
