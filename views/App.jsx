const React = require("react");
const { Link, Route, Router } = require("react-router-dom");
const Users = require("./Users.jsx");
const Admins = require("./Admins.jsx");
const SuperAdmins = require("./SuperAdmins.jsx");

const App = () => {
  return (
    <div>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/users">Users</Link> |<Link to="/admins">Admins</Link> |
        <Link to="/super_admins">Super Admins</Link>
      </nav>
      <Router>
        <Route path="/users" element={Users} />
        <Route path="/admins" element={Admins} />
        <Route path="/super_admins" element={SuperAdmins} />
      </Router>
    </div>
  );
};
module.exports = App;
