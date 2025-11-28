const React = require("react");

function App({ data }) {
  return (
    <div>
      <h2>User Database</h2>

      <form action="/api/users" method="POST">
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <select name="role" required>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Moderator">Moderator</option>
          <option value="SuperAdmin">Super Admin</option>
        </select>
        <button type="submit">Add User</button>
      </form>

      <form
        action="/api/users"
        method="POST"
        onsubmit="return confirm('Delete all users?');"
      >
        <input type="hidden" name="_method" value="DELETE" />
        <button type="submit">Delete All</button>
      </form>

      <form action="/" method="GET">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          defaultValue=""
        />
        <button type="submit">Search</button>
      </form>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

module.exports = App;
