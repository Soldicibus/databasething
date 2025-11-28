const express = require('express');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const superAdminRoutes = require('./routes/superadmin');

const app = express();

app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/superadmin', superAdminRoutes);

module.exports = { app };
