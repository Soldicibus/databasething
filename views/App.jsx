const React = require("react");
const App = ({ children }) => {
  return (
    <div>
      <nav style={{ marginBottom: 20 }}>
        <a href="/">Home</a> | <a href="/users">Users</a> |{" "}
        <a href="/admin">Admins</a>
        <a href="/admin">SuperAdmins</a>
      </nav>
      {children}
    </div>
  );
};
module.exports = App;
