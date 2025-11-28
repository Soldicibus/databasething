const { app } = require('./src/router');
const db = require('./initDB');
require('dotenv').config();

const PORT = process.env.PORT ?? 5000;

app.get('/', (_req, res) => {
  res.send(`
    <h1>Express Backend</h1>
    <p>Choose a page:</p>
    <ul>
      <li><a href="/admin/all">Admin Page</a></li>
      <li><a href="/user/all">User Page</a></li>
      <li><a href="/superadmin/all">Super Admin Page</a></li>
    </ul>
  `);
});

app.listen(PORT, () => {
  if (db == null) {
    console.error('FATAL ERROR: Database is not initialized. Server may not function correctly.');
  }
  console.log(`SUCCSESS: Server running on http://localhost:${PORT}`);
  console.log('Press CTRL+C to stop the server');
});

module.exports = db;