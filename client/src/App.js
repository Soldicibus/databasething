const { useState } = require("react");

function App(data) {
  const [filteredUsers, setFilteredUsers] = useState(data);
  return (
    <div>
      <h2>User Database</h2>

      <form onSubmit={handleAddUser}>
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

      <button onClick={handleDeleteAll}>Delete All</button>

      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

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
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.getRole()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
