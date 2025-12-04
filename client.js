const React = require("react");
const { hydrateRoot } = require("react-dom/client");
const User = require("./views/Users.jsx");
hydrateRoot(document.getElementById("root"), <App />);
