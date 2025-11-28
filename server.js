const express = require('express');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const superAdminRoutes = require('./routes/superadmin');

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(express.json());
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/superadmin', superAdminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

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
