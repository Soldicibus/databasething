const React = require("react");

<<<<<<< HEAD
<<<<<<< HEAD:views/Users.jsx
function App({ data }) {
=======
function Users({ data }) {
=======
function Users() {
  const [someArr, setSomeArr] = React.useState([]);
>>>>>>> e665d28aeb6fa39a038b044af980f63dddc39a1a
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
>>>>>>> d69ec37c9f6c15490089a93b88e97d6e06841907:src/views/Users.jsx
  return (
    <div>
      <h2>User Database</h2>
      <form action="/api/user/" method="POST">
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
<<<<<<< HEAD
<<<<<<< HEAD:views/Users.jsx
          {data.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <form action={`/api/user/${u.id}`} method="POST" style={{ display: 'inline' }}>
                  <input type="hidden" name="_method" value="DELETE" />
                  <button type="submit">Delete</button>
                </form>
              </td>
=======
          {data.map((item) => (
=======
          {someArr.map((item) => (
>>>>>>> e665d28aeb6fa39a038b044af980f63dddc39a1a
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
>>>>>>> d69ec37c9f6c15490089a93b88e97d6e06841907:src/views/Users.jsx
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

module.exports = Users;
