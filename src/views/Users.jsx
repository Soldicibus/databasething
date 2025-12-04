const React = require("react");

function Users({ data }) {
  const addUser = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const user = Object.fromEntries(formData.entries());

    console.log(user);

    await fetch("/api/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    form.reset();
  };
  return (
    <div>
      <h2>User Database</h2>

      <form onSubmit={addUser} method="POST">
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <select name="type" required>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Moderator">Moderator</option>
          <option value="SuperAdmin">Super Admin</option>
        </select>
        <button type="submit">Add User</button>
      </form>

      <form action="/api/user/" method="POST">
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
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

module.exports = Users;
