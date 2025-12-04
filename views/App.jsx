import { Link, Route, Router } from "react-router-dom";

const React = require("react");
const App = ({ children }) => {
  return (
    <div>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/users">Users</Link> |<Link to="/admins">Admins</Link> |
        <Link to="/super_admins">Super Admins</Link>
      </nav>
      <Router>
        <Route path="/users"></Route>
        <Route path="/admins"></Route>
        <Route path="/super_admins"></Route>
      </Router>
    </div>
  );
};
module.exports = App;
