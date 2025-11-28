const { app } = require('./router');

const PORT = process.env.PORT ?? 5000;

app.get('/', (_req, res) => {
  res.send(`
    <h1>Express Backend</h1>
    <p>Choose a page:</p>
    <ul>
      <li><a href="/admin/main">Admin Page</a></li>
      <li><a href="/user/main">User Page</a></li>
      <li><a href="/superadmin/main">Super Admin Page</a></li>
    </ul>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
