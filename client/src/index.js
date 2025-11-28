import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.hydrateRoot(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
